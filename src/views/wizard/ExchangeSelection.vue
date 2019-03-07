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
              <v-flex v-for="exchange in exchanges" :key="exchange.name">
                <v-card raised flatclass="d-flex">
                  <v-img
                    :src="'/static/exchanges/' + exchange.name + '.png'"
                    style='cursor: pointer;'
                    @click='selectExchange(exchange)'
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
      <APIKeysDialog :selectedExchange='selectedExchange' @clearExchange='clearExchange' />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'
import APIKeysDialog from './APIKeysDialog'

export default {
  data() {
    return {
      exchanges: [],
      selectedExchange: {},
      usersExchanges: []
    };
  },
  components: {
    APIKeysDialog
  },
  mounted () {
    // GET exchanges
    axios.get('http://35.235.83.44:5000/exchanges')
      .then((res) => {
        console.log(res.data)
        this.exchanges = res.data
      })
      .catch((err) => {
        
      })
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo"])
  },
  methods: {
    selectExchange (exchange) {
      this.selectedExchange = exchange
    },
    clearExchange () {
      this.selectedExchange = {}
      console.log("A")
    }
  }
}
</script>