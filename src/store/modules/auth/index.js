/**
 * Auth Module
 */
import Vue from 'vue'
import Nprogress from 'nprogress';
import axios from 'axios'
import router from '../../../router';

const state = {
    token: localStorage.getItem('token'),
    uid: localStorage.getItem('uid'),
    info: ''
}

// getters
const getters = {
    getUser: state => {
        return state.token;
    },
    getUID: state => {
        return state.uid;
    },
    getUserInfo: state => {
        return state.info
    }
}

// actions
const actions = {
    signIn(context, payload) {
        context.commit('loginUser');
        console.log(payload)
        let headers = {
            'Content-Type': 'application/json'
        }
        axios.post('http://35.235.83.44:5000/login', payload, {headers: headers})
            .then(res => {
                Nprogress.done();
                console.log(res)
                setTimeout(() => {
                    context.commit('setUID', res.data.uid)
                    context.commit('loginUserSuccess', res.data.token);
                }, 500)
            })
            .catch(error => {
                console.log(error)
                context.commit('loginUserFailure', error);
            });
    },
    logOut(context) {
        // clear token and refresh
        setTimeout(() => {
            context.commit('logoutUser');
        }, 500)
    },
    signupUser(context, payload) {
        context.commit('signUpUser');
        console.log(payload)
        axios.post('http://35.235.83.44:5000/user', payload)
            .then((res) => {
                console.log(res)
                Nprogress.done();
                setTimeout(() => {
                    context.commit('signUpUserSuccess', res.data.token);
                    context.commit('setUID', res.data.uid)
                }, 500)
            })
            .catch(error => {
                console.log(error)
                context.commit('signUpUserFailure', error);
            })
    }
}

// mutations
const mutations = {
    loginUser(state) {
        Nprogress.start();
    },
    loginUserSuccess(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
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
        state.token = null
        state.uid = null
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        router.push("/login");
    },
    signUpUser(state) {
        Nprogress.start();
    },
    signUpUserSuccess(state, token) {
        state.token = localStorage.setItem('token', token);
        router.push("/dashboard/wizard");
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
    },
    setUID(state, uid) {
        localStorage.setItem('uid', uid)
        state.uid = uid
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
