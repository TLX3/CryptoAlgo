<template>
  <v-card>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getSelectedAlgorithms"
      class="elevation-1"
      select-all
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data () {
      return {
        selected: [],
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          { text: 'Description', value: 'description' },
        ],
      }
  },
  computed: {
    ...mapGetters(["getSelectedAlgorithms"])
  },
}
</script>