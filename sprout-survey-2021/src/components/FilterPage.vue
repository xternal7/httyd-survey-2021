<template>
  <div class="filter-screen-root flex flex-column w-100">

    <!-- title bar -->
    <div class="title-bar flex-nogrow flex flex-row w-100">
      <div class="flex-grow">Filters</div>
      <div class="flex-nogrow close-button" @click="$emit('close')">X</div>
    </div>

    <!-- actual page -->
    <div class="content flex-grow">
      <div class="content">
        <p>
          Okay, ground rules: only unaccented latin letters used by English.
          No two sets may share the same name EVER.
          There's absolutely no input validation anywhere on this page.
          Violate any of the rules and shit may break.
          You're on your own. No hand holding. You will not be protected from easter eggs in enums. This page doesn't keep it clean,
          even tho the rest of the page is basically a <a href="https://www.youtube.com/watch?v=dEF6kb7Hh0Q" target="_blank">family show</a>.
          By now you should be able to tell that this is a 'behind the scenes' kind of page,
          given very little effort went into its design — yet despite this, this page is somehow still noticeably better than roll20,
          which goes to show that roll20 devs aren't just not putting any effort in roll20. They're putting in <i>negative</i> effort.
          But I digress, let's drop it before I start dropping <a href="https://knowyourmeme.com/memes/unsolicited-opinions-on-israel" target="_blank">
          unsolicited opinions on <span class="strike">Israel</span></a> VTTs.
        </p>
        <p>
          Good luck, have fun. May the RTFM and LMGTFY be with you.
        </p>
        <p>
          — Tam
        </p>
        <p>&nbsp;</p>
        <p><small>I know there's no M to RTF.</small></p>
      </div>
      <!-- #region display active filters -->
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>

      <div>
        <b>Set options import/export</b><small><br/>Paste valid json config to import set conf. Updates on input event! If it doesn't, json is prolly fucked. Check console.</small>
      </div>
      <textarea
        ref="codeBox"
        class="filter-formula-textbox"
        style="width: 100%; max-width: 128rem; margin: 0 auto; height: 4.2rem;"
        placeholder="(Paste graph settings & unfocus)"
        :value="setConfTxt"
        @input="updateSetConf($event)" 
      >
      </textarea>

      <div>
        <br/>
        <br/>
        <b>Save/load current filters to/from localStorage</b>
      </div>

      <div>
        <ol>
          <li
            v-for="(val, ssc) in savedSetConfs"
            :key="ssc"
            class="flex flex-row"
            style="padding-left: 2rem; margin: 0.5rem 0;"
          >
            {{ssc}}
            <span class="button flex-nogrow" @click="loadSavedSetConf(ssc)">Load</span>
            <span class="button flex-nogrow" @click="removeSavedSetConf(ssc)">Remove</span>
          </li>
        </ol>
        <input v-model="savedSetConfName" /> <span class="button flex-nogrow" @click="saveCurrentSetConf()">Save current setconf</span>
      </div>

      <div>
        <br/>
        <br/>
        <b>Currently defined sets</b>
      </div>
      <div
        v-for="set of datasets"
        :key="set"
        class="flex flex-row"
        style="padding-left: 2rem; margin: 0.5rem 0;"
      >
         <div class="set-color-key flex-nogrow" :style="{'background-color': set.set.color, border: set.set.border}" style="margin-right: 1rem"></div>
         <div class="flex-nogrow">{{set.set.name}} ({{set.set.key}})</div>
         <div class="button flex-nogrow" @click="editSet(set)">Edit</div>
         <div class="button flex-nogrow" @click="removeSet(set)">Remove</div>
      </div>
      <div
        class="button"
        @click="createNewSet()"
      >
        Add new set
      </div>

      <filter-dataset
        v-if="currentlySelectedSet"
        :value="currentlySelectedSet"
        @close="currentlySelectedSet = undefined"
        @save="saveSet($event)"
        @remove="removeSet($event)"
      ></filter-dataset>

      <div class="button" @click="filterData()">
        Filter my data
      </div>
      <!-- #endregion -->


      <!-- graph display -->
      <!-- #region graph display -->
      <div class="graph-area">
        <div
          v-for="q in questions"
          class="graph-box"
          :key="q"
        >
          <template
            v-if="processedData.data[q.value]"
          >
            <graph
              class="graph-wide"
              :title="q.label"
              :conf="getConf(q.value)"
              :columns="getColumns(q.value)"
              :sets="processedData.sets"
              :data="getData(q.value)"
              :dataCount="processedData.counts"
            >
              <!-- todo: averages go here -->
            </graph>

            <div>
              <b>Embed:</b>
              <div class="graph-code">
                <pre>
                  {{getGraphCode(q)}}
                </pre>
              </div>
            </div>
          </template>
        </div>
        
      </div>

      <!-- #endregion -->
    </div>
  </div>
  
</template>

<script lang="ts">
  import Graph from './Graph.vue';
import { defineComponent } from 'vue';
import { Question } from '../enums/question.enum';
import FilterDataset from './FilterComponents/FilterDataset.vue';
import questionMixin from './FilterComponents/questionMixin';
import graphColumnDefinitions from '../helpers/column-definitions';

export default defineComponent({
  name: 'FilterPage',
  components: {
    FilterDataset,
    Graph,
  },
  mixins: [
    questionMixin
  ],
  props: [
    'rawData',
  ],
  data() {
    const questions: any[] = [];

    for (const q in Question) {
      questions.push({label: q, value: Question[q]})
    }

    return {
      setConfTxt: '',
      savedSetConfName: '',
      questions,
      datasets: [] as any[],
      currentlySelectedSet: undefined as any,
      processedData: {sets: [] as any[], data: {} as any, counts: {}},
      savedSetConfs: JSON.parse(localStorage.getItem('ss21-filter-sets') || '{}'),
    }
  },
  methods: {
    //#region graph getters
    getColumns(question: Question) {
      // console.info('————————————— getting columns! ——————');
      // console.info('is rating?', this.isRatingQuestion(`${question}`), 'is yes/no?', this.isYesNoQuestion(`${question}`))
      if (this.isYesNoQuestion(question)) {
        return graphColumnDefinitions.yesNoNeutral();
      }
      if (this.isRatingQuestion(question)) {
        return graphColumnDefinitions.rating1to10();
      }
      // handle special values:
      switch (question) {
        // case Question.UsernameProvided:
        // case Question.SurveyFeedbackProvided
        // todo: handle pls?
        case Question.HTTYD1FavouriteCharacter:
        case Question.HTTYD1WorstCharacter:
          return graphColumnDefinitions.httydCharacter(1);
        case Question.HTTYD2FavouriteCharacter:
        case Question.HTTYD2WorstCharacter:
          return graphColumnDefinitions.httydCharacter(2);
        case Question.HTTYD3FavouriteCharacter:
        case Question.HTTYD3WorstCharacter:
          return graphColumnDefinitions.httydCharacter(3);
        default:
          return graphColumnDefinitions[question]?.() ?? graphColumnDefinitions.rating1to10();
      }
    },
    getData(question: Question) {
      return this.processedData.data[question];
    },
    //#endregion

    //#region set management
    editSet(set) {
      this.currentlySelectedSet = set;
    },
    createNewSet() {
      let setName = this.getRandomName();
      const color = this.getRandomColor(setName);
      let setKey = this.nameToKey(setName);

      // this is shitty code, but it's okay because
      // it's not gonna get used much and writing it
      // properly would eat into my free time too much.

      let suffix = '';
      let suffixCount = 0;

      while (this.datasets.find(x => x.set?.key === `${setKey}${suffix}`)) {
        suffixCount++;
        suffix = `-${suffixCount}`;
      }
      setName = `${setName}${suffix}`;
      setKey = `${setKey}${suffix}`;

      const newSet = {
        set: {
          name: setName,
          key: setKey,
          ...color
        },
        filterFnTxt: `(x) => {
  /* write function here.
   * return true to keep result
   * return false to reject
   * answers to a specific question can be accessed
   * by x[<enum value for question>].
   */ 


}
`,
        data: null,
      };
      this.currentlySelectedSet = newSet;
      this.datasets.push(newSet);
    },
    removeSet(set) {
      this.datasets = this.datasets.filter(
        (x: any) => x.set.key !== set?.set?.key
      );
    },
    saveSet(set) {
      this.currentlySelectedSet.set.name = set.set.name;
      this.currentlySelectedSet.set.key = set.set.key;
      this.currentlySelectedSet.set.color = set.set.color;
      this.currentlySelectedSet.set.border = set.set.border;
      this.currentlySelectedSet.filterFnTxt = set.filterFnTxt;
      this.currentlySelectedSet = undefined;

      // update sets.txt
      this.setConfTxt = JSON.stringify(this.datasets);
    },
    //#endregion

    getConf(question) {
      const isAge = question == 1;
      const isRatingQuestion = this.isRatingQuestion(question);
      const isAgeOrRating = isAge || isRatingQuestion;
      const isYesNoQuestion = this.isYesNoQuestion(question);

      const ageConf = `{trackWidth: '6px !important', columnWidth: '8px !important', hideZeroColumns: false}`;
      const ratingConf = `{columnXMargin: '1.2rem', barWidth: '8px', trackWidth: '8px', columnWidth: '72px', trackWidthMultiset: 'auto', size: 'wide', hideZeroColumns: false}`;
      const yesNoConf = `{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: false
            }`;
      const defaultConf = `{
              size: 'wide',
              barWidth: '16px !important',
              trackWidthMultiset: '16px !important',
              trackWidth: '16px !important',
              columnWidth: '42px !important',
              sidewaysLabels: true,
              labelsHeight: '6rem'
              hideZeroColumns: true
            }`;

      let conf;
      if (isAge) {
        conf = ageConf;
      } else if (isRatingQuestion) {
        conf = ratingConf;
      } else if (isYesNoQuestion) {
        conf = yesNoConf;
      } else {
        conf = defaultConf;
      }
      return conf;
    },

    getGraphCode(question) {
      const isAge = question == 1;
      const isRatingQuestion = this.isRatingQuestion(question);
      const isAgeOrRating = isAge || isRatingQuestion;

      const dataCount = JSON.stringify(this.processedData.counts).replaceAll('\'', '\\\'').replaceAll('"', '\'');
      const data = JSON.stringify(this.getData(question.value)).replaceAll('\'', '\\\'').replaceAll('"', '\'');
      const sets = JSON.stringify(this.processedData.sets).replaceAll('\'', '\\\'').replaceAll('"', '\'');
      const columns = JSON.stringify(this.getColumns(question.value)).replaceAll('\'', '\\\'').replaceAll('"', '\'');

      return `
          <graph
            class="graph-wide"
            title="${question.label}"
            :conf="${this.getConf(question.value)}"
            :columns="${columns}"
            :sets="${sets}"
            :data="${data}"
            :dataCount="${dataCount}"
          >
            ${isAgeOrRating ? `
              <average
                :sets="${sets}"
                :data="${data}"
                :dataCount="${dataCount}"
            `:''
            }
          </graph>
        `;
    },

    //#region data filtering
    filterData() {
      // create a copy of data to ensure we don't touchy original stuff
      const rawSurveyResults: {processedData: any, [x: string]: any} = JSON.parse(JSON.stringify(this.rawData));

      const graphData = {};
      const answerCounts = {};
      const sets: any[] = [];

      for (const set of this.datasets) {
        console.info('processing set:', set);


        const filteredData = rawSurveyResults.processedData.filter(eval(set.filterFnTxt))

        graphData[set.set.key] = filteredData;
        answerCounts[set.set.key] = filteredData.length;
        sets.push({
          setKey: set.set.key,
          setLabel: set.set.name,
          color: set.set.color,
          border: set.set.border
        });
      }

      // switch sets and questions around:
      // not very optimal, but I'm lazy and can't bother to implement
      // this in a properly optimized way.
      //
      // data out must be formatted in the following manner
      // 
      // graphDataOut.set.question.answer = count
      const graphDataOut = {};
      for (const set in graphData) {
        for (const surveyResponse of graphData[set]) {
          for (const question in surveyResponse) {

            // create question if it doesn't exist
            if (!graphDataOut[question]) {
              graphDataOut[question] = {_multiSet: true};
            }

            // create answer set if it doesn't exist
            if (!graphDataOut[question][set]) {
              graphDataOut[question][set] = {};
            }

            // lpt: everything is an array!
            let answers = surveyResponse[question];

            // create answer count if doesn't exist, otherwise increase count
            try {
              for (const answer of answers) {
                if (! graphDataOut[question][set][answer]) {
                  graphDataOut[question][set][answer] = 1;
                } else {
                  graphDataOut[question][set][answer]++;
                }
              }
            } catch (e) {}
          }
        }
      }

      console.log(
        '—————————————————————————————————————————————————————————————\n\n\n',
        'filtered answers:', graphDataOut,
        '\n:sets stuff:', sets,
        '\n:dataCount:', answerCounts
      );

      this.processedData = {
        data: graphDataOut,
        sets,
        counts: answerCounts
      }
    },

    //#endregion

    //#eregion helper functions for set creation
    // set creation helper functions
    getRandomArrayMember(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getUniqueRandomArrayMember(array, ) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomName() {
      const nameStore = ['Toothless', 'Hiccup', 'Stoick', 'Valka', 'Astrid', 'Stormfly', 'Thotfury', 'Cloudjumper', 'Drago', 'Hookfang', 'Eret', 'Skrill-ex', 'Gobber', 'Flying sausage'];
      return this.getRandomArrayMember(nameStore);
    },
    getRandomColor(name) {
      if (name === 'Toothless')  {
        return {
          color: '#000',
          border: '1px solid #6688FF'
        };
      }
      if (name === 'Thotfury') {
        return {color: '#fff'};
      }
      // maybe not so random after all? 🐰🐰🐰🥚🥚🥚
      
      const colorStore = ['#f00', '#f80', '#a35', "#193", '#17a', '#149', '#ffeaa9', '#c98e30', '#c90000', '#28b', '#25a'];
      return {color: this.getRandomArrayMember(colorStore)};
    },
    nameToKey(name) {
      return name.trim().toLowerCase().replaceAll(' ', '-');
    },

    updateSetConf(event) {
      // console.log('updating function txt:', updateEvent.target.value);
      try {
        this.datasets = JSON.parse(event.target.value);
      } catch (e) {
        console.error('failed to parse set:', e);
      }
    },
    saveCurrentSetConf() {
      this.savedSetConfs[this.savedSetConfName] = JSON.stringify(this.datasets);
      localStorage.setItem('ss21-filter-sets', JSON.stringify(this.savedSetConfs));
    },
    removeSavedSetConf(name) {
      delete this.savedSetConfs[name];
      localStorage.setItem('ss21-filter-sets', JSON.stringify(this.savedSetConfs));
    },
    loadSavedSetConf(name) {
      this.datasets = JSON.parse(this.savedSetConfs[name]);
    }
    //#endregion
  }
});
</script>

<style lang="scss" scoped>
.filter-screen-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0,0,0,0.9);

  z-index: 1000;
}

.title-bar {
  text-align: center;
  width: 100%;
}

.close-button {
  width: 24px;
  height: 24px;
  background-color: #fa6;
  color: #000;

  cursor: pointer;
}

.button {
  background-color: #fa6;
  color: #000;

  margin: 0rem 0.25rem;
  padding: 0rem 1rem;
}

.set-color-key {
  display: inline-block;
  width: 1rem;
  height: 1rem;

  box-sizing: border-box;
  border: 1px solid transparent;
}

.content {
  overflow-y: auto;
}

.strike {
  text-decoration: line-through;
}

.graph-area {
  width: 90%;  

  margin-left: 0 !important;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .graph-normal, .graph-wide {
    margin: 0.5rem;
  }

  .graph-normal {
    width: 42rem !important;
    max-width: 100%;
  }
  .graph-wide {
    max-width: 100% !important;
    width: 72rem;
  }
}

pre {
  font-size: 0.75rem;
}

.graph-code {
  overflow-y: auto;
  // overflow-y: hidden;
  max-height: 220px;
  width: 72rem;
}
</style>