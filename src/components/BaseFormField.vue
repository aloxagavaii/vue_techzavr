<template>
<label for="poo" class="form__label">
<input id="poo" v-if="false"/>
              <slot/>
              <span class="form__value">{{ title }}</span>
              <span class="form__error" v-if="error">{{ error }}</span>
            </label>
</template>

<script>
export default {
  props: ['title', 'error'],
};
</script>
