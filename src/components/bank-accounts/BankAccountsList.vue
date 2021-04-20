<template>
    <div>
        <div v-if="!bankAccounts">{{ $t('loading') }}</div>
        <div v-else-if="bankAccounts && bankAccounts.length > 0">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>{{ $t('bank') }}</th>
                    <th>{{ $t('bank_account_details') }}</th>
                    <th class="text-right"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="account in bankAccounts" :key="account.id"
                    @click="onSelect(account)" :class="{pointer: $listeners.select }">
                    <td>{{ account.bank_name }}</td>
                    <td>{{ account.account_no }}</td>
                    <td class="text-right">
                        <i class="material-icons md-18 p-1 pointer"
                           @click.stop="openBankAccountModal(account)">
                            edit
                        </i>
                    </td>
                </tr>
                </tbody>
            </table>
            <button class="btn btn-sm btn-link" @click="createNewAccount">{{ $t('add_bank_account') }}</button>
        </div>
        <EmptyState v-else>
            <template v-slot>
                <button class="btn btn-sm btn-link" @click="createNewAccount">{{ $t('add_bank_account') }}</button>
            </template>
        </EmptyState>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { formatDate } from '@/filters/date.filter';
import EmptyState from '@/components/EmptyState';

export default {
  i18nOptions: { namespaces: 'bank-accounts-list' },
  components: {
    EmptyState,
  },
  filters: {
    date: formatDate,
  },
  computed: {
    ...mapGetters({
      bankAccounts: 'bankAccounts/all',
    }),
  },
  mounted() {
    this.$store.dispatch('bankAccounts/getBankAccounts');
  },
  methods: {
    createNewAccount() {
      this.$store.dispatch('bankAccounts/openNewBankAccountModal');
    },
    openBankAccountModal(bankAccount) {
      this.$store.commit('bankAccounts/bankAccountId', bankAccount.id);
      this.$router.push({
        query: {
          bankAccountId: bankAccount.id,
        },
      });
    },
    onSelect(account) {
      this.$emit('select', account);
    },
  },
};
</script>
