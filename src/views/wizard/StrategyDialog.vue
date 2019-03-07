<template>
  <v-layout row justify-center>
    <v-dialog v-model='showDialog' scrollable max-width="600px">
      <v-card>
        <v-card-title>Select {{ dialogType.slice(-1)[0] }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          select-all
          :expand="expand"
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
            </tr>
          </template>
          <template v-slot:expand="props">
            <v-card flat>
              <v-card-text>Additional Fields</v-card-text>
            </v-card>
          </template>
        </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="$emit('closeDialog')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="selectAlgorithms(); $emit('closeDialog')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import axios from 'axios'

export default {
  props: ['dialogType', 'showDialog'],
  data () {
      return {
        selected: [],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'description' }
        ],
        items: [],
        expand: false
      }
  },
  methods: {
    selectAlgorithms () {
      this.$store.dispatch("setSelectedAlgorithms", this.selected);
    }
  },
  watch: {
    dialogType: function (val) {
      if (val && val.slice(-1)[0] === "Algorithms") {
        axios.get('http://35.235.83.44:5000/algorithms')
          .then((res) => {
            this.items = res.data
          })
          .catch((err) => {

          })
      }
    }
  }
}
</script>