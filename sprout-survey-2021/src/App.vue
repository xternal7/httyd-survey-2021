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
            :reasonField="Question.FavouriteDraconidReason"
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
            :reasonField="Question.FavouriteVillainReason"
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
      <h1>Deep dive</h1>

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


      <!-- #region results by age -->
      <h2>Results by age</h2>
      
      <p>
        I didn't expect too much surprises here, but since I was mostly playing with that while debugging my filters, I was doing testing
        by filtering the first result. But there's been some things that ... well, stood out.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="Community"
            :defaultMode="'normalized'"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':2,'label':'Reddit'},{'key':1,'label':'Discord'},{'key':5,'label':'Instagram'},{'key':8,'label':'Fandom'},{'key':9,'label':'Grapewine'},{'key':6,'label':'Amino'},{'key':3,'label':'Tumblr'},{'key':4,'label':'Twitter'},{'key':7,'label':'Youtube'},{'key':10,'label':'Other'},{'key':0,'label':'Shy'},{'key':'dw','label':'multi'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'0':15,'1':101,'2':151,'3':10,'4':4,'5':55,'6':5,'7':35,'8':28,'9':12,'10':15,'dwFlag':17},'sub-17':{'0':1,'1':18,'2':39,'3':1,'4':1,'5':12,'6':2,'7':9,'8':8,'10':3,'dwFlag':7},'17-20':{'0':3,'1':30,'2':44,'3':2,'4':1,'5':19,'6':1,'7':14,'8':10,'9':4,'10':4,'dwFlag':2},'20-23':{'0':3,'1':17,'2':24,'3':5,'4':2,'5':10,'6':1,'7':4,'8':5,'9':2,'10':3,'dwFlag':4},'23-27':{'0':2,'1':13,'2':15,'3':1,'5':3,'8':1,'9':2,'10':1,'dwFlag':1},'27-and-over':{'0':1,'1':12,'2':8,'8':1,'10':2}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
        </div>
      </div>

      <p>
       I honestly thought reddit is more of a boomer (actually gen x/y) thing, but no. Discord wins popularity contest versus reddit in the millenial/gen X category.
      </p>
      <p>
        It is worth noting that — primarily due to the difference in modus operandi for different platforms — respondents skew significantly towards reddit side of things.
      </p>

      <p>
        I am not gonna be covering fandom time, that one is very obvious. Boomers gonna be booming.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
           <graph
            class="graph-wide"
            title="Furries"
            description="Multiple choices were allowed for this question"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':0,'label':'None'},{'key':1,'label':'Furry'},{'key':2,'label':'Scalie'},{'key':3,'label':'Other'},{'key':4,'label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'0':309,'1':80,'2':67,'3':29,'4':17},'sub-17':{'0':79,'1':9,'2':6,'3':5,'4':5},'17-20':{'0':98,'1':24,'2':18,'3':9,'4':4},'20-23':{'0':43,'1':21,'2':20,'3':6,'4':4},'23-27':{'0':28,'1':6,'2':5,'3':3},'27-and-over':{'0':15,'1':9,'2':9,'3':3}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
        </div>
      </div>

      <p>
        My momma says it's just a phase when I fill my days with mayonez, but no. You don't need to squint much to see that the 'None' option
        (as a proportion of the cohort) is actually trending downwards as the people grow older.
      </p>

      <p>
        But now, the interesting parts. Turns out that age does matter when it comes to rating. I am going to gloss over things here, but
        older people generally tend to like the first movie more.
      </p>

      <div class="graph-aree">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="HTTYD1Rating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':1,'4':1,'6':1,'7':7,'8':50,'9':126,'10':245},'sub-17':{'4':1,'6':1,'7':1,'8':14,'9':26,'10':51},'17-20':{'7':4,'8':12,'9':43,'10':73},'20-23':{'8':13,'9':19,'10':44},'23-27':{'7':1,'8':3,'9':12,'10':22},'27-and-over':{'1':1,'7':1,'8':2,'9':2,'10':18}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':1,'4':1,'6':1,'7':7,'8':50,'9':126,'10':245},'sub-17':{'4':1,'6':1,'7':1,'8':14,'9':26,'10':51},'17-20':{'7':4,'8':12,'9':43,'10':73},'20-23':{'8':13,'9':19,'10':44},'23-27':{'7':1,'8':3,'9':12,'10':22},'27-and-over':{'1':1,'7':1,'8':2,'9':2,'10':18}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            >
            </average>
          </graph>
        </div>

        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="HTTYD1PlotRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':1,'4':2,'5':3,'6':2,'7':35,'8':98,'9':111,'10':177,'NoAnswer':2},'sub-17':{'4':1,'5':1,'6':1,'7':8,'8':21,'9':28,'10':33,'NoAnswer':1},'17-20':{'7':15,'8':29,'9':35,'10':53},'20-23':{'5':2,'6':1,'7':4,'8':17,'9':15,'10':37},'23-27':{'7':3,'8':12,'9':8,'10':14,'NoAnswer':1},'27-and-over':{'1':1,'4':1,'8':4,'9':6,'10':12}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':1,'4':1,'6':1,'7':7,'8':50,'9':126,'10':245},'sub-17':{'4':1,'6':1,'7':1,'8':14,'9':26,'10':51},'17-20':{'7':4,'8':12,'9':43,'10':73},'20-23':{'8':13,'9':19,'10':44},'23-27':{'7':1,'8':3,'9':12,'10':22},'27-and-over':{'1':1,'7':1,'8':2,'9':2,'10':18}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
      </div>

      <p>
        Plot rating graph looks as if some people in the 23-27 group accidentally thought this poll is the Stanley Parable and smashed an 8 instead of 10/10,
        but remember: with small sample sizes like this, bell curve anomalies like this are kinda to be expected.
      </p>

      <p>
        I'm not going to post all the graphs, because emotion rating graph resembles the plot rating (minus the bell curve anomaly) in the sense that older 
        people gave better ratings. Theme rating graph is sorta even across demographics. So is the score rating — almost everyone went for 10/10 equally often
        on that one. People who voted anything less than that are such a minority there's nothing to extrapolate from that graph. Character rating graph is
        all over the place.
      </p>

      <p>
        Admittedly, older people sticking higher grades to an older movie is not very surprising. However, when it comes to the visuals, there is a small
        surprise, to be sure — though perhaps a welcome one.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="HTTYD1VisualsRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'4':1,'5':9,'6':20,'7':53,'8':96,'9':99,'10':151,'NoAnswer':2},'sub-17':{'5':1,'6':3,'7':8,'8':12,'9':30,'10':38,'NoAnswer':2},'17-20':{'5':4,'6':6,'7':18,'8':34,'9':24,'10':46},'20-23':{'5':3,'6':4,'7':8,'8':21,'9':16,'10':24},'23-27':{'5':1,'6':4,'7':5,'8':9,'9':8,'10':11},'27-and-over':{'7':3,'8':4,'9':10,'10':7}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'4':1,'5':9,'6':20,'7':53,'8':96,'9':99,'10':151,'NoAnswer':2},'sub-17':{'5':1,'6':3,'7':8,'8':12,'9':30,'10':38,'NoAnswer':2},'17-20':{'5':4,'6':6,'7':18,'8':34,'9':24,'10':46},'20-23':{'5':3,'6':4,'7':8,'8':21,'9':16,'10':24},'23-27':{'5':1,'6':4,'7':5,'8':9,'9':8,'10':11},'27-and-over':{'7':3,'8':4,'9':10,'10':7}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            >
            </average>
          </graph>
        </div>
      </div>

      <p>
        Objectively speaking, the visuals of the first movie <i>do</i> look rather dated due to advancements in computer graphics. But that doesn't stop the youngest
        demographics from ten-outta-tenning the aspect. Interestingly enough, 17-23 cohorts get a bit of a double-peaking at 10 and 8, while the curve of the 27+ 
        cohort gets a single peak at 9/10. 
      </p>

      <p>
        I don't feel there's enough data to comment on fav/lest fav character by age, so we'll be skipping that.
      </p>

      <p>
        Let's move to the second movie.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="HTTYD2Rating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':1,'2':2,'3':1,'4':1,'5':7,'6':15,'7':54,'8':109,'9':122,'10':115,'NoAnswer':4},'sub-17':{'4':1,'5':2,'6':3,'7':10,'8':18,'9':32,'10':26,'NoAnswer':2},'17-20':{'5':1,'6':3,'7':15,'8':29,'9':40,'10':44},'20-23':{'1':1,'2':1,'5':3,'6':2,'7':11,'8':23,'9':14,'10':21},'23-27':{'5':1,'6':2,'7':7,'8':17,'9':6,'10':5},'27-and-over':{'2':1,'3':1,'6':2,'7':3,'8':3,'9':8,'10':5,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':1,'2':2,'3':1,'4':1,'5':7,'6':15,'7':54,'8':109,'9':122,'10':115,'NoAnswer':4},'sub-17':{'4':1,'5':2,'6':3,'7':10,'8':18,'9':32,'10':26,'NoAnswer':2},'17-20':{'5':1,'6':3,'7':15,'8':29,'9':40,'10':44},'20-23':{'1':1,'2':1,'5':3,'6':2,'7':11,'8':23,'9':14,'10':21},'23-27':{'5':1,'6':2,'7':7,'8':17,'9':6,'10':5},'27-and-over':{'2':1,'3':1,'6':2,'7':3,'8':3,'9':8,'10':5,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>

        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="HTTYD2PlotRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':1,'2':1,'3':2,'4':5,'5':13,'6':29,'7':96,'8':107,'9':97,'10':76,'NoAnswer':4},'sub-17':{'4':1,'5':2,'6':4,'7':20,'8':18,'9':25,'10':21,'NoAnswer':3},'17-20':{'4':1,'5':2,'6':11,'7':26,'8':32,'9':37,'10':23},'20-23':{'1':1,'2':1,'5':3,'6':6,'7':18,'8':22,'9':12,'10':13},'23-27':{'4':2,'5':1,'6':4,'7':14,'8':9,'9':4,'10':4},'27-and-over':{'3':2,'5':1,'6':1,'7':4,'8':9,'9':4,'10':2,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':1,'2':1,'3':2,'4':5,'5':13,'6':29,'7':96,'8':107,'9':97,'10':76,'NoAnswer':4},'sub-17':{'4':1,'5':2,'6':4,'7':20,'8':18,'9':25,'10':21,'NoAnswer':3},'17-20':{'4':1,'5':2,'6':11,'7':26,'8':32,'9':37,'10':23},'20-23':{'1':1,'2':1,'5':3,'6':6,'7':18,'8':22,'9':12,'10':13},'23-27':{'4':2,'5':1,'6':4,'7':14,'8':9,'9':4,'10':4},'27-and-over':{'3':2,'5':1,'6':1,'7':4,'8':9,'9':4,'10':2,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
      </div>

      <p>
        Oh, how the turn tables. In general, older respondents judged the plot — as well as the movie overall — more harshly than the younger participants.
      </p>

      <p>
        Other graphs aren't as interesting: while older people did tend to rate the emotional impact slightly lower than the younger participants, the differences
        are almost within the margin of error. Visuals rating is roughly even, with older participants having a slightly bigger chance of rating that aspect lower.
        Character rating is also all over the place.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="HTTYD2ScoreRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'2':1,'3':3,'4':2,'5':6,'6':9,'7':24,'8':83,'9':80,'10':218,'NoAnswer':5},'sub-17':{'5':1,'6':3,'7':3,'8':12,'9':23,'10':50,'NoAnswer':2},'17-20':{'3':1,'4':1,'5':1,'6':1,'7':7,'8':25,'9':17,'10':78,'NoAnswer':1},'20-23':{'2':1,'4':1,'5':3,'6':2,'7':3,'8':14,'9':16,'10':35,'NoAnswer':1},'23-27':{'6':1,'7':3,'8':14,'9':6,'10':14},'27-and-over':{'3':2,'7':2,'8':6,'9':3,'10':10,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'2':1,'3':3,'4':2,'5':6,'6':9,'7':24,'8':83,'9':80,'10':218,'NoAnswer':5},'sub-17':{'5':1,'6':3,'7':3,'8':12,'9':23,'10':50,'NoAnswer':2},'17-20':{'3':1,'4':1,'5':1,'6':1,'7':7,'8':25,'9':17,'10':78,'NoAnswer':1},'20-23':{'2':1,'4':1,'5':3,'6':2,'7':3,'8':14,'9':16,'10':35,'NoAnswer':1},'23-27':{'6':1,'7':3,'8':14,'9':6,'10':14},'27-and-over':{'3':2,'7':2,'8':6,'9':3,'10':10,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
      </div>

      <p>
        There's some good ol' divide along the age lines here, with older participants generally giving worse ratings than their younger counterparts.
        Both 23-27 and 27+ cohorts double-peak on 10/10 and 8/10, but the tallest peak is reversed between the groups and — rather interestingly — 
        23-37 have much bigger portion on 8/10 than the 27+. 
      </p>

      <p>
        Theme rating chart also deserves a shout-out, because this double-peaking phenomenom, with 27+ and 23-27 cohorts holding different peaks
        gets even stronger. But again: remember the small sample size? Wacky results like this aren't too surprising.
      </p>

      <div class="grpah-area">
        <div class="graph-wide">
          <graph
            title="HTTYD2ThemeRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':3,'2':2,'3':3,'4':8,'5':17,'6':33,'7':48,'8':100,'9':87,'10':125,'NoAnswer':5},'sub-17':{'3':1,'4':1,'5':5,'6':9,'7':10,'8':20,'9':20,'10':25,'NoAnswer':3},'17-20':{'1':1,'4':1,'5':3,'6':8,'7':17,'8':28,'9':33,'10':40,'NoAnswer':1},'20-23':{'1':2,'3':1,'4':2,'5':4,'6':9,'7':10,'8':16,'9':8,'10':24},'23-27':{'2':1,'4':2,'5':1,'6':3,'7':2,'8':14,'9':7,'10':8},'27-and-over':{'2':1,'4':1,'5':1,'7':2,'8':5,'9':3,'10':10,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
             <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':3,'2':2,'3':3,'4':8,'5':17,'6':33,'7':48,'8':100,'9':87,'10':125,'NoAnswer':5},'sub-17':{'3':1,'4':1,'5':5,'6':9,'7':10,'8':20,'9':20,'10':25,'NoAnswer':3},'17-20':{'1':1,'4':1,'5':3,'6':8,'7':17,'8':28,'9':33,'10':40,'NoAnswer':1},'20-23':{'1':2,'3':1,'4':2,'5':4,'6':9,'7':10,'8':16,'9':8,'10':24},'23-27':{'2':1,'4':2,'5':1,'6':3,'7':2,'8':14,'9':7,'10':8},'27-and-over':{'2':1,'4':1,'5':1,'7':2,'8':5,'9':3,'10':10,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
      </div>

      <p>&nbsp;</p>

      <p>
        And then there's HTTYD3.
      </p>

      <p>
        As is tradition:
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            title="HTTYD3Rating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':22,'2':14,'3':29,'4':31,'5':23,'6':43,'7':59,'8':69,'9':61,'10':73,'NoAnswer':7},'sub-17':{'1':2,'2':1,'3':3,'4':5,'5':5,'6':10,'7':8,'8':23,'9':19,'10':15,'NoAnswer':3},'17-20':{'1':3,'2':6,'3':9,'4':9,'5':6,'6':10,'7':20,'8':21,'9':23,'10':23,'NoAnswer':2},'20-23':{'1':7,'2':3,'3':1,'4':7,'5':6,'6':6,'7':14,'8':10,'9':7,'10':15},'23-27':{'1':3,'2':1,'3':5,'4':5,'5':1,'6':3,'7':5,'8':4,'9':6,'10':4,'NoAnswer':1},'27-and-over':{'1':3,'2':1,'3':3,'4':2,'5':1,'6':4,'7':1,'8':2,'9':1,'10':5,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
             <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':22,'2':14,'3':29,'4':31,'5':23,'6':43,'7':59,'8':69,'9':61,'10':73,'NoAnswer':7},'sub-17':{'1':2,'2':1,'3':3,'4':5,'5':5,'6':10,'7':8,'8':23,'9':19,'10':15,'NoAnswer':3},'17-20':{'1':3,'2':6,'3':9,'4':9,'5':6,'6':10,'7':20,'8':21,'9':23,'10':23,'NoAnswer':2},'20-23':{'1':7,'2':3,'3':1,'4':7,'5':6,'6':6,'7':14,'8':10,'9':7,'10':15},'23-27':{'1':3,'2':1,'3':5,'4':5,'5':1,'6':3,'7':5,'8':4,'9':6,'10':4,'NoAnswer':1},'27-and-over':{'1':3,'2':1,'3':3,'4':2,'5':1,'6':4,'7':1,'8':2,'9':1,'10':5,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
        <div class="graph-wide">
          <graph
            title="HTTYD3PlotRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':37,'2':33,'3':37,'4':21,'5':28,'6':48,'7':60,'8':63,'9':44,'10':53,'NoAnswer':7},'sub-17':{'1':4,'2':6,'3':4,'4':4,'5':4,'6':4,'7':17,'8':20,'9':12,'10':16,'NoAnswer':3},'17-20':{'1':11,'2':8,'3':12,'4':7,'5':8,'6':16,'7':19,'8':20,'9':13,'10':16,'NoAnswer':2},'20-23':{'1':8,'2':4,'3':8,'4':3,'5':4,'6':10,'7':11,'8':13,'9':7,'10':8},'23-27':{'1':4,'2':6,'3':4,'4':4,'6':7,'7':3,'8':4,'9':3,'10':2,'NoAnswer':1},'27-and-over':{'1':4,'2':5,'3':2,'5':2,'6':3,'8':1,'9':1,'10':5,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':37,'2':33,'3':37,'4':21,'5':28,'6':48,'7':60,'8':63,'9':44,'10':53,'NoAnswer':7},'sub-17':{'1':4,'2':6,'3':4,'4':4,'5':4,'6':4,'7':17,'8':20,'9':12,'10':16,'NoAnswer':3},'17-20':{'1':11,'2':8,'3':12,'4':7,'5':8,'6':16,'7':19,'8':20,'9':13,'10':16,'NoAnswer':2},'20-23':{'1':8,'2':4,'3':8,'4':3,'5':4,'6':10,'7':11,'8':13,'9':7,'10':8},'23-27':{'1':4,'2':6,'3':4,'4':4,'6':7,'7':3,'8':4,'9':3,'10':2,'NoAnswer':1},'27-and-over':{'1':4,'2':5,'3':2,'5':2,'6':3,'8':1,'9':1,'10':5,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
      </div>

      <p>
        Overall, younger respondents seemed to give higher ratings than the older people, but that's only half of the story. With younger people, you're getting
        a nice-ish gauss ... almost. But as soon as you hit 20 or more, you start seeing extremes.
      </p>

      <p>
        And it keeps happening:
      </p>

      <div class="graph-area">
        <div class="graph-wide">
           <graph
            class="graph-wide"
            title="THW Theme rating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':64,'2':26,'3':16,'4':22,'5':23,'6':32,'7':31,'8':55,'9':56,'10':99,'NoAnswer':7},'sub-17':{'1':6,'2':5,'3':3,'4':3,'5':4,'6':9,'7':9,'8':12,'9':16,'10':24,'NoAnswer':3},'17-20':{'1':23,'2':6,'3':3,'4':2,'5':10,'6':8,'7':8,'8':17,'9':18,'10':35,'NoAnswer':2},'20-23':{'1':9,'2':7,'3':5,'4':5,'5':5,'6':7,'7':5,'8':10,'9':6,'10':17},'23-27':{'1':8,'2':1,'3':4,'4':5,'5':1,'6':1,'7':2,'8':3,'9':6,'10':6,'NoAnswer':1},'27-and-over':{'1':7,'2':2,'3':1,'4':1,'5':1,'6':1,'7':1,'8':2,'9':1,'10':6,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':64,'2':26,'3':16,'4':22,'5':23,'6':32,'7':31,'8':55,'9':56,'10':99,'NoAnswer':7},'sub-17':{'1':6,'2':5,'3':3,'4':3,'5':4,'6':9,'7':9,'8':12,'9':16,'10':24,'NoAnswer':3},'17-20':{'1':23,'2':6,'3':3,'4':2,'5':10,'6':8,'7':8,'8':17,'9':18,'10':35,'NoAnswer':2},'20-23':{'1':9,'2':7,'3':5,'4':5,'5':5,'6':7,'7':5,'8':10,'9':6,'10':17},'23-27':{'1':8,'2':1,'3':4,'4':5,'5':1,'6':1,'7':2,'8':3,'9':6,'10':6,'NoAnswer':1},'27-and-over':{'1':7,'2':2,'3':1,'4':1,'5':1,'6':1,'7':1,'8':2,'9':1,'10':6,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
        </div>
      </div>

      <p>
        Theme approval?
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="THWThemeApproval"
          :conf="{
            columnXMargin: '1.2rem',
            barWidth: '8px',
            trackWidth: '8px',
            columnWidth: '72px',
            trackWidthMultiset: 'auto',
            size: 'wide'
          }"
          :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
          :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
          :data="{'_multiSet':true,'all-responses':{'1':40,'2':14,'3':25,'4':22,'5':28,'6':28,'7':44,'8':70,'9':62,'10':88,'NoAnswer':10},'sub-17':{'1':2,'2':3,'3':1,'4':6,'5':6,'6':7,'7':7,'8':22,'9':14,'10':24,'NoAnswer':2},'17-20':{'1':13,'2':3,'3':9,'4':9,'5':5,'6':7,'7':14,'8':21,'9':25,'10':22,'NoAnswer':4},'20-23':{'1':10,'2':2,'3':5,'4':1,'5':8,'6':2,'7':9,'8':14,'9':8,'10':17},'23-27':{'1':6,'2':1,'3':2,'4':3,'5':3,'7':4,'8':2,'9':6,'10':10,'NoAnswer':1},'27-and-over':{'1':3,'2':3,'3':1,'5':4,'7':2,'8':3,'9':1,'10':5,'NoAnswer':2}}"
          :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
        >
          <average
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':40,'2':14,'3':25,'4':22,'5':28,'6':28,'7':44,'8':70,'9':62,'10':88,'NoAnswer':10},'sub-17':{'1':2,'2':3,'3':1,'4':6,'5':6,'6':7,'7':7,'8':22,'9':14,'10':24,'NoAnswer':2},'17-20':{'1':13,'2':3,'3':9,'4':9,'5':5,'6':7,'7':14,'8':21,'9':25,'10':22,'NoAnswer':4},'20-23':{'1':10,'2':2,'3':5,'4':1,'5':8,'6':2,'7':9,'8':14,'9':8,'10':17},'23-27':{'1':6,'2':1,'3':2,'4':3,'5':3,'7':4,'8':2,'9':6,'10':10,'NoAnswer':1},'27-and-over':{'1':3,'2':3,'3':1,'5':4,'7':2,'8':3,'9':1,'10':5,'NoAnswer':2}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          ></average>
        </graph>
      </div>


      <p>
        Older participants generally tend to agree that the plot of The Hidden World is incoherent mess, which it is:
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="THWPlotCoherency"
          :conf="{
            columnXMargin: '1.2rem',
            barWidth: '8px',
            trackWidth: '8px',
            columnWidth: '72px',
            trackWidthMultiset: 'auto',
            size: 'wide'
          }"
          :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
          :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
          :data="{'_multiSet':true,'all-responses':{'1':78,'2':24,'3':38,'4':28,'5':29,'6':34,'7':53,'8':40,'9':42,'10':57,'NoAnswer':8},'sub-17':{'1':10,'2':6,'3':6,'4':3,'5':4,'6':9,'7':16,'8':10,'9':9,'10':18,'NoAnswer':3},'17-20':{'1':18,'2':9,'3':10,'4':10,'5':11,'6':15,'7':15,'8':17,'9':12,'10':13,'NoAnswer':2},'20-23':{'1':15,'2':6,'3':8,'4':4,'5':5,'6':3,'7':8,'8':5,'9':10,'10':12},'23-27':{'1':12,'2':1,'3':5,'4':1,'6':3,'7':4,'8':4,'9':2,'10':5,'NoAnswer':1},'27-and-over':{'1':9,'3':2,'4':2,'5':1,'6':1,'7':2,'8':1,'9':1,'10':4,'NoAnswer':1}}"
          :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
        >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':78,'2':24,'3':38,'4':28,'5':29,'6':34,'7':53,'8':40,'9':42,'10':57,'NoAnswer':8},'sub-17':{'1':10,'2':6,'3':6,'4':3,'5':4,'6':9,'7':16,'8':10,'9':9,'10':18,'NoAnswer':3},'17-20':{'1':18,'2':9,'3':10,'4':10,'5':11,'6':15,'7':15,'8':17,'9':12,'10':13,'NoAnswer':2},'20-23':{'1':15,'2':6,'3':8,'4':4,'5':5,'6':3,'7':8,'8':5,'9':10,'10':12},'23-27':{'1':12,'2':1,'3':5,'4':1,'6':3,'7':4,'8':4,'9':2,'10':5,'NoAnswer':1},'27-and-over':{'1':9,'3':2,'4':2,'5':1,'6':1,'7':2,'8':1,'9':1,'10':4,'NoAnswer':1}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
        </graph>
      </div>

      <p>And <i>yet</i>:</p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="THWFittingEnd"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'Yes'},{'key':3,'label':'Neutral'},{'key':2,'label':'No'},{'key':0,'label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':103,'2':20,'3':21,'4':32,'5':22,'6':15,'7':39,'8':35,'9':53,'10':84,'NoAnswer':7},'sub-17':{'1':14,'2':6,'3':3,'4':3,'5':5,'6':4,'7':9,'8':17,'9':11,'10':19,'NoAnswer':3},'17-20':{'1':35,'3':7,'4':12,'5':6,'6':4,'7':18,'8':4,'9':15,'10':29,'NoAnswer':2},'20-23':{'1':16,'2':3,'3':5,'4':4,'5':6,'6':2,'7':8,'8':6,'9':9,'10':17},'23-27':{'1':10,'2':6,'3':2,'6':1,'7':1,'9':7,'10':10,'NoAnswer':1},'27-and-over':{'1':11,'2':1,'4':4,'5':1,'7':1,'8':2,'9':1,'10':2,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>Wack.</p>

      <p>We need to have an audit to see whether there was a fucky wucky with the data parser.</p>

      <p>
        On a lighter note: remember when I theorized that average ratings for THW visuals may be lower than the other two movies
        because of the overly flashy design of Berk and costumes?
      </p>

      <div class="graph-area">
          <graph
            class="graph-wide"
            title="HTTYD3VisualsRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':5,'2':2,'3':1,'4':5,'5':8,'6':10,'7':16,'8':34,'9':68,'10':275,'NoAnswer':7},'sub-17':{'4':4,'6':2,'7':1,'8':5,'9':15,'10':65,'NoAnswer':2},'17-20':{'5':4,'6':4,'7':4,'8':7,'9':17,'10':94,'NoAnswer':2},'20-23':{'1':3,'2':1,'6':1,'7':4,'8':6,'9':13,'10':48},'23-27':{'3':1,'7':3,'8':5,'9':5,'10':22,'NoAnswer':2},'27-and-over':{'4':1,'5':2,'6':1,'7':1,'8':3,'9':6,'10':9,'NoAnswer':1}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>
        While that graph doesn't prove that theory conclusively, the visuals ratings by older participants do drop off significantly.
        Given the lack of 1/10 votes, I'd reckon lower votes aren't the result of the "fuck THW" salt squad. Also, the older you get, the bigger the chance
        you don't have a favourite THW soundtrack:
      </p>

      <div class="graph-area">
         <graph
            class="graph-wide"
            title="HTTYD3FavouriteSoundtrack"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':0,'label':'Raiders Return to Busy, Busy Berk'},{'key':1,'label':'Dinner Talk'},{'key':2,'label':'Legend Has It'},{'key':3,'label':'Toothless: Smitten'},{'key':4,'label':'Worst Pep Talk Ever'},{'key':5,'label':'Night Fury Killer'},{'key':6,'label':'Exodus!'},{'key':7,'label':'Third Date'},{'key':8,'label':'New New Tail'},{'key':9,'label':'Furies in Love'},{'key':10,'label':'Killer Dragons'},{'key':11,'label':'With Love Comes a Great Waterfall'},{'key':12,'label':'The Hidden World'},{'key':13,'label':'Armada Battle'},{'key':14,'label':'As Long As He\'s Safe'},{'key':15,'label':'Once There Were Dragons'},{'key':16,'label':'Together From Afar'},{'key':17,'label':'The Hidden World Suite'},{'key':19,'label':'Shy'},{'key':18,'label':'Cant read'},{'key':20,'label':'Salt squad'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'2':17,'5':1,'6':8,'7':24,'8':6,'12':64,'13':12,'14':21,'15':157,'16':8,'17':1,'19':108,'20':4},'sub-17':{'2':7,'6':2,'7':3,'8':2,'12':12,'13':3,'14':7,'15':37,'16':2,'19':19},'17-20':{'2':4,'6':5,'7':7,'8':2,'12':13,'13':4,'14':6,'15':57,'16':1,'19':32,'20':1},'20-23':{'2':1,'6':1,'7':3,'8':2,'12':20,'13':2,'14':4,'15':24,'16':2,'17':1,'19':16},'23-27':{'2':1,'7':3,'12':8,'13':1,'15':12,'16':1,'19':11,'20':1},'27-and-over':{'2':1,'7':1,'12':1,'13':1,'14':1,'15':7,'16':1,'19':11}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>
        Reminder: neither of the cohorts had a significant 'Shy' coolumn presence for the first two movies, they were all low enough to be a rounding error. Not with THW.
      </p>

      <p>
        Let's move on.
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="MovieRanking"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':0,'label':'1 > 2 > 3'},{'key':1,'label':'1 > 3 > 2'},{'key':2,'label':'2 > 1 > 3'},{'key':3,'label':'2 > 3 > 1'},{'key':4,'label':'3 > 1 > 2'},{'key':5,'label':'3 > 2 > 1'},{'key':6,'label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'0':228,'1':79,'2':76,'3':16,'4':13,'5':11,'6':8},'sub-17':{'0':34,'1':26,'2':20,'3':5,'4':4,'5':2,'6':3},'17-20':{'0':72,'1':22,'2':24,'3':5,'4':4,'5':4,'6':1},'20-23':{'0':44,'1':11,'2':14,'3':2,'4':2,'5':2,'6':1},'23-27':{'0':25,'1':8,'2':3,'3':2},'27-and-over':{'0':13,'1':2,'2':4,'4':1,'5':2,'6':2}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>
        I really like how older (17+) participants are, in general, "frst movie best, last movie worst" whereas the youngest cohort
        seems to be a bit more varied in their opinions.
      </p>

      <p>
        Moving on. Pop quiz: who thinks RTTE is canon?
      </p>

      <div class="graph-area">
            <graph
            class="graph-wide"
            title="IsRTTECanon"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              sidewaysLabels: true,
              labelsHeight: '6rem',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'Yes'},{'key':3,'label':'Neutral'},{'key':2,'label':'No'},{'key':0,'label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'0':33,'1':235,'2':64,'3':99},'sub-17':{'0':3,'1':63,'2':10,'3':18},'17-20':{'0':8,'1':80,'2':18,'3':26},'20-23':{'0':6,'1':37,'2':11,'3':22},'23-27':{'0':4,'1':13,'2':14,'3':7},'27-and-over':{'0':7,'1':4,'2':5,'3':8}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>
        And who rated Light Fury the worst character of THW? Surprisingly enough, once you're over 23, you simpls stop caring compared to others.
      </p>
      <p>
        Though — remember. Small sample size on the 23+ end of things. Lots of answers.
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="HTTYD3WorstCharacter"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',

              sidewaysLabels: true,
              labelsHeight: '6rem',
              hideZeroColumns: true
            }"
            :columns="[{'key':3,'label':'Hiccup'},{'key':4,'label':'Toothless'},{'key':5,'label':'Astrid'},{'key':7,'label':'Valka'},{'key':14,'label':'Cloudjumper'},{'key':16,'label':'Eret'},{'key':17,'label':'Light Fury'},{'key':18,'label':'Grimmel'},{'key':8,'label':'Gobber'},{'key':9,'label':'Ruffnut'},{'key':10,'label':'Tuffnut'},{'key':11,'label':'Twins'},{'key':12,'label':'Snotlout'},{'key':13,'label':'Fishlegs'},{'key':2,'label':'Other'},{'key':1,'label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':18,'2':21,'3':7,'4':25,'5':9,'6':1,'7':4,'8':1,'9':22,'10':14,'12':71,'13':16,'16':21,'17':120,'18':81},'sub-17':{'1':5,'2':6,'4':3,'6':1,'8':1,'9':5,'10':4,'12':18,'13':2,'16':4,'17':23,'18':22},'17-20':{'1':5,'2':3,'3':3,'4':10,'5':3,'9':9,'12':24,'13':9,'16':7,'17':37,'18':22},'20-23':{'1':2,'2':6,'3':1,'4':4,'7':2,'9':2,'10':3,'12':11,'13':2,'16':4,'17':23,'18':16},'23-27':{'1':2,'2':2,'3':1,'4':3,'5':1,'7':1,'9':2,'10':2,'12':7,'16':2,'17':8,'18':7},'27-and-over':{'1':2,'3':1,'4':1,'5':4,'9':2,'10':2,'12':4,'13':2,'17':3,'18':3}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>
        Cherry on the cake:
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="YouCanEnjoyGarbageAgreement"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide'
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
            :data="{'_multiSet':true,'all-responses':{'1':3,'2':4,'3':9,'4':12,'5':29,'6':17,'7':63,'8':70,'9':58,'10':158,'NoAnswer':8},'sub-17':{'4':4,'5':9,'6':4,'7':16,'8':12,'9':14,'10':31,'NoAnswer':4},'17-20':{'2':4,'3':4,'4':2,'5':11,'6':5,'7':18,'8':22,'9':15,'10':50,'NoAnswer':1},'20-23':{'1':1,'4':4,'5':2,'6':3,'7':11,'8':10,'9':11,'10':33,'NoAnswer':1},'23-27':{'1':1,'3':1,'4':1,'5':2,'6':2,'7':3,'8':6,'9':7,'10':15},'27-and-over':{'4':1,'5':3,'7':2,'8':5,'9':2,'10':11}}"
            :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
          >
            <average
              :sets="[{'setKey':'all-responses','setLabel':'All responses','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'sub-17','setLabel':'sub-17','color':'#fa6','dataCount':94},{'setKey':'17-20','setLabel':'17-20','color':'#f64','dataCount':132},{'setKey':'20-23','setLabel':'20-23','color':'#f41','dataCount':76},{'setKey':'23-27','setLabel':'23-27','color':'#d20','dataCount':38},{'setKey':'27-and-over','setLabel':'27 and over','color':'#b00','dataCount':24}]"
              :data="{'_multiSet':true,'all-responses':{'1':3,'2':4,'3':9,'4':12,'5':29,'6':17,'7':63,'8':70,'9':58,'10':158,'NoAnswer':8},'sub-17':{'4':4,'5':9,'6':4,'7':16,'8':12,'9':14,'10':31,'NoAnswer':4},'17-20':{'2':4,'3':4,'4':2,'5':11,'6':5,'7':18,'8':22,'9':15,'10':50,'NoAnswer':1},'20-23':{'1':1,'4':4,'5':2,'6':3,'7':11,'8':10,'9':11,'10':33,'NoAnswer':1},'23-27':{'1':1,'3':1,'4':1,'5':2,'6':2,'7':3,'8':6,'9':7,'10':15},'27-and-over':{'4':1,'5':3,'7':2,'8':5,'9':2,'10':11}}"
              :dataCount="{'all-responses':431,'':0,'sub-17':94,'17-20':132,'20-23':76,'23-27':38,'27-and-over':24}"
            ></average>
          </graph>
      </div>

      <p>
        The older you are, the more you agree (though admittedly not by a big margin, something something sample size).
      </p>

      <!-- #endregion -->

      <h2>Results by gender</h2>

      <p>
        First things first — we're excluding the 'Other' and 'Shy' responses due to low-ish numbers.
      </p>

      <p>
        First things first. The gender gap. Once people get old enough to stop giving a fuck about stereotypes, it kinda shrinks to pretty much nothing.
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="Age"
          defaultMode="absolute"
          :conf="{trackWidth: '8px !important', columnWidth: '16px !important', hideZeroColumns: false}"
          :columns="[{'key':10,'label':'10'},{'key':11,'label':''},{'key':12,'label':''},{'key':13,'label':''},{'key':14,'label':''},{'key':15,'label':'15'},{'key':16,'label':''},{'key':17,'label':''},{'key':18,'label':''},{'key':19,'label':''},{'key':20,'label':'20'},{'key':21,'label':''},{'key':22,'label':''},{'key':23,'label':''},{'key':24,'label':''},{'key':25,'label':'25'},{'key':26,'label':''},{'key':27,'label':''},{'key':28,'label':''},{'key':29,'label':''},{'key':30,'label':'30'},{'key':31,'label':''},{'key':32,'label':''},{'key':33,'label':''},{'key':34,'label':''},{'key':35,'label':'35'},{'key':36,'label':''},{'key':37,'label':''},{'key':38,'label':''},{'key':39,'label':''},{'key':40,'label':'40'},{'key':41,'label':''},{'key':42,'label':''},{'key':43,'label':''},{'key':44,'label':''},{'key':45,'label':'45'},{'key':46,'label':''},{'key':47,'label':''},{'key':48,'label':''},{'key':49,'label':''},{'key':'-1','label':'❄️'},{'key':'_dumm1','label':''},{'key':'_dumm4','label':''},{'key':'NoAnswer','label':'Shy'}]"
          :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
          :data="{'_multiSet':true,'male':{'12':3,'13':4,'14':19,'15':11,'16':21,'17':31,'18':35,'19':24,'20':21,'21':20,'22':11,'23':6,'24':6,'25':5,'26':4,'27':3,'28':3,'29':4,'31':1,'33':1,'34':3,'NoAnswer':32,'-1':1},'female':{'12':1,'13':2,'14':4,'15':6,'16':9,'17':10,'18':9,'19':16,'20':7,'21':4,'22':4,'23':4,'24':2,'25':4,'26':4,'27':2,'28':3,'NoAnswer':23,'-1':2}}"
          :dataCount="{'male':269,'female':116}"
        >
          <average
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'12':3,'13':4,'14':19,'15':11,'16':21,'17':31,'18':35,'19':24,'20':21,'21':20,'22':11,'23':6,'24':6,'25':5,'26':4,'27':3,'28':3,'29':4,'31':1,'33':1,'34':3,'NoAnswer':32,'-1':1},'female':{'12':1,'13':2,'14':4,'15':6,'16':9,'17':10,'18':9,'19':16,'20':7,'21':4,'22':4,'23':4,'24':2,'25':4,'26':4,'27':2,'28':3,'NoAnswer':23,'-1':2}}"
            :dataCount="{'male':269,'female':116}"
          ></average>
        </graph>
      </div>

      <p>
        Maybe that redditor wasn't completely wacky, but overall ... still rather out of touch with the stereotypes.
      </p>

      <p>
        As a percentage of their group, female respondents seem to be roughly under-represented in the sub-19 group, roughly over-represented among the
        19-27 group, and then nothing after 28. Which explains slightly lower average age and higher standard deviation.
      </p>

      <p>
        Interestingly enough, when it came to rating things on scale from one to ten, girls and women were, on average,
        a bit more generous with the ratings. Doesn't matter where you look: the situation is the same (almost) everywhere.
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="Rate HTTYD1 on 1-10?"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'4':1,'5':1,'7':23,'8':69,'9':71,'10':102,'NoAnswer':2},'female':{'5':2,'6':1,'7':7,'8':21,'9':26,'10':59}}"
            :dataCount="{'male':269,'female':116}"
          >
            <average
              :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
              :data="{'_multiSet':true,'male':{'4':1,'5':1,'7':23,'8':69,'9':71,'10':102,'NoAnswer':2},'female':{'5':2,'6':1,'7':7,'8':21,'9':26,'10':59}}"
              :dataCount="{'male':269,'female':116}"
            ></average>
          </graph>      
      </div>

      <p>Bam, higher ratings on the pink side, across the board. Even for all aspects.</p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="HTTYD 2?"
            description="(overall rating)"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'2':1,'3':1,'5':4,'6':10,'7':38,'8':71,'9':66,'10':76,'NoAnswer':2},'female':{'1':1,'4':1,'5':2,'6':4,'7':11,'8':23,'9':39,'10':35}}"
            :dataCount="{'male':269,'female':116}"
          >
            <average
              :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
              :data="{'_multiSet':true,'male':{'4':1,'5':1,'7':23,'8':69,'9':71,'10':102,'NoAnswer':2},'female':{'5':2,'6':1,'7':7,'8':21,'9':26,'10':59}}"
              :dataCount="{'male':269,'female':116}"
            ></average>
          </graph>
      </div>

      <p>
        The situation is mostly the same — the only notable exception is the plot rating, where male respondents were more likely to dole out ten outta tens than female.
      </p>
      <p>
        <small>
          There's two things worth noting, however: a) boys are showing a complete disregard for what your Statistics 101 professor will tell you and b) on average, female
          ratings still come out to be slightly higher than male ratings.
        </small>
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="HTTYD2PlotRating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'2':1,'3':1,'4':3,'5':8,'6':18,'7':64,'8':59,'9':58,'10':56,'NoAnswer':1},'female':{'1':1,'4':2,'5':3,'6':8,'7':21,'8':30,'9':32,'10':18,'NoAnswer':1}}"
            :dataCount="{'male':269,'female':116}"
          >
            <average
              :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
              :data="{'_multiSet':true,'male':{'4':1,'5':1,'7':23,'8':69,'9':71,'10':102,'NoAnswer':2},'female':{'5':2,'6':1,'7':7,'8':21,'9':26,'10':59}}"
              :dataCount="{'male':269,'female':116}"
            ></average>
          </graph>
      </div>
    
      <p>
        This kind of thinking extends to the shorts and TV series:
      </p>

      <div class="graph-area">

      </div>

      <p>
        There <i>are</i> exceptions, though.
      </p>

      <p>
        For example, female respondents were slightly less likely to think that the bond between Hiccup and Toothless was that of two mutual friends than male respondents:
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="Bond type"
            description="0: master-slave, 10: mutual friends"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'2':2,'3':4,'4':3,'5':3,'6':3,'7':6,'8':29,'9':65,'10':152,'NoAnswer':2},'female':{'1':1,'2':3,'3':1,'4':4,'5':6,'6':2,'7':9,'8':12,'9':13,'10':64,'NoAnswer':1}}"
            :dataCount="{'male':269,'female':116}"
          >
            <!-- todo: averages go here -->
          </graph>
      </div>

      <p>
        And I think that the elephant in the room is starting to become rather apparent by now.
      </p>
      
      <div class="graph-area">
        <graph
            class="graph-wide"
            title="HTTYD3Rating"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'1':12,'2':7,'3':12,'4':14,'5':9,'6':26,'7':45,'8':49,'9':47,'10':45,'NoAnswer':3},'female':{'1':7,'2':6,'3':12,'4':9,'5':11,'6':12,'7':10,'8':15,'9':10,'10':22,'NoAnswer':2}}"
            :dataCount="{'male':269,'female':116}"
          >
            <average
              :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
              :data="{'_multiSet':true,'male':{'1':12,'2':7,'3':12,'4':14,'5':9,'6':26,'7':45,'8':49,'9':47,'10':45,'NoAnswer':3},'female':{'1':7,'2':6,'3':12,'4':9,'5':11,'6':12,'7':10,'8':15,'9':10,'10':22,'NoAnswer':2}}"
              :dataCount="{'male':269,'female':116}"
            ></average>
          </graph>
      </div>

      <p>
        This comes as a surprise when you know the gender of serial complainers on reddit and the main discord.
      </p>

      <p>
        ... which begs the question. Is that truly up to gender, or did we see these graphs before? After all — on average, female respondents seem to be more biased
        towards the 20-27 age group compared to male respondents.
      </p>

      <p>
        Well here you have it.
      </p>

      <p>
        
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="Is RTTE canon?"
            :conf="{
              columnXMargin: '1.2rem',
              barWidth: '8px',
              trackWidth: '8px',
              columnWidth: '72px',
              trackWidthMultiset: 'auto',
              size: 'wide',
              hideZeroColumns: true
            }"
            :columns="[{'key':1,'label':'Yes'},{'key':3,'label':'Neutral'},{'key':2,'label':'No'},{'key':0,'label':'Shy'}]"
            :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
            :data="{'_multiSet':true,'male':{'0':23,'1':141,'2':49,'3':56},'female':{'0':8,'1':70,'2':12,'3':26}}"
            :dataCount="{'male':269,'female':116}"
          >
            <!-- todo: averages go here -->
          </graph>
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
