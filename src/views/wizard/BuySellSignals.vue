<template>
  <v-layout align-content-center justify-center align-center wrap>
    <v-flex xs5>
      <v-card color="green" dark>
        <v-layout align-content-center justify-center align-center wrap>
          <v-flex xs6>
            <span>Minimum Buy Signals:</span>
          </v-flex>
          <v-flex xs5>
              <input type="number" />
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card color="red" dark>
        <v-layout align-content-center justify-center align-center wrap>
          <v-flex xs6>
            <span>Minimum Sell Signals:</span>
          </v-flex>
          <v-flex xs6>
              <input type="number" />
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  
}
</script>