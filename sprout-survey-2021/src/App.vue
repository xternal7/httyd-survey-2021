<template>
  <div class="root">
    <title-screen></title-screen>

    <div class="segment">
      <h1>Notes on data gathering</h1>

      <div class="segment-content">
        <p>
          Before publishing, we've cleaned up the data a little bit in order to prevent the <strike>warforged</strike> <strike>tin cans</strike> <a href="https://www.reddit.com/r/ProgrammerHumor/comments/8j7pdt/just_remember_folks/" target="_blank">the bit of rock we tricked into thinking</a> from choking on it.
          Examples of data manipulation include, and are mostly limited to:
        </p>
        <ul>
          <li>
            Ages were made into numbers and rounded down where appropriate — unless it was apparent the respondee thought they were funny.
          </li>
          <li>
            Some questions were single choice for a reason. If people tried to abuse 'other' in order to list more than one answer, the first entered value was kept and the rest were discarded. Answers that were a variant of 'all' or 'none' were turned into empty cells. The only questions where 'none' answers were kept
            were the "fav soundtrack" questions, because oh boy. There was a pattern.
          </li>
          <li>
            {{surveyResults.deletedCount}} responses were identified as a duplicates, which probably appeared due to glitch in the poll. Duplicates were identified by looking at the questions with free-entry responses.
          </li>
        </ul>
      </div>
    </div>

    <div class="segment">
      <h1>Demographics</h1>

      <div class="segment-content">
        <p>
          Just like last year, we started by gathering some demographics data to start things off.
          Last year, demographics data was limited to platform, vague age, and the vague time spent in fandom.
          This year, we've decided to also ask for location and gender.
        </p>

        <p>
          So there's that. The "dragons are a stereotypically female interest" redditor got BTFO'd. In the "other" department, there is a few trans-adjacent things (mostly nonbinary). I am pleasantly suprised about the lack of super-special-snowflake genders and a negligible number of apache-genders (apache-genders appearing in this poll: '420'). Thanks for keeping the answer serious.
        </p>
      </div>
    </div>

    <div class="segment">
      <h1>Scores of scores</h1>
      <div class="segment-content">
        <p>
          In last year's poll, the questions regarding movie ratings were rather simplistic: in addition to an overall rating on a scale from 1 to 10, people also got to vote on the best and the worst aspect of each movie.
          This has been a major source of criticism. This year we've decided to just give people the ability to rate each aspect on the rate from 1 to 10. 
        </p>
        <p>
          We've also added some additional comments: most notably, favourite and least favourite character for each movie, as well as another bonus question for the second and third movie.
        </p>
      </div>

      <h2>How To Train Your Dragon 1</h2>
      <div class="segment-content">

      </div>

      <h2>How To Train Your Dragon 2</h2>
      <div class="segment-content">

      </div>

      <h2>How To Train Your Dragon: The Hidden World</h2>
      <div class="segment-content">

      </div>

      <h2>Answers: Aggregated</h2>
      <div class="segment-content">

      </div>

      <h2>Answers but even mroe aggregated</h2>
      <div class="segment-content">

      </div>
    </div>

    <div class="segment">
      <h1>Favourite draconid</h1>
      <div class="segment-content">
        <p>
          Ho boy: initially, this (and the 'favourite villain') question was meant to ship without the "but why" question box. However, it was forseen that this would be a runaway victory for Toothless — a rather boring result.
          In order to make the results of this poll less boring, Tam insisted really really hard on adding the "but why is it your favourite" follow-up question, so you can see why people have their favourites.
        </p>
        <p>
          <small>Side note: better answers are absolutely getting the preferential treatment here.</small>
        </p>
      </div>
      
    </div>
    <div class="segment">
      <h1>Favourite villain</h1>
      <div class="segment-content">
        <p>I don't like to repeat myself too much, so let's just skip to the results.</p>
      </div>
    </div>

    <div class="segment">
      <h1>The Hidden World Speciál</h1>
      <div class="segment-content">
        <p>
          If there's one thing everyone can agree about this movie, it's the fact that the movie has been rather controversial in the fandom. This made it "worthy" of additional questions.
        </p>
      </div>

    </div>

    <div class="segment">
      <h1>The Shorts & TV Series corner</h1>
      <div class="segment-content">
        <p>
          Last year, we've asked some basic questions about the TV series. As is tradition, we asked that this year as well — but now with more detail! (Oh, and we also included the shorts!)
        </p>
      </div>
    </div>

    <div class="segment">
      <h1>Miscellanious questions</h1>
      <div class="segment-content">
        <p>
          There's some questions that didn't fit any of the categories set up by this writeup. So let's tie up the loose ends before dipping into some advanced analysis.
        </p>

      </div>
    </div>









    <div class="segment">
      <h1>Feedback feedback</h1>
      <div class="segment-content">
        <p>Yeah, Tamius is pulling a raycevick end credits thing.</p>
      </div>
    </div>

    <div class="segment">
      <h1>Credits</h1>
      <p>Writeup: Tamius Han</p>
      <p>Poll: A Brussel Sprout</p>
      <p>Website and related software: Tamius Han</p>
      <p>QA:</p>
      <p></p>
      <p>
        Tech stack:
      </p>
      <p>
        Vue3, typescript.
        NodeJS for backend processing.
        Axios for that one request.
        Github: the site, backend
      </p>
      <p>
        Other resources
      </p>
      <p>Fonts: Josefin Sans</p>
      <p>Art: sourced from How To Train Your Dragon movies.</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {Question} from './enums/question.enum';

import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import TitleScreen from './components/TitleScreen.vue';

// data
import surveyResults from './assets/results/survey-data';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    TitleScreen,
  },
  data() {
    return {
      surveyResults: surveyResults,
      graphProcessingQueue: [],

      filteredResults: {},

      // GraphData is structured in the followign manner:
      //   * question
      //      * answer
      //        * response count
      graphData: {},
    };
  },
  async created() {
    console.log('got data:', surveyResults);
    console.log('c', Object.values(Question));
    for (const c of Object.values(Question)) {
      console.log('-->', c);
    }
    console.log("www")
    this.graphData['all'] = this.processData(surveyResults.processedData, 'all responses')
  },

  methods: {
    async prefilterData() {
    },
    /**
     * Converts raw data into separate columns
     */
    async processData(data: any, datasetName: string, options?: {processQuestions: Question[]}) {
      const startTime = performance.now();

      console.info('Starting to process data ...')

      // create data structure ahead of time. 
      const processedData = {};

      for (const question of Object.values(Question)) {
        processedData[question] = { }
      }

      console.info('[÷] data structure prepared');


      for (const surveyResponse of data) {
        for (const question of Object.values(Question)) {
          let answer = surveyResponse[question];

          if (answer === undefined) {
            answer = 'NoAnswer';
          }

          

          if (Array.isArray(answer)) {
            for (const ans of answer) {
              if (question === ('16' as Question)) {
                console.log('ans', ans, {[ans]: 'test'})
              }
              if (! processedData[question][ans]) {
                processedData[question][ans] = 1;
              } else {
                processedData[question][ans]++;
              }
            }
          } else if (answer.value) {
            if (question === ('16' as Question)) {
              console.log('ans', answer.value, {[answer.value]: 'test'})
            }
            if (answer.dwFlag) {
              if (! processedData[question]['dwFlags']) {
                processedData[question]['dwFlags'] = 1;
              } else {
                processedData[question]['dwFlags']++;
              }
            }
            if (! processedData[question][answer.value]) {
              processedData[question][answer.value] = 1;
            } else {
              processedData[question][answer.value]++;
            }
          } else {
            if (question === ('16' as Question)) {
              console.log('ans', answer, {[answer]: 'test'})
            }
            if (! processedData[question][answer]) {
              processedData[question][answer] = 1;
            } else {
              processedData[question][answer]++;
            }
          }
        }

        // todo: special processing for "please select at most 2" questions.
      }


      const endTime = performance.now();
      console.info(`Data for ${datasetName} processed in ${endTime - startTime} ms.        (note: numbers are slightly fuzzed cos spectre)`);
      console.info('Processed data:', processedData);

      return processedData;
    }
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;600&display=swap');

body {
  font-family: 'Josefin Sans', Helvetica, Arial, sans-serif;
  background-color: #000;
  color: rgb(221, 220, 212);

  font-size: 18px;
}

h1, h2 {
  margin: 0;
  margin-top: 1em;
}
h1 {
  font-weight: 100;
  font-size: 7rem;
  color: rgb(251, 201, 135);
}
h2 {
  font-weight: 300;
  font-size: 3.75rem;
  color: rgb(215, 166, 100);
}

#app {
  margin: 0px;
  box-sizing: border-box;

  background-color: #101010;
  color: #eee;
}

.root {
  width: 100%;
  height: 100%;
  margin: 0px;
  box-sizing: border-box;
}

.segment {
  margin: 0 auto;
  width: 100%;
  max-width: 75rem;
}

.segment-content {
  margin: 0 auto;
  width: 100%;
  padding: 0rem 1rem;
}

* {
  box-sizing: border-box;
}
</style>
