<template>
  <div class="graph-root">
    <div class="graph-header">
      <h1>{{title}}</h1>
      <div>{{description}}</div>
    </div>
    <div class="graph-main">
      <div
        v-for="column of columns"
        :key="column"
        class="graph-value"
        :style="{
          'width': graphConf.columnWidth ?? undefined
        }"
      >
        <div class="graph-bars">
          <template 
            v-for="set of setConf"
          >
            <div
              class="graph-set-track"
              :style="{
                'width': (setConf.length > 1 ? graphConf.trackWidthMultiset : graphConf.trackWidth)
              }"
            >
              <div
                class="graph-data-bar"
                :style="{
                  'height': ( (graphData[column.key]?.[set.setKey] || 0) / maxValue * 100) + '%',
                  'background-color': (set.color || '#fff'),
                }"
              >
              </div>
            </div>
          </template>
        </div>
        <div class="column-label-container">
          <div class="column-label">
            {{column.label}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Graph',
  props: [
    'title',
    'description',
    'conf',
    'columns',
    'data',
    'sets',
  ],
  data() {
    return {
      maxValue: 0,
      graphData: {},
      setConf: [],
      graphConf: {},
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(newData: any) {
        console.log(
          '[watch] data?', newData === undefined ? 'like greenland' : JSON.parse(JSON.stringify(newData)),
          ''
        )
        this.processData(newData);
      }
    },
    sets: {
      immediate: true,
      handler(newSetConf: any) {
        if (!newSetConf || !this) {
          return;
        }
        this.setConf = newSetConf;
      }
    }
  },
  mounted() {
    console.log('[mounted] data?', this.data === undefined ? 'like greenland' : JSON.parse(JSON.stringify(this.data)))
  },
  methods: {
    processData(data) {
      // set default conf options
      this.graphConf = {
        trackWidth: '1rem',
        trackWidthMultiset: '3px',

        ...this.conf
      }

      if (!data) {
        console.warn("no data yet, doing nothing!");
        return;
      }
      if (!this.setConf.length) {
        (this.setConf as any) = [{
          setKey: 'default',
          setLabel: 'Default',
          color: '#fff'
        }];
      }

      if (! data._multiSet) {
        data = {default: data};
      }

      // convert data from set.column to column.set form
      for (const set of (this.setConf as any[])) {
        for (const answerKey in data[set.setKey]) {
          if (! this.graphData[answerKey]) {
            this.graphData[answerKey] = {};
          }
          this.graphData[answerKey][set.setKey] = data[set.setKey][answerKey];

          if (this.maxValue < data[set.setKey][answerKey]) {
            this.maxValue = data[set.setKey][answerKey];
          }
        }
      }


      console.info(
        'data processed:', JSON.parse(JSON.stringify(this.graphData)),
        '\nset conf:', JSON.parse(JSON.stringify(this.setConf)),
        '\ncolumns:', JSON.parse(JSON.stringify(this.columns)),
        '\nmax value:', this.maxValue,
      )
    }
  }
});
</script>
<style lang="scss" scoped>
.graph-root {
  max-width: 100%;
  width: 42rem;
  height: 24rem;
  margin: 2rem;
  border: 1px solid #fa6;
  display: flex;
  flex-direction: column;
}

.graph-header {
  flex-grow: 0;
  flex-shrink: 0;
  h1 {
    text-align: center;
    margin: 0;
    font-weight: 300;
    font-size: 2rem;
    // font-variant: small-caps;
  }
}

.graph-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  flex-grow: 1;
}

.graph-value {
  min-width: 0.69rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  .graph-bars {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: center;
    // height: 100%;
    margin-left: 2px;
    margin-right: 2px;

    .graph-set-track {
      display: flex;
      flex-direction: column-reverse;
      margin-left: 1px;
      margin-right: 1px;

      .graph-data-bar {
        display: block;
      }

    }
  }

  .column-label-container {
    flex-grow: 0;
    flex-shrink: 0;
    height: 2rem;
    margin-top: 0.42rem;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .column-label {
      text-align: center;
    }
  }
}






</style>

