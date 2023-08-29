<template>
    <div class="row">
        <div class="col-12 scrollbar invoice-container">
            <div class="card bg-base dp--02 invoice-box" v-if="invoice">
                <div class="card-body">
                    <div class="row mb-5">
                        <TeamLogo class="col-4" :errors="errors"/>
                        <InvoiceHeader :invoice="invoice" :errors="errors" @update="updateProp"
                                       class="col-8 text-right mb-2"/>
                    </div>
                    <div class="row">
                        <InvoiceClientDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                              class="col-6"/>
                        <InvoiceCompanyDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                               class="col-6 text-right"/>
                    </div>
                    <div class="row mt-3">
                        <AppEditable :value="invoice.notes"
                                     class="col-12"
                                     :placeholder="$t('insert_note')"
                                     @change="updateProp({ notes: $event })"/>
                    </div>
                    <div class="row">
                        <table class="table" :class="{'invoice__rows--compact': invoice.is_compact}">
                            <InvoiceRowsHeader :invoice="invoice"/>
                            <tbody>
                            <InvoiceRow v-for="(row, index) in invoice.rows" :errors="errors"
                                        :row="row" :index="index" :key="row.id"/>
                            <InvoiceAddRowBtn :invoice="invoice" :errors="errors"/>
                            </tbody>
                            <InvoiceTotals :invoice="invoice" :errors="errors" @update="updateProp"/>
                        </table>
                    </div>
                    <hr>
                    <div class="row pl-3 pr-3 justify-content-between">
                        <InvoiceBankDetails :invoice="invoice" :errors="errors" @update="updateProp"/>
                        <InvoiceContactDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                               class="text-right"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import InvoiceRow from '@/components/invoices/InvoiceRow';
import InvoiceClientDetails from '@/components/invoices/InvoiceClientDetails';
import InvoiceCompanyDetails from '@/components/invoices/InvoiceCompanyDetails';
import InvoiceBankDetails from '@/components/invoices/InvoiceBankDetails';
import InvoiceContactDetails from '@/components/invoices/InvoiceContactDetails';
import InvoiceHeader from '@/components/invoices/InvoiceHeader';
import InvoiceTotals from '@/components/invoices/InvoiceTotals';
import AppEditable from '@/components/form/AppEditable';
import TeamLogo from '@/components/team/TeamLogo';
import InvoiceRowsHeader from '@/components/invoices/InvoiceRowsHeader';
import InvoiceAddRowBtn from '@/components/invoices/InvoiceAddRowBtn';

export default {
  i18nOptions: { namespaces: 'invoice-form' },
  components: {
    InvoiceAddRowBtn,
    TeamLogo,
    InvoiceTotals,
    InvoiceHeader,
    InvoiceContactDetails,
    InvoiceBankDetails,
    InvoiceCompanyDetails,
    InvoiceRow,
    InvoiceRowsHeader,
    InvoiceClientDetails,
    AppEditable,
  },
  computed: {
    ...mapState({
      errors: state => state.invoices.errors,
    }),
    ...mapGetters({
      invoice: 'invoices/invoice',
    }),
  },
  watch: {
    '$route.params.id'() {
      this.getInvoice();
    },
  },
  created() {
    this.getInvoice();
  },
  methods: {
    getInvoice() {
      this.$store.dispatch('invoices/getInvoice', this.$route.params.id);
    },
    updateProp(props) {
      this.$store.dispatch('invoices/updateInvoice', {
        props,
        invoiceId: this.invoice.id,
      });
    },
  },
};
</script>
