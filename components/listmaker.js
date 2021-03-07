Vue.component ('list-maker', {
  
  template: `
    <div id="list-maker">
    <div class="columns is-fluid has-background-grey" style="padding:12px 10px">
      <div class="column is-one-fifth">
        <b-field>
          <b-input v-model="text" id="inp" type="textarea"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field>
          <b-input style="height:100vh;" id="outp" :value="list" disabled type="textarea"></b-input>
        </b-field>
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
              <div class="column is-2 box is-marginless"
                   style="text-align: center; margin-right: 12px !important">
                <b-switch v-model="withQuote" type="is-success">
                  <span class="marks has-background-white" style="padding:0 8px">{{ quote_mark }}
                    {{ quote_mark }}</span>
                </b-switch>
              </div>

              <div class="column is-2 box is-marginless"
                   style="text-align: center; margin-right: 12px !important">
                <b-switch v-model="isSorting" type="is-success">
                  <b-icon pack="fas" icon="sort-alpha-up"></b-icon>
                </b-switch>
              </div>
              <div class="column is-2 box is-marginless"
                   style="text-align: center; margin-right: 12px !important">
                <b-switch v-model="isUnique" type="is-success">
                  <b-icon pack="fas" icon="dice-one"></b-icon>
                </b-switch>
              </div>

              <div class="column is-1 box" style="text-align: center; margin-right: 12px !important">
                <span class="marks has-background-white\t" style="padding:0 8px">{{ separator_mark }}</span>
              </div>
            </div>
          </div>
          <div class="column is-half is-paddingless">
            <div v-if="isNumeric">
              <div class="box is-marginless is-pulled-right has-text-danger"
                   style="text-align: center; margin-right: 12px !important">
                sum:
                {{ sum }}
              </div>
              <div class="box is-marginless is-pulled-right has-text-danger"
                   style="text-align: center; margin-right: 12px !important">
                avg
                {{ avg }}
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
        <div class="column is-one-fifth">
          <footer-radio-menu :items="footer_opts.separator" @updated="separator_mark = $event"></footer-radio-menu>
        </div>
        <div class="column is-one-fifth">
          <footer-radio-menu :items="footer_opts.quote" @updated="quote_mark = $event"></footer-radio-menu>
        </div>
      </footer>
    </b-collapse>
    </div>
  `,
  
  data() {
    return {
      text: "",
      withQuote: false,
      isUnique: false,
      isSorting: false,
      separator_mark: ",",
      quote_mark: "'",
      footer_opts: {
        separator: [{value: ',', label: ','}, {value: ';', label: ';'}, {value: '|', label: '|'}],
        quote: [{value: '\'', label: '\''}, {value: '"', label: '"'}]
      }
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
