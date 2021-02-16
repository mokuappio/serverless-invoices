<template>
    <div v-if="team">
        <InvoiceControls class="d-print-none"/>
        <InvoiceForm/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InvoiceForm from '@/components/invoices/InvoiceForm';
import InvoiceControls from '@/components/invoices/InvoiceControls';

export default {
  name: 'invoice',
  components: {
    InvoiceControls,
    InvoiceForm,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
};
</script>
