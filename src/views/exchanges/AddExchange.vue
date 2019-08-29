<template>
   <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Connect Exchange</div>
              <span class="grey--text">Enter your API Key details to add {{ selectedExchange.name }} to your account</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
              <v-layout wrap>
                <v-flex xs10>
                  <v-text-field :label="selectedExchange.name + ' API Key*'" v-model='api_key' type="password" required></v-text-field>
                </v-flex>
                <v-flex xs10 v-if="selectedExchange.name !== 'Kraken'">
                  <v-text-field :label="selectedExchange.name  + ' API Secret*'" v-model='api_secret_key'  type="password" required></v-text-field>
                </v-flex>
                <v-flex xs10 v-else>
                  <v-text-field :label="selectedExchange.name + ' API Private Key*'" v-model='api_private_key'  type="password" required></v-text-field>
                </v-flex>
                <v-flex xs10 v-if="selectedExchange.name === 'Huobipro'">
                  <v-text-field label="Huobi UID" v-model='huobi_uid' ></v-text-field>
                </v-flex>
              </v-layout>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="clearFields">Close</v-btn>
            <v-btn class="white--text" color="success" @click="submitAPIKey()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  props: ['selectedExchange'],
  data() {
    return {
      dialog: false,
      api_key: '',
      api_private_key: '',
      api_secret_key: '',
      huobi_uid: '',
      gdax_passphrase: '',
      idToExchange: {
        "1": "binance",
        "2": "bitfinex",
        "3": "bittrex",
        "4": "poloniex",
        "5": "bitmex",
        "6": "odax",
        "7": "huobipro",
        "8": "okex",
        "9": "hitbtc",
        "10": "kucoin"
      },
    };
  },
  methods: {
    clearFields () {
      this.api_key = '';
      this.api_private_key = '';
      this.api_secret_key = '';
      this.huobi_uid = '';
      this.gdax_passphrase = '';
      this.$emit('clearExchange');
    },
    submitAPIKey () {
      // verify api key is valid before updating for user
      console.log(        {
          exchange_id: this.idToExchange[this.selectedExchange.id],
          api_key: this.api_key,
          secret: this.api_secret_key
        })
      axios.post(process.env.VUE_APP_API_SERVER + 'verify_apikey', 
        {
          exchange_id: this.idToExchange[this.selectedExchange.id],
          api_key: this.api_key,
          secret: this.api_secret_key
        }
      ).then((res) => {
        let payload = { 
          uid: this.getUID,
          eid: this.selectedExchange.id,
          api_key: this.api_key,
          api_secret: this.api_secret_key
        }
        console.log(payload, '-------')
        if (res.data.status !== 'Error') {
          this.$store.dispatch("updateExchangeForUser", payload);
        }
        this.$emit('clearExchange');
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo"])
  },
  watch: {
    selectedExchange: function (value) {
      if (Object.keys(value).length) this.dialog = true;
      else this.dialog = false;
    }
  }
}
</script>