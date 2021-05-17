<template>
    <tr>
        <td>
            <AppEditable :value="row.item"
                         :errors="errors"
                         :field="`rows.${index}.item`"
                         :placeholder="$t('enter_item')"
                         @change="updateProp({ item: $event })"/>
        </td>
        <td>
            <AppEditable :value="row.quantity"
                         :errors="errors"
                         :field="`rows.${index}.quantity`"
                         :placeholder="$t('enter_quantity')"
                         @change="updateProp({ quantity: $event })"/>
        </td>
        <td>
            <AppEditable :value="row.unit"
                         :errors="errors"
                         :field="`rows.${index}.unit`"
                         :placeholder="$t('enter_unit')"
                         @change="updateProp({ unit: $event })"/>
        </td>
        <td>
            <AppEditable :value="row.price | currency"
                         :errors="errors"
                         :field="`rows.${index}.price`"
                         :placeholder="$t('enter_price')"
                         @change="updateProp({ price: $event })"/>
        </td>
        <td v-for="(tax, taxIndex) in row.taxes" :title="tax.label">
            <AppEditable v-if="tax.row_id"
                         :value="tax.value | currency"
                         :errors="errors"
                         :field="`rows.${index}.taxes.${taxIndex}.value`"
                         :placeholder="$t('enter_tax')"
                         @change="updateTaxProp({ value: $event }, tax)"/>
        </td>
        <td class="text-right position-relative">
            {{ (row.quantity * row.price) | currency }}
            <button class="btn btn-sm d-print-none invoice__row-control"
                    @click="removeRow(row)">
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
  i18nOptions: { namespaces: 'invoice-row' },
  components: {
    AppEditable,
  },
  filters: {
    currency: formatCurrency,
  },
  methods: {
    updateProp(props) {
      this.$store.dispatch('invoiceRows/updateInvoiceRow', {
        props,
        id: this.row.id,
        invoiceId: this.row.invoice_id,
      });
    },
    updateTaxProp(props, tax) {
      this.$store.dispatch('invoiceRows/updateInvoiceRowTax', {
        props,
        invoiceId: this.row.invoice_id,
        taxId: tax.id,
      });
    },
    async removeRow(row) {
      await this.$store.dispatch('invoiceRows/removeRow', row.id);
      this.updateProp();
    },
  },
};
</script>
