<template>
    <footer class="row text-secondary px-0 mt-3 d-print-none">
        <div class="col-md-4">
            <LanguageSwitcher class="ml-n2 ml-md-0"/>
            <button class="btn btn-sm text-secondary" @click="toggleTheme">
                {{ theme === 'dark' ? $t('lights-on') : $t('lights-off') }}
                <i class="material-icons material-icons-round md-14 align-text-bottom ml-1">
                    {{ theme === 'dark' ? 'wb_sunny' : 'brightness_2' }}
                </i>
            </button>
        </div>
        <div class="col-md-8 text-left text-md-right">
            <small v-b-tooltip.hover
                   :title="$t('title')"
                   class="pointer"
                   v-if="!isStorageWordpress">
                {{ $t('what_about_my_data') }}
            </small>
            <small class="pl-2">
                {{ $t('made_with') }}
                <i class="material-icons material-icons-round md-14 align-text-bottom">favorite</i>
                {{ $t('by') }}
                <a href="https://mokuapp.io/" class="text-secondary" target="_blank">Moku</a>.
            </small>
            <a href="https://github.com/mokuappio/serverless-invoices"
               class="btn btn-sm btn--icon ml-0 ml-md-2"
               target="_blank"
               v-if="!isStorageWordpress">
                <img src="@/assets/img/github.png"
                     alt="Serverless Invoices Github"
                     v-if="theme === 'dark'">
                <img src="@/assets/img/github-dark.png"
                     alt="Serverless Invoices Github"
                     v-else>
            </a>
            <a href="https://app.mokuapp.io/"
               class="btn btn-sm btn-primary ml-2"
               target="_blank"
               v-if="!isStorageWordpress">{{ $t('upgrade') }}</a>
        </div>
    </footer>
</template>

<script>
import config from '@/config/app.config';
import { mapState } from 'vuex';
import { VBTooltip } from 'bootstrap-vue';
import LanguageSwitcher from './LanguageSwitcher';

export default {
  i18nOptions: { namespaces: 'the-footer' },
  components: { LanguageSwitcher },
  directives: {
    'b-tooltip': VBTooltip,
  },
  computed: {
    ...mapState({
      theme: state => state.themes.theme,
    }),
    isStorageWordpress() {
      return config.storageType === 'wordpress';
    },
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
