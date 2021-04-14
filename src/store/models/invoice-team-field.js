import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';

export default class InvoiceTeamField extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'invoice_team_fields';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      invoice_id: this.attr(null),
      team_field_id: this.attr(null),
      label: this.attr(''),
      value: this.attr(''),
    };
  }
}
