<template>
    <div class="card bg-base dp--02 invoice-box" v-if="invoice">
        <div class="card-body">
            <div class="row mb-5">
                <div class="col-4">
                    <img v-if="team.logo_url"
                         v-b-modal.team_logo_url
                         :src="team.logo_url" style="width:100%; max-width:200px;">
                    <button class="btn btn-sm" v-b-modal.team_logo_url v-else>
                        <i class="material-icons material-icons-round md-36">file_upload</i>
                    </button>
                    <AppError :errors="errors" field="logo_url"/>
                </div>
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
                             placeholder="Insert note"
                             @change="updateProp({ notes: $event })"/>
            </div>
            <div class="row">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th class="text-right">Sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    <InvoiceRow v-for="(row, index) in invoice.rows" :errors="errors"
                                :row="row" :index="index" :key="row.id"/>
                    <tr class="d-print-none">
                        <td colspan="5">
                            <button class="btn btn-sm" @click="addRow">
                                <i class="material-icons md-18 pointer">add</i>
                            </button>
                            <AppError :errors="errors" field="rows"/>
                        </td>
                    </tr>
                    </tbody>
                    <InvoiceTotals :invoice="invoice" :errors="errors" @update="updateProp"/>
                </table>
            </div>
            <hr>
            <div class="row">
                <InvoiceBankDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                    class="col-8"/>
                <InvoiceContactDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                       class="col-4 text-right"/>
            </div>
        </div>
        <BModal id="team_logo_url"
                centered
                title="Choose logo"
                hide-footer
                size="sm"
                content-class="bg-base dp--24 text-center">
            <AppFileInput accept="image/*" class="mb-4" @selected="logoSelected"
                          button-text="Select from files" output-type="base64"/>
            or
            <AppInput :value="team.logo_url"
                      class="mt-4"
                      @change="updateTeam({ logo_url: $event })"
                      label="Insert web url"
                      field="logo_url"
                      :errors="errors"
                      type="url"/>
        </BModal>
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
import AppError from '@/components/form/AppError';
import { BModal, VBModal } from 'bootstrap-vue';
import AppInput from '@/components/form/AppInput';
import AppFileInput from '@/components/form/AppFileInput';

export default {
  directives: {
    'b-modal': VBModal,
  },
  components: {
    AppFileInput,
    InvoiceTotals,
    InvoiceHeader,
    InvoiceContactDetails,
    InvoiceBankDetails,
    InvoiceCompanyDetails,
    InvoiceRow,
    InvoiceClientDetails,
    AppEditable,
    AppError,
    AppInput,
    BModal,
  },
  computed: {
    ...mapState({
      errors: state => state.invoices.errors,
    }),
    ...mapGetters({
      team: 'teams/team',
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
      this.$store.dispatch('invoices/updateInvoice', props);
    },
    addRow() {
      this.$store.dispatch('invoices/addRow');
    },
    updateTeam(props) {
      this.$store.dispatch('teams/updateTeam', props);
    },
    logoSelected(payload) {
      this.errors.clear();
      if (payload.size / 1000 > 512) {
        return this.errors.set({ logo_url: ['Logo has to be under 512kb.'] });
      }
      this.updateTeam({ logo_url: payload.content });
    },
  },
};
</script>
