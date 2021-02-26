<template>
    <BModal v-model="isOpen"
            centered
            hide-footer
            title="Import data"
            size="md"
            content-class="bg-base dp--24 text-center">
        <p>
            <AppFileInput @selected="onSelected" button-text="Select import file"/>
            <AppError :errors="errors" field="file"/>
        </p>
        <p>
            <small>Your current data will be erased and overwritten with the imported data!</small>
        </p>
    </BModal>
</template>

<script>
import { BModal } from 'bootstrap-vue';
import AppFileInput from './form/AppFileInput';
import Errors from '../utils/errors';
import AppError from './form/AppError';

export default {
  components: {
    AppError,
    AppFileInput,
    BModal,
  },
  data() {
    return {
      errors: new Errors(),
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.$store.state.data.isImportModalOpen;
      },
      set(val) {
        this.$store.commit('data/isImportModalOpen', val);
      },
    },
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    onSelected(payload) {
      try {
        const data = JSON.parse(payload.content);

        this.$store.dispatch('data/importJson', data);
        this.close();
      } catch (e) {
        return this.errors.set({
          file: ['Invalid JSON format'],
        });
      }
    },
  },
};
</script>
