<template>
<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <router-link to="/" class="navbar-item">
      [SacredView]
    </router-link>
  </div>

  <div id="navMenuTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/runs" class="navbar-item is-active">
        Runs
      </router-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link is-active">
          Visualize
        </a>
        <div class="navbar-dropdown is-boxed">
          <router-link to="/visualize/results-by-config" class="navbar-item is-active">
            Results by config
          </router-link>
          <hr class="navbar-divider">
        </div>
      </div>
      <router-link to="/" class="navbar-item">
        <span class="bd-emoji">⭐️</span> Expo
      </router-link>
      <router-link to="/" class="navbar-item">
        <span class="bd-emoji">❤️</span> Love
      </router-link>
    </div>

    <div class="navbar-end">
      <a class="navbar-item is-hidden-desktop-only" href="https://github.com/Zhomart/sacredview" target="_blank">
        <span class="icon" style="color: #333;">
          <i class="fa fa-lg fa-github"></i>
        </span>
      </a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
}
</script>

<style>
.bd-emoji {
  margin-right: 0.5em;
  margin-top: 2px;
}
</style>
