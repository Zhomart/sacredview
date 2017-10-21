export default {
  state: {
    yAxis: null,
    filters: [],
  },
  mutations: {
    setFilters (state, filters) {
      state.filters = filters
    },
    setYAxis (state, v) {
      state.yAxis = v
    }
  },
}
