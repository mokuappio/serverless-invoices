import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';

export default class Team extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'teams';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      company_name: this.attr(''),
      company_address: this.attr(''),
      company_postal_code: this.attr(''),
      company_country: this.attr(''),
      company_county: this.attr(''),
      company_city: this.attr(''),
      company_reg_no: this.attr(''),
      company_vat_no: this.attr(''),
      website: this.attr(''),
      contact_email: this.attr(''),
      contact_phone: this.attr(''),
      vat_rate: this.attr(null),
      invoice_late_fee: this.attr(null),
      invoice_due_days: this.attr(null),
      updated_at: this.attr(''),
      created_at: this.attr(''),
      logo_url: this.attr(''),
    };
  }
}
