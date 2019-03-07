<template>
  <div>
      <v-stepper class="mt-2" v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Select Exchanges</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">Create Strategy</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Configure Settings</v-stepper-step>
        </v-stepper-header>
    
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-5"
            >
              <ExchangeSelection />
            </v-card>
            <v-btn
              color="primary"
              @click="e1 = 2"
              v-if='getUserExchanges'
            >
              Continue
            </v-btn>
          </v-stepper-content>
    
          <v-stepper-content step="2">
            <v-card
              class="mb-5"
            >
              <Strategy />
            </v-card>
            <v-btn
              color="primary"
              @click="e1 = 3"
              v-if='getSelectedAlgorithms.length > 0'
            >
              Continue
            </v-btn>
    
            <v-btn @click="e1 = 1">Back</v-btn>
          </v-stepper-content>
    
          <v-stepper-content step="3">
            <v-card
              class="mb-5"
              height="300px"
            >
              <Run />
            </v-card>
    
            <v-btn
              color="primary"
              @click="saveAlgoSettings()"
            >
              Save
            </v-btn>
    
            <v-btn @click="e1 = 2">Back</v-btn>
            <v-btn @click='$router.push("/dashboard/tradehistory");'>Home</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'
import ExchangeSelection from './ExchangeSelection'
import Strategy from './Strategy'
import Run from './Run'

export default {
  data () {
    return {
      e1: 0
    }
  },
  components: {
    ExchangeSelection,
    Strategy,
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