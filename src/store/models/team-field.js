import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';

export default class TeamField extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'team_fields';

  static fields() {
    return {
      id: this.attr(() => uuidv4()),
      team_id: this.attr(null),
      label: this.attr(''),
      value: this.attr(''),
    };
  }
}
