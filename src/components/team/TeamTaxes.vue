<template>
    <div>
        <div v-for="tax in taxes" :key="tax.id">
            <AppEditable :value="tax.label"
                         :placeholder="$t('label')"
                         @change="updateTaxProp({ label: $event }, tax)"/> (%)
            <i class="material-icons md-18 float-right pointer" @click="removeTax(tax)">close</i>
            <AppInput :value="tax.value" @change="updateTaxProp({ value: $event }, tax)"
                      :placeholder="tax.label" type="number"/>
        </div>
        <button type="button" class="btn btn-sm btn-secondary" @click="addNewTax">
            <i class="material-icons md-18">add</i>
            {{ $t('tax') }}
        </button>
    </div>
</template>
<script>
import NotificationService from '@/services/notification.service';
import AppInput from '@/components/form/AppInput';
import AppEditable from '@/components/form/AppEditable';
import { mapGetters } from 'vuex';

export default {
  i18nOptions: { namespaces: 'team-taxes' },
  components: {
    AppEditable,
    AppInput,
  },
  computed: {
    ...mapGetters({
      taxes: 'taxes/all',
    }),
  },
  methods: {
    addNewTax() {
      this.$store.dispatch('taxes/addNewTax');
    },
    async removeTax(field) {
      const confirmed = await this.$bvModal.msgBoxConfirm(`${this.$t('delete_modal.title')} ${field.label}?`, {
        okTitle: this.$t('delete_modal.ok_title'),
        okVariant: 'danger',
        cancelTitle: this.$t('delete_modal.cancel_title'),
        cancelVariant: 'btn-link',
        contentClass: 'bg-base dp--24',
      });
      if (confirmed) {
        await this.$store.dispatch('taxes/deleteTax', field.id);
        try {
          this.$emit('changed');
          NotificationService.success(this.$t('notification_deleted'));
        } catch (err) {
          NotificationService.error(err.message);
        }
      }
    },
    updateTaxProp(props, tax) {
      this.$store.dispatch('taxes/updateTax', {
        props,
        taxId: tax.id,
      });
      this.$emit('changed');
    },
  },
};
</script>
