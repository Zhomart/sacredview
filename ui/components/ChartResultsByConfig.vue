<template>
<div style="width: 60%; margin: 0 auto;">
  <chart :type="chartType" :data="chartData" :options="chartOptions"></chart>
</div>
</template>

<script>
import Chart from 'components/Chartjs'

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

export default {
  name: 'chart-results-by-config',
  props: {
    runs: Array, // [ { _id: 1, result: null, experiment: {} }, .. ]
    data: Array,
    labels: Array,
  },
  data () {
    return {
      chartType: 'line',
      chartOptions: {
        // segmentShowStroke: false,
        responsive: true,
        tooltips: {
          callbacks: {
            title: (items, data) => {
              const runID = parseInt(items[0].xLabel)
              const run = this.runs.find(r => r._id === runID)
              return `${run.experiment.name} [${run._id}]`
            },
          },
        }, // tooltips
        onClick: (ev, items) => {
          const q = this.runs[items[0]._index]
          this.$router.push(`/runs/${q._id}`)
        },
      },
    }
  },
  computed: {
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Runs",
            data: this.data,
            fill: false,
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
          }
        ]
      }
    }
  },
  watch: {
  },
  components: { Chart }
}
</script>
