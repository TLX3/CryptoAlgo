<template>
  <div>
      <v-flex xs12>
        <v-card flat>
          <v-card-title style='background-color: #727891; color: #fff;' primary-title>
            <div>
              <div style='font-size: 28px;'>Available Exchanges</div>
              <span>Select the exchanges that you want your account to connect to</span>
            </div>
          </v-card-title>
            <v-layout style='background-color: #727891;' wrap row>
              <v-flex v-for="exchange in exchanges" :key="exchange.name" xs2 class='ma-2'>
                <v-card>
                  <v-img
                    :src="'/static/exchanges/' + exchange.name + '.png'"
                    style='cursor: pointer;'
                    @click='selectExchange(exchange)'
                    aspect-ratio="3"
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
    axios.get(process.env.VUE_APP_API_SERVER + 'exchanges')
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
<style lang="scss">
  
</style>