Vue.component ('table-extract', {
  template: `
    <div id="table-extract">
    <div class="columns is-fluid has-background-grey" style="padding:12px 10px">
      <div class="column is-one-fifth">
        <b-field>
          <b-input v-model="tableRaw" id="inp" type="textarea"></b-input>
        </b-field>
      </div>
      <div class="column">

        <table class="table is-bordered ">
          <thead>
          <tr v-if="withHeader">
            <th v-for="header in tableData.header">{{ header }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="row in tableData.lines">
            <td v-for="(field, idx) in row" @click="selectedCol = idx"
                :class="selectedCol === idx ? 'selectedCol' : ''">
              {{ field }}
            </td>
          </tr>
          </tbody>
        </table>

        <div class="column">
          <list-output :list-data="selectedColData" :format="listFormat"></list-output>
        </div>
      </div>
    </div>
    <b-collapse class="has-background-info card bottomNav " :open="false" position="is-bottom" animation="slide"
                aria-id="contentIdForA11y3">
      <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">

        <div class="card-header-title columns" @click="$event.stopPropagation()" style="     min-height: 120px;">
          <div class="column is-half" style="margin-top:12px">
            <div class="columns ">
              <footer-switch icon="heading" @updated="withHeader = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>

              <div class="column is-2 box footer-item-wrapper">
                <span class="tag is-info">{{ getLabel ("col") }}</span>
                <b-icon pack="fas" icon="columns"></b-icon>
              </div>
              <div class="column is-2 box footer-item-wrapper">
                <span class="tag is-info">{{ getLabel ("line") }}</span>
                <b-icon pack="fas" icon="step-forward"></b-icon>
              </div>

            </div>
          </div>
        </div>
        <a class="card-header-icon">
          <b-icon
              pack="fas"
              icon="cog">
          </b-icon>
        </a>
      </div>
      <footer class="card-footer columns ">
        <footer-radio-menu :items="footer_opts.col" @updated="delimiters.col = $event"
                           class="column is-one-fifth"></footer-radio-menu>
        <footer-radio-menu :items="footer_opts.line" @updated="delimiters.line = $event"
                           class="column is-one-fifth"></footer-radio-menu>
      </footer>
    </b-collapse>
    </div>
  `,
  mounted() {
    this.delimiters.col = this.footer_opts.col[0].value
    this.delimiters.line = this.footer_opts.line[0].value
    
    let stored = localStorage["te-tableRaw"];
    if (stored) {
      this.tableRaw = stored;
    }
  },
  data() {
    return {
      tableRaw: null,
      delimiters: {
        col: null,
        line: null
      },
      withHeader: false,
      footer_opts: {
        col: [{value: '\t', label: '\\t'}, {value: ' ', label: 'space'}, {value: ',', label: ','}],
        line: [{value: '\n', label: '\\n'}],
      },
      selectedCol: null,
    }
  },
  computed: {
    tableData() {
      if (this.tableRaw === null) {
        return []
      }
      let data = this.tableRaw.split (this.delimiters.line)
        .map (line => line.split (this.delimiters.col));
      let header = [];
      if (this.withHeader) {
        header = data.shift ();
      }
      return {
        header: header,
        lines: data
      }
    },
    selectedColData() {
      if (this.selectedCol === null) {
        return [];
      }
      return this.tableData.lines.reduce ((c, i) => {
        return [...c, i[this.selectedCol]];
      }, [])
      
    },
    listFormat() {
      return {
        withQuote: true,
        quoteMark: "'"
        /*isUnique: false,
        withQuote: false,
        isSorting: false,
        separator_mark: '',*/
      }
    },
  },
  methods: {
    
    getCols(colNum) {
      return this.table.split (this.delimiters.line)
        .map (line => line.split (this.delimiters.col)[colNum + 1]);
    },
    
    getLabel(type) {
      return this.footer_opts[type].find (i => i.value === this.delimiters[type])?.label;
    },
    
    getColSum(colNum) {
      return this.getCols (colNum).reduce ((c, i) => c + parseFloat (i), 0);
    },
    
    getColAvg(colNum) {
      let col = this.getCols (colNum);
      return col.reduce ((c, i) => c + parseFloat (i), 0) / col.length;
    }
  },
  watch: {
    tableRaw: function (val) {
      localStorage.setItem ("te-tableRaw", val)
    }
  }
})
