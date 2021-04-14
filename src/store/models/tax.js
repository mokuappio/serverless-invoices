import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';

export default class Tax extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'taxes';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      label: this.attr(''),
      value: this.attr(''),
    };
  }
}
