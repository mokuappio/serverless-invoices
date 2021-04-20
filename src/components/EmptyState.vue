<template>
  <div :class="`col-12 text-muted text-${align}`">
    <small>{{ content || $t('content') }}</small>
    <h4 class="mt-2">¯\_(ツ)_/¯</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  i18nOptions: { namespaces: 'empty-state' },
  props: {
    content: {
      default: null,
    },
    align: {
      default: 'center',
    },
  },
};
</script>
