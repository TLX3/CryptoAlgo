<template>
  <v-card>
    <v-card-title class="subheader">Test Strategy</v-card-title>
    <v-divider></v-divider>
    <v-layout align-content-center justify-center align-center wrap>
      <v-flex xs5>
        <span>Exchanges</span>
        <v-select

          :items="states"
          v-model="e6"
          :menu-props="{ maxHeight: '400' }"
          multiple
        ></v-select>
      </v-flex>
      <v-flex xs5>
        <span>Market</span>
        <v-select
            :items="states"
            v-model="e7"
            :menu-props="{ maxHeight: '400' }"
            multiple
        ></v-select>
      </v-flex>
      <v-flex xs1>
        <v-btn class="white--text" color='green' @click='showTestResults = true'>
          <v-icon>fas fa-play</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <StrategyResults v-if='showTestResults' />
  </v-card>
</template>
<script>
import StrategyResults from './StrategyResults'

export default {
  components: {
    StrategyResults
  },
  data () {
    return {
      showTestResults: false,
      e6: [],
      e7: [],
      states: [
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    }
  }
}
</script>