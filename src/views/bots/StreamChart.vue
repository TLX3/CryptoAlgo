<template>
    <div>
        <Highstock :options="getChartConfig" />
        <v-btn
            color="warning"
            @click="$emit('stopBacktesting')"
        >
            Stop Backtesting
        </v-btn>
    </div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapGetters(["getChartConfig"])
    }
}
</script>