<template>
    <v-card>
      <v-layout row justify-center>
      <v-flex v-for='(algo, i) in getSelectedAlgorithms' :key='i' ma-2>
        <v-card>
          <v-flex
          >
            <v-card-title 
            >
              {{ algo.name }}
            </v-card-title>
          </v-flex>
          <v-flex mx-2
          >
            <v-text-field   
              type="string"          
              label="Currency"
              @keydown='updateAlgoSettings($event, "currency", i)'>
            </v-text-field>
          </v-flex>

          <v-flex mx-2
          >
            <v-text-field type="number"               
              label="Amount"
              @keydown='updateAlgoSettings($event, "amount", i)'>
            </v-text-field>
          </v-flex>

          <v-flex mx-2
          >
            <v-select
              :items="getUserExchanges"
              label="Exchange"
              @change='updateAlgoSettings($event, "eid", i)'
              item-text='eid'
            ></v-select>
          </v-flex>

          <v-flex mx-2>
            <v-switch
              @change='updateAlgoSettings($event, "enabled", i)'
              label="Enabled"
            ></v-switch>
          </v-flex>
        </v-card>
        </v-flex>
      </v-layout>
    </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data () {
      return {
        algoSettings: [],
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
        }
      }
  },
  computed: {
    ...mapGetters(["getSelectedAlgorithms", "getUserExchanges"])
  },
  methods: {
    updateAlgoSettings (e, type, idx) {
      // update selected algorithm settings
      let updatedSelected = this.getSelectedAlgorithms
      if (type === 'enabled' || type === 'eid') {
        updatedSelected[idx][type] = e
      } else {
        updatedSelected[idx][type] = e.target.value
      }
      this.$store.dispatch('setSelectedAlgorithms', updatedSelected)
    }
  }
}
</script>