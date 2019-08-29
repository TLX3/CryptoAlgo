<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="70vw"
      max-height="50vh"
      dark
    >
      <v-card>
        <v-card-title v-if='isBacktesting' class="headline">Live/Backtesting {{algorithmIdToDetails[selectedItem.aid].name}}</v-card-title>
        <v-card-title v-else class="headline">Runtime settings for {{algorithmIdToDetails[selectedItem.aid].name.split('_').join(' ')}}</v-card-title>
        <v-divider color='#fff'/>
        <v-card-text>
          <StreamChart v-if='isBacktesting' @stopBacktesting='isBacktesting = false'/>
          <v-form
            v-else
            ref="form"
            class='form-fields' 
          >
            <div class='row'>
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
            </div>

        <v-divider color='grey'/>

            <div class='row'>
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
            </div>

            <div class='algo-btns'>
              <v-btn
                color="success"
                class="mr-4"
                @click="startAlgo()"
              >
                Start Algorithm
              </v-btn>
              <v-btn
              color="grey"
              @click="$emit('closeDialog')"
              >
                Close
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import axios from 'axios'
import StreamChart from './StreamChart'

export default {
  components: {
    StreamChart
  },
  props: ['dialog', 'selectedItem', 'algorithmIdToDetails', 'commonParameters'],
  data () {
    return {
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
      formValues: {}
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
        this.formValues[paramName] = val
        this.$forceUpdate()
        console.log(paramName, this.formValues[paramName])
      },
      getCurrenciesByExchange (val) {
        console.log(val, '11111')
        axios.get(process.env.VUE_APP_API_SERVER + 'symbols_by_exchange',
        { params: {
          exchange_id: val,
        } })
        .then((res) => {
          console.log(res, '22222')
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

      }
  }
}
</script>

<style lang="scss">
  .form-fields {
    display: grid;
    grid-template-rows: 1fr 50px 1fr;
    grid-gap: 20px;
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
  }
  .algo-btns {
    display: flex;

  }
</style>