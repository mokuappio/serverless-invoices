<template>
    <div>
        <strong>
            <AppEditable :value="invoice.from_name"
                         :errors="errors"
                         field="from_name"
                         placeholder="Your company name"
                         class="break-line"
                         @change="updateProp({ from_name: $event })"/>
        </strong>
        <AppEditable :value="invoice.from_address"
                     suffix=", "
                     placeholder="Address"
                     @change="updateProp({ from_address: $event })"/>
        <AppEditable :value="invoice.from_postal_code"
                     placeholder="Postal code"
                     class="break-line"
                     @change="updateProp({ from_postal_code: $event })"/>
        <AppError :errors="errors" field="from_address"/>
        <AppError :errors="errors" field="from_postal_code"/>

        <AppEditable :value="invoice.from_city"
                     suffix=", "
                     placeholder="City"
                     @change="updateProp({ from_city: $event })"/>
        <AppEditable :value="invoice.from_county"
                     suffix=", "
                     placeholder="County/State"
                     @change="updateProp({ from_county: $event })"/>
        <AppEditable :value="invoice.from_country"
                     placeholder="Country"
                     class="break-line"
                     @change="updateProp({ from_country: $event })"/>
        <AppError :errors="errors" field="from_city"/>
        <AppError :errors="errors" field="from_county"/>
        <AppError :errors="errors" field="from_country"/>

        <span :class="{'d-print-none': !invoice.from_reg_no }">Reg no: </span>
        <AppEditable :value="invoice.from_reg_no"
                     :errors="errors"
                     field="from_reg_no"
                     placeholder="Enter reg no"
                     class="break-line"
                     @change="updateProp({ from_reg_no: $event })"/>
        <span :class="{'d-print-none': !invoice.from_vat_no }">VAT no: </span>
        <AppEditable :value="invoice.from_vat_no"
                     :errors="errors"
                     field="from_vat_no"
                     placeholder="Enter vat no"
                     class="break-line"
                     @change="updateProp({ from_vat_no: $event })"/>
        <AppEditable :value="invoice.from_email"
                     :errors="errors"
                     field="from_email"
                     placeholder="Your email"
                     @change="updateProp({ from_email: $event })"/>
    </div>
</template>
<script>
import AppError from '@/components/form/AppError';
import AppEditable from '../form/AppEditable';

export default {
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
    AppError,
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
