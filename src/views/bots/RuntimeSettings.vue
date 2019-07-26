<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="500"
      dark
    >
      <v-card>
        <v-card-title class="headline">Live/Backtesting</v-card-title>

        <v-card-text>
          <StreamChart />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="$emit('closeDialog')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import StreamChart from './StreamChart'
export default {
  components: {
    StreamChart
  },
  props: ['dialog', 'selectedItem']
}
</script>