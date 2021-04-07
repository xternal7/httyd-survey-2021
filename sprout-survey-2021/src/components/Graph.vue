<template>
  <div class="graph-root">
    <div class="graph-header">
      <h1>{{title}}</h1>
      <div>{{description}}</div>
    </div>
    <div class="graph-main">
      <div class="graph-grid-y">
        <div
          v-for="(tick, index) of tickValues.tickValues"
          :key="tick"
          class="graph-tick-y"
          :style="{'height': tickValues.blockHeight}"
        >
          <div class="value-abs">
            {{tick}}
          </div>
          <div class="value-percent">
            {{tickValues.tickPercentValues[index]}}
          </div>
        </div>
      </div>
      <div
        v-for="column of columns"
        :key="column"
        class="graph-value"
        :style="{
          'width': graphConf.columnWidth ?? undefined,
          'margin': `0 ${graphConf.columnXMargin ?? 0}`
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
                  'width': graphConf.barWidth,
                  'height': ( (graphData[column.key]?.[set.setKey] || 0) / maxValue * 100) + '%',
                  'background-color': (set.color || '#fff'),
                  'border': (set.border || '0px solid transparent'),
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
    <div 
      v-if="setConf.length > 1"
      class="graph-set-container flex flex-row flex-wrap flex-center"
    >
      <div
        v-for="set of setConf"
        :key="set"
        class="graph-set"
      >
        <div
          class="set-color"
          :style="{
            'background-color': (set.color || '#fff'),
            'border': (set.border || '0px solid transparent')
          }"
        ></div> {{set.setLabel}}
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
      tickValues: {
        blockHeight: '1px',
        tickValues: [] as number[],
        tickPercentValues: [] as string[]
      }
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

      console.log('data:', data)

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

      // get max value for graph 

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

      const yTickInterval = this.findBestInterval(this.maxValue);
      const yTicks = Math.floor(this.maxValue / yTickInterval) + 1;  // account for the zero tick, which is extra!
      const yAxisHeight = yTickInterval * yTicks;                    // height as in 'max value' that can be displayed. Should be > than max value.
      const percentPerTick = yAxisHeight / this.maxValue;            // % height of a particular segment

      this.tickValues.blockHeight = `${Math.floor(percentPerTick * 100)}%`;
      this.tickValues.tickValues = [] as number[];
      this.tickValues.tickPercentValues = [] as string[];
      for (let i = 0; i <= yTicks; i++) {
        this.tickValues.tickValues.push( i * yTickInterval );
        this.tickValues.tickPercentValues.push( `${Math.floor( (i * yTickInterval * 100) / this.maxValue)}%` );
      }

      console.info(
        'data processed:', this.graphData, //JSON.parse(JSON.stringify(this.graphData)),
        '\nset conf:', this.setConf, // JSON.parse(JSON.stringify(this.setConf)),
        '\ncolumns:', this.columns, // JSON.parse(JSON.stringify(this.columns)),
        '\nmax value:', this.maxValue,
        '\ntick values', this.tickValues
      )
    },
    findBestInterval(maxValue: number) {
      const upperBound = maxValue / 4;
      const lowerBound = maxValue / 5;

      let firstAboveLowerBound: any = undefined;
      let lastBelowUpperBound: any = undefined;

      for (const interval of [2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]) {
        if (interval < upperBound) {
          lastBelowUpperBound = interval;
        }
        if (interval > lowerBound && !firstAboveLowerBound) {
          firstAboveLowerBound = interval;
        }
      }

      if (lastBelowUpperBound < firstAboveLowerBound) {
        return lastBelowUpperBound;
      } else {
        return firstAboveLowerBound ?? 2; // can never be less than this, so we use it as a default in case of undefined
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.graph-root {
  max-width: 100%;
  width: 42rem;
  // height: 24rem;
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

.graph-grid-y {
  position: absolute;
  height: 24rem;
  width: 100%;
  top: 0;

  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;

  .graph-tick-y {
    position: relative;
    display: block;
    border-bottom: 1px dotted rgba(#fa6, 0.5);

    .value-abs, .value-percent {
      position: absolute;
      bottom: 0;
      transform: translate(50%);
    }
    .value-abs {
      left: 0.5rem;
    }
    .value-percent {
      right: 0.5rem;
      text-align: right;
    }
  }
}

.graph-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  flex-grow: 1;
  position: relative;
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
    height: 24rem;
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

.graph-set-container {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  .graph-set {
    margin: 0.5rem 1rem;

    .set-color {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;

      box-sizing: border-box;
    }
  }
}




</style>

