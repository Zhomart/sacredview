<template>
<div>
  <Navigation />
  <section class="section">
    <router-view></router-view>
  </section>
</div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'app',
  components: { Navigation },
}
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import '../node_modules/font-awesome/css/font-awesome.css';
</style>
