var app = new Vue ({
  el: "#app",
  data() {
    return {
      text: "",
      withQuote: false,
      isUnique: false,
      isSorting: false,
      separator_mark: ",",
      quote_mark: "'"
    }
  },
  mounted() {
    let stored = localStorage.text;
    if (stored) {
      this.text = stored;
    }
  },
  computed: {
    list() {
      let list = this.text.split ("\n");
      
      if (this.isUnique) {
        list = [...new Set (list)];
      }
      
      if (this.withQuote) {
        list = list.map (e => `${this.quote_mark}${e}${this.quote_mark}`)
      }
      
      if (this.isSorting) {
        list = list.sort ();
      }
      return list.join (this.separator_mark);
    },
    rows() {
      return this.list.split (this.separator_mark)
    },
    isNumeric() {
      return this.rows.some (e => /^\d+$/.test (e))
    },
    sum() {
      if (this.isNumeric) {
        return this.rows.reduce ((c, i) => c + parseFloat (i), 0).toFixed (2)
      }
      
      return null
    },
    avg() {
      return this.isNumeric ? (this.sum / this.rows.length).toFixed (2) : null
    }
  },
  watch: {
    text: function (val) {
      localStorage.setItem ("text", val)
    }
  }
})