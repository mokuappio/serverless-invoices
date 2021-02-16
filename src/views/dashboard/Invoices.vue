<template>
    <div>
        <div class="row">
            <div class="col-12 mb-4 d-flex justify-content-between">
                <h4 class="mb-0">Invoices</h4>
                <div>
                    <b-dropdown variant="link" size="sm" no-caret right>
                        <template slot="button-content">
                            <i class="material-icons">more_vert</i>
                        </template>
                        <b-dropdown-item @click="exportJson">Export</b-dropdown-item>
                        <b-dropdown-item @click="importJson">Import</b-dropdown-item>
                    </b-dropdown>
                    <button class="btn btn-sm btn-outline-dark" @click="createNewInvoice">New invoice</button>
                </div>
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
import { BDropdown, BDropdownItem } from 'bootstrap-vue';
import { mapGetters } from 'vuex';
import InvoicesList from '@/components/invoices/InvoicesList';

export default {
  name: 'invoices',
  components: {
    InvoicesList,
    BDropdown,
    BDropdownItem,
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
    exportJson() {
      this.$store.dispatch('exportJson');
    },
    importJson() {
      this.$store.dispatch('importJson');
    },
  },
};
</script>
