Vue.component ('main-nav', {
  
  template: `
    <div class="tabs is-boxed is-right">
    <ul>
      <li v-for="item in items" :class="getItemClass(item)">
        <a @click="selectItem(item)">
          <span class="icon is-small"><i :class="item.icon" aria-hidden="true"></i></span>
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
    </div>`,
  /*
    props: {
      display: {type: String, required: true},
    },*/
  props: ['display'],
  data() {
    return {
      items: [
        {name: 'list-maker', label: 'List maker', icon: "fas fa-list"},
        {name: 'table-extractor', label: 'Table extractor', icon: "fas fa-table"}
      ]
    }
  },
  methods: {
    getItemClass(item) {
      return this.display === item.name ? 'is-active' : ''
    },
    selectItem(item) {
      console.log (item.name);
      this.$emit ('update:display', item.name)
      this.$emit ('update', item.name)
    }
  }
})
