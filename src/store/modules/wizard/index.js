/**
 * Wizard Module
 */
import Vue from 'vue'
import Nprogress from 'nprogress';
import axios from 'axios'
import router from '../../../router';

const state = {
  userExchanges: [],
  userAlgorithms: [],
  selectedAlgorithms: []
}

// getters
const getters = {
    getUserExchanges: state => {
        return state.userExchanges;
    },
    getUserAlgorithms: state => {
        return state.userAlgorithms;
    },
    getSelectedAlgorithms: state => {
      return state.selectedAlgorithms
    }
}

// actions
const actions = {
    setSelectedAlgorithms (context, selected) {
      context.commit('setSelectedAlgorithms', selected);
    },
    addAlgorithmForUser (context, payload) {
      const { id, amount, currency, eid, enabled, uid } = payload;
      let json = {
        "aid": Number(id),
        "amount": Number(amount),
        "currency": currency,
        "eid": Number(eid),
        "enabled": enabled,
        "uid": Number(uid)
      }
      axios.post('http://35.235.83.44:5000/assignment/', json)
      .then(() => {
          console.log("Algorithm added for user");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    },
    updateExchangeForUser(context, payload) {
        const { uid, eid, api_key, api_secret } = payload;
        // POST/PUT/DELETE /exchange_key params - INT uid, INT eid, STR api_key, STR api_secret
        console.log(payload, "HERE")
        axios.post('http://35.235.83.44:5000/exchange_key', { uid, eid, api_key, api_secret })
        .then(() => {
            console.log("Exchange information updated for user");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    },
    getExistingUserExchanges (context, uid) {
      // GET user's exchange keys
      axios.get('http://35.235.83.44:5000/exchange_key', {
        params: {
          uid: uid
        }
      })
        .then((res) => {
          context.commit('setUserExchanges', res.data);
        })
        .catch((err) => {
          
        })
    },
    getExistingUserAlgorithms (context, uid) {
      // Get user's assigned algorithms
      axios.get('http://35.235.83.44:5000/assignment', {
        params: {
          uid: uid
        }
      })
        .then((res) => {
          context.commit('setUserAlgorithms', res.data);
        })
        .catch((err) => {
          
        })
    }
}

// mutations
const mutations = {
    setUserExchanges(state, exchanges) {
      state.userExchanges = exchanges
    },
    setUserAlgorithms(state, algorithms) {
      state.userAlgorithms = algorithms
    },
    setSelectedAlgorithms (state, selected) {
      state.selectedAlgorithms = selected
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
