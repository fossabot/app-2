<template>
  <div class="v-field">
    <fieldset v-if="fieldset">
      <div>
        <legend>{{ field.name }}</legend>
        <small v-if="!readonly && field.comment">{{ field.comment }}</small>
        <v-interface
          :id="field.interface"
          :name="field.field"
          :required="Boolean(field.required)"
          :readonly="readonly"
          :options="field.options"
          :type="field.type"
          :value="values[field.field]"
          :relationship="field.relationship"
          @input="readonly ? null : $emit('stageValue', {
            field: field.field,
            value: $event
          })"
          @setfield="readonly ? null : $emit('stageValue', {
            field: $event.field,
            value: $event.value,
          })" />
      </div>
    </fieldset>
    <p v-else>
      <label :for="field.field">{{ field.name }}</label>
      <small v-if="!readonly && field.comment">{{ field.comment }}</small>
      <v-interface
        :id="field.interface"
        :name="field.field"
        :required="Boolean(field.required)"
        :readonly="readonly"
        :options="field.options"
        :type="field.type"
        :value="values[field.field]"
        :relationship="field.relationship"
        @input="readonly ? null : $emit('stageValue', {
          field: field.field,
          value: $event
        })"
        @setfield="readonly ? null : $emit('stageValue', {
          field: $event.field,
          value: $event.value,
        })" />
    </p>
  </div>
</template>

<script>
export default {
  name: "v-field",
  props: {
    field: {
      type: Object,
      required: true
    },
    values: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fieldset() {
      const interfaceInfo = this.$store.state.extensions.interfaces[
        this.field.interface
      ];

      return (interfaceInfo && interfaceInfo.fieldset) || false;
    }
  }
};
</script>

<style lang="scss" scoped>
label,
legend {
  margin-bottom: 10px;
  text-transform: none;
  color: var(--dark-gray);
  font-size: 1rem;
  line-height: 1.18;
  font-weight: 500;
}

fieldset,
p {
  border: 0;
  padding: 0;
}

fieldset > div,
p {
  display: flex;
  flex-direction: column;
}

small {
  order: 2;
  margin-top: 10px;
  font-style: italic;
  font-size: 12px;
  color: var(--gray);
}
</style>
