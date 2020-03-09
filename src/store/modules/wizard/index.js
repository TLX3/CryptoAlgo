/**
 * Wizard Module
 */
import Vue from 'vue'
import Nprogress from 'nprogress';
import axios from 'axios'
import router from '../../../router';
import io from 'socket.io-client'

const state = {
  userExchanges: [],
  userAlgorithms: [],
  selectedAlgorithms: [],
  chartConfig: {        
    chart: {},
    time: {
        useUTC: false
    },
    rangeSelector: {
        buttons: [{
        count: 1,
        type: 'minute',
        text: '1M'
        }, {
        count: 5,
        type: 'minute',
        text: '5M'
        }, {
        type: 'all',
        text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },
    title: {
        text: 'Data Feed'
    },
    exporting: {
        enabled: false
    },
    series: []
  }
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
    },
    getChartConfig: state => {
      return state.chartConfig
    }
}

// actions
const actions = {
    setChartConfig (context, data) {
      let config = Object.assign(state.chartConfig)
      config.chart.events = 
      {
        load: function () {
            // set up the updating of the chart each second
            let priceSeries = this.series[0];
            let RSISeries = this.series[1];
            let socket = io.connect(data.socketAddress);
            socket.on('connect', function() {
              console.log('CONNECTED TO SOCKET');
            });
            socket.on('simple_loop', (data) => {
              console.log('RESPONSE:', data);
              data = JSON.parse(data)
              let dateTime = new Date(data.datetime).getTime() * 1000
              let price = data.price
              let priceChange = data.priceChange
              let cash = data.cash
              let RSI = data.RSI
              console.log('New Point:', [dateTime, price])
              priceSeries.addPoint([dateTime, price], true, false);
              RSISeries.addPoint([dateTime, RSI], true, false);
            });
            socket.on('finishedBacktest', (sample) => {
                socket.emit('forceDisconnect');
            });
        }
      }
      config.series = [
      {
          name: 'price',
          data: (function () {
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;
      
            for (i = 0; i <= 0; i += 1) {
                data.push([
                time + i * 1000,
                0
                ]);
            }
            return data;
            }())      
      },
      {
          name: 'RSI',
          data: [],
          data: (function () {
          // generate an array of random data
          let data = [],
              time = (new Date()).getTime(),
              i;
    
          for (i = 0; i <= 0; i += 1) {
              data.push([
              time + i * 1000,
              0
              ]);
          }
          return data;
          }())
    }
    ]
      context.commit('setChartConfig', config)
    },
    setSelectedAlgorithms (context, selected) {
      context.commit('setSelectedAlgorithms', selected);
    },
    updateExchangeForUser({ commit, state }, payload) {
        const { uid, eid, api_key, api_secret } = payload;
        // POST/PUT/DELETE /exchange_key params - INT uid, INT eid, STR api_key, STR api_secret
        console.log(payload, "HERE")
        axios.post(process.env.VUE_APP_API_SERVER + 'exchange_key', { uid, eid, api_key, api_secret })
        .then((res) => {
            console.log("Exchange information updated for user", res);
            commit('setUserExchanges', [eid ,...state.userExchanges]);
            router.go()              
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    },
    getExistingUserExchanges (context, uid) {
      // GET user's exchange keys
      axios.get(process.env.VUE_APP_API_SERVER + 'exchange_key', {
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
      axios.get(process.env.VUE_APP_API_SERVER + 'assignment', {
        params: {
          uid: uid
        }
      })
        .then((res) => {
          console.log(res, '--------')
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
    },
    setChartConfig(state, config) {
      state.chartConfig = config
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
