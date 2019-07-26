<template>
  <div>
  <v-card dark class='ma-4' style='width: 50vw;'>
    <v-list dark two-line subheader>
      <v-subheader>
        <div>My configured Algorithms</div>
        <v-spacer />
        <v-btn color='blue-grey'>Add new algorithm</v-btn>
      </v-subheader>

      <v-list-tile
        v-for="(item, i) in usersAlgorithms"
        :key="item"
        avatar
        @click="configureAlgorithm(item)"
        class='my-2'
        dark
      >
        <v-list-tile-avatar>
          <v-icon class="amber white--text">assignment</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Algorithm: {{ item.aid }}</v-list-tile-title>
          <v-list-tile-sub-title>
            Currency: {{ item.currency }} -
            Amount: {{ item.amount }} -
            Exchange: {{ item.eid }} -
            Enabled: {{ item.enabled }}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="white">info</v-icon>
          </v-btn>
          <v-btn icon ripple>
            <v-icon color="white">restore_from_trash</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>

  <v-card dark class='ma-4' style='width: 50vw;'>
    <v-list dark two-line subheader>
      <v-subheader>
        <div>My configured Techincal Indicators</div>
        <v-spacer />
        <v-btn color='blue-grey'>Add new techincal indicator</v-btn>
      </v-subheader>

      <v-list-tile
        v-for="(item, i) in indicators"
        :key="item.title"
        avatar
        @click=""
        dark
      >
        <v-list-tile-avatar>
          <img :src='item.img' />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>
        
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="white">info</v-icon>
          </v-btn>
          <v-btn icon ripple>
            <v-icon color="white">restore_from_trash</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
  <RuntimeSettings :selectedItem='selectedItem' :dialog='dialog' @closeDialog='dialog = false'/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
import RuntimeSettings from './RuntimeSettings'

export default {
  data () {
    return {
      currentSettings: {},
      usersAlgorithms: [],
      dialog: false,
      indicators: [
        { icon: 'assignment', img: '/static/img/multi_level_rsi.svg', iconClass: 'blue white--text', title: 'Multi-Level RSI', subtitle: 'Jan 20, 2014' },
        { icon: 'call_to_action', img: '/static/img/mean_reversion.svg', iconClass: 'amber white--text', title: 'Mean Reversion', subtitle: 'Jan 10, 2014' },
        { icon: 'call_to_action', img: '/static/img/bollinger_bands.svg', iconClass: 'amber white--text', title: 'Bollinger Bands', subtitle: 'Jan 10, 2014' },
        { icon: 'call_to_action', img: '/static/img/macd.svg', iconClass: 'amber white--text', title: 'MACD', subtitle: 'Jan 10, 2014' }
      ]
    }
  },
  components: {
    RuntimeSettings
  },
  computed: {
    ...mapGetters(["getUID", "getUserInfo"])
  },
  mounted () {
    // GET algorithms assigned to user
    axios.get(process.env.VUE_APP_API_SERVER + 'assignment?uid=' + this.getUID)
      .then((res) => {
        console.log(res.data)
        this.usersAlgorithms = res.data
      })
      .catch((err) => {
        
      })
  },
  methods: {
    configureAlgorithm (algo) {
      this.dialog = true
      this.selectedItem = algo
    }
  }
}
</script>