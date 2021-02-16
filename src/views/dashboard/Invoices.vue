<template>
    <div>
        <div class="row">
            <div class="col-12 mb-4 d-flex justify-content-between">
                <h4 class="mb-0">Invoices</h4>
                <button class="btn btn-sm btn-outline-dark" @click="createNewInvoice">New invoice</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 p-0">
                <InvoicesList/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InvoicesList from '@/components/invoices/InvoicesList';

export default {
  name: 'invoices',
  components: {
    InvoicesList,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
  methods: {
    createNewInvoice() {
      this.$store.dispatch('invoices/createNewInvoice')
        .then(id => this.$router.push({ name: 'invoice', params: { id } }));
    },
  },
};
</script>
