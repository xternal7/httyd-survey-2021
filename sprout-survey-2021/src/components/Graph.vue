<template>
  <div
    class="graph-root"
  >
    <div class="graph-header expand">
      <h1>{{title}}</h1>
      <div class="description">{{description}}</div>
      <div class="expand"></div>
      <div class="mode-switch-box">
        <div
          class="option"
          :class="{'selected': displayMode === GraphDisplayMode.Absolute}"
          @click="displayMode = GraphDisplayMode.Absolute"
        >
          Absolute
        </div>
        <div
          class="option"
          :class="{'selected': displayMode === GraphDisplayMode.Relative}"
          @click="displayMode = GraphDisplayMode.Relative"
        >
          Normalized
        </div>
      </div>
    </div>
    <div v-if="!isMobile" class="desktop">
      <div class="graph-main-container desktop">
        <div class="graph-main">
          <div
            v-if="displayMode === GraphDisplayMode.Absolute"
            class="graph-grid-y"
          >
            <div
              v-for="tick of tickValues.tickValues"
              :key="tick"
              class="graph-tick-y"
              :style="{'height': tickValues.blockHeight}"
            >
              <div class="value-abs">
                {{tick}}
              </div>
            </div>
          </div>
          <div
            v-else
            class="graph-grid-y"
          >
            <div
              v-for="tick of tickValues.tickPercentValues"
              :key="tick"
              class="graph-tick-y"
              :style="{'height': tickValues.percentBlockHeight}"
            >
              <div class="value-percent">
                {{tick}} %
              </div>
            </div>
          </div>
          <template
            v-for="column of columns"
          >
            <div
              v-if="!conf.hideZeroColumns || !hiddenCols[column.key]"
              :key="column"
              class="graph-value"
              :style="{
                'width': graphConf.columnWidth ?? '2rem',
                'margin': `0 ${graphConf.columnXMargin ?? 0}`
              }"
            >
                <div class="graph-bars">
                  <template
                    v-for="set of setConf"
                  >
                    <div
                      v-if="displayMode === GraphDisplayMode.Absolute"
                      class="graph-set-track"
                      :style="{
                        'width': (setConf.length > 1 ? graphConf.trackWidthMultiset : graphConf.trackWidth)
                      }"
                    >
                      <div
                        class="graph-data-bar"
                        :style="{
                          'width': graphConf.barWidth,
                          'height': ( (graphData[column.key]?.[set.setKey]?.value || 0) / (maxValue || 1) * 100) + '%',
                          'background-color': (set.color || '#fff'),
                          'border': (set.border || '0px solid transparent'),
                        }"
                      >
                        <div class="graph-data-column-value">
                          <b>{{column.label}}</b><template v-if="setConf.length"><b>:</b> <span class="set-label">{{set.setLabel}}</span></template><br/>
                          <div class="result">{{graphData[column.key]?.[set.setKey]?.value}} ({{ (graphData[column.key]?.[set.setKey]?.percent || 0).toFixed(2) }}%)</div>
                        </div>
                      </div>
                    </div>

                    <!-- relative display, desktop -->
                    <div
                      v-else
                      class="graph-set-track"
                      :style="{
                        'width': (setConf.length > 1 ? graphConf.trackWidthMultiset : graphConf.trackWidth)
                      }"
                    >
                      <div
                        class="graph-data-bar"
                        :style="{
                          'width': graphConf.barWidth,
                          'height': ( (graphData[column.key]?.[set.setKey]?.percent || 0) / maxPercent * 100) + '%',
                          'background-color': (set.color || '#fff'),
                          'border': (set.border || '0px solid transparent'),
                        }"
                      >
                        <div class="graph-data-column-value">
                          <b>{{column.label}}</b><template v-if="setConf.length"><b>:</b> {{set.setLabel}}</template><br/>
                          <span class="value-display">{{ (graphData[column.key]?.[set.setKey]?.percent || 0).toFixed(2) }}% ({{graphData[column.key]?.[set.setKey]?.value}})</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div
                  class="column-label-container"
                  :style="{
                    'width': (graphConf?.sidewaysLabels === true ? graphConf.columnWidth ?? '2rem' : graphConf.columnWidth ?? undefined),
                    'height': (graphConf?.sidewaysLabels === true ? graphConf.labelsHeight ?? '2rem' : graphConf.labelsHeight ?? undefined),
                  }"
                >
                  <!-- <div
                    class="column-label"
                    :style="{
                      'width': graphConf?.sidewaysLabels === true ? graphConf.labelsHeight ?? '2rem' : undefined,
                      'height': graphConf?.sidewaysLabels === true ? graphConf.labelsHeight ?? '2rem' : undefined,
                      'transform-origin': graphConf?.sidewaysLabels === true ? '0 0' : undefined,
                      'transform': (graphConf?.sidewaysLabels === true ? 'rotate(90deg)' : undefined),
                      'text-align': graphConf?.sidewaysLabels === true ? 'left': undefined,
                      'border': '1px solid blue'
                    }"
                  > -->
                  <div
                    class="column-label"
                    :style="{
                      'height': graphConf?.sidewaysLabels === true ? '100%' : undefined,
                      'width': graphConf?.sidewaysLabels !== true ? '100%' : undefined,
                      'writing-mode': graphConf?.sidewaysLabels === true ? 'vertical-rl' : undefined,
                      'text-align': graphConf?.sidewaysLabels === true ? 'left': undefined
                    }"
                  >
                    {{column.label}}
                  </div>
                </div>
            </div>
          </template>
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
      <div class="slot">
        <slot></slot>
      </div>
    </div>
    <div v-else class="mobile">
      <div class="graph-main-container mobile">
        <div class="graph-main">
          <div class="sticky-bg">
          </div>
          <div class="sticky-bg-title">
            <div class="unstuck">
              <div></div>
            </div>
            <div class="stuck">
              <div class="title-mini">
                {{title}}
              </div>
            </div>
          </div>
          <!-- graph grid -->
          <div
            v-if="displayMode === GraphDisplayMode.Absolute"
            class="graph-grid-y"
          >
            <div
              v-for="tick of tickValues.tickValues"
              :key="tick"
              class="graph-tick-y"
              :style="{'width': tickValues.blockHeight}"
            >
              <div class="value-abs">
                {{tick}}
              </div>
            </div>
          </div>
          <div
            v-else
            class="graph-grid-y"
          >
            <div
              v-for="tick of tickValues.tickPercentValues"
              :key="tick"
              class="graph-tick-y"
              :style="{'width': tickValues.percentBlockHeight}"
            >
              <div class="value-percent">
                {{tick}} %
              </div>
            </div>
          </div>
          <template
            v-for="column of columns"
          >
            <div
              v-if="!conf.hideZeroColumns || !hiddenCols[column.key]"
              :key="column"
              class="graph-value"
              :style="{
                'margin': `0 ${graphConf.columnXMargin ?? 0}`
              }"
            >
              <div class="mobile-graph-label">
                <span class="answer">{{column.label}}</span> &nbsp;
              </div>
              <div class="mobile-graph-bars">
                <template
                  v-for="set of setConf"
                >
                  <div
                    v-if="displayMode === GraphDisplayMode.Absolute"
                    class="mobile-graph-set-track"
                    :style="{
                      'height': (setConf.length > 1 ? graphConf.trackWidthMultiset : graphConf.trackWidth)
                    }"
                  >
                    <div
                      class="mobile-graph-data-bar"
                      :style="{
                        'height': graphConf.barWidth,
                        'width': ( (graphData[column.key]?.[set.setKey]?.value || 0) / (maxValue || 1) * 100) + '%',
                        'background-color': (set.color || '#fff'),
                        'border': (set.border || '0px solid transparent'),
                      }"
                    >
                    </div>
                  </div>

                  <!-- relative display, mobile -->
                  <div
                    v-else
                    class="mobile-graph-set-track"
                    :style="{
                      'height': (setConf.length > 1 ? graphConf.trackWidthMultiset : graphConf.trackWidth)
                    }"
                  >
                    <div
                      class="graph-data-bar"
                      :style="{
                        'height': graphConf.barWidth,
                        'width': ( (graphData[column.key]?.[set.setKey]?.percent || 0) / maxPercent * 100) + '%',
                        'background-color': (set.color || '#fff'),
                        'border': (set.border || '0px solid transparent'),
                      }"
                    >
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
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
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export enum GraphSortDir {
  Desc = -1,
  Unsorted = 0,
  Asc = 1,
}

export enum GraphDisplayMode {
  Relative = 1,
  Absolute = 2,
}

export default defineComponent({
  name: 'Graph',
  props: [
    'title',
    'description',
    'conf',
    'columns',
    'data',
    'dataCount',
    'sets',
    'sort',
    'debug',
    'defaultMode',
    'isMobile',
  ],
  data() {
    return {
      maxValue: 0,
      maxPercent: 0,
      graphData: {},
      setConf: [] as {setKey: string, setLabel: string | number, color?: string, setCount: number}[],
      graphConf: {},
      tickValues: {
        blockHeight: '1px',
        percentBlockHeight: '1px',
        tickValues: [] as number[],
        tickPercentValues: [] as string[]
      },
      displayMode: GraphDisplayMode.Absolute,
      GraphDisplayMode,
      hiddenCols: {},
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(newData: any) {
        // console.log(
        //   '[watch] data?', newData === undefined ? 'like greenland' : JSON.parse(JSON.stringify(newData)),
        //   ''
        // )
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
        this.processData(this.data);
      }
    },
    defaultMode: {
      immediate: true,
      handler(newMode) {
        if (newMode === 'absolute' || newMode === GraphDisplayMode.Absolute) {
          this.displayMode = GraphDisplayMode.Absolute;
        } else {
          this.displayMode = GraphDisplayMode.Relative;
        }
      }
    }
  },
  mounted() {
    // console.log('[mounted] data?', this.data === undefined ? 'like greenland' : JSON.parse(JSON.stringify(this.data)))
  },
  methods: {
    processData(data) {

      if (this.debug) {
        console.log(
          `—————————— DATA FOR GRAPH: ${this.title} ——————————\n`,
          'data:', data,
          'data count provided?', this.dataCount ?? 'no'
        )
      }

      // set default conf options
      this.graphConf = {
        trackWidth: '1rem',
        trackWidthMultiset: '3px',

        ...this.conf
      }

      if (!data) {
        if (this.debug) {
          console.warn("no data yet, doing nothing!");
        }
        return;
      }

      if (!this.setConf.length) {
        (this.setConf as any) = [{
          setKey: 'default',
          setLabel: 'Default',
          color: '#edb26a',
          dataCount: this.dataCount
        }];
      }

      if (! data._multiSet) {
        data = {default: data};
      } else {
        // generate per-set max values
        for (const set of (this.setConf as any[])) {
          set.dataCount = this.dataCount[set.setKey];
        }
      }


      // get max value for graph
      let maxValue = 0;
      let maxPercent = 0;

      // convert data from set.column to column.set form
      for (const set of (this.setConf as any[])) {
        for (const answerKey in data[set.setKey]) {
          if (! this.graphData[answerKey]) {
            this.graphData[answerKey] = {};
          }

          const processedAnswer = {
            value: data[set.setKey][answerKey],
            percent: ((data[set.setKey]?.[answerKey] || 0) / set.dataCount) * 100
          };

          this.graphData[answerKey][set.setKey] = processedAnswer;

          if (maxValue < processedAnswer.value) {
            maxValue = processedAnswer.value;
          }
          if (maxPercent < processedAnswer.percent) {
            maxPercent = processedAnswer.percent;
          }
        }
      }


      if (this.conf.hideZeroColumns) {
        for (const col of this.columns) {
          this.hiddenCols[col.key] = (! this.graphData[col.key]);
        }
      }


      const yTickInterval = this.findBestInterval(maxValue);
      const yPercentTickInterval = this.findBestInterval(maxPercent);

      const yTicks             = Math.floor(maxValue   / yTickInterval)        + 1; // add one blank block above the tallest one
      const yPercentTicks      = Math.floor(maxPercent / yPercentTickInterval) + 1;
      const yAxisHeight        =        yTickInterval * (yTicks + 1);               // height as in 'max value' that can be displayed. Should be > than max value.
      const yAxisPercentHeight = yPercentTickInterval * (yPercentTicks + 1)
      const percentPerTick     =    yAxisHeight / maxValue;                         // % height of a particular segment
      const percentPerPercentTick = yAxisPercentHeight / maxPercent;

      this.tickValues.blockHeight = `${Math.floor(percentPerTick * 100)}%`;
      this.tickValues.percentBlockHeight = `${Math.floor(percentPerPercentTick * 100)}%`;

      this.tickValues.tickValues = [] as number[];
      this.tickValues.tickPercentValues = [] as string[];

      for (let i = 0; i <= yTicks; i++) {
        this.tickValues.tickValues.push( i * yTickInterval );
      }
      for (let i = 0; i <= yPercentTicks; i++) {
        this.tickValues.tickPercentValues.push( `${Math.floor(i * yPercentTickInterval).toFixed(0)}`);
      }

      if (this.debug) {
        console.info(
          'data processed:', JSON.parse(JSON.stringify(this.graphData)), //JSON.parse(JSON.stringify(this.graphData)),
          '\nset conf:', JSON.parse(JSON.stringify(this.setConf)),       // JSON.parse(JSON.stringify(this.setConf)),
          '\ncolumns:', this.columns,                                    // JSON.parse(JSON.stringify(this.columns)),
          '\nmax value:', maxValue, '; %:', maxPercent
        )
      }

      // ticks aren't normalized to max value, but to the next tick that's bigger than max value.
      // we need to correct max values accordingly
      // this.maxValue = yAxisHeight;
      this.maxValue = yAxisHeight;
      this.maxPercent = yAxisPercentHeight;

      if (this.debug) {
        console.warn(
          '\n\n—————————————————[ tick calculation stuff]—————————————————',
          '\nbest interval  :', yTickInterval,
          '\nnumber of ticks:', yTicks, '        (max/ticks =>', this.maxValue, '/', yTickInterval, ')',
          '\ny axis height  :', yAxisHeight, "     (height as in 'max value' that can be displayed. Should be > than max value.)",
          '\n% per tick     :', +((percentPerTick * 100).toFixed(2)),
          '\ntick values', this.tickValues,
        );
      }
    },
    findBestInterval(maxValue: number) {
      const upperBound = maxValue / 4;
      const lowerBound = maxValue / 5;

      let firstAboveLowerBound: any = undefined;
      let lastBelowUpperBound: any = undefined;

      for (const interval of [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]) {
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
    },
    setDisplayMode(mode) {
      this.displayMode = mode;
    }
  }
});
</script>
<style lang="scss" scoped>
.graph-root {
  // border: 1px solid #fa6;

  width: 100%;

  display: flex;
  flex-direction: column;
}

.graph-header {
  flex-grow: 0;
  flex-shrink: 0;

  padding: 1rem;

  z-index: 1000;

  h1 {
    text-align: center;
    margin: 0;
    font-weight: 300;
    font-size: 2rem;
    // font-variant: small-caps;

    margin-bottom: 1rem;
  }
  .description {
    font-size: 0.9em;
    opacity: 0.8;
    font-weight: 300;
    text-align: center;
  }

  .mode-switch-box {
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;

    cursor: pointer;
    user-select: none;

    .option {
      padding: 0.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;

      &.selected {
        color: #000;
        background-color: #fa6;
      }
    }
  }
}

.graph-grid-y, .graph-bars {
  height: 24rem;
  max-height: 80vh;
}

.graph-grid-y {
  position: absolute;
  width: 100%;
  top: 0;

  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;

  pointer-events: none;

  .graph-tick-y {
    position: relative;
    display: block;
    // border-bottom: 1px dotted rgba(#fa6, 0.5);

    .value-abs, .value-percent {
      position: absolute;
      bottom: 0;
      transform: translate(50%);
      width: 1.5em;
      white-space: nowrap;
    }
    .value-abs {
      left: 0.25rem;
      // text-align: right;
    }
    .value-percent {
      left: 0.25rem;
      // text-align: right;
    }
  }
}
.graph-main-container {
  width: 100%;
}
.graph-main {
  width: 100%;
  // min-width: calc(42rem - 2px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  // flex-grow: 1;
  position: relative;
}

.graph-value {
  min-width: 0.69rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  .graph-bars {
    display: flex;
    flex-direction: row;
    justify-content: center;
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

      .graph-data-column-value {
        display: none;
      }

      &:hover, &:focus {
        cursor: pointer;

        .graph-data-column-value {
          display: block;
          font-size: 0.8rem;
          padding: 0.5em;
          min-width: 5rem;
          width: 6.9rem;
          max-width: 15rem;

          background-color: rgba(0,0,0,0.8);

          transform: translate(-50%, -120%);

          .set-label {
            opacity: 0.8;
          }
          .result {
            color: #fa6;
          }
        }
      }
    }
    // .graph-set-track::hover {
    //   cursor: pointer;

    // }
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
      display: block;
      text-align: center;

      opacity: 0.8;
      font-weight: 300;
      font-size: 0.9em;
    }
  }
}

.desktop {
  .graph-main-container {
    overflow-x: auto;
  }
  .graph-main {
    overflow-y: hidden;
  }
}

.mobile {
  .graph-grid-y, .graph-bars {
    max-height: unset;
    height: 100%;
    width: 100%;
  }

  .graph-grid-y {
    position: absolute;
    height: 100%;
    left: 0;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    pointer-events: none;

    .graph-tick-y {
      position: relative;
      display: block;
      border-left: 1px dotted rgba(#fa6, 0.5);

      .value-abs, .value-percent {
        position: sticky;
        right: 0;
        transform: unset;
        margin-left: 2px;
        top: 1.5rem;
        height: 0% !important;
        width: 1.5em;
        white-space: nowrap;
        // margin-left: 0px;
        // padding-left: 0px;
        // background-color: #000;
        z-index: 110;
      }
      .value-abs {
        left: 0.25rem;
        // text-align: right;
      }
      .value-percent {
        left: 0.25rem;
        // text-align: right;
      }
    }
  }
  .graph-main-container {
    width: 100%;
  }
  .graph-main {
    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 1rem;

    .sticky-bg, .sticky-bg-title {
      position: sticky;
      z-index: 100;
      width: 100%;
      height: 2.25rem;

      margin-top: -2.25rem;
      top:  0;
      background: rgba(0,0,0,0.9);
      box-shadow: -0.5rem -0.25rem 0.25rem 0.5rem rgba(0,0,0,0.9);

      .unstuck {
        height: 0;
        overflow-y: visible;
        position: relative;
        z-index: 102;
        width: 100%;

        div {
          display: block;
          position: absolute;
          top: 0;
          background-color: #000;
          min-height: 1.2rem;
          width: 100%;
        }
      }

      .stuck {
        position: sticky;
        top: 0;
        height: 20px;
        z-index: 101;
      }
    }

    .sticky-bg-title {
      display: contents;
    }
  }

  .graph-value {
    width: 100% !important;
    display: flex;
    flex-direction: column;

    .mobile-graph-bars {
      // display: flex;
      // flex-direction: row;
      // justify-content: center;
      margin-top: 0px;
      margin-bottom: 4px;

      .mobile-graph-set-track {
        // display: flex;
        // flex-direction: column-reverse;
        margin-top: 1px;
        margin-bottom: 1px;

        .mobile-graph-data-bar {
          display: block;
        }

        .graph-data-column-value {
          display: none;
        }
      }
    }
  }

  .mobile-graph-set-track {
    display: flex;
    width: 100%;
  }

  .mobile-graph-label {
    margin-top: 0.5em;
    font-size: 0.8rem;
    .answer {
      font-variant: small-caps;
      opacity: 0.69;
    }
  }

  .graph-set-container {
    position: sticky;
    bottom: 0px;
    background-color: rgba(0,0,0,0.8);

    box-shadow: -0.5rem -0.25rem 0.25rem 0.5rem rgba(0,0,0,0.8);

    padding: 0;
    margin: 0.5rem 1rem;
    margin-top: 0;
    font-size: 0.7rem;

    .graph-set {
      margin: 0.5rem 1rem;

      .set-color {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;

        box-sizing: border-box;
      }
    }
  }

  .title-mini {
    margin-top: 0.5rem;
    color: #fa6;
    font-weight: bold;

    font-size: 0.7rem;
    font-variant: small-caps;
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

.expand {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.relative {
  position:relative;
}

.graph-main-container.mobile {
  padding: 1rem;

  .graph-main {
    padding: 0;
    padding-bottom: 1rem;
  }
}

</style>

