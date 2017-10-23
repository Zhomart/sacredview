<template>
<div class="container">
  <div class="loading"></div>
  <div class="run" v-if="run">
    <router-link to="/runs">Back to list of runs</router-link>
    <h1 class="title">[{{ run._id }}] {{ run.experiment.name }}</h1>
    <div>Started at {{ formatDateTime(run.start_time) }}</div>
    <div>Last update {{ formatDateTime(run.heartbeat) }} ({{ timeDist(run.heartbeat, run.start_time) }}s)</div>
    <div>Finished at {{ formatDateTime(run.stop_time) }} ({{ timeDist(run.stop_time, run.start_time) }}s)</div>
    <div>Status {{ run.status }}</div>

    <div class="tabs">
      <ul>
        <li
          v-for="item in tabItems"
          @click="selectedTabItem = item"
          :class="{ 'is-active': item == selectedTabItem }">
          <a>{{ item }}</a>
        </li>
      </ul>
    </div>
    <div v-if="selectedTabItem == 'Experiment'">
      <tree-view :data="run.experiment" :options="{ maxDepth: 1}" />
    </div>
    <div v-if="selectedTabItem == 'Host'">
      <tree-view :data="run.host" :options="{ maxDepth: 1}" />
    </div>
    <div v-if="selectedTabItem == 'Config'">
      <tree-view :data="run.config" :options="{ maxDepth: 2}" />
    </div>
    <div v-if="selectedTabItem == 'Result'">
      <tree-view :data="run.result" :options="{ maxDepth: 1}" />
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
      tabItems: ['Experiment', 'Host', 'Config', 'Result'],
      selectedTabItem: 'Experiment',
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
    },
  },
  components: { }
}
</script>

<style lang="scss">
</style>
