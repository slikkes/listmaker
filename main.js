
var app = new Vue ({
  el: "#app",
  mounted() {
    let stored = localStorage["mn-display"];
    if (stored) {
      this.display = stored;
    }
  },
  data() {
    return {
      display: '',
    }
  },
  methods:{
  },
  watch: {
    display: function (val) {
      localStorage.setItem ("mn-display", val)
    }
  }
})
