<template>
    <v-dialog   
      v-model="showAddNewAlgorithm"   
      max-width="70vw"
      max-height="50vh"
      dark
    >
    <v-toolbar flat>
      <v-toolbar-title>Prebuilt Algorithms</v-toolbar-title>
      <v-spacer />
      <v-icon @click='$emit("closeDialog")'>close</v-icon>
    </v-toolbar>
    <v-data-table
      class='prebuilt-algo-table'
      v-model="selected"
      :headers="headers"
      :items="algorithms"
      return-object
      :expand="true"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td @click="props.expanded = !props.expanded">
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
              color='blue-grey'
            ></v-checkbox>
          </td>
          <td>{{ props.item.name.split('_').join(' ') }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ (Math.random() * 100).toFixed(2) }}</td>
          <td>{{ (Math.random() * 100).toFixed(2) }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat class='pa-3' style=''>
          <v-flex mx-2
          >
            <v-select
              :items="getUserExchanges.map(ex => idToExchange[ex.eid])"
              label="Exchange"
              @change='updateAlgoSettings($event, "eid", props.index)'
              item-text='eid'
            ></v-select>
          </v-flex>
          <v-flex mx-2
          >
            <v-select
              :items="currencies"
              label="Currency"
              @change='updateAlgoSettings($event, "currency", props.index)'
            ></v-select>
          </v-flex>

          <v-flex mx-2
          >
            <v-text-field type="number"               
              label="Amount"
              @change='updateAlgoSettings($event, "amount", props.index)'>
            </v-text-field>
          </v-flex>

          <v-flex mx-2>
            <v-btn
              @click='createAlgorithm()'
              color='blue-grey'
            >Create Algorithm</v-btn>
          </v-flex>
        </v-card>
      </template>
    </v-data-table>
  </v-dialog>
</template>
<script>
import axios from 'axios'
import { mapGetters } from "vuex";

  export default {
    props: ['showAddNewAlgorithm'],
    data: () => ({
      expand: false,
      selected: [],
      headers: [
        { text: '', value: '' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: '24hr Volume', value: 'volume' },
        { text: '7d Price', value: 'price'}
      ],
      currencies: [],
      maxAmount: null,
      algorithms: [],
      selected: [],
      idToExchange: {
        "1": "Binance",
        "2": "Bitfinex",
        "3": "Bittrex",
        "4": "Poloniex",
        "5": "Bitmex",
        "6": "Odax",
        "7": "Huobipro",
        "8": "Okex",
        "9": "Hitbtc",
        "10": "Kucoin"
      },
      images: ['https://cdn.vuetifyjs.com/images/cards/house.jpg', 'https://cdn.vuetifyjs.com/images/cards/road.jpg', 'https://cdn.vuetifyjs.com/images/cards/plane.jpg']
    }),
    mounted () {
      axios.get(process.env.VUE_APP_API_SERVER + 'algorithms')
      .then((res) => {  
        this.algorithms = res.data
      })
      .catch((err) => {

      })
    },
    computed: {
      ...mapGetters(["getUID", "getUserInfo", "getUserExchanges", "getUserAlgorithms", "getSelectedAlgorithms"])
    },
    methods: {
      updateAlgoSettings (e, type) {
        // update selected algorithm settings
        let updatedSelected = this.getSelectedAlgorithms
        if (type === 'enabled') {
          updatedSelected[0][type] = e
        } else if (type === 'eid') {
          let id = Object.keys(this.idToExchange).find(id => this.idToExchange[id] === e);
          updatedSelected[0][type] = id
          axios.get(process.env.VUE_APP_API_SERVER + 'symbols_by_exchange',
          { params: {
            exchange_id: this.idToExchange[id].toLowerCase(),
          } })
          .then((res) => {
            console.log(res)
            this.currencies = res.data
          })
          .catch((err) => {
            console.log(err)
          })
        } else {
          updatedSelected[0][type] = e
        }
        this.$store.dispatch('setSelectedAlgorithms', updatedSelected)
      },
      createAlgorithm () {
        this.getSelectedAlgorithms.forEach((algorithm) => {
          algorithm.uid = this.getUID
          if (!Object.keys(algorithm).includes('enabled')) algorithm.enabled = false
          this.$store.dispatch('addAlgorithmForUser', algorithm)
        })
      }
    },
    watch: {
      selected: function (val) {
        this.$store.dispatch("setSelectedAlgorithms", this.selected);
      }
    }
  }
</script>

<style lang='scss'>
  .prebuilt-algo-table {
    th {
      background: blue;
    }
  }
</style>