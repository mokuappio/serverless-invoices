import storage from 'localforage';

class BankAccountService {
  async getBankAccounts() {
    const bankAccounts = await storage.getItem('bank_accounts');

    return bankAccounts || [];
  }

  async getBankAccount(bankAccountId) {
    const bankAccounts = await this.getBankAccounts();
    return bankAccounts.find(bank_account => bank_account.id === bankAccountId);
  }

  async createBankAccount(bankAccount) {
    const bankAccounts = await this.getBankAccounts();

    delete bankAccount.$id;
    delete bankAccount.$isNew;
    delete bankAccount.$isDirty;

    bankAccounts.push(bankAccount);
    await storage.setItem('bank_accounts', bankAccounts);
    return bankAccount;
  }

  async updateBankAccount(bankAccount) {
    const bankAccounts = await this.getBankAccounts();
    const index = bankAccounts.findIndex(item => item.id === bankAccount.id);
    bankAccounts[index] = bankAccount;
    return storage.setItem('bank_accounts', bankAccounts);
  }
}

export default new BankAccountService();
