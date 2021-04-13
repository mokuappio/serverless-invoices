import storage from 'localforage';
import TeamService from '@/services/team.service';
import {
  validate, generateInvoiceNumber, removeVuexORMFlags, uuidv4,
} from '@/utils/helpers';
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
    const team = await TeamService.getTeam();

    const invoices = await this.getInvoices();

    invoice.issued_at = dayjs()
      .format('YYYY-MM-DD');
    invoice.due_at = dayjs()
      .add(team.invoice_due_days || 14, 'days')
      .format('YYYY-MM-DD');
    invoice.number = generateInvoiceNumber(invoices);
    invoice.late_fee = team.invoice_late_fee || 0.5;
    invoice.from_name = team.company_name;
    invoice.from_address = team.company_address;
    invoice.from_postal_code = team.company_postal_code;
    invoice.from_city = team.company_city;
    invoice.from_country = team.company_country;
    invoice.from_county = team.company_county;
    invoice.from_website = team.website;
    invoice.from_email = team.contact_email;
    invoice.from_phone = team.contact_phone;
    invoice.vat_rate = team.vat_rate || 0;
    invoice.currency = team.currency || 'USD';

    // Add custom fields
    invoice.team_fields = team.fields.map(field => ({
      id: uuidv4(),
      label: field.label,
      value: field.value,
      invoice_id: invoice.id,
    }));

    delete invoice.client;


    return this.saveInvoice(invoice);
  }

  async updateInvoice(invoice) {
    const requiredFields = {
      currency: 'Currency',
      vat_rate: 'Vat Rate',
      late_fee: 'Late Fee',
      issued_at: 'Issued At',
      due_at: 'Due At',
      number: 'Number',
    };

    const res = validate(requiredFields, invoice);
    if (Object.keys(res.errors).length > 0) {
      return Promise.reject(res);
    }

    return this.saveInvoice(invoice);
  }

  async deleteInvoice(invoiceId) {
    const invoices = await this.getInvoices();
    const index = invoices.findIndex(item => item.id === invoiceId);
    invoices.splice(index, 1);
    return storage.setItem('invoices', invoices);
  }

  async bookInvoice(invoice) {
    const requiredFields = {
      currency: 'Currency',
      vat_rate: 'Vat rate',
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

  async saveInvoice(invoice) {
    const invoices = await this.getInvoices();
    const index = invoices.findIndex(item => item.id === invoice.id);

    delete invoice.client;
    removeVuexORMFlags(invoice);

    if (index === -1) {
      invoices.push(invoice);
    } else {
      invoices[index] = invoice;
    }
    await storage.setItem('invoices', invoices);
    return invoice;
  }
}

export default new InvoiceService();
