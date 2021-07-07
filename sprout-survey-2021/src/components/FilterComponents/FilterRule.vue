<template>
  <div class="rule">

    <!-- header has question select and enum helper -->
    <div class="">
      Question: 
      <input
        list="questions"
        v-model="selectedQuestion"
        @change="questionInputChanged($event)"
      />

      <datalist id="questions">
        <option 
          v-for="question of questions"
          :key="question.value"
          @change="answerInputChanged($event)"
        >
          {{question.label}}
        </option>
      </datalist>

      <template v-if="selectedQuestion">
        | Answer enum: <input list="answers" />

        <datalist id="answers">
          <option 
            v-for="answer of answers"
            :key="answer"
          >
            {{answer}}
          </option>
        </datalist>
      </template>
    </div>

    <!-- expression -->
    <div class="">
      Expression:<br/>
      <small>
        <b>Help:</b> here's what happens in the background:<br/>
        <code>surveyAnswers.filter(x => fn(x))</code>; where <code>fn(x)</code> is your filter function.<br/>
        <code>x</code> represents a single person's response.<br/>
        Type of x: <code>{ [questionKey: string]: (number | string)[]}</code> — that remains true even for single-answer questions.
        Values in the array are enumerated by appropriate enum. For FavouriteDraconid and FavouriteVillain, the structure is a lil
        bit different: instead of <code>(number | string)[]</code>, the type of those two answers is <code>todo</code>.<br/>
        Correct enum values can be selected from the dropdown — selecting a dropdown will insert the enum value of the selected option.<br/>
        <b>CHANGE EVENT ONLY FIRES ON BLUR</b>
      </small>
    </div>
    <textarea
      ref="codeBox"
      class="filter-formula-textbox"
      :placeholder="functionTxt"
      :value="functionTxt"
      @input="updateFunctionTxt($event)"      
    ></textarea>
  </div>
</template>

<script lang="ts">
import Graph from '../Graph.vue';

import { defineComponent, TextareaHTMLAttributes } from 'vue';
import { Question } from '../../enums/question.enum';
import questionMixin from './questionMixin';

export default defineComponent({
  name: 'FilterDataset',
  mixins: [
    questionMixin
  ],
  components: {
    Graph
  },
  props: [
    'value'
  ],
  data() {
    const questions: any[] = [];
    const answers: any[] = [];

    for (const q in Question) {
      questions.push({label: q, value: Question[q]});
    }

    return {
      questions,
      answers,
      selectedQuestion: undefined,  // enum field rather enum value!
      selectedEnum: undefined as any,
      lastInsertedFunctionText: undefined,
      functionTxt: '',
    }
  },
  watch: {
    selectedQuestion(newValue) {
      if (newValue) {
        this.answers = this.questionToAnswers(newValue);
        this.selectedEnum = this.getQuestionEnum(newValue);
      } else {
        this.answers = [];
        this.selectedEnum = undefined;
      }
    },
    value(newValue) {
      if (!newValue) {
        return;
      }
      // console.warn('value updated!, newValue:', newValue);
      this.functionTxt = newValue;
    }
  },
  created() {
    if (this.value) {
      this.functionTxt = this.value;
    }
  },
  methods: {
    updateFunctionTxt(updateEvent) {
      // console.log('updating function txt:', updateEvent.target.value);
      this.functionTxt = updateEvent.target.value;
      this.$emit('functionChanged', updateEvent.target.value)
    },

    questionInputChanged(question: any) {
      question.stopPropagation();
      question = question.target.value;
      // insert nothing when cleared
      if (!question) {
        return;
      }

      this.insertCodeText(`'${Question[question]}' /* ${question} */`);
    },
    answerInputChanged(answer: any) {
      answer = answer.target.value;

      if (!answer) {
        return;
      }

      const returnVal = this.selectedEnum ? this.selectedEnum[answer] : answer;

      if (isNaN(returnVal)) {
        this.insertCodeText(`'${returnVal}' /* ${answer} */`);
      } else {
        this.insertCodeText(`${returnVal} /* ${answer} */`);
      }
    },

    // insert text at cursor position
    insertCodeText(text: string) {
      this.$nextTick( () => {
        console.log('inserting code text!', text)
        const control = this.$refs.codeBox as HTMLTextAreaElement;
        const newCaretPosition = control.selectionStart + text.length;

        //  insert text like this — .setRangeText(text) doesnt work with vue!
        this.functionTxt = `${this.functionTxt.slice(0, control.selectionStart)}${text}${this.functionTxt.slice(control.selectionEnd)}`;

        control.focus();

        // maintain cursor position. We need to do this $nextTick thing because when functionTxt updates, the vue will 
        // re-render the textarea field, which will cause the caret position to be lost. This is highly inconvenient to
        // us, as we'd rather have the caret position appear at the end of our insertion.
        this.$nextTick( () => {
          control.setSelectionRange(newCaretPosition, newCaretPosition);
        });
      });
    },

    // convert enums to their labels — for dropdown display
    questionToAnswers(questionEnum: string) {
      if (this.isRatingQuestion(questionEnum)) {
        return this.generateRatingAnswers();
      }

      const targetEnum = this.getQuestionEnum(questionEnum);

      if (targetEnum) {
        return this.enum2labels(targetEnum);
      }

      // some more special cases:
      switch (Question[questionEnum]) {
        case Question.FandomTime:
        case Question.Age:
          return ['Valid answers: numbers in years, "NoAnswer", "special"'];
        default:
          return ['if you see this, you\'re trying to filter by data that is not publicly available. go away'];
      }
    },
    generateRatingAnswers() {
      const answers: (number|string)[] = [
        'NoAnswer',
        'multi'
      ];
      for (let i = 1; i <= 10; i++) {
        answers.push(i);
      }
      return answers;
    }
  }
});
</script>

<style lang="scss" scoped>
.filter-formula-textbox {
  width: 100%;
  min-height: 16rem;
}

code {
  color: #aaf;
}
</style>