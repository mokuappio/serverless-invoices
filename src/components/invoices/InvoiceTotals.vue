<template>
    <tfoot>
    <tr class="text-right">
        <td colspan="4">Subtotal</td>
        <td>{{ subTotal | currency }}</td>
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
        <td>{{ totalVat | currency }}</td>
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
        <th class="text-nowrap">{{ total | currency }}</th>
    </tr>
    </tfoot>
</template>
<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      rows: 'invoices/rows',
      subTotal: 'invoices/subTotal',
      total: 'invoices/total',
      totalVat: 'invoices/totalVat',
    }),
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
