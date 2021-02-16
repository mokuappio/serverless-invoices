<template>
    <div class="form-group">
        <label :for="field" :class="labelClasses" v-if="label">{{ label }}</label>
        <div :class="containerClasses">
            <input :disabled="disabled"
                   :type="inputType"
                   :id="field"
                   :placeholder="placeholder"
                   class="form-control"
                   :class="[
                   errors && errors.has(field) ? 'is-invalid' : '',
                   size ? 'form-control-' + size : '',
                   ...inputClasses,
                   ]"
                   :autocomplete="autocomplete"
                   :maxlength="max"
                   :value="value"
                   @input="$emit('input', $event.target.value)"
                   @change="$emit('change', $event.target.value)"
                   @keydown.self.enter.exact="$emit('submit', $event.target.value)"
                   :ref="field"
            >
            <slot></slot>
        </div>
        <AppError v-if="errors" :errors="errors" :field="field"/>
    </div>
</template>

<script>
import AppError from '@/components/form/AppError';

export default {
  components: {
    AppError,
  },
  props: {
    errors: {},
    label: {},
    value: {},
    field: {},
    type: {},
    max: {},
    disabled: {},
    placeholder: {},
    size: {},
    labelClasses: {},
    inputClasses: {},
    containerClasses: {},
    autocomplete: {
      default: 'on',
    },
  },
  computed: {
    inputType() {
      return this.type || 'text';
    },
  },
  methods: {
    focus() {
      this.$refs[this.field].focus();
    },
  },
};
</script>
