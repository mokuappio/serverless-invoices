<template>
    <div>
        <label :for="inputRef" class="btn btn-secondary pointer mb-0">
            <i class="material-icons md-18 mr-2 va-tt">cloud_upload</i>{{ buttonText }}
        </label>
        <input v-if="ready" class="d-none" :accept="accept" type="file" :id="inputRef" :ref="inputRef"
               @change="handleFileUpload()"/>
    </div>
</template>

<script>
import { uuidv4 } from '@/utils/helpers';

export default {
  props: {
    buttonText: {
      default: 'Select file',
    },
    outputType: {
      default: 'text',
    },
    accept: {},
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
        this.$emit('selected', {
          content: e.target.result,
          mime: file.type,
          size: file.size,
        });
        this.reset();
      };
      if (this.outputType === 'text') {
        reader.readAsText(file);
      } else if (this.outputType === 'base64') {
        reader.readAsDataURL(file);
      }
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
