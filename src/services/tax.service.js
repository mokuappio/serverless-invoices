import storage from 'localforage';
import { removeVuexORMFlags } from '@/utils/helpers';

class TaxService {
  async getTaxes() {
    const taxes = await storage.getItem('taxes');

    return taxes || [];
  }

  async getTax(taxId) {
    const taxes = await this.getTaxes();
    return taxes.find(tax => tax.id === taxId);
  }

  async createTax(tax) {
    return this.saveTax(tax);
  }

  async updateTax(tax) {
    return this.saveTax(tax);
  }

  async deleteTax(taxId) {
    const taxes = await this.getTaxes();
    const index = taxes.findIndex(item => item.id === taxId);
    taxes.splice(index, 1);
    return this.setTaxes(taxes);
  }

  async saveTax(tax) {
    const taxes = await this.getTaxes();
    const index = taxes.findIndex(item => item.id === tax.id);
    removeVuexORMFlags(tax);
    if (index === -1) {
      taxes.push(tax);
    } else {
      taxes[index] = tax;
    }
    await this.setTaxes(taxes);
    return tax;
  }

  setTaxes(taxes) {
    return storage.setItem('taxes', taxes);
  }
}

export default new TaxService();
