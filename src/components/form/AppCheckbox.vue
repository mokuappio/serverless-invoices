<template>
    <div>
        <div class="form-check">
            <input type="checkbox" :id="field"
                   class="form-check-input"
                   :class="{
                     'is-invalid': errors && errors.has(field)
                 }"
                   :checked="value"
                   @input="$emit('input', $event.target.checked)">
            <label class="form-check-label" :for="field">
                {{ label }}
                <slot/>
            </label>
            <AppError v-if="errors" :errors="errors" :field="field"/>
        </div>
    </div>
</template>

<script>
import AppError from '@/components/form/AppError';

export default {
  components: {
    AppError,
  },
  props: ['errors', 'label', 'value', 'field'],
};
</script>
