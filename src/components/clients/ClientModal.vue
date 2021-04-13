<template>
    <BModal v-model="isOpen"
            centered
            hide-footer
            hide-header
            content-class="bg-base dp--24">
        <ClientForm @done="close()"/>
    </BModal>
</template>

<script>
import { mapGetters } from 'vuex';
import { BModal } from 'bootstrap-vue';
import ClientForm from '@/components/clients/ClientForm';

export default {
  components: {
    ClientForm,
    BModal,
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.clients.isModalOpen;
      },
      set(val) {
        if (!val) {
          this.$router.push({ query: {} });
          this.$store.dispatch('clients/getClients');
        }
        this.$store.commit('clients/isModalOpen', val);
      },
    },
    ...mapGetters({
      client: 'clients/client',
      invoice: 'invoices/invoice',
    }),
  },
  watch: {
    '$route.query.clientId'() {
      this.getClient();
    },
  },
  mounted() {
    this.getClient();
  },
  methods: {
    getClient() {
      const query = this.$route.query;
      if (query.hasOwnProperty('clientId')) {
        if ((this.client && this.client.id !== query.clientId) || !this.client) {
          this.$store.dispatch('clients/getClient', query.clientId);
        }

        this.$store.commit('clients/isModalOpen', true);
      } else {
        this.$store.commit('clients/isModalOpen', false);
      }
    },
    async close() {
      await this.promptUpdateInvoice();
      this.isOpen = false;
    },
    async promptUpdateInvoice() {
      if (this.$route.name === 'invoice' && this.invoice.client_id === this.client.id) {
        /* const confirmed = await this.$bvModal.msgBoxConfirm('Update client details on invoice?', {
          okTitle: 'Update',
          cancelTitle: 'Dismiss',
          cancelVariant: 'btn-link',
          contentClass: 'bg-base dp--24',
        });
        if (confirmed) { */
        this.$store.dispatch('invoices/prefillClient', {
          client: this.client,
          invoiceId: this.invoice.id,
        });
        /* } */
      }
    },
  },
};
</script>
