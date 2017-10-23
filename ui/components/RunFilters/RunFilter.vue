<template>
<div class="field has-addons run-filter">
  <div class="control">
    <div class="button">root</div>
  </div>
  <div class="control is-expanded">
    <input type="text" placeholder=".experiment.name" class="input" v-model="value.lefthand" @input="ev => { $emit('change', this.value) }">
  </div>
  <div class="control">
    <span class="select">
    <select name="" id="" v-model="value.op" @change="ev => { $emit('change', this.value) }">
      <option :value="c" v-for="c in comparators">{{ c }}</option>
    </select>
    </span>
  </div>
  <div class="control">
    <input type="text" placeholder="value" class="input" v-model="value.righthand" @input="ev => { $emit('change', this.value) }" >
  </div>
  <div class="control">
    <a class="button is-danger" @click="clickDeleteFilter()">
      <span class="icon is-small">
        <i class="fa fa-remove"></i>
      </span>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'run-filter',
  model: { event: 'change' },
  props: {
    value: Object, // { lefthand: '', righthand: '', op: '' }
    isNewFilter: Boolean,
  },
  data () {
    return {
      comparators: ['==', '<', '>', '!=', 'regex'],
    }
  },
  created () {
  },
  methods: {
    clickNewFilter () {
      this.$emit('add', this.value)
    },
    clickDeleteFilter () {
      this.$emit('delete', this.value)
    },
  },
}
</script>

<style>
.run-filter {
  margin-bottom: 0;
}
</style>
