<template>
<div>
  <div class="card filters">
    <run-filter :value="f" @change="filterChanged" @delete="removeFilter(f)" v-for="f in filtersWithNew" />
  </div>
</div>
</template>

<script>
import RunFilter from './RunFilter'

const updateFilters = filters => {
  while (filters.length > 1) {
    const f = filters[filters.length-1]
    if (!f.righthand && !f.lefthand && !f.op) {
      filters = filters.slice(0, filters.length - 1)
    } else {
      break
    }
  }
  if (filters.length > 0) {
    const f = filters[filters.length-1]
    if (f.righthand || f.lefthand || f.op) {
      filters = filters.concat({})
    }
  }
  return filters
}

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
      filtersWithNew: updateFilters(this.filters),
    }
  },
  created () {
  },
  watch: {
    filters (f) {
      this.filtersWithNew = updateFilters(this.filters)
    }
  },
  methods: {
    removeFilter (f) {
      const filters = this.filters.filter(e => e != f)
      this.$emit('change', filters)
    },
    filterChanged (f) {
      this.$emit('change', updateFilters(this.filtersWithNew))
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
