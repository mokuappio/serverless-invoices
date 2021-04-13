<template>
    <div>
        <img v-if="team.logo_url"
             class="pointer"
             @click="openModal"
             :src="team.logo_url" style="width:100%; max-width:200px;">
        <button class="btn btn-sm" @click="openModal" v-else>
            <i class="material-icons material-icons-round md-36">file_upload</i>
        </button>
        <AppError :errors="errors" field="logo_url"/>
        <BModal v-model="isModalOpen"
                centered
                title="Choose logo"
                hide-footer
                size="sm"
                content-class="bg-base dp--24 text-center">
            <AppFileInput accept="image/*" class="mb-4" @selected="logoSelected"
                          button-text="Select from files" output-type="base64"/>
            or
            <AppInput :value="team.logo_url"
                      class="mt-4"
                      @change="updateTeam({ logo_url: $event })"
                      label="Insert web url"
                      field="logo_url"
                      :errors="errors"
                      type="url"/>
        </BModal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import AppError from '@/components/form/AppError';
import { BModal } from 'bootstrap-vue';
import AppInput from '@/components/form/AppInput';
import AppFileInput from '@/components/form/AppFileInput';

export default {
  props: ['errors'],
  components: {
    AppFileInput,
    AppError,
    AppInput,
    BModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
  methods: {
    updateTeam(props) {
      this.$store.dispatch('teams/updateTeam', props);
    },
    logoSelected(payload) {
      this.errors.clear();
      if (payload.size / 1000 > 512) {
        return this.errors.set({ logo_url: ['Logo has to be under 512kb.'] });
      }
      this.updateTeam({ logo_url: payload.content });
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
};
</script>
