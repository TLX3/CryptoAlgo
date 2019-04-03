<template>
  <v-layout justify-center>
    <v-flex md12>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="(algo, i) in algorithms"
              :key="algo.id"
              v-bind="{ [`xs${4}`]: true }"
            >
              <v-card style='cursor: pointer;' v-if='!selected.map(s => s.name).includes(algo.name)'  @click='addAlgoToSelected(algo)'>
                <v-img :src='images[i % 3]' height="350px" >
                  <v-container
                    fill-height
                    fluid
                    pa-3
                  >
                    <v-layout >
                      <v-flex xs6 >
                        <span class="headline white--text">{{ algo.name }}</span>
                      </v-flex>
                      <v-flex xs12 align-end >
                        <span class='headline white--text'>+{{(Math.random() * 100).toFixed(2)}}%</span>
                      </v-flex>
                      <v-flex xs12 align-end>
                        <span class='headline white--text'>{{(Math.random() * 100).toFixed(2)}} $m</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  </v-img>
              </v-card>
              <v-card dark v-else>
                <v-img :src='images[i % 3]' height="350px" >
                <v-flex
                >
                  <v-card-title 
                  >
                    <span style='font-size: 16px'>{{ algo.name }}</span>
                    <v-spacer />
                    <v-icon @click='addAlgoToSelected(algo)'>close</v-icon>
                  </v-card-title>
                </v-flex>
                <v-flex mx-2
                >
                  <v-select
                    :items="getUserExchanges.map(ex => idToExchange[ex.eid])"
                    label="Exchange"
                    @change='updateAlgoSettings($event, "eid", i)'
                    item-text='eid'
                  ></v-select>
                </v-flex>
                <v-flex mx-2
                >
                  <v-select
                    :items="currencies"
                    label="Currency"
                    @change='updateAlgoSettings($event, "currency", i)'
                  ></v-select>
                </v-flex>

                <v-flex mx-2
                >
                  <v-text-field type="number"               
                    label="Amount"
                    @keydown='updateAlgoSettings($event, "amount", i)'>
                  </v-text-field>
                </v-flex>

                <v-flex mx-2>
                  <v-switch
                    @change='updateAlgoSettings($event, "enabled", i)'
                    label="Enabled"
                  ></v-switch>
                </v-flex>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
import { mapGetters } from "vuex";

  export default {
    data: () => ({
      currencies: [],
      maxAmount: null,
      algorithms: [],
      selected: [],
      idToExchange: {
        "1": "Binance",
        "2": "Bitfinex",
        "3": "Bittrex",
        "4": "Poloniex",
        "5": "Bitmex",
        "6": "Odax",
        "7": "Huobipro",
        "8": "Okex",
        "9": "Hitbtc",
        "10": "Kucoin"
      },
      images: ['https://cdn.vuetifyjs.com/images/cards/house.jpg', 'https://cdn.vuetifyjs.com/images/cards/road.jpg', 'https://cdn.vuetifyjs.com/images/cards/plane.jpg']
    }),
    mounted () {
      axios.get('http://35.235.83.44:5000/algorithms')
      .then((res) => {
        this.algorithms = res.data
      })
      .catch((err) => {

      })
    },
    computed: {
      ...mapGetters(["getUID", "getUserInfo", "getUserExchanges", "getUserAlgorithms", "getSelectedAlgorithms"])
    },
    methods: {
      addAlgoToSelected (algo) {
        let mapped = this.selected.map(a => a.name)
        let idx = mapped.indexOf(algo.name)
        !mapped.includes(algo.name) ? this.selected.push(algo) : this.selected.splice(idx, 1)
        this.$store.dispatch("setSelectedAlgorithms", this.selected);
      },
      updateAlgoSettings (e, type, idx) {
        // update selected algorithm settings
        let updatedSelected = this.getSelectedAlgorithms
        if (type === 'enabled') {
          updatedSelected[idx][type] = e
        } else if (type === 'eid') {
          updatedSelected[idx][type] = Object.keys(this.idToExchange).find(id => this.idToExchange[id] === e).toLowerCase();
        } else {
          updatedSelected[idx][type] = e.target.value
        }
        this.$store.dispatch('setSelectedAlgorithms', updatedSelected)
      },
    }
  }
</script>

<style>
  body {
    font-family: 'HelveticaNeueforIBW01-Bold', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  }
  .activated {
    opacity: 0.5;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>