import { validate } from '@/utils/helpers';
import data from '@/services/data.service';

class InvoiceService {
  async getInvoices() {
    return data.get('invoices');
  }

  async getInvoice(invoiceId) {
    return data.get(`invoices/${invoiceId}`);
  }

  async createInvoice(invoice) {
    delete invoice.client;

    return data.post('invoices', invoice);
  }

  async updateInvoice(invoice) {
    const requiredFields = {
      currency: 'Currency',
      late_fee: 'Late Fee',
      issued_at: 'Issued At',
      due_at: 'Due At',
      number: 'Number',
    };

    const res = validate(requiredFields, invoice);
    if (Object.keys(res.errors).length > 0) {
      return Promise.reject(res);
    }

    return data.patch(`invoices/${invoice.id}`, invoice);
  }

  async deleteInvoice(invoiceId) {
    return data.delete(`invoices/${invoiceId}`);
  }

  async bookInvoice(invoice) {
    const requiredFields = {
      currency: 'Currency',
      late_fee: 'Late fee',
      issued_at: 'Issued at',
      due_at: 'Due at',
      number: 'Number',
      client_id: 'Client',
      client_name: 'Client name',
      client_address: 'Address',
      client_postal_code: 'Postal code',
      client_city: 'City',
      client_email: 'Client\'s email',
      client_country: 'Country',
      from_name: 'Name',
      from_address: 'Address',
      from_postal_code: 'Postal code',
      from_country: 'Country',
      from_city: 'City',
      from_website: 'Website',
      from_email: 'Your email',
      from_phone: 'Your phone',
      bank_name: 'Bank name',
      bank_account_no: 'Bank account details',
      rows: {
        item: 'Item',
        quantity: 'Quantity',
        price: 'Price',
        unit: 'Unit',
      },
    };

    const res = await validate(requiredFields, invoice);
    if (Object.keys(res.errors).length > 0) {
      return Promise.reject(res);
    }

    invoice.status = 'booked';
    return this.updateInvoice(invoice);
  }
}

export default new InvoiceService();
