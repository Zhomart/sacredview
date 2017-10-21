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
      </div>
    </div> <!-- .column -->
    <div class="column">
      <b>Example run (total {{ totalRuns }})</b>
      <tree-view :data="exampleRun" :options="{ maxDepth: 1}" />
    </div>
  </div> <!-- .columns -->
  <div>
    <chart :type="'pie'" :data="chartData" :options="chartOptions"></chart>
  </div>
</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import Chart from 'vue-bulma-chartjs'
import RunFilters from 'components/RunFilters/index'
import * as RunsService from 'services/runs'

export default {
  data () {
    console.log(this.$store.state.yAxis)
    return {
      filters: this.$store.state.resultsByConfig.filters || [],
      yAxis: this.$store.state.resultsByConfig.yAxis,
      exampleRun: {},
      totalRuns: 0,
      chartData: {
        labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
          datasets: [{
          data: [20, 40, 5, 35],
          backgroundColor: [
            '#1fc8db',
            '#fce473',
            '#42afe3',
            '#ed6c63',
            '#97cd76'
          ]
        }]
      },
      chartOptions: {
        segmentShowStroke: false
      },
    }
  },
  watch: {
  },
  created () {
    this.fetchExampleRun()
  },
  methods: {
    applyFilters () {
      this.$store.commit('setFilters', this.filters)
      this.fetchExampleRun()
    },
    fetchExampleRun () {
      let filter = {}
      this.filters.forEach(f => {
        let lefthand = f.lefthand[0] == '.' ? f.lefthand.substr(1, f.lefthand.length) : f.lefthand
        if (f.op === '==') {
          filter[lefthand] = f.righthand
        } else if (f.op === '>') {
          filter[lefthand] = { '$gt': f.righthand }
        } else if (f.op === '<') {
          filter[lefthand] = { '$lt': f.righthand }
        } else if (f.op === '!=') {
          filter[lefthand] = { '$ne': f.righthand }
        } else if (f.op === 'regex') {
          filter[lefthand] = { '$regex': f.righthand }
        }
      })
      let params = { filter: JSON.stringify(filter), limit: 1 }
      RunsService.getRuns(params).then(res => {
        console.log(res)
        this.exampleRun = res.data.runs[0]
        this.totalRuns = res.data.meta.total
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: { Datepicker, RunFilters, Chart }
}
</script>
