<template>
  <div class="rule">

    <!-- header has question select and enum helper -->
    <div class="">
      Question: 
      <input list="questions" v-model="selectedQuestion" />

      <datalist id="questions">
        <option 
          v-for="question of questions"
          :key="question.value"
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
        <code>x: number[] | string[]</code>, where elements of array are answers. Answers are given as an enum value.
      </small>
    </div>
    <textarea
      class="filter-formula-textbox"
      :placeholder="functionTxt"
      :value="functionTxt"
    ></textarea>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Question } from '../../enums/question.enum';
import { Answer } from '../../enums/answer.enum';
import { Gender } from '../../enums/gender.enum';
import { Community } from '../../enums/community.enum';
import { FurryCommunity } from '../../enums/furry-community.enum';
import { Character } from '../../enums/character.enum';
import { Continent } from '../../enums/continent.enum';
import { Draconid } from '../../enums/draconid.enum';
import { HTTYDAppealReason } from '../../enums/httyd-appeal-reason.enum';
import { HTTYDShort } from '../../enums/httyd-short.enum';
import { MovieAspect } from '../../enums/movie-aspect';
import { MovieOrder } from '../../enums/movie-order.enum';
import { MovieRankEnum } from '../../enums/movie-ranking.enum';
import { Platform } from '../../enums/platform.enum';              // remove this & merge with community — this enum is redundant
import { THWOpinionChange } from '../../enums/thw-opinion-change.enum';
import { THWTheme } from '../../enums/thw-theme.enum';
import { HTTYDSoundtrack, HTTYD2Soundtrack, THWSoundtrack } from '../../enums/soundtrack.enum';
import { Villain } from '../../enums/villain.enum';

export default defineComponent({
  name: 'FilterDataset',
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
      functionTxt: '(x) => {\n  /* write function here.\n   * return true to keep result\n   * return false to reject\n   */\n\n\n}',
    }
  },
  watch: {
    selectedQuestion(newValue) {
      if (newValue) {
        this.answers = this.questionToAnswers(newValue);
      } else {
        this.answers = [];
      }
    }
  },
  methods: {

    // get correct enum for question
    questionToAnswers(questionEnum: string) {
      if (this.isRatingQuestion(questionEnum)) {
        return this.generateRatingAnswers();
      }
      if (this.isYesNoQuestion(questionEnum)) {
        return this.enum2labels(Answer);
      }

      switch (Question[questionEnum]) {
        case Question.FandomTime:
        case Question.Age:
          return ['Valid answers: numbers in years, "NoAnswer", "special"'];
        case Question.Gender:
          return this.enum2labels(Gender);
        case Question.Community:
          return this.enum2labels(Community);
        case Question.Location:
          return this.enum2labels(Continent);
        case Question.IsFurry:
          return this.enum2labels(FurryCommunity);
        case Question.HTTYD1FavouriteCharacter:
        case Question.HTTYD2FavouriteCharacter:
        case Question.HTTYD3FavouriteCharacter:
        case Question.HTTYD1WorstCharacter:
        case Question.HTTYD2WorstCharacter:
        case Question.HTTYD3WorstCharacter:
          return this.enum2labels(Character);
        case Question.HTTYD1FavouriteSoundtrack:
          return this.enum2labels(HTTYDSoundtrack);
        case Question.HTTYD2FavouriteCharacter:
          return this.enum2labels(HTTYD2Soundtrack);
        case Question.HTTYD3FavouriteSoundtrack:
          return this.enum2labels(THWSoundtrack);
        case Question.THWStrongestThemes:
          return this.enum2labels(THWTheme);
        case Question.FavouriteShort:
          return this.enum2labels(HTTYDShort);
        case Question.MovieRanking:
          return this.enum2labels(MovieRankEnum);
        case Question.MovieWatchingOrder:
          return this.enum2labels(MovieOrder);
        case Question.FavouriteDraconid:
          return this.enum2labels(Draconid);
        case Question.FavouriteVillain:
          return this.enum2labels(Villain);
        case Question.MostImportantAspects:
          return this.enum2labels(MovieAspect);
        case Question.THWOpinionChange:
          return this.enum2labels(THWOpinionChange);
        default:
          return ['if you see this, you\'re trying to filter by data that is not publicly available. go away'];
      }
    },
    enum2labels(enumm: any) {
      const labels: any[] = [];
      for (const a in enumm) {
        labels.push(a);
      }
      return labels;
    },

    // determine the correct enum for the question with these
    isRatingQuestion(questionEnum: string) {
      switch (Question[questionEnum]) {
        case Question.HTTYD1Rating:
        case Question.HTTYD1ScoreRating:
        case Question.HTTYD1PlotRating:
        case Question.HTTYD1CharacterRating:
        case Question.HTTYD1EmotionRating:
        case Question.HTTYD1VisualsRating:
        case Question.HTTYD1ThemeRating:
        case Question.HTTYD2Rating:
        case Question.HTTYD2ScoreRating:
        case Question.HTTYD2PlotRating:
        case Question.HTTYD2CharacterRating:
        case Question.HTTYD2EmotionRating:
        case Question.HTTYD2VisualsRating:
        case Question.HTTYD2ThemeRating:
        case Question.HTTYD3Rating:
        case Question.HTTYD3ScoreRating:
        case Question.HTTYD3PlotRating:
        case Question.HTTYD3CharacterRating:
        case Question.HTTYD3EmotionRating:
        case Question.HTTYD3VisualsRating:
        case Question.HTTYD3ThemeRating:
        case Question.ThotfuryCharacterRating:
        case Question.ThotfuryDesignRating:
        case Question.THWFittingEnd:
        case Question.THWPlotCoherency:
        case Question.THWThemeApproval:
        case Question.GONFRating:
        case Question.BoneknapperRating:
        case Question.BookOfDragonsRating:
        case Question.DawnOfDragonRidersRating:
        case Question.HomecomingRating:
        case Question.RidersOfBerkRating:
        case Question.RTTERating:
        case Question.SideCharactersLikabilityAgreement:
        case Question.YouCanEnjoyGarbageAgreement:
        case Question.FavouriteDraconidReasonScore:      // not actually questions
        case Question.FavouriteVillainReasonScore:
        case Question.BondType:
          return true;
        default: 
          return false;
      }
    },
    isYesNoQuestion(questionEnum: string) {
      switch(Question[questionEnum]) {
        case Question.SurveyParticipation2020:
        case Question.UsernameProvided:        // for the purposes of this filter ...
        case Question.SurveyFeedbackProvided:  // for the purposes of this filter ...
        case Question.IsRTTECanon:
        case Question.SurveyFeedbackProvided:
        case Question.THWOpinionChange:
        case Question.HTTYD2ValkaVillain:
        case Question.HTTYD3DragoRedemptionArc:
        case Question.THWFittingEnd:
          return true;
        default:
          return false;
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
</style>