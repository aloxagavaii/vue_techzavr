<template>
<BaseFormField :title="title" :error="error">
  <label for="pp">
  <input id="pp" class="form__input" v-model="dataValue" :type="type"
   :placeholder="placeholder">
    </label>
</BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>
