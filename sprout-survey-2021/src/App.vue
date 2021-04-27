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

        <div class="graph-area">
          <graph
            title="Age"
            description="'Snowflake' contains people who think are funny and gave answers like 'example: 11' or anything not a number. Answers like 'I'll be X soon' were corrected to answerer's current age."
            :conf="{trackWidth: '6px !important', columnWidth: '8px !important'}"
            :columns="graphColumnDefinitions[Question.Age]()"
            :data="graphData?.['all']?.[Question.Age]"
          ></graph>
          <graph
            title="Gender"
            description="Various instances of 'nonbinary' are accounted for under 'other'. 'Apache' category contains meme answers, and I'm awarding 'male dragon' a title of a snowflake."
            :conf="{barWidth: '16px !important', columnWidth: '64px !important'}"
            :columns="graphColumnDefinitions[Question.Gender]()"
            :data="graphData?.['all']?.[Question.Gender]"
          ></graph>
        </div>

        <p>
          So there's that. The "dragons are a stereotypically female interest" redditor got BTFO'd. In the "other" department, there is a few trans-adjacent things (mostly nonbinary). I am pleasantly suprised about the lack of super-special-snowflake genders and a negligible number of apache-genders (apache-genders appearing in this poll: '420'). Thanks for keeping the answer serious.
        </p>

        <div class="graph-area">
          <graph
            title="Location"
            description=""
            :conf="{barWidth: '16px !important', columnWidth: '72px !important', labelsHeight: '6rem'}"
            :columns="graphColumnDefinitions[Question.Location]()"
            :data="graphData?.['all']?.[Question.Location]"
          ></graph>
          <graph
            title="Community"
            description=""
            :conf="{barWidth: '16px !important', columnWidth: '42px !important', sidewaysLabels: true, labelsHeight: '6rem'}"
            :columns="graphColumnDefinitions[Question.Community]()"
            :data="graphData?.['all']?.[Question.Community]"
          ></graph>
        </div>

        <p>Europe, North America, Discord and Reddit dominate the fandom. Very little surprises here.</p>
        

        <b>TODO: FURRY QUESTION NEEDS TO BE ADDDED</b>
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
        <p>We'll take a look at the scores from 1-10 first. To save some scrolling, I've went ahead and combined all the graphs into one.</p>
        
        <div class="graph-area">
          <graph
            title="Rate [aspect] from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '4px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydRatingSets"
            :data="{
              _multiSet: true,
              overall: graphData?.['all']?.[Question.HTTYD1Rating],
              plot: graphData?.['all']?.[Question.HTTYD1PlotRating],
              score: graphData?.['all']?.[Question.HTTYD1ScoreRating],
              theme: graphData?.['all']?.[Question.HTTYD1ThemeRating],
              character: graphData?.['all']?.[Question.HTTYD1CharacterRating],
              visuals: graphData?.['all']?.[Question.HTTYD1VisualsRating],
              emotion: graphData?.['all']?.[Question.HTTYD1EmotionRating]
            }"
          ></graph>
        </div>

        <p>
          Very top-heavy graph, we're getting a nice bell curve approximation across the board. Sometimes, data is beautiful.
          Let's move on to the next graph: which characters people liked and which characters they hated.
        </p>

        <div class="graph-area">
          <graph
            title="Favourite and least favourite character"
            :conf="{
              barWidth: '16px !important',
              trackWidthMultiset: '16px !important',
              trackWidth: '16px !important',
              columnWidth: '42px !important',
              sidewaysLabels: true,
              labelsHeight: '6rem'
            }"
            :columns="graphColumnDefinitions.httydCharacter(1)"
            :sets="sets.mostLeastFavouriteSets"
            :data="{
              _multiSet: true,
              favourite: graphData?.['all']?.[Question.HTTYD1FavouriteCharacter],
              worst: graphData?.['all']?.[Question.HTTYD1WorstCharacter],
            }"
          ></graph>
        </div>

        <p>
          Needless to say, I find 'least favourite' results a little bit surprising, with Gobber getting a #2 (though I guess I can see why
          people voted that way).
        </p>

      </div>

      <h2>How To Train Your Dragon 2</h2>
      <div class="segment-content">
        <p>
          As usual, we'll be starting by plotting the 1-10 ratings on a graph. We can see that the ratings are getting a lil bit ... degraded.
          It's like our bell curve got shifted to the left and got fatter to boot. Someone put it on a diet.
        </p>
        <p>
          And the ratings dropped across the board: plot bar now has a strong presence as far down as 7, score bar is down considerably, theme is down ... 
          the visuals got seems to be the only metric that's getting a bump. 
        </p>
        <graph
          title="Rate [aspect] from 1 to 10"
          :conf="{
            columnXMargin: '0.125rem',
            barWidth: '4px',
            trackWidthMultiset: 'auto'
          }"
          :columns="graphColumnDefinitions.rating1to10()"
          :sets="sets.httydRatingSets"
          :data="{
            _multiSet: true,
            overall: graphData?.['all']?.[Question.HTTYD2Rating],
            plot: graphData?.['all']?.[Question.HTTYD2PlotRating],
            score: graphData?.['all']?.[Question.HTTYD2ScoreRating],
            theme: graphData?.['all']?.[Question.HTTYD2ThemeRating],
            character: graphData?.['all']?.[Question.HTTYD2CharacterRating],
            visuals: graphData?.['all']?.[Question.HTTYD2VisualsRating],
            emotion: graphData?.['all']?.[Question.HTTYD2EmotionRating]
          }"
        ></graph>

        <p>Anyway, let's move on:</p>

        <div class="graph-area">
          <graph
            title="Favourite and least favourite character"
            :conf="{
              barWidth: '8px !important',
              trackWidthMultiset: '8px !important',
              trackWidth: '8px !important',
              columnWidth: '32px !important',
              sidewaysLabels: true,
              labelsHeight: '6rem'
            }"
            :columns="graphColumnDefinitions.httydCharacter(2)"
            :sets="sets.mostLeastFavouriteSets"
            :data="{
              _multiSet: true,
              favourite: graphData?.['all']?.[Question.HTTYD2FavouriteCharacter],
              worst: graphData?.['all']?.[Question.HTTYD2WorstCharacter],
            }"
            :debug="true"
          ></graph>
        </div>

        <p>
          Well that's unexpected.
        </p>

      </div>

      <h2>How To Train Your Dragon: The Hidden World</h2>
      <div class="segment-content">
        <p>
          ...
        </p>
        <p>
          Yikes.
        </p>
        <p>
          Don't know what to say but that. The ratings have completely disintegrated. That curve got almost completely flattened. Admittedly, the
          overall rating seems to have mildly improved over last year, but still ... This is not good, Sean. This is ... very not good.
        </p>
        <div class="graph-area">
          <graph
            title="Rate [aspect] from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '4px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydRatingSets"
            :data="{
              _multiSet: true,
              overall: graphData?.['all']?.[Question.HTTYD3Rating],
              plot: graphData?.['all']?.[Question.HTTYD3PlotRating],
              score: graphData?.['all']?.[Question.HTTYD3ScoreRating],
              theme: graphData?.['all']?.[Question.HTTYD3ThemeRating],
              character: graphData?.['all']?.[Question.HTTYD3CharacterRating],
              visuals: graphData?.['all']?.[Question.HTTYD3VisualsRating],
              emotion: graphData?.['all']?.[Question.HTTYD3EmotionRating]
            }"
          ></graph>
        </div>
      </div>

      <h2>Answers: Aggregated</h2>
      <div class="segment-content">
        <p>
          Let's take another look at the 1-10 rating graphs — although, this time, in a different manner. We've put scores for all aspects on a
          single graph for every movie. This time, we'll have separate graphs for every aspect, combining scores of all movies on a single graph.
        </p>
        
        <div class="graph-area">
          <graph
            title="Rate [movie] from 1 to 10, overall"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1Rating],
              '2': graphData?.['all']?.[Question.HTTYD2Rating],
              '3': graphData?.['all']?.[Question.HTTYD3Rating],
            }"
          ></graph>
          <graph
            title="Rate plot from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1PlotRating],
              '2': graphData?.['all']?.[Question.HTTYD2PlotRating],
              '3': graphData?.['all']?.[Question.HTTYD3PlotRating],
            }"
          ></graph>
          <graph
            title="Rate theme from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1ThemeRating],
              '2': graphData?.['all']?.[Question.HTTYD2ThemeRating],
              '3': graphData?.['all']?.[Question.HTTYD3ThemeRating],
            }"
          ></graph>
          <graph
            title="Rate score from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1ScoreRating],
              '2': graphData?.['all']?.[Question.HTTYD2ScoreRating],
              '3': graphData?.['all']?.[Question.HTTYD3ScoreRating],
            }"
          ></graph>
          <graph
            title="Rate characters from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1CharacterRating],
              '2': graphData?.['all']?.[Question.HTTYD2CharacterRating],
              '3': graphData?.['all']?.[Question.HTTYD3CharacterRating],
            }"
          ></graph>
          <graph
            title="Rate visuals from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1VisualsRating],
              '2': graphData?.['all']?.[Question.HTTYD2VisualsRating],
              '3': graphData?.['all']?.[Question.HTTYD3VisualsRating],
            }"
          ></graph>
          <graph
            title="Rate emotion from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
              trackWidthMultiset: 'auto'
            }"
            :columns="graphColumnDefinitions.rating1to10()"
            :sets="sets.httydMovieSets"
            :data="{
              _multiSet: true,
              '1': graphData?.['all']?.[Question.HTTYD1EmotionRating],
              '2': graphData?.['all']?.[Question.HTTYD2EmotionRating],
              '3': graphData?.['all']?.[Question.HTTYD3EmotionRating]
            }"
          ></graph>
        </div>
        <p>
          I initially wasn't going to comment here, but a few trends become a bit ... <i>well</i>.
        </p>
        <p>
          And by that I mean what the hell is going up with the emotion graph? If you look at the other graphs when comparing The Hidden World with
          the first two movies, you see that when ratings less or equal to 5 start popping up everywhere, higher up ratings usually take the L to
          compensate across the board. This does not happen in the emotion graph: in fact, 10/10 stays at the same level as the first two movies while
          only 7/10-9/10 columns take the L.
        </p>
        <p>
          This raises questions. Why does that happen? Who voted for the 10/10 emotion on The Hidden World? Is this a result of people just blindly giving
          10/10 to everything across the board for the emotion rating? Or are people represented in 10/10 column for HTTYD1 and/or HTTYD2 an entirely
          different group than the ones who 10/10'd The Hidden World? Did the salt squad jump on the 10/10 wagon because "THW surely evoked emotions, just
          not the ones it intended," or is this just a boring anomaly with nothing deeper behind it?
        </p>
        <p>
          There's so many different possibilities, so many hypothesises. We will definitely be digging through that once we're done with presenting
          the raw answers.
        </p>

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
        <p>
          Let's start by Brussel's belated christmass gift to Tamius.
        </p>

        <div class="graph-area">
          <graph
            title="Personal enjoyment vs. objective quality."
            description="Rate the following statement: 'Personal enjoyment of a piece of media is different and independent of the quality of that piece of media.' Agreement on the scale from 1 - 10. Bigger number means more agreement."
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.YouCanEnjoyGarbageAgreement]"
          ></graph>
        </div>
         <p>
            Given reddit, I honestly expected this graph to be a lot more contested.
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
      <p style="color: green">>implying there was QA</p>
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
import Graph from './components/Graph.vue';

// data
import surveyResults from './assets/results/survey-data';
import graphColumnDefinitions from './helpers/column-definitions';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    TitleScreen,
    Graph,
  },
  data() {
    return {
      Question,
      graphColumnDefinitions,
      surveyResults: surveyResults,
      graphProcessingQueue: [],

      filteredResults: {},

      // GraphData is structured in the followign manner:
      //   * question
      //      * answer
      //        * response count
      graphData: {},

      // set definitions
      sets: {
        httydRatingSets: this.getHttydRatingSet(),
        httydMovieSets: this.getHttydMovieSet(),
        mostLeastFavouriteSets: this.getMostLeastFavouriteSet(),
      }
    };
  },
  async created() {
    console.log('got data:', surveyResults);
    console.log('c', Object.values(Question));
    console.log("www")
    this.graphData['all'] = await this.processData(surveyResults.processedData, 'all responses');
    console.log("this.graphData:", JSON.parse(JSON.stringify(this.graphData)));
    this.$forceUpdate();
    this.$nextTick();
  },
  methods: {
    async prefilterData() {
    },
    /**
     * Converts raw data into separate columns
     */
    async processData(data: any[], datasetName: string, options?: {processQuestions: Question[]}) {
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
                // console.log('ans', ans, {[ans]: 'test'})
              }
              if (! processedData[question][ans]) {
                processedData[question][ans] = 1;
              } else {
                processedData[question][ans]++;
              }
            }
          } else if (answer.value) {
            if (question === ('16' as Question)) {
              // console.log('ans', answer.value, {[answer.value]: 'test'})
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
              // console.log('ans', answer, {[answer]: 'test'})
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

      processedData['answerCount'] = data.length;
      return processedData;
    },
    getHttydRatingSet() {
      return [{
        setKey: 'overall',
        setLabel: 'Overall',
        color: '#fff'
      },{
        setKey: 'plot',
        setLabel: 'Plot',
        color: '#f00'
      },{
        setKey: 'score',
        setLabel: 'Score',
        color: '#f80',
      },{
        setKey: 'theme',
        setLabel: 'Theme',
        color: '#a35'
      },{
        setKey: 'character',
        setLabel: 'Characters',
        color: '#193'
      },{
        setKey: 'visuals',
        setLabel: 'Visuals',
        color: '#17a',
      },{
        setKey: 'emotion',
        setLabel: 'Emotion',
        color: '#149'
      }];
    },
    getHttydMovieSet() {
      return [{
        setKey: '1',
        setLabel: 'HTTYD 1',
        color: '#ffeaa9'
      },{
        setKey: '2',
        setLabel: 'HTTYD 2',
        color: '#c98e30'
      },{
        setKey: '3',
        setLabel: 'HTTYD: THW',
        color: '#c90000'
      }];
    },
    getMostLeastFavouriteSet() {
      return [{
        setKey: 'favourite',
        setLabel: 'Favourite',
        color: '#ffeaa9'
      },{
        setKey: 'worst',
        setLabel: 'Least favourite',
        color: '#c90000'
      }];
    }
  }
});
</script>

<style lang="scss">
.w100 {
  width: 100%;
}
</style>

<style lang="scss">
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.flex-grow {
  flex-grow: 1;
}
.flex-nogrow {
  flex-grow: 0;
}
.flex-shrink {
  flex-shrink: 1;
}
.flex-noshrink {
  flex-shrink: 0;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-center {
  justify-content: center;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;600&display=swap');

body {
  font-family: 'Josefin Sans', Helvetica, Arial, sans-serif;
  background-color: #000;
  color: rgb(221, 220, 212);

  font-size: 18px;

  overflow-x: hidden;
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

.graph-area {
  width: 99.9vw;
  margin-left: calc(0px - max(calc(100vw - min(75rem, 100%)), 0.001px) / 2 - 1rem);

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

* {
  box-sizing: border-box;
}
</style>
