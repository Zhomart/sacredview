<template>
<div class="select-buttons is-grouped">
  <a :class="{ button: true, 'is-primary': item[1] == selected, 'is-small': true }"
    v-for="item in items"
    @click="selectItem(item[1])">
    {{ item[0] }}
  </a>
</div>
</template>

<script>
export default {
  name: 'select-buttons',
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    items: Array,
    selected: String,
  },
  data () {
    return {
    }
  },
  methods: {
    selectItem (v) {
      this.$emit('change', v)
    }
  }
}
</script>

<style>
.select-buttons .button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
.select-buttons .button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
</style>
