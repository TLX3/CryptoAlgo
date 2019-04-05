<template>
  <div>
      <v-stepper class="mt-2" v-model="e1" vertical>    
          <v-stepper-step :complete="e1 > 1" step="1">Select Exchanges</v-stepper-step>

          <v-stepper-content step="1">
            <v-card
              class="mb-5"
            >
              <ExchangeSelection />
            </v-card>
            <v-btn
              color="primary"
              @click="e1 = 2; createAlgorithm = true"
              v-if='getUserExchanges'
            >
              Create Algorithms
            </v-btn>
            <v-btn
              color="primary"
              @click="e1 = 2"
              v-if='getUserExchanges'
            >
              Select Prebuilt Algorithms
            </v-btn>
          </v-stepper-content>
    
          <v-stepper-step :complete="e1 > 2" step="2">Configure Algorithms</v-stepper-step>

          <v-stepper-content step="2">
            <v-card
              class="mb-5"
            >
              <CreateAlgorithm v-if='createAlgorithm'/>
              <SelectPrebuiltAlgorithm v-else/>
            </v-card>
    
            <v-btn
              color="primary"
              v-if='getSelectedAlgorithms.length > 0'
              @click="saveAlgoSettings()"
            >
              Save
            </v-btn>
    
            <v-btn @click="e1 = 1; createAlgorithm = false;">Back</v-btn>
            <v-btn v-if='getUserAlgorithms.length > 0' @click='$router.push("/dashboard/tradehistory");'>Home</v-btn>
          </v-stepper-content>
      </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'
import ExchangeSelection from './ExchangeSelection'
import SelectPrebuiltAlgorithm from './PrebuiltAlgorithms'
import CreateAlgorithm from './CreateAlgorithm'
import Run from './Run'

export default {
  data () {
    return {
      e1: 0,
      createAlgorithm: false,
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
  components: {
    ExchangeSelection,
    SelectPrebuiltAlgorithm,
    CreateAlgorithm,
    Run
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo", "getUserExchanges", "getUserAlgorithms", "getSelectedAlgorithms"])
  },
  mounted () {
      this.$store.dispatch("getExistingUserExchanges", this.getUID);
      this.$store.dispatch("getExistingUserAlgorithms", this.getUID);
  },
  methods: {
    saveAlgoSettings () {
      this.getSelectedAlgorithms.forEach((algorithm) => {
        algorithm.uid = this.getUID
        if (!Object.keys(algorithm).includes('enabled')) algorithm.enabled = false
        this.$store.dispatch('addAlgorithmForUser', algorithm)
      })
    }
  }
}
</script>