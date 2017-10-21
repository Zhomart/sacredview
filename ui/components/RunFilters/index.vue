<template>
<div>
  <div class="card filters">
    <run-filter :value="newFilter":isNewFilter="true"  @add="addNewFilter(newFilter)" />
    <run-filter :value="f" @change="e => { $emit('change', filters.slice(0)) }" :isNewFilter="false" @delete="removeFilter(f)" v-for="f in filters" />
  </div>
</div>
</template>

<script>
import RunFilter from './RunFilter'

export default {
  name: 'run-filters',
  model: {
    prop: 'filters',
    event: 'change'
  },
  props: {
    filters: Array,
  },
  data () {
    return {
      newFilter: {}
    }
  },
  methods: {
    addNewFilter (f) {
      const filters = this.filters.concat([f])
      this.$emit('change', filters)
      this.newFilter = {}
    },
    removeFilter (f) {
      const filters = this.filters.filter(e => e != f)
      this.$emit('change', filters)
    },
  },
  components: { RunFilter }
}
</script>

<style>
.filters {
  box-shadow: none;
}
</style>
