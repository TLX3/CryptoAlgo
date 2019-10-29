<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="50vw"
      max-height="50vh"
      dark
    >
      <v-card>
        <v-card-title v-if='isBacktesting' class="headline">Live/Backtesting {{algorithmIdToDetails[selectedItem.aid].name}} <v-spacer />  <v-icon @click='$emit("closeDialog")'>close</v-icon></v-card-title>
        <v-card-title v-else class="headline">Runtime settings for {{algorithmIdToDetails[selectedItem.aid].name.split('_').join(' ')}} <v-spacer />  <v-icon @click='$emit("closeDialog")'>close</v-icon></v-card-title>
        <v-divider color='#fff'/>
        <v-card-text>
          <StreamChart v-if='isBacktesting' @stopBacktesting='isBacktesting = false'/>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Common Parameters</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Specific Parameters</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <div v-for='(param, i) in commonParameters' :key='param.parameter_name'>
                  <v-radio-group v-if='param.parameter_name === "execution_mode"'  :label="param.parameter_name.split('_').join(' ').toUpperCase()" row @change='updateFormValue($event, param.parameter_name)' color='blue-grey'>
                    <v-radio v-for='(choice, j) in param.choices' :key='choice' :label="choice" :value='choice' color='blue-grey'></v-radio>
                  </v-radio-group>
                  <v-select
                    v-else-if='param.parameter_name === "exchange_name"'
                    :items="getUserExchanges.map(ex => idToExchange[ex.eid])"
                    label="Exchange"
                    @change='updateFormValue($event, param.parameter_name)'
                    item-text='eid'
                  ></v-select>
                  <v-select
                    v-else-if='param.parameter_name === "quote_currency"'
                    :items="currencies"
                    label="Currency"
                    @change='updateFormValue($event, param.parameter_name)'
                  ></v-select>

                  <v-radio-group v-else-if='param.choices'  :label="param.parameter_name.split('_').join(' ').toUpperCase()" row @change='updateFormValue($event, param.parameter_name)' color='blue-grey'>
                    <v-radio v-for='(choice, j) in param.choices' :key='choice' :label="choice" :value='choice' color='blue-grey'></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-else-if='param.type === "string"'
                    @input='updateFormValue($event, param.parameter_name)'
                    :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                    :required="param.required"
                  ></v-text-field>
                  <v-checkbox
                    v-else-if='param.type === "boolean"'
                    color='blue-grey'
                    @change='updateFormValue($event, param.parameter_name)'
                    :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                    :required="param.required"
                  ></v-checkbox>
                  <v-text-field
                    v-else-if='param.type === "float"'
                    @input='updateFormValue($event, param.parameter_name)'
                    :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                    :required="param.required"
                    single-line
                    type="number"
                  ></v-text-field>
                  <v-menu
                    v-else-if='formValues["execution_mode"] === "Backtest"'
                    lazy
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                      :value='formValues[param.parameter_name]'
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker @input='updateFormValue($event, param.parameter_name)' no-title scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </div>

                <v-btn
                  color="primary"
                  @click="e1 = 2"
                >
                  Continue
                </v-btn>
                
              </v-stepper-content>

              <v-stepper-content step="2">
                <div v-for='(param, i) in algorithmIdToDetails[selectedItem.aid].parameters' :key='param.parameter_name'>
                  <v-radio-group v-if='param.choices'  :label="param.parameter_name.split('_').join(' ')" row @input='updateFormValue($event, param.parameter_name)' color='blue-grey'>
                    <v-radio v-for='(choice, j) in param.choices' :key='choice' :label="choice" :value='choice' color='blue-grey'></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-else-if='param.type === "string"'
                    @input='updateFormValue($event, param.parameter_name)'
                    :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                    :required="param.required"
                  ></v-text-field>
                  <v-checkbox
                    v-else-if='param.type === "boolean"'
                    color='blue-grey'
                    @change='updateFormValue($event, param.parameter_name)'
                    :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                    :required="param.required"
                  ></v-checkbox>
                  <v-menu
                    v-else-if='param.type === "date"'
                    lazy
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                      :value='formValues[param.parameter_name]'
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker @input='updateFormValue($event, param.parameter_name)' no-title scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-else
                    @input='updateFormValue($event, param.parameter_name)'
                    :label="param.parameter_name.split('_').join(' ').toUpperCase()"
                    :required="param.required"
                    single-line
                    type="number"
                  ></v-text-field>
                </div>

                <v-btn
                  color="success"
                  class="mr-4"
                  @click="startAlgo()"
                >
                  Start Algorithm
                </v-btn>
                <v-btn text @click="e1 = 1">Back</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import axios from 'axios'
import StreamChart from './StreamChart'
import io from 'socket.io-client'

export default {
  components: {
    StreamChart
  },
  props: ['dialog', 'selectedItem', 'algorithmIdToDetails', 'commonParameters'],
  data () {
    return {
      e1: 0,
      currencies: [],
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
      isBacktesting: false,
      simulateOrders: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      menu: false,
      formValues: {},
      startDate: null,
      endDate: null
    }
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo", "getUserExchanges", "getUserAlgorithms", "getSelectedAlgorithms"])
  },
  methods: {
      updateFormValue (val, paramName) {
        if (paramName === "exchange_name") {
          val = val.toLowerCase()
          this.getCurrenciesByExchange(val)
        }
        if (paramName === "simulate_orders") {
          this.simulateOrders = val
        }
        if (paramName === "start_date") {
          this.startDate = val
        }
        if (paramName === "end_date") {
          this.endDate = val
        }
        this.formValues[paramName] = val
        this.$forceUpdate()
        console.log(paramName, this.formValues[paramName])
      },
      getCurrenciesByExchange (val) {
        axios.get(process.env.VUE_APP_API_SERVER + 'symbols_by_exchange',
        { params: {
          exchange_id: val,
        } })
        .then((res) => {
          this.currencies = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      startAlgo () {
        let formFields = Object.keys(this.formValues)
        // check that each of the common parameters has been provided
        let filledAllCommonParameters = this.commonParameters.every((param) => {
          return formFields.includes(param.parameter_name)
        })
        // check that each specific parameter has been provided
        let filledAllSpecificParamters = this.algorithmIdToDetails[this.selectedItem.aid].parameters.every((param) => {
          return formFields.includes(param.parameter_name)
        })
        if (!filledAllSpecificParamters && !filledAllCommonParameters) {
          this.$notify({
            group: 'loggedIn',
            type: 'error',
            text: 'All parameters for algorithm must be provided'
          })
        } else {
          // format specific parameters and set values for json
          let specificParameters = this.algorithmIdToDetails[this.selectedItem.aid].parameters
          let args = {}
          specificParameters.forEach((param) => {
            if (['float', 'integer', 'number'].includes(param.type)) args[param.parameter_name] = Number(this.formValues[param.parameter_name])
            else args[param.parameter_name] = this.formValues[param.parameter_name]
          })
          axios.get(process.env.VUE_APP_API_SERVER + 'exchange_key?uid=' + this.getUID)
          .then((res) => {
            // set relevant exchange information needed to execute algorithm
            let usersExchanges = res.data
            let exchangeKey = null
            let exchangeId = null
            usersExchanges.forEach((exchange) => {
              if (this.formValues.exchange_name === this.idToExchange[exchange.eid].toLowerCase()) {
                exchangeKey = exchange.api_key
                exchangeId = exchange.eid
              }
            })
            // add unique identifier for algorithm and user
            let uniqueIdentifier = this.getUID + '_' + this.formValues.exchange_name + '_' + this.algorithmIdToDetails[this.selectedItem.aid].name + '_' + Math.round((new Date()).getTime() / 1000)
            let json = {
              'auth_aliases': {
                'user_id': Number(this.getUID),
                'exchange_id': Number(exchangeId),
                'exchange_key': exchangeKey
              },
              'alog_args': args
            }
            let url = process.env.VUE_APP_JOB_SERVER + 'api/v1/trading_tasks/?'
            url += `&task=${this.algorithmIdToDetails[this.selectedItem.aid].name}`
            url += `&mode=${this.isBacktesting ? 'backtest' : 'live'}`
            url += `&capital_base=${Number(this.formValues.capital_base)}`
            url += `&exchange_name=${this.formValues.exchange_name}`
            url += `&alog_namespace=${uniqueIdentifier}`
            url += `&quote_currency=${this.formValues.quote_currency}`
            url += `&simulate_orders=${this.simulateOrders}`
            url += `&start_date=${!this.isBacktesting ? '2016-07-12T23:13:3' : this.startDate}`
            url += `&end_date=${!this.isBacktesting ? '2016-07-12T23:13:3' : this.endDate}`
            console.log(url, json)
            let headers = {'Content-Type': 'application/json'}
              axios.post(url, json, { headers: headers })
              .then((res) => {
                console.log(res)
                var socket = io.connect("http://35.236.123.212:8080/test");
                socket.on('connect', function() {
                  console.log('I HAVE CONNECTED!!!!!!!!!!!');
                });
                socket.on('my_response', (data) => {
                  console.log('RESPONSE:', data);
                });
              })
              .catch((err) => {
                console.log(err)
              })
            })
            .catch((err) => {
              
            })
        }
      }
  }
}
</script>

<style lang="scss">
  .algo-btns {
    display: flex;

  }
</style>