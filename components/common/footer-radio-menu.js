Vue.component ('footer-radio-menu', {
  template: `
    <div class="tile is-parent is-vertical">
    <article class="tile is-child notification is-primary">
      <div v-for="item in items" class="field">
        <b-radio v-model="value"
                 :native-value="item.value"
                 type="is-danger">
          <span class="marks">{{ item.label }}</span>
        </b-radio>
      </div>
    </article>
    </div>
  `,
  props: {
    items: {type: Array, required: true},
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
