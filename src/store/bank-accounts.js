import BankAccountService from '@/services/bank-account.service';
import BankAccount from '@/store/models/bank-account';

export default {
  namespaced: true,
  state: {
    bankAccountId: null,
    isModalOpen: null,
  },
  mutations: {
    bankAccountId(state, bankAccountId) {
      state.bankAccountId = bankAccountId;
    },
    isModalOpen(state, isOpen) {
      state.isModalOpen = isOpen;
    },
  },
  actions: {
    init({ dispatch }) {
      return dispatch('getBankAccounts');
    },
    terminate() {
      return BankAccount.deleteAll();
    },
    async getBankAccounts() {
      const accounts = await BankAccountService.getBankAccounts();
      await BankAccount.create({ data: accounts });
      return accounts;
    },
    async getBankAccount({ commit }, bankAccountId) {
      const bankAccount = await BankAccountService.getBankAccount(bankAccountId);
      commit('bankAccountId', bankAccount.id);
      return BankAccount.insert({ data: bankAccount });
    },
    async createNewBankAccount(store, bankAccount) {
      const res = await BankAccountService.createBankAccount(bankAccount);
      await BankAccount.insert({ data: res });
      return BankAccount.find(res.id);
    },
    bankAccountProps({ state }, props) {
      return BankAccount.update({
        where: state.bankAccountId,
        data: props,
      });
    },
    async updateBankAccount({ getters, dispatch }, props) {
      await dispatch('bankAccountProps', props);
      return BankAccountService.updateBankAccount(getters.bankAccount);
    },
    async openNewBankAccountModal({ commit }) {
      const bankAccount = await BankAccount.createNew();
      commit('bankAccountId', bankAccount.id);
      commit('isModalOpen', true);
    },
  },
  getters: {
    bankAccount(state) {
      return BankAccount.query()
        .find(state.bankAccountId);
    },
    all() {
      return BankAccount.query()
        .where('$isNew', false)
        .get();
    },
  },
};
