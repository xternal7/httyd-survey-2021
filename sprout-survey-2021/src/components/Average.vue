<template>
  <div class="root">
    <div class="average-header">Average (± stdev)</div>
    <div class="avg-set-container">
      <template v-if="setConf.length <= 1">
        <template v-if="average">
          {{average}} (± {{stdev}})
        </template>
        <template v-else>
          &nbsp;
        </template>
      </template>
      <template v-else>
        <div
          v-for="set of setConf"
          :key="set"
          class="avg-set"
        >
          <div
            class="set-color"
            :style="{
              'background-color': (set.color || '#fff'),
              'border': (set.border || '0px solid transparent')
            }"
          ></div> 
          <template v-if="set.average">
            <span class="dim">&nbsp;{{set.setLabel}}</span>: {{set.average}} (± {{set.stdev}})
          </template>
          <template v-else>
            &nbsp;
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
export default defineComponent({
  name: 'Average',
  props: [
    'sets',
    'data'
  ],
  data() {
    return {
      average: 0,
      stdev: 0,
      setConf: [] as {setKey: string, setLabel: string | number, color?: string, average?: number | string, stdev?: number | string}[],
    } as {
      average?: number,
      stdev?: number,
      setConf: {setKey: string, setLabel: string | number, color?: string, average?: number | string, stdev?: number | string}[]
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newData: any) {
        this.processData(newData);
      }
    },
    sets: {
      immediate: true,
      handler(newSetConf: any) {
        // console.log('new set conf:', newSetConf)
        if (!newSetConf || !this) {
          return;
        }
        this.setConf = JSON.parse(JSON.stringify(newSetConf));
        this.processData(this.data);
      }
    }
  },
  methods: {
    processData(data: any) {
      if (!data) {
        return;
      }

      // console.log('processing data for average. Data:', data, 'sets:', this.setConf)
      if (!data._multiSet) {
        const avg = this.calculateAverage(data);
        this.average = avg.average;
        this.stdev = avg.stdev;
      } else {
        if (!this.setConf) {
          return;
        }
        for (const s in this.setConf) {
          const setKey = this.setConf[s].setKey;
          this.setConf[s] = {...this.setConf[s], ...this.calculateAverage(data[setKey])}
        }
      }
    },
    calculateAverage(data: any) {
      const ret: {average?: number, stdev?: number} = {average: 0, stdev: 0};

      let sum = 0;
      let total = 0;

      // pass 1: calculate mean
      for (const answerKey in data) {
        if (!isNaN(+answerKey)) {
          sum += +answerKey * data[answerKey]
          total += data[answerKey];
        }
      }

      ret.average = sum / total;

      // pass 2: stdev
      const n1 = 1 / (total - 1);

      sum = 0;
      for (const answerKey in data) {
        if (!isNaN(+answerKey)) {
          sum += data[answerKey] * Math.pow((ret.average - +answerKey), 2);
        }
      }
      (ret.stdev as any) = Math.sqrt(n1 * sum).toFixed(2);
      (ret.average as any) = ret.average.toFixed(2);

      if (isNaN(ret.average)) {
        return {};
      }

      return ret;
    }
  }
})
</script>

<style lang="scss" scoped>

.average-header {
  width: 100%;
  text-align: center;

  color: rgb(251, 201, 135);
  font-size: 1.5rem;
  font-weight: 300;
}

.avg-set-container {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .avg-set {
    margin: 0.5rem 1rem;
    display: block;

    .set-color {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;

      box-sizing: border-box;
    }
  }
}

.dim {
  opacity: 0.85;
  font-weight: 300;
}
</style>