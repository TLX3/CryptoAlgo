<template>
   <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Connect Exchange</div>
              <span class="grey--text">Enter your API Key details to add {{ capitalize(exchangeName) }} to your account</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
              <v-layout wrap>
                <v-flex xs10>
                  <v-text-field :label="capitalize(exchangeName) + ' API Key*'" v-model='api_key' type="password" required></v-text-field>
                </v-flex>
                <v-flex xs10 v-if="exchangeName !== 'kraken'">
                  <v-text-field :label="capitalize(exchangeName)  + ' API Secret*'" v-model='api_secret_key'  type="password" required></v-text-field>
                </v-flex>
                <v-flex xs10 v-else>
                  <v-text-field :label="capitalize(exchangeName) + ' API Private Key*'" v-model='api_private_key'  type="password" required></v-text-field>
                </v-flex>
                <v-flex xs10 v-if="exchangeName === 'huobi'">
                  <v-text-field label="Huobi UID" v-model='huobi_uid' ></v-text-field>
                </v-flex>
                <v-flex xs10 v-if="exchangeName === 'gdax'">
                  <v-text-field label="API Passphrase" type="password" v-model='gdax_passphrase' required></v-text-field>
                </v-flex>
              </v-layout>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="clearFields()">Close</v-btn>
            <v-btn class="white--text" color="success" @click="submitAPIKey()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ['exchangeName'],
  data() {
    return {
      dialog: false,
      api_key: '',
      api_private_key: '',
      api_secret_key: '',
      huobi_uid: '',
      gdax_passphrase: ''
    };
  },
  methods: {
    clearFields () {
      this.api_key = '';
      this.api_private_key = '';
      this.api_secret_key = '';
      this.huobi_uid = '';
      this.gdax_passphrase = '';
      this.$emit('submitAPIKey');
    },
    submitAPIKey () {
      let exchangeInfo = 
      { 
        exchangeName: this.exchangeName,
        api_key: this.api_key,
        api_private_key: this.api_private_key
      }
      this.$store.dispatch("updateExchangeForUser", {
        uid: this.getUID,
        exchanges: [exchangeInfo]
      });
      this.$emit('submitAPIKey');
    },
    capitalize (str) {
      if (str === 'gdax') return 'Coinbase'
      return str.slice(0,1).toUpperCase() + str.slice(1)  
    }
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo"])
  },
  watch: {
    exchangeName: function (value) {
      if (value !== '') this.dialog = true;
      else this.dialog = false;
    }
  }
}
</script>