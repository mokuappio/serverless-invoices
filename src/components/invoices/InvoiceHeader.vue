<template>
    <div>
        <h3>
            {{ $t('invoice_title') }}
            <AppEditable :value="invoice.number"
                         :errors="errors"
                         field="number"
                         :placeholder="$t('invoice_number')"
                         @change="updateProp({ number: $event })"/>
        </h3>
        {{ $t('issued_at') }}
        <span class="editable__item" v-b-modal.modal_issued_at>{{ invoice.issued_at | date('D. MMM YYYY', 'YYYY-MM-DD') }}</span>
        <BModal id="modal_issued_at"
                centered
                :title="$t('modal_issued_at_title')"
                hide-footer
                size="sm"
                content-class="bg-base dp--24">
            <AppDatePicker :value="invoice.issued_at"
                           @change="updateProp({ issued_at: $event })"
                           :errors="errors"
                           :inline="true"
                           field="issued_at"/>
        </BModal>
        <br>{{ $t('due_at') }}
        <span class="editable__item"
              v-b-modal.modal_due_at>{{ invoice.due_at | date('D. MMM YYYY', 'YYYY-MM-DD') }}</span>
        <BModal id="modal_due_at"
                centered
                :title="$t('modal_due_at_title')"
                hide-footer
                size="sm"
                content-class="bg-base dp--24">
            <AppDatePicker :value="invoice.due_at"
                           @change="updateProp({ due_at: $event })"
                           :errors="errors"
                           :inline="true"
                           field="due_at"/>
        </BModal>
        <br>{{ $t('late_fee') }}
        <AppEditable :value="invoice.late_fee | currency"
                     :errors="errors"
                     suffix="%"
                     field="late_fee"
                     :placeholder="$t('add_late_fee')"
                     @change="updateProp({ late_fee: $event })"/>
    </div>
</template>
<script>
import { BModal, VBModal } from 'bootstrap-vue';
import AppEditable from '@/components/form/AppEditable';
import AppDatePicker from '@/components/form/AppDatePicker';
import { formatDate } from '@/filters/date.filter';
import { formatCurrency } from '@/filters/currency.filter';

export default {
  i18nOptions: { namespaces: 'invoice-header' },
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
    AppDatePicker,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
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
