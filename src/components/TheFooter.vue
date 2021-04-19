<template>
    <footer class="col-12 d-flex justify-content-between align-items-center text-secondary px-0 mt-3 d-print-none">
        <button class="btn btn-sm text-secondary" @click="toggleTheme">
            Lights {{ theme === 'dark' ? 'on' : 'off' }}
            <i class="material-icons material-icons-round md-14 align-text-bottom ml-1">
                {{ theme === 'dark' ? 'wb_sunny' : 'brightness_2' }}
            </i>
        </button>
        <LanguageSwitcher/>
        <div>
            <small v-b-tooltip.hover
                   title="All your data is saved in your browser and not on any server.
                                   This application is truly serverless and only you have access to your data."
                   class="pointer">
                What about my data?
            </small>
            <small class="pl-2">
                Made with
                <i class="material-icons material-icons-round md-14 align-text-bottom">favorite</i>
                by
                <a href="https://mokuapp.io/" class="text-secondary" target="_blank">Moku</a>.
            </small>
            <a href="https://github.com/mokuappio/serverless-invoices"
               class="btn btn-sm btn--icon ml-2"
               target="_blank">
                <img src="@/assets/img/github.png"
                     alt="Serverless Invoices Github"
                     v-if="theme === 'dark'">
                <img src="@/assets/img/github-dark.png"
                     alt="Serverless Invoices Github"
                     v-else>
            </a>
            <a href="https://app.mokuapp.io/"
               class="btn btn-sm btn-primary ml-2"
               target="_blank">Upgrade</a>
        </div>
    </footer>
</template>

<script>
import { mapState } from 'vuex';
import { VBTooltip } from 'bootstrap-vue';
import LanguageSwitcher from './LanguageSwitcher';

export default {
  components: { LanguageSwitcher },
  directives: {
    'b-tooltip': VBTooltip,
  },
  computed: {
    ...mapState({
      theme: state => state.themes.theme,
    }),
  },
  methods: {
    toggleTheme() {
      if (this.theme === 'light') {
        this.$store.commit('themes/theme', 'dark');
      } else {
        this.$store.commit('themes/theme', 'light');
      }
      localStorage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
  },
};
</script>
