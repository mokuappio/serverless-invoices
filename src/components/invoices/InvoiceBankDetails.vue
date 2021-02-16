<template>
    <div>
        <strong v-b-modal.bank_details class="editable__item"
                :class="{'is-invalid': errors && errors.has('bank_account_no')}">
            {{ invoice.bank_account_no }}
            <span v-if="!invoice.bank_account_no">Add bank account no</span>
        </strong>
        <AppError :errors="errors" field="bank_account_no"/>
        <br>
        <span class="editable__item" v-b-modal.bank_details
              :class="{'is-invalid': errors && errors.has('bank_name')}">
            {{ invoice.bank_name }}
            <span v-if="!invoice.bank_name">Add bank name</span>
        </span>
        <AppError :errors="errors" field="bank_name"/>

        <BModal id="bank_details"
                centered
                title="Choose bank account"
                hide-footer
                size="lg"
                content-class="bg-base dp--24">
           <BankAccountsList @select="accountSelected"/>
        </BModal>
    </div>
</template>
<script>
import { BModal, VBModal } from 'bootstrap-vue';
import BankAccountsList from '@/components/bank-accounts/BankAccountsList';
import AppError from '@/components/form/AppError';

export default {
  props: ['invoice', 'errors'],
  components: {
    BModal,
    BankAccountsList,
    AppError,
  },
  directives: {
    'b-modal': VBModal,
  },
  methods: {
    accountSelected(account) {
      this.$emit('update', {
        bank_account_no: account.account_no,
        bank_name: account.bank_name,
        bank_account_id: account.id,
      });
      this.$bvModal.hide('bank_details');
    },
  },
};
</script>
