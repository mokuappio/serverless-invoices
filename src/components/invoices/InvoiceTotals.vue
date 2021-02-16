<template>
    <tfoot>
    <tr class="text-right">
        <td colspan="4">Subtotal</td>
        <td>{{ invoice.subTotal | currency }}</td>
    </tr>
    <tr class="text-right">
        <td colspan="4">
            VAT
            (<AppEditable :value="invoice.vat_rate | currency"
                          suffix="%"
                          placeholder="Add VAT"
                          @change="updateProp({ vat_rate: $event })"/>)
            <AppError :errors="errors" field="vat_rate"/>
        </td>
        <td>{{ invoice.totalVat | currency }}</td>
    </tr>
    <tr class="text-right">
        <th colspan="4">
            Total
            <AppEditable :value="invoice.currency"
                         :errors="errors"
                         field="currency"
                         placeholder="Add currency"
                         @change="updateProp({ currency: $event })"/>
        </th>
        <th class="text-nowrap">{{ invoice.total | currency }}</th>
    </tr>
    </tfoot>
</template>
<script>
import AppError from '@/components/form/AppError';
import AppEditable from '../form/AppEditable';
import { formatDate } from '../../filters/date.filter';
import { formatCurrency } from '../../filters/currency.filter';

export default {
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
    AppError,
  },
  filters: {
    date: formatDate,
    currency: formatCurrency,
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
