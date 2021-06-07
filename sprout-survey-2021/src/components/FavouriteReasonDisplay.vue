<template>
  <div class="root">
    <div class="head">
      <div>
        Display reasons for:
      </div>
      <select @change="selectReason">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{option.label}}
        </option>
      </select>
    </div>
    <div class="reason-box">
      <div
        v-for="reason of reasons"
        :key="reason"
      >
        <div class="answer">{{reason.answer}}</div>
        <div class="reason" v-html="reason.reason"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FavouriteReasonDisplay',
  props: [
    'data',
    'options',
    'filterByField',
    'rawAnswerField',
    'reasonField',
    'reasonScoreField'
  ],
  data() {
    return {
      reasons: [],
      selectedOption: undefined,
    }
  },
  created() {
    this.processReasons(this.data);
  },
  methods: {
    selectReason(option) {
      console.log('selected new option:', option)
      this.selectedOption = option;
    },
    processReasons(data) {
      // get all people that:
      //   1. provided an answer to the question
      //   2. have chosen the answer we're interested in (if we decided to filter by answer)
      const relevantHits = data.filter(x => (x[this.filterByField] === this.selectedOption || !this.selectedOption) && !!(x[this.reasonField].trim()));

      // randomize the scores a bit to resolve tie-breakers.
      for (const hit of relevantHits) {
        hit[this.reasonScoreField] = (hit[this.reasonScoreField] || 0) + Math.random();

        // and while we're looping, let's ghetto-sanitize the inputs. This is okay because
        // we aren't blindly feeding the answers into the webpage — the answers were mildly
        // curated before being fed to this script
        hit[this.reasonField] = hit[this.reasonField]
                                  .trim()
                                  .replaceAll('<', '&lt;')
                                  .replaceAll('>', '&gt;')
                                  .replaceAll('\n', '<br/>');
        // we should be fine now
      }

      // sort from highest score to lowest
      relevantHits.sort((a, b) => b - a);

      // map fields to the structure we expect
      this.reasons = relevantHits.map(
        x => ({
          answer: x[this.rawAnswerField],
          reason: x[this.reasonField]
        })
      );

      // and we're done?
    }
  }
})
</script>

<style lang="scss" scoped>

</style>