<template>
    <div>
        <label :for="field" :class="labelClasses" v-if="label">{{ label }}</label>
        <div :class="containerClasses">
            <!-- <div class="input-group-prepend">
               <span class="input-group-text">
                 <i class="material-icons md-18 text-muted" v-if="value">today</i>
                 <i class="material-icons md-18 text-muted" v-else>calendar_today</i>
               </span>
             </div>-->
            <DatePicker :disabled="disabled"
                        :inline="inline"
                        :id="field"
                        :class="[
                            errors && errors.has(field) ? 'is-invalid' : '',
                            ...inputClasses,
                            ]"
                        :placeholder="placeholder"
                        autocomplete="off"
                        @change="outputValue"
                        :lang="{
                            formatLocale: {
                                firstDayOfWeek: 1,
                            },
                        }"
                        :range="mode === 'range'"
                        :format="format"
                        :type="type"
                        :value="inputValue"/>
            <slot></slot>
            <AppError v-if="errors" :errors="errors" :field="field"/>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import DatePicker from 'vue2-datepicker';
import AppError from '@/components/form/AppError';

export default {
  components: {
    AppError,
    DatePicker,
  },
  props: {
    errors: {},
    label: {},
    mode: {},
    value: {},
    field: {},
    disabled: {},
    inline: {
      default: false,
    },
    format: {
      default: 'YYYY-MM-DD',
    },
    modelFormat: {
      default: 'YYYY-MM-DD',
    },
    type: {},
    placeholder: {},
    labelClasses: {},
    inputClasses: {},
    containerClasses: {},
  },
  computed: {
    inputValue() {
      return Array.isArray(this.value)
        ? this.value.map(val => dayjs(val, this.modelFormat).toDate())
        : dayjs(this.value, this.modelFormat).toDate();
    },
  },
  methods: {
    outputValue(event) {
      const value = Array.isArray(event)
        ? event.map(val => this.toModelFormat(val))
        : this.toModelFormat(event);
      this.$emit('input', value);
      this.$emit('change', value);
    },
    toModelFormat(val) {
      return val ? dayjs(val).format(this.modelFormat) : null;
    },
  },
};
</script>
<style lang="scss">
.mx-datepicker-popup {
  z-index: 1040;
}

.mx-datepicker {
  width: 100%;
}
</style>
