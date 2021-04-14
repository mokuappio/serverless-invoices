<template>
    <tr class="d-print-none">
        <td :colspan="colspan">
            <button class="btn btn-sm" @click="addRow">
                <i class="material-icons md-18 pointer">add</i>
            </button>
            <AppError :errors="errors" field="rows"/>
        </td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex';
import AppError from '@/components/form/AppError';

export default {
  props: ['invoice', 'errors'],
  components: {
    AppError,
  },
  computed: {
    ...mapGetters({
      taxes: 'invoiceRows/taxes',
    }),
    colspan() {
      return 5 + this.taxes.length;
    },
  },
  methods: {
    addRow() {
      this.$store.dispatch('invoiceRows/addRow', this.invoice.id);
    },
  },
};
</script>
