Vue.component ('table-extract', {
  template: `
    <div>
    <div class="columns is-fluid has-background-grey" style="padding:12px 10px">
      <div class="column is-one-fifth">
        <b-field>
          <b-input v-model="tableRaw" id="inp" type="textarea"></b-input>
        </b-field>
      </div>
      <div class="column">
        <table class="table is-bordered is-striped">
          <thead>
          <tr v-if="withHeader">
            <th><abbr title="Position">Pos</abbr></th>
            <th>Team</th>
            <th><abbr title="Played">Pld</abbr></th>
            <th><abbr title="Won">W</abbr></th>
            <th><abbr title="Drawn">D</abbr></th>
            <th><abbr title="Lost">L</abbr></th>
            <th><abbr title="Goals for">GF</abbr></th>
            <th><abbr title="Goals against">GA</abbr></th>
            <th><abbr title="Goal difference">GD</abbr></th>
            <th><abbr title="Points">Pts</abbr></th>
            <th>Qualification or relegation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in tableData">
            <td v-for="field in row">{{ field }}</td>
          </tr>
          </tbody>
        </table>
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
            <div class="columns">
              <div class="column is-1 box" style="text-align: center; margin-right: 12px !important">
                <input v-model="delimiters.col" class="input " type="text" placeholder="Large input">
                <b-icon pack="fas" icon="columns"></b-icon>
              </div>
              <div class="column is-1 box" style="text-align: center; margin-right: 12px !important">
                <input v-model="delimiters.line" class="input " type="text" placeholder="Large input">
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
        <!--        <div class="column is-one-fifth tile">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-primary">
                      <div class="field">
                        <b-radio v-model="separator_mark"
                                 native-value=","
                                 type="is-danger">
                          <span class="marks">,</span>
                        </b-radio>
                      </div>
                      <div class="field">
                        <b-radio v-model="separator_mark"
                                 native-value=";"
                                 type="is-danger">
                          <span class="marks">;</span>
                        </b-radio>
                      </div>
                      <div class="field">
                        <b-radio v-model="separator_mark"
                                 native-value="|"
                                 type="is-danger">
                          <span class="marks">|</span>
                        </b-radio>
                      </div>
                    </article>
                  </div>
                </div>
                <div class="column is-one-fifth">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-primary">
                      <div class="field">
                        <b-radio v-model="quote_mark"
                                 native-value="'"
                                 type="is-danger">
                          <span class="marks">'</span>
                        </b-radio>
                      </div>
                      <div class="field">
                        <b-radio v-model="quote_mark"
                                 native-value="&quot;"
                                 type="is-danger">
                          <span class="marks">"</span>
                        </b-radio>
                      </div>
                    </article>
                  </div>
                </div>-->
      </footer>
    </b-collapse>
    </div>
  `,
  data() {
    return {
      tableRaw: null,
      delimiters: {
        col: '\t',
        line: '\n'
      },
      withHeader: false
    }
  },
  computed: {
    tableData() {
      if (this.tableRaw === null) {
        return []
      }
      return this.tableRaw.split (this.delimiters.line)
        .map (line => line.split (this.delimiters.col));
    }
  },
  methods: {
    
    getCols(colNum) {
      return this.table.split (this.delimiters.line)
        .map (line => line.split (this.delimiters.col)[colNum + 1]);
    },
    
    getColSum(colNum) {
      return this.getCols (colNum).reduce ((c, i) => c + parseFloat (i), 0);
    },
    
    getColAvg(colNum) {
      let col = this.getCols (colNum);
      return col.reduce ((c, i) => c + parseFloat (i), 0) / col.length;
    }
  }
})
