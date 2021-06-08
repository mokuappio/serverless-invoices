<template>
    <BModal v-model="isOpen"
            centered
            hide-footer
            hide-header
            content-class="bg-base dp--24">
        <TeamForm @done="close"/>
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
      invoice: 'invoices/invoice',
    }),
  },
  mounted() {
    this.getTeam();
  },
  methods: {
    getTeam() {
      this.$store.dispatch('teams/getTeam');
    },
    async close() {
      await this.promptUpdateInvoice();
      this.isOpen = false;
    },
    async promptUpdateInvoice() {
      if (this.$route.name === 'invoice') {
        /* const confirmed = await this.$bvModal.msgBoxConfirm('Update team details on invoice?', {
          okTitle: 'Update',
          cancelTitle: 'Dismiss',
          cancelVariant: 'btn-link',
          contentClass: 'bg-base dp--24',
        });
        if (confirmed) { */
        this.$store.dispatch('invoices/prefillTeam', {
          invoiceId: this.invoice.id,
        });
        /* } */
      }
    },
  },
};
</script>
