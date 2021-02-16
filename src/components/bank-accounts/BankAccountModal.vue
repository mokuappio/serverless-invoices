<template>
    <BModal v-model="isOpen"
            centered
            hide-footer
            hide-header
            size="md"
            content-class="bg-base dp--24">
        <BankAccountForm @done="close()"/>
    </BModal>
</template>

<script>
import { mapGetters } from 'vuex';
import { BModal } from 'bootstrap-vue';
import BankAccountForm from '@/components/bank-accounts/BankAccountForm';

export default {
  components: {
    BModal,
    BankAccountForm,
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.bankAccounts.isModalOpen;
      },
      set(val) {
        if (!val) {
          this.$router.push({ query: {} });
          this.$store.dispatch('bankAccounts/getBankAccounts');
        }
        this.$store.commit('bankAccounts/isModalOpen', val);
      },
    },
    ...mapGetters({
      bankAccount: 'bankAccounts/bankAccount',
    }),
  },
  watch: {
    '$route.query.bankAccountId'() {
      this.getBankAccount();
    },
  },
  mounted() {
    this.getBankAccount();
  },
  methods: {
    getBankAccount() {
      const query = this.$route.query;
      if (query.hasOwnProperty('bankAccountId')) {
        if ((this.bankAccount && this.bankAccount.id !== query.bankAccountId) || !this.bankAccount) {
          this.$store.dispatch('bankAccounts/getBankAccount', query.bankAccountId);
        }

        this.$store.commit('bankAccounts/isModalOpen', true);
      } else {
        this.$store.commit('bankAccounts/isModalOpen', false);
      }
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>
