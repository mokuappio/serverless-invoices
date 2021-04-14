<template>
    <thead>
    <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Price</th>
        <th v-for="tax in taxes" :key="tax.id">
            {{ tax.label }} %
        </th>
        <th class="text-right">Sum</th>
    </tr>
    </thead>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      taxes: 'invoiceRows/taxes',
    }),
  },
};
</script>
