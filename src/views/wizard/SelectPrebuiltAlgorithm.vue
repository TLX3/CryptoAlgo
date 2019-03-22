<template>
  <v-layout justify-center>
    <v-flex md12>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="(algo, i) in algorithms"
              :key="algo.id"
              v-bind="{ [`xs${4}`]: true }"
            >
              <v-card style='cursor: pointer;' @click='addAlgoToSelected(algo)'>
                <v-img :src='images[i % 3]' height="250px" :class="selected.map(s => s.name).includes(algo.name) ? 'activated' : ''" >
                  <v-container
                    fill-height
                    fluid
                    pa-3
                  >
                    <v-layout>
                      <v-flex xs6 >
                        <span class="headline white--text">{{ algo.name }}</span>
                      </v-flex>
                      <v-flex xs12 align-end >
                        <span class='headline white--text'>+{{(Math.random() * 100).toFixed(2)}}%</span>
                      </v-flex>
                      <v-flex xs12 align-end>
                        <span class='headline white--text'>{{(Math.random() * 100).toFixed(2)}} $m</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'

  export default {
    data: () => ({
      algorithms: [],
      selected: [],
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
    methods: {
      addAlgoToSelected (algo) {
        let mapped = this.selected.map(a => a.name)
        let idx = mapped.indexOf(algo.name)
        !mapped.includes(algo.name) ? this.selected.push(algo) : this.selected.splice(idx, 1)
        this.$store.dispatch("setSelectedAlgorithms", this.selected);
      }
    }
  }
</script>

<style>
  body {
    font-family: 'HelveticaNeueforIBW01-Bold', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  }
  .activated {
    opacity: 0.5;
  }
</style>