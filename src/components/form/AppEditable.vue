<template>
    <span :class="{
        'text-muted': !tmpVal,
        'd-print-none': !tmpVal,
        'is-invalid': errors && errors.has(field)
         }"
          class="editable">
        <span ref="editable"
              class="editable__item"
              :contenteditable="!disabled"
              v-on="listeners"
              :class="{'position-absolute': !tmpVal || (!tmpVal && !isFocused)}"
        ></span>
        <span v-if="!tmpVal" @click="focus"
              class="editable__item">{{ placeholder }}</span>
        <span v-if="suffix">{{ suffix }}</span>
        <AppError v-if="errors" :errors="errors" :field="field"/>
    </span>
</template>

<script>
import AppError from '@/components/form/AppError';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Enter item',
    },
    disabled: {
      default: false,
    },
    suffix: {},
    errors: {},
    field: {},
  },
  components: {
    AppError,
  },
  data() {
    return {
      focusInVal: null,
      tmpVal: null,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focusin: this.onFocusIn,
        focusout: this.onFocusOut,
        isFocused: false,
      };
    },
  },
  watch: {
    value() {
      this.$refs.editable.innerText = this.value;
      this.tmpVal = this.value;
    },
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
    this.tmpVal = this.value;
  },
  methods: {
    onInput(e) {
      this.tmpVal = e.target.innerText;
      this.$emit('input', this.tmpVal);
    },
    onFocusIn() {
      this.isFocused = true;
      this.focusInVal = this.$refs.editable.innerText;
    },
    onFocusOut() {
      this.isFocused = false;
      if (this.focusInVal !== this.$refs.editable.innerText) {
        this.$emit('change', this.$refs.editable.innerText);
      }
    },
    focus() {
      this.$refs.editable.focus();
    },
  },
};
</script>
