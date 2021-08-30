<template>
    <div>
        <strong>
            <AppEditable :value="invoice.bank_name"
                         v-b-modal.bank_account_no
                         :errors="errors"
                         :disabled="true"
                         field="bank_name"
                         :placeholder="$t('bank_name')"
                         class="break-line"/>
        </strong>
        <AppEditable :value="invoice.bank_account_no"
                     v-b-modal.bank_account_no
                     :errors="errors"
                     :disabled="true"
                     field="bank_account_no"
                     :placeholder="$t('bank_account_no')"
                     class="break-line"/>
        <BModal id="bank_account_no"
                centered
                :title="$t('bank_account_modal_title')"
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
  i18nOptions: { namespaces: 'invoice-bank-details' },
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
      this.$bvModal.hide('bank_account_no');
    },
  },
};
</script>
