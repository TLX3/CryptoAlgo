<template>
  <v-layout row justify-center>
    <v-dialog v-model='showDialog' scrollable max-width="600px">
      <v-card>
        <v-card-title>Select {{ dialogType.slice(-1)[0] }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
        <v-data-table
          :headers="headers"
          :items="desserts"
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
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.calories }}</td>
          </template>
        </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="$emit('closeDialog')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="$emit('closeDialog')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: ['dialogType', 'showDialog'],
data () {
      return {
        headers: [
          {
            text: 'Name',
            sortable: false,
            value: 'name'
          },
          { text: '', sortable: false, value: 'calories' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408
          },
          {
            value: false,
            name: 'Donut',
            calories: 452
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518
          }
        ]
      }
  }
}
</script>