import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';
import Client from '@/store/models/client';
import InvoiceRow from '@/store/models/invoice-row';
import InvoiceClientField from '@/store/models/invoice-client-field';
import InvoiceTeamField from '@/store/models/invoice-team-field';

export default class Invoice extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'invoices';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      number: this.attr(''),
      status: this.attr('draft'),
      issued_at: this.attr(''),
      is_compact: this.attr(false),
      due_at: this.attr(''),
      late_fee: this.attr(''),
      currency: this.attr(''),
      from_name: this.attr(''),
      from_address: this.attr(''),
      from_postal_code: this.attr(''),
      from_city: this.attr(''),
      from_country: this.attr(''),
      from_county: this.attr(''),
      from_website: this.attr(''),
      from_email: this.attr(''),
      from_phone: this.attr(''),
      bank_name: this.attr(''),
      bank_account_no: this.attr(''),
      client_name: this.attr(''),
      client_address: this.attr(''),
      client_postal_code: this.attr(''),
      client_country: this.attr(''),
      client_county: this.attr(''),
      client_city: this.attr(''),
      client_email: this.attr(''),
      client_id: this.attr(null),
      client: this.belongsTo(Client, 'client_id'),
      rows: this.hasMany(InvoiceRow, 'invoice_id'),
      notes: this.attr(''),
      updated_at: this.attr(''),
      created_at: this.attr(''),
      total: this.attr(null), // Only used in lists.
      client_fields: this.hasMany(InvoiceClientField, 'invoice_id'),
      team_fields: this.hasMany(InvoiceTeamField, 'invoice_id'),
    };
  }

  get subTotal() {
    return this.rows.reduce((carr, row) => (row.quantity * row.price) + carr, 0);
  }

  // eslint-disable-next-line no-empty-function
  set subTotal(val) {}

  get total() {
    return this.subTotal + this.taxTotal;
  }

  // eslint-disable-next-line no-empty-function
  set total(val) {}

  get taxTotal() {
    return Object.values(this.taxes).reduce((carr, tax) => (tax.total + carr), 0);
  }

  // eslint-disable-next-line no-empty-function
  set taxTotal(val) {}

  get taxes() {
    const taxes = {};

    this.rows.forEach(row => row.taxes.forEach((tax) => {
      if (!taxes.hasOwnProperty(tax.label)) {
        taxes[tax.label] = {
          total: 0,
          label: tax.label,
          rate: tax.value,
        };
      }
      taxes[tax.label].total += (row.quantity * row.price) * tax.value / 100;
    }));

    return taxes;
  }

  // eslint-disable-next-line no-empty-function
  set taxes(val) {}
}
