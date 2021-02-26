<template>
    <div class="row" v-if="invoice">
        <div class="col-12 mb-4 d-flex justify-content-between align-items-start">
            <router-link class="btn btn-sm btn-light btn--icon-left"
                            :to="{name: 'invoices'}">
                <i class="material-icons">arrow_back</i>
                <span class="d-inline-block">Back</span>
            </router-link>
            <div class="d-flex align-items-center">
                <AppSelect :value="invoice.status"
                           class="mb-0 mr-2 text-capitalize multiselect--capitalize"
                           :options="['draft', 'booked', 'sent', 'paid', 'cancelled']"
                           @input="updateProp({status: $event})"/>
                <button class="btn btn-sm btn-outline-dark"
                        v-if="invoice.status === 'draft'"
                        @click="bookInvoice">Book
                </button>
                <b-dropdown variant="link" size="sm" no-caret right>
                    <template slot="button-content">
                        <i class="material-icons">more_vert</i>
                    </template>
                    <b-dropdown-item-button @click="print">Download PDF</b-dropdown-item-button>
                    <b-dropdown-item-button @click="deleteInvoice">Delete</b-dropdown-item-button>
                </b-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NotificationService from '@/services/notification.service';
import { BDropdown, BDropdownItemButton } from 'bootstrap-vue';
import AppSelect from '@/components/form/AppSelect';

export default {
  components: {
    BDropdown,
    BDropdownItemButton,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      invoice: 'invoices/invoice',
    }),
  },
  methods: {
    async deleteInvoice() {
      const confirmed = await this.$bvModal.msgBoxConfirm(`Delete invoice ${this.invoice.number}?`, {
        okTitle: 'Delete',
        okVariant: 'danger',
        cancelTitle: 'Dismiss',
        cancelVariant: 'btn-link',
        contentClass: 'bg-base dp--24',
      });
      if (confirmed) {
        await this.$store.dispatch('invoices/deleteInvoice', this.invoice);
        NotificationService.success('Deleted');
        this.$router.push({
          name: 'invoices',
        });
      }
    },
    bookInvoice() {
      this.$store.dispatch('invoices/bookInvoice');
    },
    updateProp(props) {
      this.$store.dispatch('invoices/updateInvoice', props);
    },
    print() {
      window.print();
    },
  },
};
</script>
