<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h4>Client</h4>
            </div>
        </div>

        <div v-if="client" class="row">
            <div class="col-12">
                <h5>General</h5>
            </div>
            <AppInput :value="client.company_name" @change="updateProp({ company_name: $event })"
                      label="Company Name" field="company_name" :errors="errors" class="col-12"/>
            <AppInput :value="client.invoice_email" @change="updateProp({ invoice_email: $event })"
                      label="Email" field="invoice_email" :errors="errors" class="col-sm-7"/>
            <AppInput :value="client.company_reg_no" @change="updateProp({ company_reg_no: $event })"
                      label="Company reg no" field="company_reg_no" :errors="errors" class="col-sm-5"/>

            <div class="col-12">
                <h5>Invoice Settings</h5>
                <h6>Address</h6>
            </div>
            <AppInput :value="client.company_address" @change="updateProp({ company_address: $event })"
                      label="Company Address" field="company_address" :errors="errors"
                      class="col-12"/>
            <AppInput :value="client.company_postal_code"
                      @change="updateProp({ company_postal_code: $event })"
                      label="Postal code" field="company_postal_code" :errors="errors"
                      class="col-sm-5"/>
            <AppInput :value="client.company_city" @change="updateProp({ company_city: $event })"
                      label="City" field="company_city" :errors="errors" class="col-sm-7"/>
            <AppInput :value="client.company_county" @change="updateProp({ company_county: $event })"
                      label="County/State" field="company_county" :errors="errors" class="col-sm-6"/>
            <AppInput :value="client.company_country" @change="updateProp({ company_country: $event })"
                      label="Country" field="company_country" :errors="errors" class="col-sm-6"/>
            <AppInput :value="client.currency" @change="updateProp({ currency: $event })"
                      label="Currency" field="currency" :errors="errors" class="col-sm-4"/>
            <AppInput :value="client.rate" @change="updateProp({ rate: $event })"
                      label="Hourly rate" field="rate" :errors="errors" class="col-sm-4"/>

            <div class="col-12">
                <h6>VAT</h6>
            </div>
            <AppInput :value="client.company_vat_no" @change="updateProp({ company_vat_no: $event })"
                      label="Company VAT no" field="company_vat_no" :errors="errors" class="col-sm-8"/>
            <AppCheckbox :value="client.has_vat" @input="updateProp({ has_vat: $event })"
                         label="Apply VAT" field="has_vat" :errors="errors" class="col-sm-4"/>

            <div class="col-12">
                <h6>Banking details</h6>
            </div>
            <AppSelect :value="client.bank_account"
                       track-by="id"
                       label="Bank account"
                       label-field="bank_name"
                       :options="bankAccounts || []"
                       @input="bankAccountChanged"
                       class="col-12"/>
        </div>
        <div v-if="!client">Loading</div>

        <div class="row mt-3 text-right" v-if="client">
            <div class="col-12">
                <div v-if="!isNew">
                    <button class="btn btn-outline-danger mr-2" @click="deleteClient(client.id)">Delete</button>
                    <button class="btn btn-primary"
                            @click="$emit('done')">Done
                    </button>
                </div>
                <button v-else class="btn btn-primary ml-2"
                        :disabled="loading"
                        @click="createClient">Create
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NotificationService from '@/services/notification.service';
import AppInput from '@/components/form/AppInput';
import AppSelect from '@/components/form/AppSelect';
import Errors from '@/utils/errors';
import AppCheckbox from '@/components/form/AppCheckbox';

export default {
  components: {
    AppCheckbox,
    AppInput,
    AppSelect,
  },
  data() {
    return {
      errors: new Errors(),
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      client: 'clients/client',
      bankAccounts: 'bankAccounts/all',
    }),
    isNew() {
      return this.client && this.client.$isNew;
    },
  },
  mounted() {
    this.getBankAccounts();
  },
  methods: {
    getBankAccounts() {
      this.$store.dispatch('bankAccounts/getBankAccounts');
    },
    updateProp(props) {
      if (this.isNew) {
        return this.$store.dispatch('clients/clientProps', props);
      }
      this.errors.clear();

      this.$store.dispatch('clients/updateClient', props)
        .then(() => {
          NotificationService.success('Updated');
        })
        .catch(err => this.errors.set(err.errors));
    },
    bankAccountChanged(val) {
      this.updateProp({
        bank_account_id: val ? val.id : null,
        bank_account: val,
      });
    },
    createClient() {
      this.loading = true;
      this.errors.clear();

      return this.$store.dispatch('clients/createNewClient', this.client)
        .then((client) => {
          this.$router.push({
            query: {
              clientId: client.id,
            },
          });
          this.$emit('done');
        })
        .catch(err => this.errors.set(err.errors))
        .finally(() => {
          this.loading = false;
        });
    },
    async deleteClient(clientId) {
      const confirmed = await this.$bvModal.msgBoxConfirm(`Delete client ${this.client.company_name}?`, {
        okTitle: 'Delete',
        okVariant: 'danger',
        cancelTitle: 'Dismiss',
        cancelVariant: 'btn-link',
        contentClass: 'bg-base dp--24',
      });
      if (confirmed) {
        this.$emit('done');
        await this.$store.dispatch('clients/deleteClient', clientId);
        try {
          NotificationService.success('Deleted');
        } catch (err) {
          NotificationService.error(err.message);
        }
      }
    },
  },
};
</script>
