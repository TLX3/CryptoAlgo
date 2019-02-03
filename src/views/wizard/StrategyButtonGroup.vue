<template>
  <div>
    <v-btn color='success'>
      <span>Save</span>
    </v-btn>
    <v-btn-toggle @change='updateDialogSelected()' multiple v-model="dialogType">
      <v-btn class="white--text" color='green' value="Indicators">
        <span>Indicators</span>
        <v-icon>fas fa-chart-line</v-icon>
      </v-btn>
      <v-btn class="white--text" color='green' value="Candles">
        <span>Candle Patterns</span>
        <v-icon>far fa-square</v-icon>
      </v-btn>
      <v-btn class="white--text" color='green' value="Algorithms">
        <span>Algorithms</span>
        <v-icon>fas fa-code-branch</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn v-if='!showingStrategyTest' color='info' @click='$emit("showStrategyTesting")'>
      <span>Test</span>
    </v-btn>
    <v-btn v-else color='info' @click='$emit("hideStrategyTesting")'>
      <span>Back</span>
    </v-btn>

    <StrategyDialog @closeDialog='showDialog = false;' :showDialog="showDialog" :dialogType='dialogType' />
  </div>
</template>
<script>
import StrategyDialog from './StrategyDialog'

  export default {
    props: ['showingStrategyTest'],
    components: {
      StrategyDialog
    },
    data () {
      return {
        dialogType: [],
        showDialog: false,
      }
    },
    methods: {
      updateDialogSelected() {
        this.showDialog = !this.showDialog
      }
    }
  }

</script>