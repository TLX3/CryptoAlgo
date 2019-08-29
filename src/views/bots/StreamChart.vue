<template>
    <div>
        <Highstock :options="chartConfig" />
        <v-btn
            color="warning"
            @click="$emit('stopBacktesting')"
        >
            Stop Backtesting
        </v-btn>
    </div>
</template>
<script>
export default {
    data () {
    return {
      chartConfig: {
        chart: {
            events: {
            load: function () {
                // set up the updating of the chart each second
                let series1 = this.series[0];
                let series2 = this.series[1];
                let series3 = this.series[2];
                let socket = io.connect('http://localhost:4001');
                socket.on('sample1', (sample) => {
                    // when a sample arrives we plot it
                    series1.addPoint([sample.x, sample.y], true, true);
                });
                socket.on('sample2', (sample) => {
                    series2.addPoint([sample.x, sample.y], true, true);
                });
                socket.on('sample3', (sample) => {
                    series3.addPoint([sample.x, sample.y], true, true);
                });
                socket.on('finishedBacktest', (sample) => {
                    socket.emit('forceDisconnect');
                });
              }
            }
        },
        time: {
            useUTC: false
        },
        rangeSelector: {
            buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
            }, {
            count: 5,
            type: 'minute',
            text: '5M'
            }, {
            type: 'all',
            text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        title: {
            text: 'Data Feed'
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data1',
            data: (function () {
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                time + i * 1000,
                Math.round(Math.random() * 100)
                ]);
            }
            return data;
            }())
        },
        {
            name: 'Random data2',
            data: (function () {
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                time + i * 1000,
                Math.round(Math.random() * 100)
                ]);
            }
            return data;
            }())
        },
        {
            name: 'Random data3',
            data: (function () {
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                time + i * 1000,
                Math.round(Math.random() * 100)
                ]);
            }
            return data;
            }())
        }
        ]
      }
      }
    }
}
</script>