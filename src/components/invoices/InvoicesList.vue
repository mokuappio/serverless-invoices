<template>
    <div class="table-responsive">
        <div v-if="!invoices" class="col-12">{{ $t('loading') }}</div>
        <table class="table table--card table-hover" v-else-if="invoices && invoices.length > 0">
            <thead>
            <tr>
                <th>{{ $t('invoice_number') }}</th>
                <th>{{ $t('client') }}</th>
                <th>{{ $t('issued_at') }}</th>
                <th>{{ $t('total') }}</th>
                <th class="text-right">{{ $t('status') }}</th>
            </tr>
            </thead>
            <tbody v-if="invoices">
            <tr v-for="invoice in invoices"
                class="pointer"
                :key="invoice.id"
                @click="openInvoice(invoice)">
                <td>{{ invoice.number }}</td>
                <td>{{ invoice.client ? invoice.client.company_name : '' }}</td>
                <td>{{ invoice.issued_at | date('D MMM YYYY', 'YYYY-MM-DD') }}</td>
                <td>
                    {{ invoice.subTotal | currency }}
                    <small v-if="invoice.taxTotal"><br>({{ invoice.total | currency }})</small>
                </td>
                <td class="text-right text-capitalize">
                    <i class="material-icons material-icons-round md-18 mr-2 text-warning"
                       v-if="isOverDue(invoice)"
                       v-b-tooltip.hover title="Overdue">warning</i>
                    <i class="material-icons material-icons-round md-18 mr-2 text-success"
                       v-else-if="invoice.status === 'paid'">done</i>
                    {{ $t(`statuses.${invoice.status}`) }}
                </td>
            </tr>
            </tbody>
        </table>
        <EmptyState v-else/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { formatDate } from '@/filters/date.filter';
import EmptyState from '@/components/EmptyState';
import { formatCurrency } from '@/filters/currency.filter';
import dayjs from 'dayjs';
import { VBTooltip } from 'bootstrap-vue';

export default {
  i18nOptions: { namespaces: ['invoices-list', 'statuses'] },
  components: {
    EmptyState,
  },
  filters: {
    date: formatDate,
    currency: formatCurrency,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  computed: {
    ...mapGetters({
      invoices: 'invoices/all',
    }),
  },
  mounted() {
    this.$store.dispatch('invoices/getInvoices');
  },
  methods: {
    openInvoice(invoice) {
      this.$store.commit('invoices/invoiceId', invoice.id);
      this.$router.push({
        name: 'invoice',
        params: { id: invoice.id },
      });
    },
    isOverDue(invoice) {
      return invoice.status === 'sent' && invoice.due_at < dayjs()
        .format();
    },
  },
};
</script>
