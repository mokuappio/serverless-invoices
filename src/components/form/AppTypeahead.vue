<template>
    <div class="form-group typeahead">
        <VueAutosuggest
                ref="suggest"
                :input-props="{placeholder: placeholder, class: 'form-control form-control-sm tracker__input'}"
                :section-configs="config"
                :suggestions="suggestions"
                :value="value"
                :get-suggestion-value="getSuggestionValue"
                :should-render-suggestions="(size, loading) => size >= 0 && !loading && !closed"
                @input="onInput"
                @change="onChange"
                @blur="onBlur"
                @focus="onFocus"
                @selected="onSelected"
        >
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData"/>
            </template>
        </VueAutosuggest>
    </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';

export default {
  components: {
    VueAutosuggest,
  },
  props: {
    value: {},
    placeholder: {},
    options: {},
    labelField: {},
    sectionConfigs: {},
    filter: { default: (option, query) => (option[this.labelField].toLowerCase().indexOf(query.toLowerCase()) > -1) },
  },
  data() {
    return {
      closed: true,
    };
  },
  computed: {
    suggestions() {
      return this.options.map(group => ({
        ...group,
        data: group.data.filter(option => this.filter(option, this.value)),
      }))
        .filter(group => group.data.length > 0);
    },
    config() {
      return {
        default: { onSelected: this.onSelected },
        ...this.sectionConfigs,
      };
    },
  },
  methods: {
    getSuggestionValue(suggestion) {
      return suggestion.item[this.labelField];
    },
    onInput(query) {
      this.$emit('input', query);
    },
    onChange(event) {
      this.$emit('change', event.target.value);
    },
    onFocus() {
      this.closed = false;
    },
    onBlur() {
      this.closed = true;
    },
    onSelected(suggestion) {
      if (!suggestion) {
        this.$refs.suggest.$el.querySelector('input').blur();
        return false;
      }
      // Enter on no suggestion returns null
      this.$emit('selected', suggestion);
    },
  },
};
</script>
