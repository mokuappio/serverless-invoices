<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h4>Bank account</h4>
            </div>
        </div>
        <div v-if="bankAccount" class="row">
            <AppInput :value="bankAccount.bank_name"
                      @change="updateProp({ bank_name: $event })"
                      label="Bank Name"
                      field="bank_name"
                      :errors="errors"
                      class="col-sm-10"/>
            <AppInput :value="bankAccount.account_no"
                      @change="updateProp({ account_no: $event })"
                      label="Account no"
                      field="account_no"
                      :errors="errors"
                      class="col-12"/>
        </div>

        <div v-else class="row">
            <div class="col-12 pt-3">
                <p>Loading..</p>
            </div>
        </div>

        <div class="row mt-3 text-right">
            <div class="col-12">
                <button v-if="!isNew" class="btn btn-primary"
                        @click="$emit('done')">Done
                </button>
                <button v-if="isNew" class="btn btn-primary ml-2"
                        :disabled="loading"
                        @click="createBankAccount">Create
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NotificationService from '@/services/notification.service';
import AppInput from '@/components/form/AppInput';
import Errors from '@/utils/errors';

export default {
  components: {
    AppInput,
  },
  data() {
    return {
      errors: new Errors(),
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      bankAccount: 'bankAccounts/bankAccount',
    }),
    isNew() {
      return this.bankAccount && this.bankAccount.$isNew;
    },
  },
  methods: {
    updateProp(props) {
      if (this.isNew) {
        return this.$store.dispatch('bankAccounts/bankAccountProps', props);
      }
      this.errors.clear();

      return this.$store.dispatch('bankAccounts/updateBankAccount', props)
        .then(() => {
          NotificationService.success('Updated');
        })
        .catch(err => this.errors.set(err.errors));
    },
    createBankAccount() {
      this.loading = true;
      this.errors.clear();

      return this.$store.dispatch('bankAccounts/createNewBankAccount', this.bankAccount)
        .then((bankAccount) => {
          this.$router.push({
            query: {
              bankAccountId: bankAccount.id,
            },
          });
          this.$emit('done');
        })
        .catch(err => this.errors.set(err.errors))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
