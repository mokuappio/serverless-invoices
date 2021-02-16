<template>
    <div class="form-group">
        <label :for="field" v-if="label" :class="labelClasses">{{ label }}</label>
        <div :class="containerClasses">
            <textarea :disabled="disabled"
                      :id="field"
                      :placeholder="placeholder"
                      class="form-control"
                      :rows="rows"
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
            </textarea>
        </div>
        <slot></slot>
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
    rows: {},
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
  methods: {
    focus() {
      this.$refs[this.field].focus();
    },
  },
};
</script>
