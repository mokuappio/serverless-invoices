<template>
    <div>
        <strong class="break-line">
            <AppEditable :value="invoice.from_name"
                         :errors="errors"
                         field="from_name"
                         :placeholder="$t('your_company_name')"
                         @change="updateProp({ from_name: $event })"/>
            <i class="material-icons md-18 ml-2 pointer d-print-none" @click="editTeam">edit</i>
        </strong>
        <AppEditable :value="invoice.from_address"
                     suffix=", "
                     :placeholder="$t('address')"
                     @change="updateProp({ from_address: $event })"/>
        <AppEditable :value="invoice.from_postal_code"
                     :placeholder="$t('postal_code')"
                     class="break-line"
                     @change="updateProp({ from_postal_code: $event })"/>
        <AppError :errors="errors" field="from_address"/>
        <AppError :errors="errors" field="from_postal_code"/>

        <AppEditable :value="invoice.from_city"
                     suffix=", "
                     :placeholder="$t('city')"
                     @change="updateProp({ from_city: $event })"/>
        <AppEditable :value="invoice.from_county"
                     suffix=", "
                     :placeholder="$t('county')"
                     @change="updateProp({ from_county: $event })"/>
        <AppEditable :value="invoice.from_country"
                     :placeholder="$t('country')"
                     class="break-line"
                     @change="updateProp({ from_country: $event })"/>
        <AppError :errors="errors" field="from_city"/>
        <AppError :errors="errors" field="from_county"/>
        <AppError :errors="errors" field="from_country"/>

        <InvoiceTeamFields :invoice="invoice"/>

        <AppEditable :value="invoice.from_email"
                     :errors="errors"
                     field="from_email"
                     :placeholder="$t('your_email')"
                     @change="updateProp({ from_email: $event })"/>
    </div>
</template>
<script>
import AppError from '@/components/form/AppError';
import InvoiceTeamFields from '@/components/invoices/InvoiceTeamFields';
import AppEditable from '../form/AppEditable';

export default {
  i18nOptions: { namespaces: 'invoice-company-details' },
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
    AppError,
    InvoiceTeamFields,
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
    editTeam() {
      this.$store.commit('teams/isModalOpen', true);
    },
  },
};
</script>
