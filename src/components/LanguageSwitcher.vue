<template>
    <b-dropdown v-if="selectedLang" variant="link" size="sm" right no-caret custom-class="text-secondary">
        <template slot="button-content">
            <span class="text-secondary">
                <span class="text-uppercase">{{ selectedLang.code }}</span>
                <i class="material-icons md-18">expand_more</i>
            </span>
        </template>
        <template v-for="lang in languages" >
            <b-dropdown-item-button @click="langChanged(lang)" :key="lang.code">{{ lang.name }}</b-dropdown-item-button>
        </template>
    </b-dropdown>
</template>
<script>
import { mapState } from 'vuex';
import { BDropdown, BDropdownItemButton } from 'bootstrap-vue';

export default {
  name: 'language-switcher',
  i18nOptions: { namespaces: 'language-switcher' },
  components: {
    BDropdown,
    BDropdownItemButton,
  },
  computed: {
    ...mapState({
      selectedLang: state => state.language.lang,
      languages: state => state.language.all,
    }),
  },
  methods: {
    langChanged(lang) {
      this.$store.dispatch('language/changeLanguage', lang);
    },
  },
};
</script>
