<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex xs4>
        <StrategyButtonGroup :showingStrategyTest="showStrategyTesting" @showStrategyTesting='showStrategyTesting = true' @hideStrategyTesting='showStrategyTesting = false' />
      </v-flex>
      <v-flex xs4>
        <StrategyTesting v-if='showStrategyTesting' @hideStrategyTesting='showStrategyTesting = false' />
        <SelectedStrategyValues v-else />
      </v-flex>
      <v-flex xs4>
        <BuySellSignals v-if='!showStrategyTesting'/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import StrategyButtonGroup from './StrategyButtonGroup'
import SelectedStrategyValues from './SelectedStrategyValues'
import BuySellSignals from './BuySellSignals'
import StrategyTesting from './StrategyTesting'

export default {
  components: {
    StrategyButtonGroup,
    SelectedStrategyValues,
    BuySellSignals,
    StrategyTesting
  },
    data () {
    return {
      showStrategyTesting: false
    }
  },
}
</script>