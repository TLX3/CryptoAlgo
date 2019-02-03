<template>
  <div>
      <v-flex xs12>
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <div class="headline">Available Exchanges</div>
              <span>Select the exchanges that you want to connect to</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-container grid-list-sm>
            <v-layout row wrap>
              <v-flex
                v-for="name in names"
                :key="name"
              >
                <v-card raised flatclass="d-flex">
                  <v-img
                    :src="'/static/exchanges/' + name + '_logo.png'"
                    style='cursor: pointer;'
                    @click='selectExchange(name)'
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <APIKeysDialog :exchangeName='selectedName' @submitAPIKey='clearName()' />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import APIKeysDialog from './APIKeysDialog'

export default {
  data() {
    return {
      names: ['huobi', 'binance', 'gdax', 'bitfinex', 'bittrex', 'kraken', 'poloniex', 'kucoin'],
      selectedName: ''
    };
  },
  components: {
    APIKeysDialog
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo"])
  },
  methods: {
    selectExchange (name) {
      this.selectedName = name
    },
    clearName () {
      this.selectedName = ''
    }
  }
}
</script>