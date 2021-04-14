import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';

export default class InvoiceRowTax extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'invoice_row_taxes';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      row_id: this.attr(null),
      label: this.attr(''),
      value: this.attr(''),
    };
  }
}
