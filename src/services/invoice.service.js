import storage from 'localforage';
import { validate, generateInvoiceNumber } from '@/utils/helpers';
import dayjs from 'dayjs';

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
    const team = storage.getItem('team');

    const invoices = await this.getInvoices();

    invoice.issued_at = dayjs()
      .format('YYYY-MM-DD');
    invoice.due_at = dayjs()
      .add(14, 'days')
      .format('YYYY-MM-DD');
    invoice.number = generateInvoiceNumber(dayjs()
      .format('YYYY'), invoices.length + 1);
    invoice.late_fee = 0.5;
    invoice.from_name = team.company_name;
    invoice.from_address = team.company_address;
    invoice.from_postal_code = team.from_postal_code;
    invoice.from_city = team.company_city;
    invoice.from_country = team.company_country;
    invoice.from_county = team.company_county;
    invoice.from_reg_no = team.company_reg_no;
    invoice.from_vat_no = team.company_vat_no;
    invoice.from_website = team.website;
    invoice.from_email = team.contact_email;
    invoice.from_phone = team.contact_phone;
    invoice.vat_rate = 0;
    invoice.currency = 'USD';

    delete invoice.$id;
    delete invoice.$isNew;
    delete invoice.$isDirty;

    invoices.push(invoice);
    await storage.setItem('invoices', invoices);
  }

  async updateInvoice(invoice) {
    const necessaryFields = {
      currency: 'Currency',
      vat_rate: 'Vat Rate',
      late_fee: 'Late Fee',
      issued_at: 'Issued At',
      due_at: 'Due At',
      number: 'Number',
    };

    const validation = validate(necessaryFields, invoice);

    if (validation.length === 0) {
      const invoices = await this.getInvoices();
      const index = invoices.findIndex(item => item.id === invoice.id);
      invoices[index] = invoice;
      return storage.setItem('invoices', invoices);
    }
    return Promise.reject(validation);
  }

  async deleteInvoice(invoiceId) {
    const invoices = await this.getInvoices();
    const index = invoices.findIndex(item => item.id === invoiceId);
    invoices.splice(index, 1);
    return storage.setItem('invoices', invoices);
  }

  async bookInvoice(invoice) {
    const necessaryFields = {
      currency: 'Currency',
      vat_rate: 'Vat rate',
      late_fee: 'Late fee',
      issued_at: 'Issued At',
      due_at: 'Due At',
      number: 'Number',
      client_id: 'Client Id',
      client_name: 'Client Name',
      client_address: 'Client Address',
      client_postal_code: 'Client Postal Code',
      client_city: 'Client City',
      client_email: 'Client Email',
      client_country: 'Country',
      from_name: 'Name',
      from_address: 'Address',
      from_postal_code: 'Postal Code',
      from_country: 'Country/State',
      from_city: 'City',
      from_website: 'Website',
      from_email: 'Your Email',
      from_phone: 'From Phone',
      bank_name: 'Bank Name',
      bank_account_no: 'Bank Account No.',
      project_id: 'Project Id',
      rows: {
        item: 'Item',
        quantity: 'Quantity',
        price: 'Price',
        unit: 'Unit',
      },
    };

    const validation = await validate(necessaryFields, invoice);

    if (validation.length === 0) {
      invoice.status = 'booked';
      return this.updateInvoice(invoice);
    }
    return Promise.reject(validation);
  }
}

export default new InvoiceService();
