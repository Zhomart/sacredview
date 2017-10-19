<template>
<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="http://lorempixel.com/400/200/abstract" width="112" height="28">
    </a>
  </div>

  <div id="navMenuTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link  is-active" href="/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item " href="https://bulma.io/documentation/elements/box/">
            Overview
          </a>

            <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
              Components
            </a>

          <hr class="navbar-divider">
          <div class="navbar-item">
            <div>
              <p class="is-size-6-desktop">
                <strong>0.6.0</strong>
              </p>

                <small>
                  <a class="bd-view-all-versions" href="https://versions.bulma.io/">View all versions</a>
                </small>

            </div>
          </div>
        </div>
      </div>
      <a class="navbar-item " href="https://bulma.io/expo/">
        <span class="bd-emoji">⭐️</span>
        Expo
      </a>
      <a class="navbar-item " href="https://bulma.io/love/">
        <span class="bd-emoji">❤️</span>
        Love
      </a>
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
