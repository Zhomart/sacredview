<template>
  <div class="container">
    <table class="table is-stripped runs">
      <thead>
        <tr>
          <td>ID</td>
          <td>Experiment</td>
          <td>Start time</td>
          <td>Last activity</td>
          <td width="15%">Result</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in runs" :key="r._id">
          <td>{{ r._id }}</td>
          <td>{{ r.experiment.name }}</td>
          <td>{{ formatDateTime(r.start_time) }}</td>
          <td>{{ formatTime(r.heartbeat) }}</td>
          <td>{{ r.result ? 'YES' : '' }}</td>
        </tr>
      </tbody>
    </table>
    <pagination :urlPrefix="'/runs'" :currentPage="page" :lastPage="this.totalPages" />
  </div>
</template>

<script>
import * as RunsService from 'services/runs'
import moment from 'moment'
import Pagination from 'components/Pagination.vue'

export default {
  data () {
    return {
      perPage: 20,
      page: parseInt(this.$route.query.page) || 1,
      totalPages: 1,
      runs: [],
    }
  },
  created () {
    this.$store.commit('setTitle', "Runs")
    this.getRuns()
  },
  watch: {
    page () {
      this.getRuns()
    },
    '$route' (to, from) {
      this.page = parseInt(this.$route.query.page) || 1
    }
  },
  methods: {
    getRuns () {
      let offset = this.perPage * (this.page - 1)
      RunsService.getRuns({limit: this.perPage, offset}).then(res => {
        this.runs = res.data.runs
        this.totalPages = Math.floor((res.data.meta.total + this.perPage - 1) / this.perPage)
      }).catch(err => {
        console.log('error')
        console.log(err)
      })
    },
    formatDateTime (time) {
      return moment(time).format('YYYY-MM-DD h:mm:ss')
    },
    formatTime (time) {
      return moment(time).format('h:mm:ss')
    },
  },
  components: { Pagination }
}
</script>

<style lang="scss">
.runs {
  width: 100%;
}
</style>
