<template>
<div class="container">
  <h1 class="title is-4">Visualize results by config</h1>
  <div class="columns">
    <div class="column is-half">
      <div class="box">
        <b>Filters</b>
        <run-filters v-model="filters" />
        <a class="button" style="margin-top: 8px;" @click="applyFilters">Apply filters</a>
      </div>
      <div class="box">
        <b>Since</b>
          <datepicker placeholder="European Format ('d-m-Y')" :config="{ dateFormat: 'm/d/Y H:i', static: true, enableTime: true }" />
      </div>
      <div class="box">
        <b>Select Y axis:</b>
        <div class="field has-addons">
          <div class="control">
            <div class="button">root.result</div>
          </div>
          <div class="control is-expanded">
            <input type="text" placeholder=".score.rms" class="input" @change="e => { $store.commit('setYAxis', e.target.value) }" v-model="yAxis">
          </div>
        </div>
        <i>runs with given results present and numeric will be used</i>
        <button class="button" @click="updateChart">Update</button>
      </div>
    </div> <!-- .column -->
    <div class="column">
      <b>Example run (total {{ totalRuns }})</b>
      <tree-view :data="exampleRun" :options="{ maxDepth: 1}" />
    </div>
  </div> <!-- .columns -->
  <div>
    <chart-results-by-config :runs="filteredRuns" :data="chartData" :labels="chartLabels" />
  </div>
</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import RunFilters from 'components/RunFilters/index'
import ChartResultsByConfig from 'components/ChartResultsByConfig'
import moment from 'moment'
import * as RunsService from 'services/runs'
import { safeDotGet } from 'utils'

const filtersToMongo = filters => {
  let mongoQuery = {}
  filters.forEach(f => {
    if (f.lefthand) {
      let lefthand = f.lefthand[0] == '.' ? f.lefthand.substr(1, f.lefthand.length) : f.lefthand
      if (f.op === '==') {
        mongoQuery[lefthand] = f.righthand
      } else if (f.op === '>') {
        mongoQuery[lefthand] = { '$gt': f.righthand }
      } else if (f.op === '<') {
        mongoQuery[lefthand] = { '$lt': f.righthand }
      } else if (f.op === '!=') {
        mongoQuery[lefthand] = { '$ne': f.righthand }
      } else if (f.op === 'regex') {
        mongoQuery[lefthand] = { '$regex': f.righthand }
      }
    }
  })
  return mongoQuery
}

export default {
  data () {
    console.log(this.$store.state.yAxis)
    return {
      filters: this.$store.state.resultsByConfig.filters || [],
      yAxis: this.$store.state.resultsByConfig.yAxis,
      exampleRun: {},
      totalRuns: 0,
      runs: [],
      filteredRuns: [],
      chartData: [],
      chartLabels: [],
    }
  },
  watch: {
  },
  created () {
    this.fetchExampleRun()
  },
  computed: {
    parsedYAxis () {
      if (!this.yAxis) {
        return 'result'
      } else if (this.yAxis[0] === '.') {
        return `result${this.yAxis}`
      } else {
        return `result.${this.yAxis}`
      }
    }
  },
  watch: {
    runs () {
      let chartLabels = []
      let chartData = []
      let filteredRuns = []
      const sortedRuns = this.runs.slice(0).sort((a, b) => moment(a.start_time) - moment(b.start_time))
      sortedRuns.forEach(r => {
        const y = safeDotGet(r, this.parsedYAxis)
        if (typeof y === 'number'){
          chartData.push(y)
          chartLabels.push(r._id)
          filteredRuns.push(r)
        }
      })
      this.filteredRuns = filteredRuns
      this.chartData = chartData
      this.chartLabels = chartLabels
    }
  },
  methods: {
    applyFilters () {
      this.$store.commit('setFilters', this.filters)
      this.fetchExampleRun()
    },
    fetchExampleRun () {
      const filter = filtersToMongo(this.filters)
      let params = { filter: JSON.stringify(filter), limit: 1 }
      RunsService.getRuns(params).then(res => {
        this.exampleRun = res.data.runs[0]
        this.totalRuns = res.data.meta.total
      }).catch(err => {
        console.log(err)
      })
    },
    updateChart () {
      const filter = filtersToMongo(this.filters)
      let params = { filter: JSON.stringify(filter), limit: 100 }
      RunsService.getRuns(params).then(res => {
        console.log('asd1qwe')
        this.runs = res.data.runs
      }).catch(err => {
        console.log(err)
      })
    },
  },
  components: { Datepicker, RunFilters, ChartResultsByConfig }
}
</script>
