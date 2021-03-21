Vue.component ('footer-radio-menu', {
  template: `
    <div class="footer-radio-menu">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child notification is-primary">
        <div v-for="item in items" class="field">
          <b-radio v-model="value"
                   :native-value="item.value"
                   type="is-danger"
                   @input="otherSelected = false">
            <span class="marks">{{ item.label }}</span>
          </b-radio>
        </div>
        <div v-if="withOtherOpt" class="field">
          <b-radio v-model="value"
                   :native-value="other"
                   type="is-danger"
                   @input="selectOtherOpt($event)">
            <b-input @click.native="value = other; selectOtherOpt($event)" @input="value=other"
                     v-model="other" :disabled="!otherSelected" ref="otherinp"></b-input>
          </b-radio>
        </div>
      </article>
    </div>
    </div>
  `,
  mounted() {
    this.value = this.defVal ?? this.items[0]?.value
  },
  props: {
    items: {type: Array, required: true},
    defVal: {required: false},
    withOtherOpt: {type: Boolean, default: false}
  },
  data() {
    return {
      value: null,
      otherSelected: false,
      other: null,
    }
  },
  methods: {
    selectOtherOpt(event) {
      console.log (event);
      
      this.otherSelected = true;
      this.$refs.otherinp.focus ()
      if (event instanceof MouseEvent) {
        event.stopPropagation ()
      }
    },
  },
  watch: {
    value: function (newVal) {
      let val = newVal;
      if(this.otherSelected){
        try{
          val = new RegExp (newVal)
        }catch (e){
        }
      }
      
      this.$emit ('updated', val)
    }
  }
})
