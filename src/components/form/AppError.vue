<template>
    <div class="invalid-feedback" v-if="errors.has(field)">
        <template v-for="error in errors.get(field)">
            {{ error }} <br>
        </template>
    </div>
</template>

<script>
export default {
  props: ['errors', 'field'],
};
</script>
