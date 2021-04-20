<template>
    <div>
        <div v-for="field in client.fields" :key="field.id" class="col-sm-6">
            <AppEditable :value="field.label"
                         :placeholder="$t('label')"
                         @change="updateFieldProp({ label: $event }, field)"/>
            <i class="material-icons md-18 float-right pointer" @click="removeField(field)">close</i>
            <AppInput :value="field.value" @change="updateFieldProp({ value: $event }, field)"
                      :placeholder="field.label"/>
        </div>
        <div class="col-12">
            <button class="btn btn-sm btn-secondary" @click="addNewField">
                <i class="material-icons md-18">add</i>
                {{ $t('field') }}
            </button>
        </div>
    </div>
</template>
<script>
import NotificationService from '@/services/notification.service';
import AppInput from '@/components/form/AppInput';
import AppEditable from '@/components/form/AppEditable';

export default {
  i18nOptions: { namespaces: 'client-fields' },
  props: ['client'],
  components: {
    AppEditable,
    AppInput,
  },
  computed: {
    isNew() {
      return this.client && this.client.$isNew;
    },
  },
  methods: {
    addNewField() {
      this.$store.dispatch('clientFields/addNewField', this.client.id);
    },
    async removeField(field) {
      const confirmed = await this.$bvModal.msgBoxConfirm(`${this.$t('delete_modal.title')} ${field.label}?`, {
        okTitle: this.$t('delete_modal.ok_title'),
        okVariant: 'danger',
        cancelTitle: this.$t('delete_modal.cancel_title'),
        cancelVariant: 'btn-link',
        contentClass: 'bg-base dp--24',
      });
      if (confirmed) {
        await this.$store.dispatch('clientFields/deleteClientField', field.id);
        try {
          NotificationService.success(this.$t('notification_deleted'));
        } catch (err) {
          NotificationService.error(err.message);
        }
      }
    },
    updateFieldProp(props, field) {
      if (this.isNew) {
        return this.$store.dispatch('clientFields/clientFieldProps', {
          props,
          fieldId: field.id,
        });
      }
      this.$store.dispatch('clientFields/updateClientField', {
        props,
        fieldId: field.id,
      });
    },
  },
};
</script>
