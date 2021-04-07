<template>
    <div>
        <strong>
            <AppEditable :value="invoice.bank_name"
                         v-b-modal.bank_account_no
                         :errors="errors"
                         :disabled="true"
                         field="bank_name"
                         placeholder="Add bank"
                         class="break-line"/>
        </strong>
        <AppEditable :value="invoice.bank_account_no"
                     v-b-modal.bank_account_no
                     :errors="errors"
                     :disabled="true"
                     field="bank_account_no"
                     placeholder="Add bank details"
                     class="break-line"/>
        <BModal id="bank_account_no"
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
import AppEditable from '@/components/form/AppEditable';

export default {
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
    BModal,
    BankAccountsList,
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
      this.$bvModal.hide('account_no');
    },
  },
};
</script>
