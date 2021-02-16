<template>
    <div class="form-group multiselect--form-control">
        <label :for="field" v-if="label">{{ label }}</label>
        <Multiselect :id="field"
                     :options="options"
                     :track-by="trackBy"
                     :disabled="disabled"
                     :label="labelField"
                     :allow-empty="allowEmpty"
                     :custom-label="customLabel"
                     :deselect-label="deselectLabel"
                     :select-label="selectLabel"
                     :selected-label="selectedLabel"
                     :preserve-search="true"
                     @input="$emit('input', $event)"
                     @search-change="$emit('search-change', $event)"
                     :value="value"
                     :placeholder="placeholder"
                     :loading="loading"
                     :class="{
                         'is-invalid': errors && errors.has(field)
                     }"
                     :multiple="multiple"
        >
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData"/>
            </template>
        </Multiselect>
        <AppError v-if="errors" :errors="errors" :field="field"/>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import AppError from '@/components/form/AppError';

export default {
  components: {
    AppError,
    Multiselect,
  },
  props: {
    errors: {},
    label: {},
    value: {},
    field: {},
    options: {},
    multiple: {},
    trackBy: {},
    labelField: {},
    customLabel: {},
    placeholder: {},
    loading: {},
    allowEmpty: { default: false },
    deselectLabel: { default: '' },
    selectLabel: { default: '' },
    selectedLabel: { default: '' },
    disabled: { default: false },
  },
};
</script>
