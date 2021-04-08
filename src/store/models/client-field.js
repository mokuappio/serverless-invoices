import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';

export default class ClientField extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'client_fields';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      client_id: this.attr(null),
      label: this.attr(''),
      value: this.attr(''),
    };
  }
}
