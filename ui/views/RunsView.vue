<template>
  <div class="container">
    <div class="select-status">
      <select-buttons :items="[['Completed', 'COMPLETED'], ['All', null]]" v-model="selectedStatus"/>
    </div>

    <table class="table is-stripped runs">
      <thead>
        <tr>
          <th>ID</th>
          <th>Experiment</th>
          <th>Start time</th>
          <th>Last activity</th>
          <th>Status</th>
          <th width="20%">Result</th>
          <th width="40px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in runs" :key="r._id">
          <td>{{ r._id }}</td>
          <td>{{ r.experiment.name }}</td>
          <td>{{ formatDateTime(r.start_time) }}</td>
          <td>{{ formatTime(r.heartbeat) }}</td>
          <td>{{ r.status }}</td>
          <td>{{ r.result ? 'YES' : '' }}</td>
          <td><router-link :to="`/runs/${r._id}`">Details</router-link></td>
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
import SelectButtons from 'components/SelectButtons.vue'

export default {
  data () {
    return {
      perPage: 20,
      page: parseInt(this.$route.query.page) || 1,
      totalPages: 1,
      runs: [],
      selectedStatus: 'COMPLETED',
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
    },
    selectedStatus () {
      this.getRuns()
    },
  },
  methods: {
    getRuns () {
      let offset = this.perPage * (this.page - 1)
      let f = {}
      if (this.selectedStatus) {
        f.status = this.selectedStatus
      }
      const filter = JSON.stringify(f)
      RunsService.getRuns({limit: this.perPage, offset, filter}).then(res => {
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
  components: { Pagination, SelectButtons }
}
</script>

<style lang="scss">
.select-status {
  margin-bottom: 12px;
}
.runs {
  width: 100%;
}
</style>
