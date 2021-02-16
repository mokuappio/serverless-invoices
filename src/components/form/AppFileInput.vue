<template>
    <div>
        <label :for="inputRef" class="btn btn-sm btn-link pointer mb-0">
            <i class="material-icons md-18 mr-2 va-tt">cloud_upload</i>{{ buttonText }}
        </label>
        <input v-if="ready" class="d-none" type="file" :id="inputRef" :ref="inputRef" @change="handleFileUpload()"/>
    </div>
</template>

<script>
import { uuidv4 } from '@/utils/helpers';

export default {
  props: {
    buttonText: {
      default: 'Select file',
    },
  },
  data() {
    return {
      inputRef: uuidv4(),
      ready: true,
    };
  },
  methods: {
    handleFileUpload() {
      const file = this.$refs[this.inputRef].files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.$emit('selected', e.target.result);
        this.reset();
      };
      reader.readAsText(file);
    },
    reset() {
      this.ready = false;
      this.$nextTick(() => {
        this.ready = true;
      });
    },
  },
};
</script>
