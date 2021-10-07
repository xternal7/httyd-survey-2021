<template>
  <div class="root">
    <div class="head">
      <div>
        Display reasons for: &nbsp; &nbsp; <select @change="selectReason">
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{option.label}}
          </option>
        </select>
      </div>

    </div>
    <div class="reason-box">
      <div
        v-for="reason of reasons"
        :key="reason"
        class="reason-item"
      >
        <div class="answer">{{reason.answer}}</div>
        <div class="reason" v-html="reason.reason"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { enum2draconid } from '../enums/draconid.enum';
import { enum2villain } from '../enums/villain.enum';

export default defineComponent({
  name: 'FavouriteReasonDisplay',
  props: [
    'data',
    'options',
    'reasonField',
    'answerFn'
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
      console.log('selected new option:', option.target.value)
      this.selectedOption = option.target.value;

      this.processReasons(this.data);
    },
    processReasons(data) {
      console.warn(
        '—————— processing fav reasons ——————\n',
        '\n  reason field:      ', this.reasonField,
        '\n\n  data:              ', data, '(', data.length, ')',
      )

      // get all people that:
      //   1. provided an answer to the question
      //   2. have chosen the answer we're interested in (if we decided to filter by answer)
      const relevantHits = data.filter(
        x => (
          x[this.reasonField]?.reason?.trim() &&
          (
            !this.selectedOption ||
            x[this.reasonField].value == this.selectedOption
          )
        )
      );

      console.log('relevant hits:', relevantHits);

      // randomize the scores a bit to resolve tie-breakers.
      for (const hit of relevantHits) {
        hit['__reasonScore'] = (hit[this.reasonField]?.reasonScore || 0) + Math.random();

        // and while we're looping, let's ghetto-sanitize the inputs. This is okay because
        // we aren't blindly feeding the answers into the webpage — the answers were mildly
        // curated before being fed to this script
        hit[this.reasonField].reason = hit[this.reasonField]?.reason
                                  ?.trim()
                                  .replaceAll('<', '&lt;')
                                  .replaceAll('>', '&gt;')
                                  .replaceAll('\n', '<br />');
        // we should be fine now
      }

      // sort from highest score to lowest
      relevantHits.sort((a, b) => b.__reasonScore - a.__reasonScore);

      const answerFn = (this.answerFn === 'draconid' ? enum2draconid : enum2villain) as (x: any, y: any) => string;

      // map fields to the structure we expect
      this.reasons = relevantHits.map(
        x => ({
          answer: answerFn(x[this.reasonField].value, x[this.reasonField].originalValue),
          reason: x[this.reasonField].reason,
        })
      );

      // console.log("reasons?", this.reasons)
      // and we're done?
    }
  }
})
</script>

<style lang="scss" scoped>
.reason-box {
  margin-top: 2rem;
  height: 32rem;
  max-height: 90vh;
  overflow-y: auto;
}

.reason-item {
  padding: 1rem;
  // margin-bottom: 1rem;
  border-top: 1px solid transparent;
  &:not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: 1px dotted #fa6;
  }

  .answer {
    font-style: italic;
    font-size: 0.75em;
    text-transform: uppercase;
    color: #fa6;
    font-weight: 700;
    margin-bottom: 0.25em;
  }
  .reason {
    opacity: 0.69;
  }
}

.reason-item:nth-child(2n) {
  background-color: #120a08;
}
</style>
