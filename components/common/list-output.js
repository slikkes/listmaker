Vue.component ('list-output', {
  template: `
    <b-field>
    <b-input style="height:100vh;" id="outp" :value="list" disabled type="textarea"></b-input>
    </b-field>
  `,
  props: {
    listData: {type: Array},
    format: {type: Object}
  },
  computed: {
    list() {
      if (!this.listData) {
        return null;
      }
      
      let list = this.listData;
      
      if (this.format.isUnique) {
        list = [...new Set (list)];
      }
      
      if (this.format.withQuote) {
        list = list.map (e => `${this.format.quoteMark}${e}${this.format.quoteMark}`)
      }
      
      if (this.format.isSorting) {
        list = list.sort ();
      }
      return list.join (this.separator);
    },
    separator() {
      return this.format.separatorMark ?? ",";
    },
  }
})
