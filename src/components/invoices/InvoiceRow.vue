<template>
    <tr>
        <td>
            <AppEditable :value="row.item"
                         :errors="errors"
                         :field="`rows.${index}.item`"
                         placeholder="Enter item"
                         @change="updateProp({ item: $event })"/>
        </td>
        <td>
            <AppEditable :value="row.quantity"
                         :errors="errors"
                         :field="`rows.${index}.quantity`"
                         placeholder="Enter quantity"
                         @change="updateProp({ quantity: $event })"/>
        </td>
        <td>
            <AppEditable :value="row.unit"
                         :errors="errors"
                         :field="`rows.${index}.unit`"
                         placeholder="Enter unit"
                         @change="updateProp({ unit: $event })"/>
        </td>
        <td>
            <AppEditable :value="row.price | currency"
                         :errors="errors"
                         :field="`rows.${index}.price`"
                         placeholder="Enter price"
                         @change="updateProp({ price: $event })"/>
        </td>
        <td class="text-right position-relative">
            {{ (row.quantity * row.price) | currency }}
            <button class="btn btn-sm remove-invoice-row d-print-none" @click="removeRow(row)">
                <i class="material-icons md-18 pointer">remove</i>
            </button>
        </td>
    </tr>
</template>

<script>
import { formatCurrency } from '../../filters/currency.filter';
import AppEditable from '../form/AppEditable';

export default {
  props: ['row', 'errors', 'index'],
  name: 'InvoiceRow',
  components: {
    AppEditable,
  },
  filters: {
    currency: formatCurrency,
  },
  methods: {
    updateProp(props) {
      this.$store.dispatch('invoices/updateInvoiceRow', {
        props,
        id: this.row.id,
      });
    },
    async removeRow(row) {
      await this.$store.dispatch('invoices/removeRow', row);
      this.updateProp();
    },
  },
};
</script>
