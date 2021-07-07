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
      <h1>Introduction</h1>
      <div class="segment-content">
        <p>
          Back in late January, there's been a poll about various aspects of How To Train Your Dragon franchise, much like the year prior. These are the results.
        </p>
        <p>
          Much like last year, we'll start by graphs showing the raw responses (with a little bit of commentary). After that, we'll try to filter our results to
          see if we can spot any interesting patterns. Last but not least, there'll also be a quick "Q&A session" where I respond to some of the interesting 
          'survey feedback' responses we got.
        </p>
        <p>
          I can already hear some of you saying: "But Tam! The survey was in January! What took you this long?" And this is a fair question — after all, last year's
          results were done much quicker. The answer to this question lies in combination of reasons: the 'rona, the document with results got corrupted while it was
          being prepared and we had to roll it back. Then there's the homebrew graphs (I decided to roll my own, because the library I used last year caused massive
          performance issues even with only a dozen or two questions), which were a mild annoyance. The amount of bugs was bigger than the last year, but most importantly:
          I've been drowning in other obligations as well.
        </p>
        <p>
          Thanks for being patient.
        </p>
        <p>
          Also fair warning: the graphs are kinda not the best looking thing ever, but they do their thing good enough. It's also recommended that you see them on desktop,
          (or, at the very least, on a tablet), because they weren't really optimized for mobile.
        </p>
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
          <div class="graph-normal">
            <graph
              title="Age"
              description="'Snowflake' contains people who think are funny and gave answers like 'example: 11' or anything not a number. Answers like 'I'll be X soon' were corrected to answerer's current age."
              :conf="{trackWidth: '6px !important', columnWidth: '8px !important'}"
              :columns="graphColumnDefinitions[Question.Age]()"
              :data="graphData?.['all']?.[Question.Age]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :data="graphData?.['all']?.[Question.Age]"
            >
            </average>
          </div>
          <div class="graph-normal">
            <graph
              title="Gender"
              description="Various instances of 'nonbinary' are accounted for under 'other'. 'Apache' category contains meme answers, and I'm awarding 'male dragon' a title of a snowflake."
              :conf="{barWidth: '16px !important', columnWidth: '64px !important'}"
              :columns="graphColumnDefinitions[Question.Gender]()"
              :data="graphData?.['all']?.[Question.Gender]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>
        

        <p>
          So there's that. The "dragons are a stereotypically female interest" redditor got BTFO'd. In the "other" department, there is a few trans-adjacent things (mostly nonbinary). I am pleasantly suprised about the lack of super-special-snowflake genders and a negligible number of apache-genders (apache-genders appearing in this poll: '420'). Thanks for keeping the answer serious.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Location"
              description="What continent do you live on?"
              :conf="{barWidth: '16px !important', columnWidth: '72px !important', labelsHeight: '6rem'}"
              :columns="graphColumnDefinitions[Question.Location]()"
              :data="graphData?.['all']?.[Question.Location]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
          <div class="graph-normal">
            <graph
              title="Community"
              description=" Which of the following HTTYD communities do you most frequently use? PICK ONE."
              :conf="{barWidth: '16px !important', columnWidth: '42px !important', sidewaysLabels: true, labelsHeight: '6rem'}"
              :columns="graphColumnDefinitions[Question.Community]()"
              :data="graphData?.['all']?.[Question.Community]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

        <p>
          Europe, North America, Discord and Reddit dominate the fandom. Very little surprises here, though the platforms do suffer from selection bias.
        </p>
        
        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Participation in 2020 survey"
              description=""
              :conf="{barWidth: '16px !important', columnWidth: '72px !important', labelsHeight: '6rem'}"
              :columns="graphColumnDefinitions[Question.SurveyParticipation2020]()"
              :data="graphData?.['all']?.[Question.SurveyParticipation2020]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
          <div class="graph-normal">
            <graph
              title="Time in fandom"
              description="How long have you been a member of the HTTYD fandom? Answers were given in years."
              :conf="{barWidth: '12px !important', columnWidth: '42px !important', labelsHeight: '6rem'}"
              :columns="graphColumnDefinitions[Question.FandomTime]()"
              :data="graphData?.['all']?.[Question.FandomTime]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

        <p>
          The 10+ group is quite sizable at just over a quarter of people. Side note — if there's ever gonna be a third poll,
          we need to separate time in fandom and 'when did you first watch the first movie' into two separate questions.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Of furries and scalies"
              description="Do you identify as a member of any of the following communities? (Multiple choices possible)"
              :conf="{barWidth: '16px !important', columnWidth: '72px !important', labelsHeight: '6rem'}"
              :columns="graphColumnDefinitions[Question.IsFurry]()"
              :data="graphData?.['all']?.[Question.IsFurry]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

        <p>
          ... with some of these answers bleeding into the gender section, I can't say I'm surprised.
        </p>
        <p>
          Additionally, {{surveyResults.providedUsernames}} out of {{surveyResults.totalAnswers}} ({{(surveyResults.providedAnswers/(surveyResults.totalAnswers || 1)).toFixed()}}%) of people left their usernames and
          {{surveyResults.providedFeedbacks}} ({{(surveyResults.providedFeedbacks/(surveyResults.totalAnswers || 1)).toFixed()}}%) have left us some feedback. 
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
        <p>We'll take a look at the scores from 1-10 first. To save some scrolling, I've went ahead and combined all the graphs into one.</p>
        
        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Rate [aspect] from 1 to 10"
              :conf="{
                columnXMargin: '1.2rem',
                barWidth: '8px',
                trackWidth: '8px',
                columnWidth: '72px',
                trackWidthMultiset: 'auto',
                size: 'wide'
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
              :dataCount="{
                overall: graphData?.['all']?.answerCount,
                plot: graphData?.['all']?.answerCount,
                score: graphData?.['all']?.answerCount,
                theme: graphData?.['all']?.answerCount,
                character: graphData?.['all']?.answerCount,
                visuals: graphData?.['all']?.answerCount,
                emotion: graphData?.['all']?.answerCount,
              }"
            ></graph>
             <average
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
            >
            </average>
          </div>
        </div>

        <p>
          Very top-heavy graph, we're getting a nice bell curve approximation across the board. Sometimes, data is beautiful,
          As a side note — feast your eyes on that sub-1 standard deviation on the overall bar, because this is the last time
          you're going to see this kind of universal agreement on a 1-10 question.
        </p>
        <p>As far as last year's results are concerned, the score is about the same as last year (9.3)</p>. 
        <p>
          Let's move on to the next graph: which characters people liked and which characters they hated.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite and least favourite character"
              :conf="{
                size: 'wide',
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
              :dataCount="{
                favourite: graphData?.['all']?.answerCount,
                worst: graphData?.['all']?.answerCount,
              }"
            ></graph>
          </div>
        </div>

        <p>
          Are we surprised? No.
        </p>
        <p>
          Not so fun fact: I've came this far before the first major issues with the code became apparent. Initially, the 'least popular'
          award went to Gobber and then Fishlegs ... which was surprising ... and, combined with some other funny-looking data, also wrong.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite Soundtrack"
              :conf="{
                columnXMargin: '1.2rem',
                barWidth: '12px !important',
                trackWidthMultiset: '12px !important',
                trackWidth: '12px !important',
                columnWidth: '12px !important',
                sidewaysLabels: true,
                labelsHeight: '12rem',
                size: 'wide',
                hideZeroColumns: true
              }"
              :columns="graphColumnDefinitions[Question.HTTYD1FavouriteSoundtrack]()"
              :data="graphData?.['all']?.[Question.HTTYD1FavouriteSoundtrack]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>
      
        <p>
          Cris, I promise you you didn't find me on this graph.
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
        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Rate [aspect] from 1 to 10"
              :conf="{
                columnXMargin: '1.2rem',
                barWidth: '8px',
                trackWidth: '8px',
                columnWidth: '72px',
                trackWidthMultiset: 'auto',
                size: 'wide'
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
              :dataCount="{
                overall: graphData?.['all']?.answerCount,
                plot: graphData?.['all']?.answerCount,
                score: graphData?.['all']?.answerCount,
                theme: graphData?.['all']?.answerCount,
                character: graphData?.['all']?.answerCount,
                visuals: graphData?.['all']?.answerCount,
                emotion: graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
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
            >
            </average>
          </div>
        </div>

        <p>
          The overall rating for HTTYD2 did not change from last year (8.5 average). There was, however, a mild change in what
          people consider the movie's strongest aspect. Last year, most people voted
          'emotion' as the strongest aspect of the second movie and 'graphics or music' (they were combined in a single option)
          second, but this year visuals and music <i>both</i> got higher aggregate score than the emotion — though admittedly,
          still well within the margin of error.
        </p>

        <p>Anyway, let's move on:</p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite and least favourite character"
              :conf="{
                barWidth: '8px !important',
                trackWidthMultiset: '8px !important',
                trackWidth: '8px !important',
                columnWidth: '32px !important',
                sidewaysLabels: true,
                labelsHeight: '6rem',
                size: 'wide'
              }"
              :columns="graphColumnDefinitions.httydCharacter(2)"
              :sets="sets.mostLeastFavouriteSets"
              :data="{
                _multiSet: true,
                favourite: graphData?.['all']?.[Question.HTTYD2FavouriteCharacter],
                worst: graphData?.['all']?.[Question.HTTYD2WorstCharacter],
              }"
              :dataCount="{
                favourite: graphData?.['all']?.answerCount,
                worst: graphData?.['all']?.answerCount,
              }"
            ></graph>
          </div>
        </div>

        <p>
          Protagonists are number one, villain and villain lite are number last. No surprises here.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite Soundtrack"
              :conf="{
                columnXMargin: '1.2rem',
                barWidth: '12px !important',
                trackWidthMultiset: '12px !important',
                trackWidth: '12px !important',
                columnWidth: '12px !important',
                sidewaysLabels: true,
                labelsHeight: '12rem',
                size: 'wide',
                hideZeroColumns: true
              }"
              :columns="graphColumnDefinitions[Question.HTTYD2FavouriteSoundtrack]()"
              :data="graphData?.['all']?.[Question.HTTYD2FavouriteSoundtrack]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>
      
        <p>
          RESULT COMMENTARY HERE
        </p>

        <p>Last but not least: our special question.</p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Would Valka be better as villain?"
              description="Originally, Dean DeBlois planned to have Valka be HTTYD 2's sympathetic villain. The question asked: Do you think this idea, if it had made it into the final product, would have improved the film?"
              :conf="{
                barWidth: '20px !important',
                trackWidthMultiset: '16px !important',
                trackWidth: '16px !important',
                columnWidth: '96px !important',
              }"
              :columns="graphColumnDefinitions.yesNoNeutral()"
              :data="graphData?.['all']?.[Question.HTTYD2ValkaVillain]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

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
          <div class="graph-wide">
            <graph
              title="Rate [aspect] from 1 to 10"
              :conf="{
                columnXMargin: '1.2rem',
                barWidth: '8px',
                trackWidth: '8px',
                columnWidth: '72px',
                trackWidthMultiset: 'auto',
                size: 'wide'
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
              :dataCount="{
                overall: graphData?.['all']?.answerCount,
                plot: graphData?.['all']?.answerCount,
                score: graphData?.['all']?.answerCount,
                theme: graphData?.['all']?.answerCount,
                character: graphData?.['all']?.answerCount,
                visuals: graphData?.['all']?.answerCount,
                emotion: graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
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
            >
            </average>
          </div>
        </div>
        <p>
          It's known for quite some time that the opinions of the last movie arerather controversial, but the averages and deviations
          really drive the point home. Given the general feel of the subreddit in the past year and a half since movie's release, this
          is not surprising at all — except in one category. Visuals.
        </p>
        <p>
          Maybe I haven't been paying enough attention, but I was wholly under impression that the fandom agrees that the third one had
          the best visuals. "But look at those trees and grass and graphics!" was a common argument, and lots of circlejerking was had
          over the sand (Odin forbid you mentioned that sand is really nothing special — it's just retextured and less sticky snow).
          Another possibility may be that I fell victim to one of the classic blunders: last year, people overwhelmingly voted visuals the
          strongest aspect of The Hidden World, which perhaps set incorrect expectations for this year's poll, especially this year's
          result only reaffirm that point.
        </p>
        <p>
          However, turns out that visuals are not just the technical graphics-whoring you see on gaming forums — they also include the
          artstyle itself, which is much more subjective.
        </p>
        <p>
          This should probably explain why the ratings are lower, and I can say where they're coming from as I absolutely detest the dragon
          armor in this movie, and dislike a few other things from the artistic perspective as well. I am not going to lie — I expected THW
          to come out on top in the visuals department, but turns out that reddit hype machine may be deceiving.
        </p>
        <p>
          Compared to the last year's survey, the average overall rating is up by a small but noticeable amount: 6.78, compared to 6.3 last year.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite and least favourite character"
              :conf="{
                size: 'wide',
                barWidth: '16px !important',
                trackWidthMultiset: '16px !important',
                trackWidth: '16px !important',
                columnWidth: '42px !important',
                sidewaysLabels: true,
                labelsHeight: '6rem'
              }"
              :columns="graphColumnDefinitions.httydCharacter(3)"
              :sets="sets.mostLeastFavouriteSets"
              :data="{
                _multiSet: true,
                favourite: graphData?.['all']?.[Question.HTTYD3FavouriteCharacter],
                worst: graphData?.['all']?.[Question.HTTYD3WorstCharacter],
              }"
              :dataCount="{
                favourite: graphData?.['all']?.answerCount,
                worst: graphData?.['all']?.answerCount,
              }"
            ></graph>
          </div>
        </div>

        <p>
          Light Fury hate is real. Imagine outranking the main antagonist and villain of the movie by this wide of a margin.
          But given reddit and some other parts of the fandom, I cannot say whether that surprises me, or completely fails to surprise me.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite Soundtrack"
              :conf="{
                columnXMargin: '1.2rem',
                barWidth: '12px !important',
                trackWidthMultiset: '12px !important',
                trackWidth: '12px !important',
                columnWidth: '12px !important',
                sidewaysLabels: true,
                labelsHeight: '12rem',
                size: 'wide',
                hideZeroColumns: true
              }"
              :columns="graphColumnDefinitions[Question.HTTYD3FavouriteSoundtrack]()"
              :data="graphData?.['all']?.[Question.HTTYD3FavouriteSoundtrack]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>
      
        <p>
          If you wonder about what the 'salt squad' represents on the graph — it's the people who answered with any variant of 
          <i>'I actually hate all of them.'</i> The reason The Hidden World gets this category while the other movies don't is because
          The Hidden World is the only one that attracted the answers like this.
        </p>
        <p>There's two more things that are worth noting here — one: 'Shy' category is twice the size compared to
          the other two movies; and two: you actually can't infer anything from it, since this category contains both people who left the question
          blank, as well as people who provided a non-answer such as <i>"I don't have a favourite"</i> or <i>"I like them all"</i>.
        </p>

        <p>
          Last but not least, our bonus question:
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Would Drago redemption arc improve THW?"
              description="Originally, Dean DeBlois planned a redemption arc for Drago in the third film. The question was: Do you think this idea, if it had made it into the final product, would have improved the film?"
              :conf="{
                size: 'wide',
                barWidth: '20px !important',
                trackWidthMultiset: '16px !important',
                trackWidth: '16px !important',
                columnWidth: '96px !important',
              }"
              :columns="graphColumnDefinitions.yesNoNeutral()"
              :data="graphData?.['all']?.[Question.HTTYD3DragoRedemptionArc]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>
      </div>

      <h2>Answers: Aggregated</h2>
      <div class="segment-content">
        <p>
          Let's take another look at the 1-10 rating graphs — although, this time, in a different manner. We've put scores for all aspects on a
          single graph for every movie. This time, we'll have separate graphs for every aspect, combining scores of all movies on a single graph.
        </p>
        
        <div class="graph-area">
          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1Rating],
                '2': graphData?.['all']?.[Question.HTTYD2Rating],
                '3': graphData?.['all']?.[Question.HTTYD3Rating],
              }"
            ></average>
          </div>

          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1PlotRating],
                '2': graphData?.['all']?.[Question.HTTYD2PlotRating],
                '3': graphData?.['all']?.[Question.HTTYD3PlotRating],
              }"
            ></average>
          </div>

          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1ThemeRating],
                '2': graphData?.['all']?.[Question.HTTYD2ThemeRating],
                '3': graphData?.['all']?.[Question.HTTYD3ThemeRating],
              }"
            >
            </average>
          </div>

          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1ScoreRating],
                '2': graphData?.['all']?.[Question.HTTYD2ScoreRating],
                '3': graphData?.['all']?.[Question.HTTYD3ScoreRating],
              }"
            ></average>
          </div>

          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1CharacterRating],
                '2': graphData?.['all']?.[Question.HTTYD2CharacterRating],
                '3': graphData?.['all']?.[Question.HTTYD3CharacterRating],
              }"
            ></average>
          </div>

          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1VisualsRating],
                '2': graphData?.['all']?.[Question.HTTYD2VisualsRating],
                '3': graphData?.['all']?.[Question.HTTYD3VisualsRating],
              }"
            ></average>
          </div>

          <div class="graph-wide">
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
              :dataCount="{
                '1': graphData?.['all']?.answerCount,
                '2': graphData?.['all']?.answerCount,
                '3': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="sets.httydMovieSets"
              :data="{
                _multiSet: true,
                '1': graphData?.['all']?.[Question.HTTYD1EmotionRating],
                '2': graphData?.['all']?.[Question.HTTYD2EmotionRating],
                '3': graphData?.['all']?.[Question.HTTYD3EmotionRating]
              }"
            ></average>
          </div>
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
      <h1>Favourite things</h1>

      <div class="segment-content">
        <p>
          This year, we have also asked people for a few favourite things. Let's start with the 'favourite draconid'
          category to start things off. Furthermore, we've decided to ask people to explain their pick and show some
          of the most well-written answers (where the criteria was mostly how specific the reasoning given was).
          The reasons people gave for their answer are sorted per answer.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite draconid"
              :conf="{
                trackWidth: '8px',
                barWidth: '16px !important',
                columnWidth: '32px !important',
                sidewaysLabels: true,
                labelsHeight: '12rem'
              }"
              :columns="graphColumnDefinitions[Question.FavouriteDraconid]()"
              :data="graphData?.['all']?.[Question.FavouriteDraconid]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>
      
        <p>
          I don't think anyone is surprised by the results. First two places go to Night Fury and <a href="https://httydnd.tamius.net/23" target="_blank">Night Fury: Wyvern Edition</a>.
        </p>

        <div class="">
          <favourite-reason-display
            :data="surveyResults.processedData"
            :options="favDraconidOptions"
            :reasonField="Question.FavouriteDraconid"
            answerFn="draconid"
          >
          </favourite-reason-display>
        </div>

        <p>
          The 'favourite villain' question largely follows the same format as the previous one, so I don't feel
          the need to repeat myself. Let's go straight to the results.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite villain"
              :conf="{
                trackWidth: '8px',
                barWidth: '16px !important',
                columnWidth: '32px !important',
                sidewaysLabels: true,
                labelsHeight: '12rem'
              }"
              :columns="graphColumnDefinitions[Question.FavouriteVillain]()"
              :data="graphData?.['all']?.[Question.FavouriteVillain]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

        <div class="">
          <favourite-reason-display
            :data="surveyResults.processedData"
            :options="favVillainOptions"
            :reasonField="Question.FavouriteVillain"
          >
          </favourite-reason-display>
        </div>

        <p>
          Last but not least: favourite opening scene.
        </p>

        <div class="graph-area">
          <div class="graph-wide">
            <graph
              title="Favourite opening scene"
              :conf="{
                trackWidth: '8px',
                barWidth: '16px !important',
                columnWidth: '32px !important',
                sidewaysLabels: true,
                labelsHeight: '12rem'
              }"
              :columns="graphColumnDefinitions[Question.FavouriteOpeningScene]()"
              :data="graphData?.['all']?.[Question.FavouriteOpeningScene]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

        <p>
          Unlike the previous two, this question came without a 'please explain' field — mostly because Tamius 
          didn't forsee anything interesting coming out of it, and thus only annoyed Brussel into adding the 
          'please explain' section to the previous two questions.
        </p>
      </div>
    </div>


    <div class="segment">
      <h1>The Hidden World Speciál</h1>
      <div class="segment-content">
        <p>
          If there's one thing everyone can agree about this movie, it's the fact that the movie has been rather controversial in the fandom. This made it "worthy" of additional questions.
        </p>
        <p>
          Let's start with the Light Fury.
        </p>
        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Light Fury as a character"
              description="What is your opinion on the Light Fury as a character? 0: garbage tier, 5-6: eh, 10: perfect"
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.ThotfuryCharacterRating]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :sets="[
                {setKey: 'thotfuryCharacter', setLabel: 'LF as character'},
                {setKey: 'thotfuryDesign', setLabel: 'LF design'}
              ]"
              :data="{
                _multiSet: true,
                thotfuryCharacter: graphData?.['all']?.[Question.ThotfuryCharacterRating],
                thotfuryDesign: graphData?.['all']?.[Question.ThotfuryDesignRating]
              }"
            >
            </average>
          </div>
          <div class="graph-normal">
            <graph
              title="Light fury: the design"
              description="What is your opinion on the Light Fury's visual design? 0: garbage tier, 5-6: eh, 10: perfect"
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.ThotfuryDesignRating]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>
        </div>

        <p>
          Almost no surprises here. The ratings are about as contested as the rest of the The Hidden World related questions so far.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Was THW a fitting end to the franchise?"
              description="0: hell no, 5-6: eh, 10: perfect"
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.THWFittingEnd]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :data="graphData?.['all']?.[Question.THWFittingEnd]"
            ></average>
          </div>

          <div class="graph-normal">
            <graph
              title="The plot of The Hidden World makes sense"
              description="Rate your agreement with the following statement: 'The plot of The Hidden World makes sense and has clear cause and effect.' 0: hell no, 5-6: eh, 10: enough sense to make me a millionare"
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.THWPlotCoherency]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :data="graphData?.['all']?.[Question.THWPlotCoherency]"
            ></average>
          </div>
        </div>

        <p>
          I really like how both of these got (on average) worse results than the plot rating. Let's plot them on the same graph, just for shits and giggles:
        </p>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Fitting end vs. plot rating"
              :conf="{trackWidthMultiset: '8px', columnWidth: '32px !important'}"
              :sets="[{
                setKey: 'fittingEnd',
                setLabel: 'Fitting end rating',
                color: '#ffeaa9'
              },{
                setKey: 'plotRating',
                setLabel: 'Plot rating',
                color: '#c90000'
              }]"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="{
                _multiSet: true,
                fittingEnd: graphData?.['all']?.[Question.THWFittingEnd],
                plotRating: graphData?.['all']?.[Question.HTTYD3PlotRating]
              }"
              :dataCount="{
                fittingEnd: graphData?.['all']?.answerCount,
                plotRating: graphData?.['all']?.answerCount
              }"
            ></graph>
          </div>
          <div class="graph-normal">
            <graph
              title="Plot coherency vs. plot rating"
              :conf="{trackWidthMultiset: '8px', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :sets="[{
                setKey: 'plotCoherency',
                setLabel: 'Plot coherency rating',
                color: '#ffeaa9'
              },{
                setKey: 'plotRating',
                setLabel: 'Plot rating',
                color: '#c90000'
              }]"
              :data="{
                _multiSet: true,
                plotCoherency: graphData?.['all']?.[Question.THWPlotCoherency],
                plotRating: graphData?.['all']?.[Question.HTTYD3PlotRating]
              }"
              :dataCount="{
                fittingEnd: graphData?.['all']?.answerCount,
                plotRating: graphData?.['all']?.answerCount 
              }"
            ></graph>
          </div>
        </div>
        <div>
          <average
            :sets="[
              {setKey: 'fittingEnd', setLabel: 'THW is fitting end'},
              {setKey: 'plotMakesSense', setLabel: 'THW plot is coherent & makes sense'},
              {setKey: 'plotRating', setLabel: 'Plot rating'}
            ]"
            :data="{
              _multiSet: true,
              fittingEnd: graphData?.['all']?.[Question.THWFittingEnd],
              plotMakesSense: graphData?.['all']?.[Question.THWPlotCoherency],
              plotRating: graphData?.['all']?.[Question.HTTYD3PlotRating]
            }"
          ></average>
        </div>


        <p>
          Now I <i>really</i> want to see how the the votes moved around, between plot rating and these two.
        </p>

        <p>
          Last but not least: the themes. Due to limited space below the graphs, the labels were shortened from the original answers.
          Most of the answers are accurate but possibly abbreviated version of what was on poll. The only exception is the answer
          <i>'Negative Effects Humans Sometimes Have on Animals and/or the Environment'</i>: due its excessive length, the graph label
          for it is 'Misantrophy' (which basically means exactly the same thing). 'Putting aside idealism when neccessary' was shortened
          to 'putting aside idealism.'
        </p>
        <p>
          The 'other' box allowed for free-form entry, which was ... fun, and spawned a few categories of answers. 'All garbage' is
          self-explanatory, '🧂' were salty or sarcastic answers, and 'other' is limited to all answers that don't fit
          in either of the two newly-spawned. Note that 'All garbage' doesn't necessarily imply '🧂'.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
          <graph
            title="Strongest themes — TODO MULTI CHOICE"
            description="Which of the following themes / messages do you feel The Hidden World most strongly conveys? Participants were asked to pick two at most. 'They tried' is for people who picked more."
            :conf="{
              trackWidth: '8px',
              barWidth: '16px !important',
              columnWidth: '32px !important',
              sidewaysLabels: true,
              labelsHeight: '16rem'
            }"
            :columns="graphColumnDefinitions[Question.THWStrongestThemes]()"
            :data="graphData?.['all']?.[Question.THWStrongestThemes]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>
          <div class="graph-normal">
            <graph
              title="Theme approval"
              description="Regarding the themes you see in The Hidden World, rate the extent to which you agree with / approve of those themes."
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.THWThemeApproval]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :data="graphData?.['all']?.[Question.THWThemeApproval]"
            ></average>
          </div>
        </div>

        <p>
          🧂 option itself provided a really wide array of answers. To give some examples:
        </p>
        <ul>
          <li>
            The spirit of defeatism (or other variations of 'just give up')
          </li>
          <li>
            Heteronormativity and Anthropocentrism
          </li>
          <li>
           I had no idea what was trying to be conveyed. I can only be meta and say it was gaslighting the whole time
          </li>
          <li>
            Racism wins somehow?? (or other variations of 'Segregation good')
          </li>
          <li>
            In the words of Homer Simpson: "The lesson is, never try."
          </li>
          <li>
            (Variations of 'Hoes before bros')
          </li>
          <li>
            Fuck This Movie
          </li>
        </ul>

      </div>

    </div>

    <div class="segment">
      <h1>The Shorts & TV Series corner</h1>
      <div class="segment-content">
        <p>
          Last year, we've asked some basic questions about the TV series. As is tradition, we asked that this year as well — but now with more detail! (Oh, and we also included the shorts!)
        </p>
        <p>
          So let's start with shorts and then move onto the others.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Favourite short"
              :conf="{
                trackWidth: '8px',
                barWidth: '16px !important',
                columnWidth: '64px !important',
                sidewaysLabels: true,
                labelsHeight: '16rem'
              }"
              :columns="graphColumnDefinitions[Question.FavouriteShort]()"
              :data="{
                ...graphData?.['all']?.[Question.FavouriteShort],
                _multiSet: false
              }"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>

          <div class="graph-normal">
            <graph
              title="Rate [short] from 1 to 10"
              :conf="{
                columnXMargin: '0.75rem',
                barWidth: '6px',
                trackWidthMultiset: 'auto'
              }"
              :columns="graphColumnDefinitions.rating1to10()"
              :sets="[{
                setKey: 'bk',
                setLabel: 'Boneknapper',
                color: '#c00'
              },{
                setKey: 'bod',
                setLabel: 'Book of Dragons',
                color: '#d92'
              },{
                setKey: 'dodr',
                setLabel: 'Dawn of Dragon Riders',
                color: '#fb8'
              },{
                setKey: 'gonf',
                setLabel: 'Gift of the Night Fury',
                color: '#139'
              },{
                setKey: 'hc',
                setLabel: 'Homecoming',
                color: '#17a'
              },]"
              :data="{
                _multiSet: true,
                'bk': graphData?.['all']?.[Question.BoneknapperRating],
                'bod': graphData?.['all']?.[Question.BookOfDragonsRating],
                'dodr': graphData?.['all']?.[Question.DawnOfDragonRidersRating],
                'gonf': graphData?.['all']?.[Question.GONFRating],
                'hc': graphData?.['all']?.[Question.HomecomingRating],
              }"
              :dataCount="{
                'bk': graphData?.['all']?.answerCount,
                'bod': graphData?.['all']?.answerCount,
                'dodr': graphData?.['all']?.answerCount,
                'gonf': graphData?.['all']?.answerCount,
                'hc': graphData?.['all']?.answerCount,
              }"
            ></graph>
            <average
              :sets="[{
                setKey: 'bk',
                setLabel: 'Boneknapper',
                color: '#c00'
              },{
                setKey: 'bod',
                setLabel: 'Book of Dragons',
                color: '#d92'
              },{
                setKey: 'dodr',
                setLabel: 'Dawn of Dragon Riders',
                color: '#fb8'
              },{
                setKey: 'gonf',
                setLabel: 'Gift of the Night Fury',
                color: '#139'
              },{
                setKey: 'hc',
                setLabel: 'Homecoming',
                color: '#17a'
              },]"
              :data="{
                _multiSet: true,
                'bk': graphData?.['all']?.[Question.BoneknapperRating],
                'bod': graphData?.['all']?.[Question.BookOfDragonsRating],
                'dodr': graphData?.['all']?.[Question.DawnOfDragonRidersRating],
                'gonf': graphData?.['all']?.[Question.GONFRating],
                'hc': graphData?.['all']?.[Question.HomecomingRating],
              }"
            >
            </average>
          </div>
        </div>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Rate [TV series] from 1 to 10"
              :conf="{
                columnXMargin: '0.125rem',
                barWidth: '8px',
                trackWidthMultiset: 'auto'
              }"
              :columns="graphColumnDefinitions.rating1to10()"
              :sets="[{
                setKey: 'rdob',
                setLabel: 'Riders/Defenders',
                color: '#c00'
              },{
                setKey: 'rtte',
                setLabel: 'Race to the Edge',
                color: '#fb8'
              }]"
              :data="{
                _multiSet: true,
                'rdob': graphData?.['all']?.[Question.RidersOfBerkRating],
                'rtte': graphData?.['all']?.[Question.RTTERating],
              }"
              :dataCount="{
                'rdob': graphData?.['all']?.answerCount,
                'rtte': graphData?.['all']?.answerCount
              }"
            ></graph>
            <average
            :sets="[{
              setKey: 'rdob',
              setLabel: 'Riders/Defenders',
              color: '#c00'
            },{
              setKey: 'rtte',
              setLabel: 'Race to the Edge',
              color: '#fb8'
            }]"
            :data="{
              _multiSet: true,
              'rdob': graphData?.['all']?.[Question.RidersOfBerkRating],
              'rtte': graphData?.['all']?.[Question.RTTERating],
            }"
          ></average>
        </div>

          <div class="graph-normal">
            <graph
              title="Likability of side characters in RTTE"
              description="Rate your agreement with the following statement: 'The side characters (Snotlout, Fishlegs, the Twins, etc) were generally more likable in Race to the Edge than in the films.'"
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.SideCharactersLikabilityAgreement]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :data="graphData?.['all']?.[Question.SideCharactersLikabilityAgreement]"
            ></average>
          </div>
        </div>

        <p>
          Last but not least — even though Race to the Edge is <b>not</b> canon to the movie franchise as far as cold, hard facts
          are concerned, we will see people insisting that it is from time to time. Which begs the question — how many people <i>do</i>
          think that RTTE is canon? Well ...
        </p>

        <div class="graph-area">
          <div class="graph-normal">
          <graph
            title="Is Race to the Edge canon?"
            descriptiom="Do you consider Race to the Edge canon to the films?"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.yesNoNeutral()"
            :data="graphData?.['all']?.[Question.IsRTTECanon]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>
        </div>

        <p>Those headcanons <i>are</i> capable of firing way more than twenty feet.</p>

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
          <div class="graph-normal">
          <graph
            title="Personal enjoyment vs. objective quality."
            description="Rate the following statement: 'Personal enjoyment of a piece of media is different and independent of the quality of that piece of media.' Agreement on the scale from 1 - 10. Bigger number means more agreement."
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.YouCanEnjoyGarbageAgreement]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>
        </div>
        <div>
          <average
            :data="graphData?.['all']?.[Question.YouCanEnjoyGarbageAgreement]"
          ></average>
        </div>
        <p>
          Given reddit, I honestly expected this graph would be so contested it'd make <a href="https://wowpedia.fandom.com/wiki/Tarren_Mill#Tarren_Mill_is_under_attack.21" target="_blank">Tarren Mill</a> seem like a peaceful Lordaeron village.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
          <graph
            title="Most important aspects of a movie"
            description="Of the following aspects of films/shows in general, which do you feel are the MOST important? Try not to check more than 2 boxes."
            :conf="{
              trackWidth: '8px',
              barWidth: '16px !important',
              columnWidth: '32px !important',
              sidewaysLabels: true,
              labelsHeight: '8rem'
            }"
            :columns="graphColumnDefinitions[Question.MostImportantAspects]()"
            :data="graphData?.['all']?.[Question.MostImportantAspects]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>
        </div>

        <div class="graph-area">
          <div class="graph-normal">
            <graph
              title="Why do you like HTTYD franchise? (todo: data)"
              description="Which of the following best describe/describes your reason for being drawn to HTTYD? Try not to check more than 2 boxes."
              :conf="{
                barWidth: '20px !important',
                trackWidthMultiset: '16px !important',
                trackWidth: '16px !important',
                columnWidth: '52px !important',
                sidewaysLabels: true,
                labelsHeight: '16rem'
              }"
              :columns="graphColumnDefinitions[Question.HTTYDAppealReasons]()"
              :data="graphData?.['all']?.[Question.HTTYDAppealReasons]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
          </div>

          <div class="graph-normal">
            <graph
              title="Master/pet or mutual friends?"
              description="Do you view the bond between Hiccup and Toothless as being more 'Master and Pet' or 'Mutual Friends?' 0 - master/pet, 10 - mutual friends"
              :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
              :columns="graphColumnDefinitions.rating1to10()"
              :data="graphData?.['all']?.[Question.BondType]"
              :dataCount="graphData?.['all']?.answerCount"
            ></graph>
            <average
              :data="graphData?.['all']?.[Question.BondType]"
            >
            </average>
          </div>
        </div>

        <p>
          So basically "cos dragons" and "cos story relatable" and "cos world fascinating" for the first question,
          and a rather strong agreement that the bond between Hiccup and Toothless is on the 'mutual friends' 
          end of the spectrum.
        </p>

        <div class="graph-area">
          <div class="graph-normal">
          <graph
            title="Movie ranking"
            description="From best to worst"
            :conf="{
              barWidth: '20px !important',
              trackWidthMultiset: '16px !important',
              trackWidth: '16px !important',
              columnWidth: '52px !important',
              sidewaysLabels: true,
              labelsHeight: '6rem'
            }"
            :columns="graphColumnDefinitions[Question.MovieRanking]()"
            :data="graphData?.['all']?.[Question.MovieRanking]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>

          <div class="graph-normal">
          <graph
            title="Movie watching order"
            description="In which order did you see the each film for the first time?"
            :conf="{
              barWidth: '20px !important',
              trackWidthMultiset: '16px !important',
              trackWidth: '16px !important',
              columnWidth: '52px !important',
              sidewaysLabels: true,
              labelsHeight: '6rem'
            }"
            :columns="graphColumnDefinitions[Question.MovieWatchingOrder]()"
            :data="graphData?.['all']?.[Question.MovieWatchingOrder]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>

          <div class="graph-normal">
          <graph
            title="The Hidden World opinion change"
            description="If you watched The Hidden World before seeing the other two films, did your opinion of The Hidden World change after watching them?"
            :conf="{
              barWidth: '20px !important',
              trackWidthMultiset: '16px !important',
              trackWidth: '16px !important',
              columnWidth: '52px !important',
              sidewaysLabels: true,
              labelsHeight: '6rem'
            }"
            :columns="graphColumnDefinitions.yesNoNeutral()"
            :data="graphData?.['all']?.[Question.THWOpinionChange]"
            :dataCount="graphData?.['all']?.answerCount"
          ></graph>
        </div>
        </div>
        

        <p>
          Compared to the last year, HTTYD1 superior options gained a few percentage points (+2% for 1>2>3 and +4% for 1>3>2). Objectively wrong
          options have also gained some votes, but all in all nothing too statistically significant. Probably.
        </p>
        <p>
          The 2>1>3 option, however, went down by <i>a lot</i>. From 23.9% last year to 17.7% this year.
        </p>
        <p>
          The other two graphs aren't particularly remarkable and thus don't deserve a paragraph of their own.
        </p>
        <p>
          That about covers the answers to the questions at face value. Now let's take a deeper dive into the data and see if there's anything
          hiding deep below in the statistics.
        </p>
      </div>
    </div>

    <div class="segment">
      <h1>Analysis</h1>

      <p>
        Let's take a deeper look into the data. People don't answer the questions randomly: the answers are often shaped by their interests, the
        culture they come from, and sometimes even by their identity. Let's see if we can spot any interesting trends in the results when we filter
        the answers.
      </p>
      <p>
        This year's filter page would be a bit of a pain in the ass to set up properly, and it would require mad amounts of time. Given I have only 
        gotten to this point of the page mid-june (remember: the poll was late January), I do not have the luxury of time to present a functional and
        user-friendly UI (although, with most people having forgot about the poll, there may not be too much harm in delaying this project a further 
        two months or so). Though if you want to filter results on your own and have some very basic knowledge of javascript, you can dig through
        the data <span class="link" @click="showFilterPage=true">here</span>. The filtering page makes absolutely no attempt to accomodate mobile users, because smartphones
        are the worst thing that has happened to the internet in the history of ever.
      </p>

      <FilterPage
        v-if="showFilterPage"
        :rawData="surveyResults"
        @close="showFilterPage=false"
      >
      </FilterPage>
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
      <p>
        <span style="color: green">>implying there was QA</span>
        <small><small><br/>Actually there was. Lots of it. I've got way more problems with parsing data this year than the last one.</small></small>
      </p>
      
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
import FilterPage from './components/FilterPage.vue';
import TitleScreen from './components/TitleScreen.vue';
import Graph from './components/Graph.vue';
import Average from './components/Average.vue';
import FavouriteReasonDisplay from './components/FavouriteReasonDisplay.vue';

import {Character} from './enums/character.enum';
import {FurryCommunity} from './enums/furry-community.enum';
import {Draconid, enum2draconid} from './enums/draconid.enum';
import {Villain} from './enums/villain.enum';

// data
import surveyResults from './assets/results/survey-data.js';
import graphColumnDefinitions from './helpers/column-definitions';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    TitleScreen,
    Graph,
    Average,
    FavouriteReasonDisplay,
    FilterPage,
  },
  data() {
    return {
      Question,
      graphColumnDefinitions,
      surveyResults: JSON.parse(JSON.stringify(surveyResults)),


      graphProcessingQueue: [],
      filteredResults: {},

      showFilterPage: false,

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
      },

      favDraconidOptions: [
        {
          value: undefined,
          label: 'All answers'
        }
      ],
      favVillainOptions: [
        {
          value: undefined,
          label: 'All answers'
        }
      ],
      enum2draconid
    };
  },
  async created() {
    console.log('got data:', surveyResults);
    console.log('c', Object.values(Question));
    console.log("www")
    this.graphData['all'] = await this.processData(surveyResults.processedData, 'all responses');

    console.info('graph data — all:', this.graphData['all']);
    console.info('in graph: :data="graphData[set][question]');

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
            // console.info('answer is array:', answer);
            for (const ans of answer) {
              if (! processedData[question][ans]) {
                processedData[question][ans] = 1;
              } else {
                processedData[question][ans]++;
              }
            }
          } else if (answer.value !== undefined && answer.value !== null) {
            console.log('ans is obj:', answer)
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
            console.log('ans is plain value', answer)
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

      console.info(
      `\n\n\n\n---------------[DATA INPUT]---------------`,
      `\n\n\n          general info\n`,
      // `\ndeleted answers: ${data.deletedCount}`,
      // `\n  valid answers: ${data.processedData.length}`,
      // `\n username given: ${usernameCount}`,
      // `\n feedback given: ${feedbackCount}`,
      '\n\n\n          furry count\n',
      `\n      not furry: ${data.filter(x => x[Question.IsFurry].indexOf(FurryCommunity.None) !== -1).length}`,
      `\n       is furry: ${data.filter(x => x[Question.IsFurry].indexOf(FurryCommunity.Furry) !== -1).length}`,
      `\n      is scalie: ${data.filter(x => x[Question.IsFurry].indexOf(FurryCommunity.Scalie) !== -1).length}`,
      `\n       is other: ${data.filter(x => x[Question.IsFurry].indexOf(FurryCommunity.Other) !== -1).length}`,
      `\n         is shy: ${data.filter(x => x[Question.IsFurry].indexOf(FurryCommunity.AnswerShy) !== -1).length}`,
      '\n\n\n          fav draconid\n',
      `\n     night fury: ${data.filter(x => x[Question.FavouriteDraconid].value === Draconid.NightFury).length}`,
      `\n       thotfury: ${data.filter(x => x[Question.FavouriteDraconid].value === Draconid.ThotFury).length}`,
      '\n\n\n          fav villain\n',
      `\n    green death: ${data.filter(x => x[Question.FavouriteVillain].value === Villain.GreenDeath).length}`,
      `\n          Drago: ${data.filter(x => x[Question.FavouriteVillain].value === Villain.Drago).length}`,
      '\n\n\n          fav/least fav char\n',
      '\n               | HTTYD1    HTTYD2   HTTYD3',
      `\n         hiccup: +${
        data.filter(x => x[Question.HTTYD1FavouriteCharacter].value === Character.Hiccup).length
      }; -${
        data.filter(x => x[Question.HTTYD1WorstCharacter].value === Character.Hiccup).length
      }   +${
        data.filter(x => x[Question.HTTYD2FavouriteCharacter].value === Character.Hiccup).length
      }; -${
        data.filter(x => x[Question.HTTYD2WorstCharacter].value === Character.Hiccup).length
      }   +${
        data.filter(x => x[Question.HTTYD3FavouriteCharacter].value === Character.Hiccup).length
      }; -${
        data.filter(x => x[Question.HTTYD3WorstCharacter].value === Character.Hiccup).length
      }   `,
      `\n        tuffnut: +${
        data.filter(x => x[Question.HTTYD1FavouriteCharacter].value === Character.Tuffnut).length
      }; -${
        data.filter(x => x[Question.HTTYD1WorstCharacter].value === Character.Tuffnut).length
      }   +${
        data.filter(x => x[Question.HTTYD2FavouriteCharacter].value === Character.Tuffnut).length
      }; -${
        data.filter(x => x[Question.HTTYD2WorstCharacter].value === Character.Tuffnut).length
      }   +${
        data.filter(x => x[Question.HTTYD3FavouriteCharacter].value === Character.Tuffnut).length
      }; -${
        data.filter(x => x[Question.HTTYD3WorstCharacter].value === Character.Tuffnut).length
      }   `,
      `\n        ruffnut: +${
        data.filter(x => x[Question.HTTYD1FavouriteCharacter].value === Character.Ruffnut).length
      }; -${
        data.filter(x => x[Question.HTTYD1WorstCharacter].value === Character.Ruffnut).length
      }   +${
        data.filter(x => x[Question.HTTYD2FavouriteCharacter].value === Character.Ruffnut).length
      }; -${
        data.filter(x => x[Question.HTTYD2WorstCharacter].value === Character.Ruffnut).length
      }   +${
        data.filter(x => x[Question.HTTYD3FavouriteCharacter].value === Character.Ruffnut).length
      }; -${
        data.filter(x => x[Question.HTTYD3WorstCharacter].value === Character.Ruffnut).length
      }   `,
    );


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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;600&display=swap');

html, * {
  scrollbar-width: thin;
  scrollbar-color: #fa6 transparent;
}

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

a, .link, a:visited {
  color: #fa6;
  text-decoration: none;
  cursor: pointer;
}

a:hover, a:focus, a:active, .link:hover {
  color: #fa6;
  cursor: pointer;
  text-decoration: underline;
}

@media screen and (max-width: 1200px ) {
  h1 {
    font-size: 4rem !important;
  }
  h2 {
    font-size: 2rem;
  }

  body {
    font-size: 16px;
  }
}
@media screen and (max-width: 420px ) {
  h1 {
    font-size: 3rem !important;
  }
  h2 {
    font-size: 1.5rem;
  }

  body {
    font-size: 14px;
  }
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
  width: calc(100% + 2rem);  

  margin-left: calc(-2rem - 1px);

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .graph-normal, .graph-wide {
    margin: 0.5rem;
  }

  .graph-normal {
    width: 42rem !important;
    max-width: 100%;
  }
  .graph-wide {
    max-width: 100% !important;
    width: 72rem;
  }
}

@media screen and (min-width: 1200px) {
  .graph-area {
    margin-left: calc(0px - max(calc(100vw - min(75rem, 100%)), 0.001px) / 2 - 1px);
    width: calc(100vw - 1px);
  }
}

* {
  box-sizing: border-box;
}
</style>
