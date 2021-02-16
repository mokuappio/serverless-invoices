<template>
  <div class="form-group color-picker">
    <label :for="field" v-if="label">{{ label }}</label>
    <b-dropdown variant="outline-secondary"
                right
                :disabled="disabled"
                class="w-100">
      <template slot="button-content">
        <i class="material-icons" v-if="value" :style="{ color: value }">lens</i>
        <!--        <span v-else>Choose color</span>-->
      </template>
      <b-dropdown-item-button v-for="color in colors"
                              :key="color"
                              @click="$emit('input', color)">
        <i class="material-icons" :style="{ color }">lens</i>
      </b-dropdown-item-button>
    </b-dropdown>
    <slot/>
    <AppError v-if="errors" :errors="errors" :field="field"/>
  </div>
</template>

<script>
import { BDropdown, BDropdownItemButton } from 'bootstrap-vue';
import AppError from '@/components/form/AppError';
import _ from 'lodash';

export default {
  components: {
    AppError,
    BDropdown,
    BDropdownItemButton,
  },
  props: ['errors', 'label', 'value', 'field', 'disabled'],
  data() {
    return {
      colors: [
        'rgb(6, 170, 245)',
        'rgb(0, 0, 0)',
        'rgb(234, 70, 141)',
        'rgb(251, 139, 20)',
        'rgb(199, 116, 28)',

        'rgb(75, 200, 0)',
        'rgb(137, 0, 0)',
        'rgb(225, 154, 134)',
        'rgb(197, 107, 255)',
        'rgb(32, 85, 0)',

        'rgb(55, 80, 181)',
        'rgb(160, 26, 165)',
        'rgb(241, 195, 63)',
        'rgb(226, 5, 5)',
        'rgb(4, 187, 155)',
      ],
    };
  },
  mounted() {
    this.selectRandom();
  },
  methods: {
    selectRandom() {
      if (!this.value) {
        this.$emit('input', _.sample(this.colors));
      }
    },
  },
};
</script>
