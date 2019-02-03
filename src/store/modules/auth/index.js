/**
 * Auth Module
 */
import Vue from 'vue'
import Nprogress from 'nprogress';
import axios from 'axios'
import router from '../../../router';

const state = {
    user: localStorage.getItem('user'),
}

// getters
const getters = {
    getUser: state => {
        return state.user;
    },
    getUID: state => {
        return state.user.uid;
    },
    getUserInfo: state => {
        return state.user.info
    }
}

// actions
const actions = {
    signIn(context, payload) {
        context.commit('loginUser');
        axios.post('/login', payload)
            .then(user => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit('loginUserSuccess', user);
                }, 500)
            })
            .catch(error => {
                context.commit('loginUserFailure', error);
            });
    },
    logOut(context) {
        // clear token and refresh
        setTimeout(() => {
            context.commit('logoutUser');
        }, 500)
    },
    signUp(context, payload) {
        let { userDetail } = payload;
        context.commit('signUpUser');
        axios.post('/signup', payload)
            .then(() => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit('signUpUserSuccess', userDetail);
                }, 500)
            })
            .catch(error => {
                context.commit('signUpUserFailure', error);
            })
    },
    AssignExchangeToUser(context, payload) {
        const { uid, exchanges } = payload;
        // POST/PUT/DELETE /exchange_key params - INT uid, INT eid, STR api_key, STR api_secret

        axios.post('/exchange_key', payload)
        .then(() => {
            console.log("Exchange information updated for user");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}

// mutations
const mutations = {
    loginUser(state) {
        Nprogress.start();
    },
    loginUserSuccess(state, user) {
        state.user = user;
        localStorage.setItem('user',JSON.stringify(user));
        router.push("/dashboard/tradehistory");
        setTimeout(function(){
            Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'User Logged In Success!'
            });
       },1500);
    },
    loginUserFailure(state, error) {
        Nprogress.done();
        Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: error.message
        });
    },
    logoutUser(state) {
        state.user = null
        localStorage.removeItem('user');
        router.push("/login");
    },
    signUpUser(state) {
        Nprogress.start();
    },
    signUpUserSuccess(state, user) {
        state.user = localStorage.setItem('user', user);
        router.push("/dashboard/tradeHistory");
        Vue.notify({
            group: 'loggedIn',
            type: 'success',
            text: 'Account Created!'
        });
    },
    signUpUserFailure(state, error) {
        Nprogress.done();
         Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: error.message
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
