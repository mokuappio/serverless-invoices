<template>
    <div>
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <h4>{{ $t('title') }}</h4>
                <div v-if="team">
                    <button class="btn btn-sm btn-primary"
                            @click="done">{{ $t('done') }}
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <b-tabs v-if="team" nav-class="nav-tabs--simple mb-4 ml-n3" active-tab-class="active" class="col-12">
                <b-tab :title="$t('tabs.general')">
                    <div class="row mb-2">
                        <div class="col-12">
                            <label>Logo</label>
                            <TeamLogo :errors="errors"/>
                        </div>
                    </div>
                    <div class="row">
                        <AppInput :value="team.company_name" @change="updateProp({ company_name: $event })"
                                  :label="$t('general.company_name')" field="company_name" :errors="errors"
                                  class="col-12"/>
                        <AppInput :value="team.contact_email" @change="updateProp({ contact_email: $event })"
                                  :label="$t('general.contact_email')" field="contact_email" :errors="errors"
                                  class="col-12"/>
                        <AppInput :value="team.contact_phone" @change="updateProp({ contact_phone: $event })"
                                  :label="$t('general.contact_phone')" field="contact_phone" :errors="errors"
                                  class="col-12"/>
                        <AppInput :value="team.website" @change="updateProp({ website: $event })"
                                  :label="$t('general.website')" field="website" :errors="errors" class="col-12"/>
                    </div>

                    <TeamFields class="row" :team="team"/>
                </b-tab>

                <b-tab :title="$t('tabs.invoicing')">
                    <div class="row">
                        <AppInput :value="team.invoice_late_fee" @change="updateProp({ invoice_late_fee: $event })"
                                  type="number"
                                  :label="$t('invoicing.invoice_late_fee')" field="invoice_late_fee" :errors="errors"
                                  class="col-12"/>
                        <AppInput :value="team.invoice_due_days" @change="updateProp({ invoice_due_days: $event })"
                                  type="number"
                                  :label="$t('invoicing.invoice_due_days')" field="invoice_due_days" :errors="errors"
                                  class="col-sm-7"/>
                        <AppInput :value="team.currency" @change="updateProp({ currency: $event })"
                                  :label="$t('invoicing.currency')" field="currency" :errors="errors" class="col-sm-5"/>
                    </div>
                </b-tab>

                <b-tab :title="$t('tabs.address')">
                    <div class="row">
                        <AppInput :value="team.company_address" @change="updateProp({ company_address: $event })"
                                  :label="$t('address.company_address')" field="company_address" :errors="errors"
                                  class="col-12"/>
                        <AppInput :value="team.company_postal_code"
                                  @change="updateProp({ company_postal_code: $event })"
                                  :label="$t('address.company_postal_code')" field="company_postal_code"
                                  :errors="errors"
                                  class="col-sm-5"/>
                        <AppInput :value="team.company_city" @change="updateProp({ company_city: $event })"
                                  :label="$t('address.company_city')" field="company_city" :errors="errors"
                                  class="col-sm-7"/>
                        <AppInput :value="team.company_county" @change="updateProp({ company_county: $event })"
                                  :label="$t('address.company_county')" field="company_county" :errors="errors"
                                  class="col-sm-6"/>
                        <AppInput :value="team.company_country" @change="updateProp({ company_country: $event })"
                                  :label="$t('address.company_country')" field="company_country" :errors="errors"
                                  class="col-sm-6"/>
                    </div>
                </b-tab>

                <b-tab :title="$t('tabs.taxes')">
                    <TeamTaxes @changed="taxesChanged = true"/>
                </b-tab>
            </b-tabs>
        </div>

        <div v-if="!team">{{ $t('loading') }}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {
  BTab, BTabs,
} from 'bootstrap-vue';
import NotificationService from '@/services/notification.service';
import AppInput from '@/components/form/AppInput';
import Errors from '@/utils/errors';
import TeamFields from '@/components/team/TeamFields';
import TeamLogo from '@/components/team/TeamLogo';
import TeamTaxes from '@/components/team/TeamTaxes';

export default {
  i18nOptions: { namespaces: 'team-form' },
  components: {
    TeamLogo,
    TeamFields,
    TeamTaxes,
    AppInput,
    BTab,
    BTabs,
  },
  data() {
    return {
      errors: new Errors(),
      loading: false,
      taxesChanged: false,
    };
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
  methods: {
    updateProp(props) {
      this.errors.clear();

      this.$store.dispatch('teams/updateTeam', props)
        .then(() => {
          NotificationService.success(this.$t('updated'));
        })
        .catch(err => this.errors.set(err.errors));
    },
    async done() {
      if (this.taxesChanged) {
        await this.promptUpdateInvoiceRowTaxes();
      }
      this.$emit('done');
    },
    async promptUpdateInvoiceRowTaxes() {
      const confirmed = await this.$bvModal.msgBoxConfirm(this.$t('tax_modal.title'), {
        okTitle: this.$t('tax_modal.ok_title'),
        okVariant: 'primary',
        cancelTitle: this.$t('tax_modal.cancel_title'),
        cancelVariant: 'btn-link',
        contentClass: 'bg-base dp--24',
      });
      if (confirmed) {
        await this.$store.dispatch('invoiceRows/overwriteTaxes');
        NotificationService.success(this.$t('tax_modal.taxes_updated'));
      }
    },
  },
};
</script>
