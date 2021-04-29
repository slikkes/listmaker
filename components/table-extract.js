Vue.component ('table-extract', {
  template: `
    <div id="table-extract">
    <div class="columns is-fluid has-background-warning-light" style="padding:12px 10px">
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
          <tr v-for="(row, rowIdx ) in tableData.lines">
            <td>{{ rowIdx + 1 }}</td>
            <td v-for="(field, idx) in row" @click="selectedCol = idx"
                :class="selectedCol === idx ? 'selectedCol' : ''">
              {{ field }}
            </td>
          </tr>
          </tbody>

          <tfoot>
          <tr class="is-grey">
            <td></td>
            <td v-for="(item, idx) in tableData.lines[0]" :class="selectedCol === idx ? 'selectedCol' : ''">
              <p v-if="selectedCol === idx">
                Sum: {{ selectedColSum }} <br>
                Avg: {{ selectedColAvg }}
              </p>
            </td>
          </tr>
          </tfoot>
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
              <footer-switch :label="listFormat.quoteMark+ ' ' + listFormat.quoteMark"
                             @updated="listFormat.withQuote = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>
              <footer-switch icon="sort-alpha-up" @updated="listFormat.isSorting = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>
              <footer-switch icon="dice-one" @updated="listFormat.isUnique = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>

              <div class="column is-1 box footer-item-wrapper"
                   style="text-align: center; margin-right: 12px !important">
                <span class="marks has-background-white" style="padding:0 8px">{{
                    listFormat.separatorMark
                  }}</span>
              </div>

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
        <footer-radio-menu :items="footer_opts.separator" @updated="listFormat.separatorMark = $event"
                           class="column is-one-fifth"></footer-radio-menu>
        <footer-radio-menu :items="footer_opts.quote" @updated="listFormat.quoteMark = $event"
                           class="column is-one-fifth"></footer-radio-menu>

        <footer-radio-menu :items="footer_opts.col" @updated="delimiters.col = $event" :with-other-opt="true"
                           class="column is-one-fifth"></footer-radio-menu>
        <footer-radio-menu :items="footer_opts.line" @updated="delimiters.line = $event" :with-other-opt="true"
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
        separator: [{value: ',', label: ','}, {value: ';', label: ';'}, {value: '|', label: '|'}, {value: '\n', label: '\\n'}],
        quote: [{value: '\'', label: '\''}, {value: '"', label: '"'}]
      },
      selectedCol: null,
      listFormat: {
        withQuote: false,
        isUnique: false,
        isSorting: false,
        separatorMark: ",",
        quoteMark: "'",
      },
    }
  },
  computed: {
    tableData() {
      if (this.tableRaw === null) {
        return {
          header: [],
          lines: []
        }
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
    selectedColSum() {
      if (this.selectedCol === null) {
        return 0;
      }
      return this.selectedColData.reduce ((c, i) => c + parseFloat (i), 0);
    },
    selectedColAvg() {
      if (this.selectedCol === null) {
        return 0;
      }
      return this.selectedColSum / this.selectedColData.length;
    },
    
  },
  methods: {
    getLabel(type) {
      let label = this.footer_opts[type].find (i => i.value === this.delimiters[type])?.label;
      return label ?? "reg";
    },
  },
  watch: {
    tableRaw: function (val) {
      localStorage.setItem ("te-tableRaw", val)
    }
  }
})
