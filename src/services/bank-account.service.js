import data from '@/services/data.service';

class BankAccountService {
  async getBankAccounts() {
    return data.get('bank_accounts');
  }

  async getBankAccount(bankAccountId) {
    return data.get(`bank_accounts/${bankAccountId}`);
  }

  async createBankAccount(bankAccount) {
    return data.post('bank_accounts', bankAccount);
  }

  async updateBankAccount(bankAccount) {
    return data.patch(`bank_accounts/${bankAccount.id}`, bankAccount);
  }
}

export default new BankAccountService();
