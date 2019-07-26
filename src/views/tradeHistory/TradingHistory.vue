<template>
  <div class='trading-history'>
    <v-data-table
      :headers="headers"
      :items="orders"
      hide-actions
      disable-initial-sort
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.order_id }}</td>
        <td class="text-xs-left">{{ props.item.currency }}</td>
        <td class="text-xs-left">{{ props.item.type }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.amount }}</td>
        <td class="text-xs-left">{{ props.item.rate }}</td>
        <td class="text-xs-left">{{ props.item.fee }}</td>
        <td class="text-xs-left">{{ props.item.total }}</td>
        <td class="text-xs-left">{{ props.item.result }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

  export default {
    data () {
      return {
        headers: [
          { text: 'Order ID', value: 'order_id' },
          { text: 'Currency', value: 'currency' },
          { text: 'Type', value: 'type' },
          { text: 'Date', value: 'date' },
          { text: 'Amount', value: 'amount' },
          { text: 'Rate', value: 'rate'},
          { text: 'Fee', value: 'fee'},
          { text: 'Total', value: 'total'},
          { text: 'Result', value: 'result'}
        ],
        orders: []
      }
    },
    computed: {
    ...mapGetters(["getUID"])
    },
    mounted () {
      axios.get(process.env.VUE_APP_API_SERVER + 'trade_history', {
        params: {
          uid: this.getUID
        }
      })
      .then((res) => {
        console.log(res)
        if (res) this.orders = res.data
      })
      .catch((err) => {
          console.log(err)
      });
      // let fakeOrders = []
      // for (let i = 0; i < 25; i++) {
      //   fakeOrders.push({
      //     'order_id': i + 1,
      //     'currency': 'ETH',
      //     'type': ['BUY', 'SELL'][i % 2 ? 1 : 0],
      //     'date': new Date(),
      //     'amount': Math.ceil(Math.random() * 100),
      //     'rate': '$' + (Math.random() * 1000).toFixed(2),
      //     'fee': '$'+ (Math.random() * 1).toFixed(2),
      //     'total': '$' + (Math.random() * 10000).toFixed(2),
      //     'result': '$' + (Math.random() * 10000).toFixed(2)
      //   })
      // }
      // this.orders = fakeOrders
    }
  }
</script>
<style lang="scss">
  .trading-history {
    th {
      font-size: 20px !important;
    }
    td {
      font-weight: bold !important;
      border-bottom: 0.5px solid black;
    }
  }
</style>