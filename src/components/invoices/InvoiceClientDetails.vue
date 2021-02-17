<template>
    <div>
        <div>
            <ClientSelector :value="invoice.client_name" btn-class="font-weight-bold" @selected="clientSelected"/>
            <i class="material-icons md-18 ml-2 pointer d-print-none" v-if="invoice.client" @click="editClient">edit</i>
        </div>
        <AppEditable :value="invoice.client_address"
                     suffix=", "
                     placeholder="Address"
                     @change="updateProp({ client_address: $event })"/>
        <AppEditable :value="invoice.client_postal_code"
                     placeholder="Postal code"
                     class="break-line"
                     @change="updateProp({ client_postal_code: $event })"/>
        <AppError :errors="errors" field="client_address"/>
        <AppError :errors="errors" field="client_postal_code"/>

        <AppEditable :value="invoice.client_city"
                     suffix=", "
                     placeholder="City"
                     @change="updateProp({ client_city: $event })"/>
        <AppEditable :value="invoice.client_county"
                     suffix=", "
                     placeholder="County/State"
                     @change="updateProp({ client_county: $event })"/>
        <AppEditable :value="invoice.client_country"
                     placeholder="Country"
                     class="break-line"
                     @change="updateProp({ client_country: $event })"/>
        <AppError :errors="errors" field="client_city"/>
        <AppError :errors="errors" field="client_county"/>
        <AppError :errors="errors" field="client_country"/>

        <span :class="{'d-print-none': !invoice.client_reg_no }">Reg no: </span>
        <AppEditable :value="invoice.client_reg_no"
                     :errors="errors"
                     field="client_reg_no"
                     placeholder="Enter reg no"
                     class="break-line"
                     @change="updateProp({ client_reg_no: $event })"/>
        <span :class="{'d-print-none': !invoice.client_vat_no }">VAT no: </span>
        <AppEditable :value="invoice.client_vat_no"
                     :errors="errors"
                     field="client_vat_no"
                     placeholder="Enter vat no"
                     class="break-line"
                     @change="updateProp({ client_vat_no: $event })"/>
        <AppEditable :value="invoice.client_email"
                     :errors="errors"
                     field="client_email"
                     class="break-line"
                     placeholder="Client's email"
                     @change="updateProp({ client_email: $event })"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import AppError from '@/components/form/AppError';
import AppEditable from '@/components/form/AppEditable';
import ClientSelector from '@/components/clients/ClientSelector';

export default {
  props: ['invoice', 'errors'],
  components: {
    AppError,
    ClientSelector,
    AppEditable,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
  methods: {
    editClient() {
      this.$router.push({ query: { clientId: this.invoice.client_id } });
    },
    updateProp(props) {
      this.$emit('update', props);
    },
    clientSelected(client) {
      this.prefillClient(client);
    },
    prefillClient(client) {
      return this.updateProp({
        client_id: client.id,
        client_name: client.company_name,
        client_address: client.company_address,
        client_postal_code: client.company_postal_code,
        client_city: client.company_city,
        client_county: client.company_county,
        client_country: client.company_country,
        client_reg_no: client.company_reg_no,
        client_vat_no: client.company_vat_no,
        client_email: client.invoice_email,
        currency: client.currency || 'USD',
        vat_rate: client.has_vat ? this.team.vat_rate : 0,
        bank_name: client.bank_account ? client.bank_account.bank_name : null,
        bank_account_no: client.bank_account ? client.bank_account.account_no : null,
      });
    },
  },
};
</script>
