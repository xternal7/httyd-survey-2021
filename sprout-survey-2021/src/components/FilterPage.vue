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


    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilterDataset from './FilterComponents/FilterDataset.vue';

export default defineComponent({
  name: 'FilterPage',
  components: {
    FilterDataset
  },
  props: [
    'rawData',
  ],
  data() {
    return {
      datasets: [] as any[],
      currentlySelectedSet: undefined as any,
      processedData: {sets: [], data: []},
    }
  },
  methods: {
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
    },
    //#endregion

    //#region data filtering
    filterData() {
      // create a copy of data to ensure we don't touchy original stuff
      const rawSurveyResults: {processedData: any, [x: string]: any} = JSON.parse(JSON.stringify(this.rawData));

      const graphData = {
        _multiSet: true,
      };
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

      console.log(
        'filtered answers:', graphData,
        '\n:sets stuff:', sets,
        '\n:dataCount:', answerCounts
      );
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
</style>