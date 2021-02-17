import storage from 'localforage';
import { removeVuexORMFlags } from '@/utils/helpers';

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
    return this.saveBankAccount(bankAccount);
  }

  async updateBankAccount(bankAccount) {
    return this.saveBankAccount(bankAccount);
  }

  async saveBankAccount(bankAccount) {
    const bankAccounts = await this.getBankAccounts();
    const index = bankAccounts.findIndex(item => item.id === bankAccount.id);
    removeVuexORMFlags(bankAccount);
    if (index === -1) {
      bankAccounts.push(bankAccount);
    } else {
      bankAccounts[index] = bankAccount;
    }
    await storage.setItem('bank_accounts', bankAccounts);
    return bankAccount;
  }
}

export default new BankAccountService();
