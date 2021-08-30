<template>
    <div>
        <div class="row">
            <div class="col-12 mb-4 pr-0 d-flex justify-content-between">
                <h4 class="mb-0">{{ $t('title') }}</h4>
                <div>
                    <button class="btn btn-sm btn-outline-dark"
                            :class="{ 'mr-3': !isStorageLocal }"
                            @click="createNewInvoice">{{ $t('new_invoice') }}
                    </button>
                    <b-dropdown variant="link" size="sm" no-caret right v-if="isStorageLocal">
                        <template slot="button-content">
                            <i class="material-icons">more_vert</i>
                        </template>
                        <b-dropdown-item @click="exportJson">{{ $t('export') }}</b-dropdown-item>
                        <b-dropdown-item @click="openImportModal">{{ $t('import') }}</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <InvoicesList/>
            </div>
        </div>
    </div>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue';
import { mapGetters } from 'vuex';
import InvoicesList from '@/components/invoices/InvoicesList';
import config from '@/config/app.config';

export default {
  name: 'invoices',
  i18nOptions: { namespaces: 'invoices' },
  components: {
    InvoicesList,
    BDropdown,
    BDropdownItem,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
    isStorageLocal() {
      return config.storageType === 'local';
    },
  },
  methods: {
    createNewInvoice() {
      this.$store.dispatch('invoices/createNewInvoice')
        .then(id => this.$router.push({ name: 'invoice', params: { id } }));
    },
    exportJson() {
      this.$store.dispatch('data/exportJson');
    },
    openImportModal() {
      this.$store.commit('data/isImportModalOpen', true);
    },
  },
};
</script>
