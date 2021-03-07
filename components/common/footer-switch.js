Vue.component ('footer-switch', {
  template: `
    <div>
    <b-switch v-model="value" type="is-success">
      <span v-if="label" class="marks has-background-white " style="padding:0 8px">{{ label }}</span>
      <b-icon v-if="icon" pack="fas" :icon="icon" class=""></b-icon>
    </b-switch>
    </div>
  `,
  props: {
    label: {type: String},
    icon: {type: String},
  },
  data() {
    return {
      value: null
    }
  },
  watch: {
    value: function (newVal) {
      this.$emit ('updated', newVal)
    }
  }
})
