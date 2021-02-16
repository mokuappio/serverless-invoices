import storage from 'localforage';

class InvoiceService {
  async getInvoices() {
    const invoices = await storage.getItem('invoices');
    return invoices || [];
  }

  async getInvoice(invoiceId) {
    const invoices = await this.getInvoices();
    return invoices.find(invoice => invoice.id === invoiceId);
  }

  async createInvoice(invoice) {
    // TODO: add invoice no, issued_at, due_at, late_fee, prefill company info, bank_info, currency, vat_rate
    const invoices = await this.getInvoices();

    delete invoice.$id;
    delete invoice.$isNew;
    delete invoice.$isDirty;

    invoices.push(invoice);
    await storage.setItem('invoices', invoices);
  }

  async updateInvoice(invoice) {
    // TODO: validation
    const invoices = await this.getInvoices();
    const index = invoices.findIndex(item => item.id === invoice.id);
    invoices[index] = invoice;
    return storage.setItem('invoices', invoices);
  }

  async deleteInvoice(invoiceId) {
    const invoices = await this.getInvoices();
    const index = invoices.findIndex(item => item.id === invoiceId);
    invoices.splice(index, 1);
    return storage.setItem('invoices', invoices);
  }

  bookInvoice(invoice) {
    // TODO: validation
    invoice.status = 'booked';
    return this.updateInvoice(invoice);
  }
}

export default new InvoiceService();
