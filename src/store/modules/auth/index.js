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
    info: {}
}

// getters
const getters = {
    getUser: state => {
        return state.token
    },
    getUID: state => {
        return state.uid
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
        axios.post(process.env.VUE_APP_API_SERVER + 'login', payload, {headers: headers})
            .then(res => {
                Nprogress.done();
                console.log(res)
                axios.get(process.env.VUE_APP_API_SERVER + 'status' , { headers: {"Authorization" : `Bearer ${res.data.token}`} })
                .then(res2 => {
                    setTimeout(() => {
                        context.commit('setUserInfo', res2.data)
                        context.commit('setUID', res.data.uid)
                        context.commit('loginUserSuccess', res.data.token);
                    }, 500)
                }).catch((error) => {
                  console.log(error)
                });
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
        axios.post(process.env.VUE_APP_API_SERVER + 'user', payload)
            .then((res) => {
                console.log(res)
                Nprogress.done();
                setTimeout(() => {
                    context.commit('signUpUserSuccess');
                }, 500)
            })
            .catch(error => {
                console.log(error)
                context.commit('signUpUserFailure', error);
            })
    },
    setUserInfo(context, info) {
        context.commit('setUserInfo', info);
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
    signUpUserSuccess(state) {
        router.push("/landing");
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
    },
    setUserInfo(state, info) {
        state.info = info
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
