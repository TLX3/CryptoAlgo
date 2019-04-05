<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Prebuilt Algorithms</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      class='prebuilt-algo-table'
      v-model="selected"
      :headers="headers"
      :items="algorithms"
      return-object
      :expand="true"
      select-all
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td @click="props.expanded = !props.expanded">
            <v-checkbox
              v-model="props.selected"
              primary
              color='blue-grey'
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ (Math.random() * 100).toFixed(2) }}</td>
          <td>{{ (Math.random() * 100).toFixed(2) }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat class='pa-3' style='background-color: #DCDCDC;'>
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
              @keydown='updateAlgoSettings($event, "amount", props.index)'>
            </v-text-field>
          </v-flex>

          <v-flex mx-2>
            <v-switch
              @change='updateAlgoSettings($event, "enabled", props.index)'
              label="Enabled"
            ></v-switch>
          </v-flex>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from "vuex";

  export default {
    data: () => ({
      expand: false,
      selected: [],
      headers: [
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
      axios.get('http://35.235.83.44:5000/algorithms')
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
      updateAlgoSettings (e, type, idx) {
        // update selected algorithm settings
        let updatedSelected = this.getSelectedAlgorithms
        if (type === 'enabled') {
          updatedSelected[idx][type] = e
        } else if (type === 'eid') {
          let id = Object.keys(this.idToExchange).find(id => this.idToExchange[id] === e);
          updatedSelected[idx][type] = id
          console.log("HERE", this.idToExchange[id].toLowerCase())
          axios.post('http://35.235.83.44:5000/symbols_by_exchange',
          {
            exchange_id: this.idToExchange[id].toLowerCase(),
          })
          .then((res) => {
            console.log(res)
            this.currencies = res.data
          })
          .catch((err) => {
            console.log(err)
          })
        } else {
          updatedSelected[idx][type] = e.target.value
        }
        this.$store.dispatch('setSelectedAlgorithms', updatedSelected)
      },
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
    td, th {
      border: 1px solid black;
    }
  }
</style>