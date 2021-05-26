<template>
    <BModal v-model="isOpen"
            centered
            hide-footer
            :title="$t('title')"
            size="lg"
            scrollable
            content-class="bg-base dp--24 text-center">
        <AppTextarea :value="team.custom_css"
                     @change="updateProp({ custom_css: $event })"
                     :label="$t('textarea_label')"
                     field="custom_css"
                     :errors="errors"
                     input-classes="min-vh-50 text-monospace"
                     class="text-left"/>
    </BModal>
</template>

<script>
import { BModal } from 'bootstrap-vue';
import AppTextarea from '@/components/form/AppTextarea';
import Errors from '@/utils/errors';
import NotificationService from '@/services/notification.service';
import { mapGetters } from 'vuex';

export default {
  i18nOptions: {
    namespaces: 'customizations-modal',
  },
  data() {
    return {
      errors: new Errors(),
    };
  },
  components: {
    BModal,
    AppTextarea,
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.invoices.isCustomizationsModalOpen;
      },
      set(val) {
        this.$store.commit('invoices/isCustomizationsModalOpen', val);
      },
    },
    ...mapGetters({
      team: 'teams/team',
    }),
  },
  watch: {
    team() {
      this.updateStyleEl(this.team.custom_css);
    },
  },
  created() {
    this.initStyleEl();
  },
  methods: {
    initStyleEl() {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('id', 'custom-styles');
      styleEl.setAttribute('type', 'text/css');
      document.head.appendChild(styleEl);
    },
    updateStyleEl(styles) {
      const styleEl = document.getElementById('custom-styles');
      styleEl.innerHTML = styles;
    },
    close() {
      this.isOpen = false;
    },
    updateProp(props) {
      this.errors.clear();
      this.$store.dispatch('teams/updateTeam', props)
        .then(() => {
          NotificationService.success(this.$t('updated'));
          this.updateStyleEl(props.custom_css);
        })
        .catch(err => this.errors.set(err.errors));
    },
  },
};
</script>
