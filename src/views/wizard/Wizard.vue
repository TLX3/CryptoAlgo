<template>
  <div id="app">
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
            >
              Continue
            </v-btn>
    
            <v-btn @click="e1 = 1">Back</v-btn>
          </v-stepper-content>
    
          <v-stepper-content step="3">
            <v-card
              class="mb-5"
              color="grey lighten-1"
              height="300px"
            ></v-card>
    
            <v-btn
              color="primary"
              @click="e1 = 1"
            >
              Start
            </v-btn>
    
            <v-btn @click="e1 = 2">Back</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
  </div>
</template>

<script>
import ExchangeSelection from './ExchangeSelection'
import Strategy from './Strategy'

export default {
  data () {
    return {
      e1: 0
    }
  },
  components: {
    ExchangeSelection,
    Strategy
  }
}
</script>