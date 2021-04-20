<template>
    <div>
        <div>
            <ClientSelector :value="invoice.client_name" btn-class="font-weight-bold" @selected="clientSelected"/>
            <i class="material-icons md-18 ml-2 pointer d-print-none" v-if="invoice.client" @click="editClient">edit</i>
        </div>
        <AppEditable :value="invoice.client_address"
                     suffix=", "
                     :placeholder="$t('client_address')"
                     @change="updateProp({ client_address: $event })"/>
        <AppEditable :value="invoice.client_postal_code"
                     :placeholder="$t('client_postal_code')"
                     class="break-line"
                     @change="updateProp({ client_postal_code: $event })"/>
        <AppError :errors="errors" field="client_address"/>
        <AppError :errors="errors" field="client_postal_code"/>

        <AppEditable :value="invoice.client_city"
                     suffix=", "
                     :placeholder="$t('client_city')"
                     @change="updateProp({ client_city: $event })"/>
        <AppEditable :value="invoice.client_county"
                     suffix=", "
                     :placeholder="$t('client_county')"
                     @change="updateProp({ client_county: $event })"/>
        <AppEditable :value="invoice.client_country"
                     :placeholder="$t('client_country')"
                     class="break-line"
                     @change="updateProp({ client_country: $event })"/>
        <AppError :errors="errors" field="client_city"/>
        <AppError :errors="errors" field="client_county"/>
        <AppError :errors="errors" field="client_country"/>

        <InvoiceClientFields :invoice="invoice"/>

        <AppEditable :value="invoice.client_email"
                     :errors="errors"
                     field="client_email"
                     class="break-line"
                     :placeholder="$t('client_email')"
                     @change="updateProp({ client_email: $event })"/>
    </div>
</template>
<script>
import AppError from '@/components/form/AppError';
import AppEditable from '@/components/form/AppEditable';
import ClientSelector from '@/components/clients/ClientSelector';
import InvoiceClientFields from '@/components/invoices/InvoiceClientFields';

export default {
  i18nOptions: { namespaces: 'invoice-client-details' },
  props: ['invoice', 'errors'],
  components: {
    AppError,
    ClientSelector,
    AppEditable,
    InvoiceClientFields,
  },
  methods: {
    editClient() {
      this.$router.push({ query: { clientId: this.invoice.client_id } });
    },
    updateProp(props) {
      this.$emit('update', props);
    },
    clientSelected(client) {
      this.$store.dispatch('invoices/prefillClient', {
        client,
        invoiceId: this.invoice.id,
      });
    },
  },
};
</script>
