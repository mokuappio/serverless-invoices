<template>
    <BModal v-model="isOpen"
            centered
            hide-footer
            hide-header
            content-class="bg-base dp--24">
        <TeamForm @done="close()"/>
    </BModal>
</template>

<script>
import { mapGetters } from 'vuex';
import { BModal } from 'bootstrap-vue';
import TeamForm from '@/components/team/TeamForm';

export default {
  components: {
    TeamForm,
    BModal,
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.teams.isModalOpen;
      },
      set(val) {
        this.$store.commit('teams/isModalOpen', val);
      },
    },
    ...mapGetters({
      team: 'teams/team',
    }),
  },
  mounted() {
    this.getTeam();
  },
  methods: {
    getTeam() {
      this.$store.dispatch('teams/getTeam');
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
