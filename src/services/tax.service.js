import data from '@/services/data.service';

class TaxService {
  getTaxes() {
    return data.get('taxes');
  }

  getTax(taxId) {
    return data.get(`taxes/${taxId}`);
  }

  createTax(tax) {
    return data.post('taxes', tax);
  }

  updateTax(tax) {
    return data.patch(`taxes/${tax.id}`, tax);
  }

  deleteTax(taxId) {
    return data.delete(`taxes/${taxId}`);
  }

  setTaxes(taxes) {
    return data.put('taxes', taxes);
  }
}

export default new TaxService();
