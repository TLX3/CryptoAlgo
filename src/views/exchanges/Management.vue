<template>
  <div>
    <v-card class='ma-4'>
      <v-card-title style='background-color: #727891; color: #fff;' primary-title>
        <div>
          <div style='font-size: 28px;'>Linked Exchanges</div>
          <span>These are the exchanges that your account is connected to</span>
        </div>
      </v-card-title>
        <v-data-table
          :headers="headers"
          :items="usersExchanges"
          :expand="expand"
          item-key="api_key"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.eid }}</td>
              <td>{{ props.item.api_key }}</td>
              <td>{{ props.item.api_secret }}</td>
              <td>{{ props.item.validated }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <v-card-text>Peek-a-boo!</v-card-text>
            </v-card>
          </template>
        </v-data-table>
    </v-card>

    <v-card class='ma-4'>
        <v-card-title style='background-color: #727891; color: #fff;' primary-title>
          <div>
            <div style='font-size: 28px;'>Add an Exchange</div>
            <span>Select an exchange that you want your account to connect to</span>
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
      <AddExchange :selectedExchange='selectedExchange' @clearExchange='clearExchange' />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
import AddExchange from './AddExchange'

export default {
  data() {
    return {
      exchanges: [],
      selectedExchange: {},
      usersExchanges: [],
      expand: false,
      headers: [
        { text: 'Exchange ID', value: 'eid' },
        { text: 'API Key', value: 'api_key' },
        { text: 'API Secret', value: 'api_secret' },
        { text: 'Validated', value: 'validated' }
      ]
    };
  },
  components: {
    AddExchange
  },
  mounted () {
    // GET exchanges
    axios.get(process.env.VUE_APP_API_SERVER + 'exchanges')
      .then((res) => {
        this.exchanges = res.data
      })
      .catch((err) => {
        
      })
    // GET User's exchanges
    axios.get(process.env.VUE_APP_API_SERVER + 'exchange_key?uid=' + this.getUID)
      .then((res) => {
        this.usersExchanges = res.data
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