<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="strategies"
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
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data () {
      return {
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          { text: 'Description', value: 'description' },
        ],
        strategies: []
      }
  }
}
</script>