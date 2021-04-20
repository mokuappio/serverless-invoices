<template>
    <div class="search-popover__container">
        <div class="editable__item"
             :class="btnClasses"
             ref="button"
             :tabindex="tabindex"
             @click="toggleOpen">
            <span v-if="!value">{{ $t('client') }}</span>
            <span v-else>{{ value }}</span>
        </div>
        <div class="search-popover__overlay" v-if="isOpen" @click="toggleOpen"></div>
        <VueAutosuggest
                class="search-popover__select"
                v-show="isOpen"
                ref="suggest"
                :input-props="{placeholder: $t('suggest_placeholder'), class: 'form-control'}"
                :suggestions="suggestions"
                :value="query"
                :get-suggestion-value="getSuggestionValue"
                :should-render-suggestions="shouldRenderSuggestions"
                @input="onInput"
                @change="onChange"
                @selected="onSelected"
                @keydown.esc="toggleOpen"
                @keydown.tab="toggleOpen"
                @keydown.down="onKeyDown"
                @keydown.ctrl.enter="createNewClient"
        >
            <template slot-scope="{ suggestion }">
                <span>{{ suggestion.item.company_name }}</span>
            </template>
            <template slot="after-suggestions">
                <button class="btn btn-link mt-2"
                        ref="createNewButton"
                        @click="createNewClient"
                        @keydown.up="returnToSuggestions">
                    <i class="material-icons material-icons-round md-18">add</i>
                    {{ $t('create') }} {{this.query ? `"${this.query}"` : $t('new')}}
                    <code class="ml-2 badge badge-secondary">ctrl + enter</code>
                </button>
            </template>
        </VueAutosuggest>
    </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';

export default {
  i18nOptions: { namespaces: 'client-selector' },
  components: {
    VueAutosuggest,
  },
  props: {
    value: {},
    btnClass: {},
  },
  data() {
    return {
      isOpen: false,
      query: '',
      tabindex: 0,
    };
  },
  computed: {
    suggestions() {
      return [{
        data: [
          /* { company_name: 'No client', id: null }, */
          ...this.$store.getters['clients/all'] || [],
        ]
          .filter(client => !this.query || client.company_name.toLowerCase()
            .indexOf(String(this.query)
              .toLowerCase()) !== -1),
      }];
    },
    input() {
      return this.$refs.suggest.$el.querySelector('input');
    },
    button() {
      return this.$refs.button;
    },
    btnClasses() {
      return !this.value ? `text-muted ${this.btnClass}` : this.btnClass;
    },
  },
  methods: {
    toggleOpen() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      this.isOpen = true;
      setTimeout(() => {
        this.tabindex = -1;
        this.input.click();
        this.input.focus();
      });
    },
    close() {
      this.isOpen = false;
      setTimeout(() => {
        this.tabindex = 0;
        // this.button.focus();
      });
      this.query = '';
    },
    getSuggestionValue(/* suggestion */) {
      // return suggestion.item.name;
      return null;
    },
    onInput(query) {
      this.query = query;
      this.$emit('input', query);
    },
    onChange(event) {
      this.$emit('change', event.target.value);
    },
    onSelected(suggestion) {
      if (suggestion) {
        this.$emit('selected', suggestion.item);
        this.close();
      }
    },
    async createNewClient() {
      if (this.query.length) {
        const client = await this.$store.dispatch('clients/createNewClient', { company_name: this.query });
        this.$emit('selected', client);
      } else {
        this.$store.dispatch('clients/openNewClientModal');
      }
      this.close();
    },
    shouldRenderSuggestions() {
      return this.isOpen;
    },
    onKeyDown() {
      if (this.$refs.suggest.totalResults === 0) {
        this.$refs.createNewButton.focus();
      }
    },
    returnToSuggestions() {
      this.input.focus();
    },
  },
};
</script>
