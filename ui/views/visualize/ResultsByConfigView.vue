<template>
<div class="container">
  <h1 class="title is-4">Visualize results by config</h1>
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
    result <input type="text" placeholder=".score.rms">
    <i>runs with given results present and numeric will be used</i>
    <div class="card">
      <b>Examples of result</b>
      <pre>
        {}
      </pre>
      <pre>
        {}
      </pre>
    </div>
  </div>
</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import RunFilters from 'components/RunFilters/index'

export default {
  data () {
    return {
      filters: this.$store.state.filters,
    }
  },
  watch: {
  },
  methods: {
    applyFilters () {
      this.$store.commit('setFilters', this.filters)
    },
  },
  components: { Datepicker, RunFilters }
}
</script>
