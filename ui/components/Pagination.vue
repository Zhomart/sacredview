<template>
    <nav :class="getNavClassName()">
        <ul class="pagination-list" >
            <li v-for="item in pagingList" >
            <router-link v-if="item !== '...'" :class="getPagingClassName(item)" :to="urlBuilder(item)">{{ item }}</router-link>
            <span v-else class="pagination-ellipsis">...</span>
            </li>
        </ul>
    </nav>
</template>
<script>

function paging(current, length, displayLength) {
  if (length <= 1) return []
  displayLength = displayLength - 2
  var indexes = [1]
  var start = Math.round(current - displayLength / 2)
  var end = Math.round(current + displayLength / 2)
  if (start <= 1) {
    start = 2
    end = start + displayLength - 1
    if (end >= length - 1) end = length - 1
  }
  if (end >= length - 1) {
    end = length - 1
    start = end - displayLength + 1
    if (start <= 1) start = 2
  }
  if (start !== 2) indexes.push('...')
  for (var i = start; i <= end; i++) {
    indexes.push(i)
  }
  if (end !== length - 1) indexes.push('...')
  indexes.push(length)
  return indexes
}

export default {
  name: 'Pagination',
  props: {
    urlPrefix: {
      type:String,
      default:'/'
    },
    urlBuilder: {
      type: Function,
      default (page) {
        return this.normalize(`${this.urlPrefix}?page=${page}`)
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    lastPage: Number,
    displayPage: {
      type: Number,
      default: 4
    },
    modifiers: {
      type: String,
      default: ''
    },
    prev: {
      type: String,
      default: 'Prev'
    },
    next: {
      type: String,
      default: 'Next'
    },
  },
  methods: {
    getNavClassName () {
      var optional = ['','is-centered','is-right']
      if(['','is-centered','is-right'].indexOf(this.modifiers.trim()) >= 0){
        return 'pagination ' + this.modifiers
      } else {
        console.warn(" modifiers %s is not within the options ", this.modifiers, optional,
        '\n see more detail https://github.com/vue-bulma/vue-bulma-pagination#doc')
        return 'pagination'
      }
    },
    getPagingClassName (item) {
      return this.currentPage !== item ? 'pagination-link' : 'pagination-link is-current'
    },
    outOfRegion (page) {
      return page < 1 || page > this.lastPage
    },
    normalize (path) {
      return path.replace(/\/+/g,'/')
    }
  },
  computed: {
    pagingList () {
      return paging(this.currentPage, this.lastPage, this.displayPage)
    },
    formatCurrentPage () {
      const currentPage = Number(this.currentPage)
      return currentPage > 0 ? currentPage : 1
    },
    prevPage () {
      return Math.max(this.formatCurrentPage - 1, 1)
    },
    nextPage () {
      return Math.min(this.formatCurrentPage + 1, this.lastPage)
    }
  }
}
</script>

<style >
.pagination-list {
    list-style : none ;
}
.pagination-list li {
    list-style : none ;
}
</style>
