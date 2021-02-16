<template>
    <div id="app"
         class="min-vh-100"
         :class="$route.name">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <notifications position="bottom center" classes="snackbar" width="332"/>
    </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    this.pauseAnimationsUntilLoaded();
  },
  methods: {
    jsLoaded() {
      document.body.classList.remove('js-loading');
    },
    pauseAnimationsUntilLoaded() {
      document.body.classList.add('js-loading');
      window.addEventListener('load', this.jsLoaded, false);
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/variables';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.min.css';
@import './assets/scss/app';
</style>
