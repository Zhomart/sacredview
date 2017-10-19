<template>
<div class="container">
  <div class="loading"></div>
  <div class="run" v-if="run">
    <router-link to="/runs">Back</router-link>
    <h1 class="title">[{{ run._id }}] {{ run.experiment.name }}</h1>
    <div>Started at {{ formatDateTime(run.start_time) }}</div>
    <div>Last update {{ formatDateTime(run.heartbeat) }} ({{ timeDist(run.heartbeat, run.start_time) }}s)</div>
    <div>Finished at {{ formatDateTime(run.stop_time) }} ({{ timeDist(run.stop_time, run.start_time) }}s)</div>
    <div>Status {{ run.status }}</div>

    <div class="tabs">
      <ul>
        <li class="is-active"><a>Experiment</a></li>
        <li><a>Host</a></li>
        <li><a>Config</a></li>
        <li><a>Result</a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import * as RunsService from 'services/runs'
import moment from 'moment'

export default {
  data () {
    return {
      run: null,
    }
  },
  created () {
    this.$store.commit('setTitle', "Runs")
    this.loadRun()
  },
  methods: {
    loadRun () {
      RunsService.getRun(this.$route.params.id).then(res => {
        this.run = res.data.run
      }).catch(error => {
        console.log(error)
      })
    },
    formatDateTime (time) {
      return moment(time).format('YYYY-MM-DD h:mm:ss')
    },
    timeDist(a, b) {
      return (moment(a) - moment(b)) / 1000
    }
  }
}
</script>

<style lang="scss">
</style>
