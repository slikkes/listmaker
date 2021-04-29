Vue.component ('list-maker', {
  
  template: `
    <div id="list-maker">
    <div class="columns is-fluid " style="padding:12px 10px">
      <div class="column is-one-fifth">
        <b-field>
          <b-input v-model="text" id="inp" type="textarea"></b-input>
        </b-field>
      </div>
      <div class="column">
        <list-output :list-data="listData" :format="listFormat"></list-output>
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
              <footer-switch :label="listFormat.quoteMark+ ' ' + listFormat.quoteMark" @updated="listFormat.withQuote = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>
              <footer-switch icon="sort-alpha-up" @updated="listFormat.isSorting = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>
              <footer-switch icon="dice-one" @updated="listFormat.isUnique = $event"
                             class="column is-2 box is-marginless footer-item-wrapper"></footer-switch>
              <div class="column is-1 box  footer-item-wrapper" style="text-align: center; margin-right: 12px !important">
                <span class="marks has-background-white\t" style="padding:0 8px">{{ listFormat.separatorMark }}</span>
              </div>
            </div>
          </div>
          <div class="column is-half is-paddingless">
            <div v-if="isNumeric">
              <div class="box is-marginless is-pulled-right has-text-danger  footer-item-wrapper"
                   style="text-align: center; margin-right: 12px !important">
                sum:
                {{ sum }}
              </div>
              <div class="box is-marginless is-pulled-right has-text-danger  footer-item-wrapper"
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
        <footer-radio-menu :items="footer_opts.separator" @updated="listFormat.separatorMark = $event"
                           class="column is-one-fifth"></footer-radio-menu>
        <footer-radio-menu :items="footer_opts.quote" @updated="listFormat.quoteMark = $event"
                           class="column is-one-fifth"></footer-radio-menu>
      </footer>
    </b-collapse>
    </div>
  `,
  
  data() {
    return {
      text: "",
      listFormat: {
        withQuote: false,
        isUnique: false,
        isSorting: false,
        separatorMark: ",",
        quoteMark: "'",
      },
      footer_opts: {
        separator: [{value: ',', label: ','}, {value: ';', label: ';'}, {value: '|', label: '|'}, {value: '\n', label: '\\n'}],
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
    listData() {
      return this.text.split ("\n");
    },
    isNumeric() {
      return this.listData.some (e => /^\d+$/.test (e))
    },
    sum() {
      if (this.isNumeric) {
        return this.listData.reduce ((c, i) => c + parseFloat (i), 0).toFixed (2)
      }
      
      return null
    },
    avg() {
      return this.isNumeric ? (this.sum / this.listData.length).toFixed (2) : null
    }
  },
  watch: {
    text: function (val) {
      localStorage.setItem ("text", val)
    }
  }
})
