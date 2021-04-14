<template>
    <div>
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <h4>Team</h4>
                <div v-if="team">
                    <button class="btn btn-sm btn-primary"
                            @click="$emit('done')">Done
                    </button>
                </div>
            </div>
        </div>

        <b-tabs v-if="team" nav-class="nav-tabs--simple mb-4" active-tab-class="active" class="row">
            <b-tab title="General" class="col-12">
                <div class="row">
                    <TeamLogo :errors="errors" class="col-sm-4"/>
                </div>
                <div class="row">
                    <AppInput :value="team.company_name" @change="updateProp({ company_name: $event })"
                              label="Company Name" field="company_name" :errors="errors" class="col-12"/>
                    <AppInput :value="team.contact_email" @change="updateProp({ contact_email: $event })"
                              label="Email" field="contact_email" :errors="errors" class="col-sm-7"/>
                    <AppInput :value="team.contact_phone" @change="updateProp({ contact_phone: $event })"
                              label="Phone" field="contact_phone" :errors="errors" class="col-sm-7"/>
                    <AppInput :value="team.website" @change="updateProp({ website: $event })"
                              label="Website" field="website" :errors="errors" class="col-sm-7"/>
                </div>

                <TeamFields class="row" :team="team"/>
            </b-tab>

            <b-tab title="Invoicing" class="col-12">
                <div class="row">
                    <AppInput :value="team.invoice_late_fee" @change="updateProp({ invoice_late_fee: $event })"
                              type="number"
                              label="Late fee (%)" field="invoice_late_fee" :errors="errors" class="col-sm-4"/>
                    <AppInput :value="team.invoice_due_days" @change="updateProp({ invoice_due_days: $event })"
                              type="number"
                              label="Payment terms, days" field="invoice_due_days" :errors="errors" class="col-sm-4"/>
                    <AppInput :value="team.currency" @change="updateProp({ currency: $event })"
                              label="Default currency" field="currency" :errors="errors" class="col-sm-4"/>
                </div>
            </b-tab>

            <b-tab title="Address" class="col-12">
                <div class="row">
                    <AppInput :value="team.company_address" @change="updateProp({ company_address: $event })"
                              label="Company Address" field="company_address" :errors="errors"
                              class="col-12"/>
                    <AppInput :value="team.company_postal_code"
                              @change="updateProp({ company_postal_code: $event })"
                              label="Postal code" field="company_postal_code" :errors="errors"
                              class="col-sm-5"/>
                    <AppInput :value="team.company_city" @change="updateProp({ company_city: $event })"
                              label="City" field="company_city" :errors="errors" class="col-sm-7"/>
                    <AppInput :value="team.company_county" @change="updateProp({ company_county: $event })"
                              label="County/State" field="company_county" :errors="errors" class="col-sm-6"/>
                    <AppInput :value="team.company_country" @change="updateProp({ company_country: $event })"
                              label="Country" field="company_country" :errors="errors" class="col-sm-6"/>
                </div>
            </b-tab>

            <b-tab title="Taxes" class="col-12">
                <TeamTaxes class="row"/>
            </b-tab>

        </b-tabs>

        <div v-if="!team">Loading</div>
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
          NotificationService.success('Updated');
        })
        .catch(err => this.errors.set(err.errors));
    },
  },
};
</script>
