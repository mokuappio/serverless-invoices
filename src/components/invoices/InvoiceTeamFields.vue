<template>
    <div>
        <div v-for="field in invoice.team_fields">
            <span :class="{'d-print-none': !field.value }">{{ field.label }}: </span>
            <AppEditable :value="field.value"
                         :placeholder="field.label"
                         class="break-line"
                         @change="updateProp({ value: $event }, field)"/>
        </div>
    </div>
</template>
<script>
import AppEditable from '@/components/form/AppEditable';

export default {
  props: ['invoice'],
  components: {
    AppEditable,
  },
  methods: {
    updateProp(props, field) {
      this.$store.dispatch('invoiceTeamFields/updateInvoiceTeamField', {
        props,
        fieldId: field.id,
        invoiceId: this.invoice.id,
      });
      this.$store.dispatch('teamFields/updateTeamField', {
        fieldId: field.team_field_id,
        props,
      });
    },
  },
};
</script>
