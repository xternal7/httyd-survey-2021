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

        <Tabs v-model="tabs.base.aggregatedRatings">
          <Tab val='overall' label="Overall" />
          <Tab val='plot' label="Plot" />
          <Tab val='theme' label="Theme" />
          <Tab val='score' label="Score" />
          <Tab val='char' label="Characters" />
          <Tab val='vis' label="Visuals" />
          <Tab val='emo' label="Empotion" />
        </Tabs>
        
        <div class="graph-area">
          <TabPanels v-model="tabs.base.aggregatedRatings">
            <TabPanel val="overall">
              <graph
                title="Rate [movie] from 1 to 10, overall"
                class="graph-wide"
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
              ><average
                :sets="sets.httydMovieSets"
                :data="{
                  _multiSet: true,
                  '1': graphData?.['all']?.[Question.HTTYD1Rating],
                  '2': graphData?.['all']?.[Question.HTTYD2Rating],
                  '3': graphData?.['all']?.[Question.HTTYD3Rating],
                }"
              ></average>
            </graph>
            </TabPanel>
            <TabPanel val='plot'>
              <graph
                title="Rate plot from 1 to 10"
                class="graph-wide"
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
              >
                <average
                  :sets="sets.httydMovieSets"
                  :data="{
                    _multiSet: true,
                    '1': graphData?.['all']?.[Question.HTTYD1PlotRating],
                    '2': graphData?.['all']?.[Question.HTTYD2PlotRating],
                    '3': graphData?.['all']?.[Question.HTTYD3PlotRating],
                  }"
                ></average>
              </graph>
            </TabPanel>
            <TabPanel val='theme'>
              <graph
                title="Rate theme from 1 to 10"
                class="graph-wide"
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
              >
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
              </graph>
            </TabPanel>
            <TabPanel val='score'>
              <graph
                class="graph-wide"
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
              >
                <average
                  :sets="sets.httydMovieSets"
                  :data="{
                    _multiSet: true,
                    '1': graphData?.['all']?.[Question.HTTYD1ScoreRating],
                    '2': graphData?.['all']?.[Question.HTTYD2ScoreRating],
                    '3': graphData?.['all']?.[Question.HTTYD3ScoreRating],
                  }"
                ></average>
              </graph>
            </TabPanel>
            <TabPanel val='char'>
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
              >
                <average
                  :sets="sets.httydMovieSets"
                  :data="{
                    _multiSet: true,
                    '1': graphData?.['all']?.[Question.HTTYD1CharacterRating],
                    '2': graphData?.['all']?.[Question.HTTYD2CharacterRating],
                    '3': graphData?.['all']?.[Question.HTTYD3CharacterRating],
                  }"
                ></average>
              </graph>
            </TabPanel>
            <TabPanel val='vis'>
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
              >
                <average
                  :sets="sets.httydMovieSets"
                  :data="{
                    _multiSet: true,
                    '1': graphData?.['all']?.[Question.HTTYD1VisualsRating],
                    '2': graphData?.['all']?.[Question.HTTYD2VisualsRating],
                    '3': graphData?.['all']?.[Question.HTTYD3VisualsRating],
                  }"
                ></average>
              </graph>
            </TabPanel>
            <TabPanel val='emo'>
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
              >
                <average
                  :sets="sets.httydMovieSets"
                  :data="{
                    _multiSet: true,
                    '1': graphData?.['all']?.[Question.HTTYD1EmotionRating],
                    '2': graphData?.['all']?.[Question.HTTYD2EmotionRating],
                    '3': graphData?.['all']?.[Question.HTTYD3EmotionRating]
                  }"
                ></average>
              </graph>
            </TabPanel>
          </TabPanels>
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

      <p>
        By the way, there's a lot of additional graphs in there, so the sections will start out collapsed. 
      </p>

      <!-- #region results by age -->
      <h2 @click="deepDiveResults.age = !deepDiveResults.age">Results by age</h2>
      <template v-if="deepDiveResults.age">
      <p>
        I didn't expect too much surprises here, but since I was mostly playing with that while debugging my filters, I was doing testing
        by filtering the first result. But there's been some things that ... well, stood out.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="Community"
            :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
            :columns="[{'key':2,'label':'Reddit'},{'key':1,'label':'Discord'},{'key':5,'label':'Instagram'},{'key':8,'label':'Fandom'},{'key':9,'label':'Grapewine'},{'key':6,'label':'Amino'},{'key':3,'label':'Tumblr'},{'key':4,'label':'Twitter'},{'key':7,'label':'Youtube'},{'key':10,'label':'Other'},{'key':0,'label':'Shy'},{'key':11,'label':'D.W.'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'0':15,'1':101,'2':151,'3':10,'4':4,'5':55,'6':5,'7':35,'8':28,'9':12,'10':15,'11':17},'under-16':{'1':10,'2':28,'5':7,'7':6,'8':5,'10':2,'11':7},'16-19':{'0':3,'1':30,'2':41,'3':3,'4':2,'5':18,'6':2,'7':12,'8':10,'10':5,'11':2},'19-22':{'0':3,'1':22,'2':33,'3':5,'4':1,'5':13,'6':2,'7':9,'8':6,'9':6,'10':3,'11':3},'22-26':{'0':3,'1':14,'2':15,'3':1,'4':1,'5':5,'8':3,'9':1,'10':1,'11':2},'26+':{'0':1,'1':14,'2':13,'5':1,'8':1,'9':1,'10':2}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
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
        Interestingly enough, Asians are super over-represented in the under-16 (16 or less) group:
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="Location"
            :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
            :columns="[{'key':6,'label':'Europe'},{'key':3,'label':'Asia'},{'key':1,'label':'Africa'},{'key':4,'label':'Australia'},{'key':7,'label':'NA'},{'key':8,'label':'SA'},{'key':2,'label':'Antarctica'},{'key':0,'label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'0':8,'1':2,'2':2,'3':31,'4':27,'6':160,'7':194,'8':7},'under-16':{'1':2,'2':1,'3':16,'4':4,'6':9,'7':26},'16-19':{'0':1,'3':8,'4':12,'6':55,'7':46,'8':4},'19-22':{'0':1,'3':3,'4':6,'6':43,'7':49,'8':1},'22-26':{'3':1,'4':3,'6':19,'7':20,'8':1},'26+':{'2':1,'6':15,'7':17}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
          </graph>
      </div>
  
      <p>
        I am not gonna be covering fandom time, that one is very obvious. Boomers gonna be booming.
      </p>

      <div class="graph-area">
        <div class="graph-wide">
          <graph
            class="graph-wide"
            title="Furries"
            description="Multiple choices were allowed for this question"
            :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
            :columns="[{'key':0,'label':'None'},{'key':1,'label':'Furry'},{'key':2,'label':'Scalie'},{'key':3,'label':'Other'},{'key':4,'label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'0':309,'1':80,'2':67,'3':29,'4':17},'under-16':{'0':49,'1':5,'2':3,'3':2,'4':4},'16-19':{'0':95,'1':22,'2':19,'3':10,'4':5},'19-22':{'0':69,'1':21,'2':16,'3':8,'4':4},'22-26':{'0':28,'1':11,'2':9,'3':3},'26+':{'0':22,'1':10,'2':11,'3':3}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
          </graph>
        </div>
      </div>

      <p>
        My mamma says it's just a phase when I fill my days with mayonez, but no. You don't need to squint much to see that the 'None' option
        (as a proportion of the cohort) is actually trending downwards as the people grow older.
      </p>

      <p>
        But now, the interesting parts. Turns out that age does matter when it comes to rating. I am going to gloss over things here, but
        older people generally tend to like the first movie more.
      </p>

      <Tabs v-model="tabs.age.httyd1">
        <Tab val="overall" label="Overall" />
        <Tab val="plot" label="Plot" />
        <Tab val="emo" label="Emotion" />
        <Tab val="char" label="Characters" />
        <Tab val="theme" label="Theme" />
        <Tab val="vis" label="Visuals" />
        <Tab val="ost" label="Score" />
        <Tab val="fsong" label="Fav song" />
        <Tab val="fchar" label="Favourite character" />
        <Tab val="wchar" label="Worst character" />
      </Tabs>
      <div class="graph-aree">
        <TabPanels v-model="tabs.age.httyd1">
          <TabPanel val="overall" class="graph-wide">
            <graph
              class="graph-wide"
              title="HTTYD1Rating"
              :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
              :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':1,'4':1,'6':1,'7':7,'8':50,'9':126,'10':245},'under-16':{'6':1,'8':9,'9':16,'10':32},'16-19':{'4':1,'7':5,'8':14,'9':41,'10':65},'19-22':{'8':11,'9':30,'10':62},'22-26':{'7':1,'8':8,'9':11,'10':24},'26+':{'1':1,'7':1,'8':2,'9':4,'10':25}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
                <average
                  :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                  :data="{'_multiSet':true,'all':{'1':1,'4':1,'6':1,'7':7,'8':50,'9':126,'10':245},'under-16':{'6':1,'8':9,'9':16,'10':32},'16-19':{'4':1,'7':5,'8':14,'9':41,'10':65},'19-22':{'8':11,'9':30,'10':62},'22-26':{'7':1,'8':8,'9':11,'10':24},'26+':{'1':1,'7':1,'8':2,'9':4,'10':25}}"
                  :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
                ></average>
              
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="plot">
            <graph
              class="graph-wide"
              title="HTTYD1: Plot"
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
          </TabPanel>
          <TabPanel class="graph-wide" val="vis">
            <graph
              class="graph-wide"
              title="HTTYD1: Visuals"
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
          </TabPanel>
          <TabPanel class="graph-wide" val="emo">
            <graph
              class="graph-wide"
              title="HTTYD1EmotionRating"
              :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
              :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':1,'2':1,'4':2,'5':5,'6':12,'7':37,'8':80,'9':98,'10':194,'NoAnswer':1},'under-16':{'6':1,'7':6,'8':13,'9':13,'10':25},'16-19':{'5':2,'6':3,'7':14,'8':28,'9':26,'10':52,'NoAnswer':1},'19-22':{'4':1,'5':3,'6':2,'7':8,'8':16,'9':20,'10':53},'22-26':{'6':1,'7':4,'8':9,'9':11,'10':19},'26+':{'2':1,'7':1,'8':3,'9':9,'10':19}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
                <average
                  :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                  :data="{'_multiSet':true,'all':{'1':1,'2':1,'4':2,'5':5,'6':12,'7':37,'8':80,'9':98,'10':194,'NoAnswer':1},'under-16':{'6':1,'7':6,'8':13,'9':13,'10':25},'16-19':{'5':2,'6':3,'7':14,'8':28,'9':26,'10':52,'NoAnswer':1},'19-22':{'4':1,'5':3,'6':2,'7':8,'8':16,'9':20,'10':53},'22-26':{'6':1,'7':4,'8':9,'9':11,'10':19},'26+':{'2':1,'7':1,'8':3,'9':9,'10':19}}"
                  :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
                ></average>
              
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="char">
            <graph
              class="graph-wide"
              title="HTTYD1CharacterRating"
              :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
              :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':1,'4':1,'5':10,'6':12,'7':50,'8':93,'9':101,'10':161,'NoAnswer':2},'under-16':{'5':3,'6':2,'7':4,'8':14,'9':13,'10':22},'16-19':{'4':1,'5':2,'6':5,'7':15,'8':28,'9':30,'10':44,'NoAnswer':1},'19-22':{'5':3,'6':1,'7':11,'8':22,'9':22,'10':43,'NoAnswer':1},'22-26':{'5':1,'6':4,'7':10,'8':11,'9':9,'10':9},'26+':{'1':1,'7':4,'8':5,'9':8,'10':15}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
                <average
                  :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                  :data="{'_multiSet':true,'all':{'1':1,'4':1,'5':10,'6':12,'7':50,'8':93,'9':101,'10':161,'NoAnswer':2},'under-16':{'5':3,'6':2,'7':4,'8':14,'9':13,'10':22},'16-19':{'4':1,'5':2,'6':5,'7':15,'8':28,'9':30,'10':44,'NoAnswer':1},'19-22':{'5':3,'6':1,'7':11,'8':22,'9':22,'10':43,'NoAnswer':1},'22-26':{'5':1,'6':4,'7':10,'8':11,'9':9,'10':9},'26+':{'1':1,'7':4,'8':5,'9':8,'10':15}}"
                  :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
                ></average>
              
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="theme">
            <graph
              class="graph-wide"
              title="HTTYD1ThemeRating"
              :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
              :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':3,'4':3,'5':6,'6':9,'7':27,'8':52,'9':95,'10':235,'NoAnswer':1},'under-16':{'1':1,'6':1,'7':7,'8':9,'9':12,'10':28},'16-19':{'4':1,'5':3,'6':2,'7':5,'8':11,'9':36,'10':67,'NoAnswer':1},'19-22':{'1':1,'4':1,'5':1,'6':2,'7':8,'8':14,'9':19,'10':57},'22-26':{'4':1,'6':1,'7':4,'8':7,'9':12,'10':19},'26+':{'1':1,'5':1,'8':3,'9':3,'10':25}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
                <average
                  :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                  :data="{'_multiSet':true,'all':{'1':3,'4':3,'5':6,'6':9,'7':27,'8':52,'9':95,'10':235,'NoAnswer':1},'under-16':{'1':1,'6':1,'7':7,'8':9,'9':12,'10':28},'16-19':{'4':1,'5':3,'6':2,'7':5,'8':11,'9':36,'10':67,'NoAnswer':1},'19-22':{'1':1,'4':1,'5':1,'6':2,'7':8,'8':14,'9':19,'10':57},'22-26':{'4':1,'6':1,'7':4,'8':7,'9':12,'10':19},'26+':{'1':1,'5':1,'8':3,'9':3,'10':25}}"
                  :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
                ></average>
              
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="ost">
            <graph
              class="graph-wide"
              title="HTTYD1ScoreRating"
              :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
              :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'2':1,'3':1,'4':1,'5':3,'6':5,'7':8,'8':17,'9':38,'10':356,'NoAnswer':1},'under-16':{'6':1,'7':1,'8':7,'9':5,'10':44},'16-19':{'3':1,'5':2,'6':1,'7':4,'8':3,'9':8,'10':106,'NoAnswer':1},'19-22':{'5':1,'7':3,'8':4,'9':8,'10':87},'22-26':{'9':6,'10':38},'26+':{'2':1,'6':2,'8':1,'9':1,'10':28}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
                <average
                  :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                  :data="{'_multiSet':true,'all':{'2':1,'3':1,'4':1,'5':3,'6':5,'7':8,'8':17,'9':38,'10':356,'NoAnswer':1},'under-16':{'6':1,'7':1,'8':7,'9':5,'10':44},'16-19':{'3':1,'5':2,'6':1,'7':4,'8':3,'9':8,'10':106,'NoAnswer':1},'19-22':{'5':1,'7':3,'8':4,'9':8,'10':87},'22-26':{'9':6,'10':38},'26+':{'2':1,'6':2,'8':1,'9':1,'10':28}}"
                  :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
                ></average>
              
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="fsong">
            <graph
              class="graph-wide"
              title="HTTYD1FavouriteSoundtrack"
              :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
              :columns="[{'key':0,'label':'This is Berk'},{'key':1,'label':'Dragon Battle'},{'key':2,'label':'The Downed Dragon'},{'key':3,'label':'Dragon training'},{'key':4,'label':'Wounded'},{'key':5,'label':'The Dragon Book'},{'key':6,'label':'Focus, Hiccup!'},{'key':7,'label':'Forbidden Friendship'},{'key':8,'label':'New Tail'},{'key':9,'label':'See You Tomorrow'},{'key':10,'label':'Test Drive'},{'key':11,'label':'Not so Fireproof'},{'key':12,'label':'This Time For Sure'},{'key':13,'label':'Astrid Goes for a Spin'},{'key':14,'label':'Romantic Flight'},{'key':15,'label':'Dragon\'s Den'},{'key':16,'label':'The Cove'},{'key':17,'label':'The Kill Ring'},{'key':18,'label':'Ready The Ships'},{'key':19,'label':'Battling the Green Death'},{'key':20,'label':'Counter Attack'},{'key':21,'label':'Where\'s Hiccup'},{'key':22,'label':'Coming Back Around'},{'key':23,'label':'Sticks and Stones'},{'key':24,'label':'Vikings Have Their Tea'},{'key':25,'label':'Shy'},{'key':26,'label':'D.W.'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'2':1,'7':120,'8':15,'9':13,'10':139,'14':33,'15':1,'21':5,'22':9,'23':28,'25':67,'26':1},'under-16':{'7':3,'8':3,'9':1,'10':24,'14':5,'21':3,'22':3,'23':5,'25':11},'16-19':{'2':1,'7':37,'8':3,'9':4,'10':38,'14':9,'22':1,'23':7,'25':26,'26':1},'19-22':{'7':42,'8':5,'9':2,'10':25,'14':7,'21':2,'22':4,'23':6,'25':10},'22-26':{'7':15,'9':1,'10':16,'14':3,'22':1,'23':4,'25':4},'26+':{'7':12,'8':1,'9':2,'10':10,'14':1,'23':2,'25':5}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="fchar">
            <graph
              class="graph-wide"
              title="HTTYD1FavouriteCharacter"
              :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
              :columns="[{'key':3,'label':'Hiccup'},{'key':4,'label':'Toothless'},{'key':5,'label':'Astrid'},{'key':6,'label':'Stoick'},{'key':8,'label':'Gobber'},{'key':9,'label':'Ruffnut'},{'key':10,'label':'Tuffnut'},{'key':11,'label':'Twins'},{'key':12,'label':'Snotlout'},{'key':13,'label':'Fishlegs'},{'key':2,'label':'Other'},{'key':1,'label':'Shy'},{'key':'dwFlag','label':'D.W.'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':4,'2':14,'3':121,'4':242,'5':19,'6':8,'8':16,'9':2,'10':4,'12':1},'under-16':{'1':1,'2':4,'3':16,'4':25,'5':4,'8':7,'9':1},'16-19':{'1':1,'2':3,'3':30,'4':75,'5':6,'6':6,'8':5},'19-22':{'1':2,'2':6,'3':34,'4':54,'5':3,'8':1,'10':3},'22-26':{'3':16,'4':24,'5':3,'9':1},'26+':{'3':10,'4':21,'5':1,'12':1}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
            </graph>
          </TabPanel>
          <TabPanel class="graph-wide" val="wchar">
            <graph
              class="graph-wide"
              title="HTTYD1WorstCharacter"
              :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
              :columns="[{'key':3,'label':'Hiccup'},{'key':4,'label':'Toothless'},{'key':5,'label':'Astrid'},{'key':6,'label':'Stoick'},{'key':8,'label':'Gobber'},{'key':9,'label':'Ruffnut'},{'key':10,'label':'Tuffnut'},{'key':11,'label':'Twins'},{'key':12,'label':'Snotlout'},{'key':13,'label':'Fishlegs'},{'key':2,'label':'Other'},{'key':1,'label':'Shy'},{'key':'dwFlag','label':'D.W.'}]"
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':42,'2':37,'3':2,'4':2,'5':34,'6':19,'8':7,'9':43,'10':38,'12':147,'13':59,'16':1,'dwFlag':4},'under-16':{'1':3,'2':5,'5':1,'6':2,'9':6,'10':5,'12':28,'13':7,'16':1},'16-19':{'1':14,'2':15,'4':1,'5':9,'6':5,'8':3,'9':9,'10':10,'12':42,'13':18,'dwFlag':2},'19-22':{'1':11,'2':6,'3':2,'5':9,'6':4,'8':1,'9':11,'10':12,'12':34,'13':13},'22-26':{'1':2,'2':4,'5':7,'6':1,'8':1,'9':7,'10':4,'12':13,'13':5},'26+':{'1':3,'2':2,'4':1,'5':4,'6':1,'8':1,'9':3,'10':3,'12':8,'13':7,'dwFlag':1}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            > 
            </graph>
          </TabPanel>
        </TabPanels>
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
        <graph
          class="graph-wide"
          title="HTTYD2Rating"
          :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
          :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
          :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
          :data="{'_multiSet':true,'all':{'1':1,'2':2,'3':1,'4':1,'5':7,'6':15,'7':54,'8':109,'9':122,'10':115,'NoAnswer':4},'under-16':{'4':1,'5':1,'6':2,'7':9,'8':9,'9':18,'10':18},'16-19':{'5':2,'6':3,'7':13,'8':29,'9':38,'10':39,'NoAnswer':2},'19-22':{'5':2,'6':3,'7':12,'8':30,'9':30,'10':26},'22-26':{'1':1,'2':1,'5':2,'6':1,'7':6,'8':17,'9':5,'10':11},'26+':{'2':1,'3':1,'6':3,'7':6,'8':5,'9':9,'10':7,'NoAnswer':1}}"
          :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
        > 
            <average
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':1,'2':2,'3':1,'4':1,'5':7,'6':15,'7':54,'8':109,'9':122,'10':115,'NoAnswer':4},'under-16':{'4':1,'5':1,'6':2,'7':9,'8':9,'9':18,'10':18},'16-19':{'5':2,'6':3,'7':13,'8':29,'9':38,'10':39,'NoAnswer':2},'19-22':{'5':2,'6':3,'7':12,'8':30,'9':30,'10':26},'22-26':{'1':1,'2':1,'5':2,'6':1,'7':6,'8':17,'9':5,'10':11},'26+':{'2':1,'3':1,'6':3,'7':6,'8':5,'9':9,'10':7,'NoAnswer':1}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            ></average>
          
        </graph>

        <graph
            class="graph-wide"
            title="HTTYD2PlotRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':1,'2':1,'3':2,'4':5,'5':13,'6':29,'7':96,'8':107,'9':97,'10':76,'NoAnswer':4},'under-16':{'4':1,'5':2,'6':2,'7':13,'8':11,'9':15,'10':13,'NoAnswer':1},'16-19':{'5':1,'6':8,'7':26,'8':28,'9':36,'10':25,'NoAnswer':2},'19-22':{'4':1,'5':3,'6':10,'7':23,'8':31,'9':20,'10':15},'22-26':{'1':1,'2':1,'4':1,'5':2,'6':5,'7':12,'8':8,'9':7,'10':7},'26+':{'3':2,'4':1,'5':1,'6':1,'7':8,'8':12,'9':4,'10':3,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':1,'2':1,'3':2,'4':5,'5':13,'6':29,'7':96,'8':107,'9':97,'10':76,'NoAnswer':4},'under-16':{'4':1,'5':2,'6':2,'7':13,'8':11,'9':15,'10':13,'NoAnswer':1},'16-19':{'5':1,'6':8,'7':26,'8':28,'9':36,'10':25,'NoAnswer':2},'19-22':{'4':1,'5':3,'6':10,'7':23,'8':31,'9':20,'10':15},'22-26':{'1':1,'2':1,'4':1,'5':2,'6':5,'7':12,'8':8,'9':7,'10':7},'26+':{'3':2,'4':1,'5':1,'6':1,'7':8,'8':12,'9':4,'10':3,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
          </graph>
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
        <graph
            class="graph-wide"
            title="HTTYD2ScoreRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'2':1,'3':3,'4':2,'5':6,'6':9,'7':24,'8':83,'9':80,'10':218,'NoAnswer':5},'under-16':{'5':1,'6':2,'7':2,'8':8,'9':17,'10':28},'16-19':{'3':1,'4':1,'6':2,'7':8,'8':22,'9':12,'10':77,'NoAnswer':3},'19-22':{'5':2,'6':2,'7':2,'8':19,'9':25,'10':52,'NoAnswer':1},'22-26':{'2':1,'4':1,'5':2,'6':1,'7':4,'8':11,'9':6,'10':18},'26+':{'3':2,'7':2,'8':11,'9':5,'10':12,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'2':1,'3':3,'4':2,'5':6,'6':9,'7':24,'8':83,'9':80,'10':218,'NoAnswer':5},'under-16':{'5':1,'6':2,'7':2,'8':8,'9':17,'10':28},'16-19':{'3':1,'4':1,'6':2,'7':8,'8':22,'9':12,'10':77,'NoAnswer':3},'19-22':{'5':2,'6':2,'7':2,'8':19,'9':25,'10':52,'NoAnswer':1},'22-26':{'2':1,'4':1,'5':2,'6':1,'7':4,'8':11,'9':6,'10':18},'26+':{'3':2,'7':2,'8':11,'9':5,'10':12,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
        </graph>
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
        <graph
            class="graph-wide"
            title="HTTYD2ThemeRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':3,'2':2,'3':3,'4':8,'5':17,'6':33,'7':48,'8':100,'9':87,'10':125,'NoAnswer':5},'under-16':{'3':1,'5':5,'6':5,'7':4,'8':16,'9':13,'10':13,'NoAnswer':1},'16-19':{'4':1,'5':2,'6':9,'7':21,'8':22,'9':27,'10':42,'NoAnswer':2},'19-22':{'1':1,'3':1,'4':3,'5':5,'6':11,'7':10,'8':23,'9':18,'10':30,'NoAnswer':1},'22-26':{'1':2,'2':1,'4':1,'5':1,'6':3,'7':3,'8':16,'9':9,'10':8},'26+':{'2':1,'4':2,'5':1,'6':1,'7':3,'8':6,'9':4,'10':14,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':3,'2':2,'3':3,'4':8,'5':17,'6':33,'7':48,'8':100,'9':87,'10':125,'NoAnswer':5},'under-16':{'3':1,'5':5,'6':5,'7':4,'8':16,'9':13,'10':13,'NoAnswer':1},'16-19':{'4':1,'5':2,'6':9,'7':21,'8':22,'9':27,'10':42,'NoAnswer':2},'19-22':{'1':1,'3':1,'4':3,'5':5,'6':11,'7':10,'8':23,'9':18,'10':30,'NoAnswer':1},'22-26':{'1':2,'2':1,'4':1,'5':1,'6':3,'7':3,'8':16,'9':9,'10':8},'26+':{'2':1,'4':2,'5':1,'6':1,'7':3,'8':6,'9':4,'10':14,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
          </graph>
      </div>

      <p>&nbsp;</p>

      <p>
        And then there's HTTYD3.
      </p>

      <p>
        As is tradition:
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="HTTYD3Rating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':22,'2':14,'3':29,'4':31,'5':23,'6':43,'7':59,'8':69,'9':61,'10':73,'NoAnswer':7},'under-16':{'1':2,'3':2,'4':2,'5':4,'6':4,'7':6,'8':17,'9':8,'10':12,'NoAnswer':1},'16-19':{'1':3,'2':5,'3':7,'4':7,'5':4,'6':12,'7':12,'8':21,'9':29,'10':23,'NoAnswer':3},'19-22':{'1':3,'2':5,'3':4,'4':10,'5':9,'6':9,'7':21,'8':15,'9':11,'10':15,'NoAnswer':1},'22-26':{'1':7,'2':1,'3':2,'4':7,'5':1,'6':4,'7':8,'8':3,'9':4,'10':6,'NoAnswer':1},'26+':{'1':3,'2':1,'3':6,'4':2,'5':1,'6':4,'7':1,'8':4,'9':4,'10':6,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':22,'2':14,'3':29,'4':31,'5':23,'6':43,'7':59,'8':69,'9':61,'10':73,'NoAnswer':7},'under-16':{'1':2,'3':2,'4':2,'5':4,'6':4,'7':6,'8':17,'9':8,'10':12,'NoAnswer':1},'16-19':{'1':3,'2':5,'3':7,'4':7,'5':4,'6':12,'7':12,'8':21,'9':29,'10':23,'NoAnswer':3},'19-22':{'1':3,'2':5,'3':4,'4':10,'5':9,'6':9,'7':21,'8':15,'9':11,'10':15,'NoAnswer':1},'22-26':{'1':7,'2':1,'3':2,'4':7,'5':1,'6':4,'7':8,'8':3,'9':4,'10':6,'NoAnswer':1},'26+':{'1':3,'2':1,'3':6,'4':2,'5':1,'6':4,'7':1,'8':4,'9':4,'10':6,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
          </graph>
      </div>

      <p>
        Overall, younger respondents seemed to give higher ratings than the older people, but that's only half of the story. With younger people, you're getting
        a nice-ish gauss ... almost. But as soon as you hit 20 or more, you start seeing extremes.
      </p>

      <p>
        And it keeps happening:
      </p>

      <div class="graph-area">

        <Tabs v-model="tabs.age.thwRatings">
          <Tab
            label="Plot"
            val="plot"
          />
          <Tab
            label="Theme rating"
            val="theme"
          />
          <Tab
            label="Theme Approval"
            val="theme-approval"
          />
        </Tabs>

        <TabPanels v-model="tabs.age.thwRatings">
          <TabPanel val="plot">
            <graph
            class="graph-wide"
            title="HTTYD3PlotRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':37,'2':33,'3':37,'4':21,'5':28,'6':48,'7':60,'8':63,'9':44,'10':53,'NoAnswer':7},'under-16':{'1':3,'2':1,'3':3,'4':2,'5':4,'6':1,'7':7,'8':14,'9':10,'10':12,'NoAnswer':1},'16-19':{'1':9,'2':10,'3':8,'4':6,'5':6,'6':13,'7':21,'8':21,'9':10,'10':19,'NoAnswer':3},'19-22':{'1':6,'2':7,'3':13,'4':5,'5':3,'6':15,'7':18,'8':17,'9':11,'10':7,'NoAnswer':1},'22-26':{'1':9,'2':4,'3':3,'4':5,'5':3,'6':6,'7':4,'8':3,'9':3,'10':3,'NoAnswer':1},'26+':{'1':4,'2':7,'3':3,'5':2,'6':5,'8':3,'9':2,'10':6,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':37,'2':33,'3':37,'4':21,'5':28,'6':48,'7':60,'8':63,'9':44,'10':53,'NoAnswer':7},'under-16':{'1':3,'2':1,'3':3,'4':2,'5':4,'6':1,'7':7,'8':14,'9':10,'10':12,'NoAnswer':1},'16-19':{'1':9,'2':10,'3':8,'4':6,'5':6,'6':13,'7':21,'8':21,'9':10,'10':19,'NoAnswer':3},'19-22':{'1':6,'2':7,'3':13,'4':5,'5':3,'6':15,'7':18,'8':17,'9':11,'10':7,'NoAnswer':1},'22-26':{'1':9,'2':4,'3':3,'4':5,'5':3,'6':6,'7':4,'8':3,'9':3,'10':3,'NoAnswer':1},'26+':{'1':4,'2':7,'3':3,'5':2,'6':5,'8':3,'9':2,'10':6,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
          </graph>
          </TabPanel>
          <TabPanel val="theme">
            <graph
            class="graph-wide"
            title="HTTYD3ThemeRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':64,'2':26,'3':16,'4':22,'5':23,'6':32,'7':31,'8':55,'9':56,'10':99,'NoAnswer':7},'under-16':{'1':4,'2':4,'3':1,'4':1,'5':2,'6':5,'7':3,'8':7,'9':11,'10':19,'NoAnswer':1},'16-19':{'1':17,'2':4,'3':4,'4':4,'5':8,'6':8,'7':12,'8':16,'9':17,'10':33,'NoAnswer':3},'19-22':{'1':13,'2':8,'3':6,'4':4,'5':8,'6':10,'7':6,'8':15,'9':9,'10':23,'NoAnswer':1},'22-26':{'1':10,'2':3,'3':4,'4':5,'5':2,'6':2,'7':3,'8':3,'9':6,'10':5,'NoAnswer':1},'26+':{'1':9,'2':2,'3':1,'4':2,'5':1,'6':1,'7':1,'8':3,'9':4,'10':8,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':64,'2':26,'3':16,'4':22,'5':23,'6':32,'7':31,'8':55,'9':56,'10':99,'NoAnswer':7},'under-16':{'1':4,'2':4,'3':1,'4':1,'5':2,'6':5,'7':3,'8':7,'9':11,'10':19,'NoAnswer':1},'16-19':{'1':17,'2':4,'3':4,'4':4,'5':8,'6':8,'7':12,'8':16,'9':17,'10':33,'NoAnswer':3},'19-22':{'1':13,'2':8,'3':6,'4':4,'5':8,'6':10,'7':6,'8':15,'9':9,'10':23,'NoAnswer':1},'22-26':{'1':10,'2':3,'3':4,'4':5,'5':2,'6':2,'7':3,'8':3,'9':6,'10':5,'NoAnswer':1},'26+':{'1':9,'2':2,'3':1,'4':2,'5':1,'6':1,'7':1,'8':3,'9':4,'10':8,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
          </graph>
          </TabPanel>
          <TabPanel val="theme-approval">
            <graph
            class="graph-wide"
            title="THWThemeApproval"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':40,'2':14,'3':25,'4':22,'5':28,'6':28,'7':44,'8':70,'9':62,'10':88,'NoAnswer':10},'under-16':{'1':2,'2':1,'3':1,'4':2,'5':2,'6':3,'7':5,'8':15,'9':9,'10':18},'16-19':{'1':9,'2':5,'3':6,'4':12,'5':6,'6':8,'7':10,'8':18,'9':23,'10':25,'NoAnswer':4},'19-22':{'1':12,'2':1,'3':6,'4':2,'5':9,'6':5,'7':14,'8':21,'9':13,'10':18,'NoAnswer':2},'22-26':{'1':6,'2':2,'3':4,'4':2,'5':5,'7':5,'8':5,'9':6,'10':8,'NoAnswer':1},'26+':{'1':5,'2':3,'3':1,'4':1,'5':4,'7':2,'8':3,'9':3,'10':9,'NoAnswer':2}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':40,'2':14,'3':25,'4':22,'5':28,'6':28,'7':44,'8':70,'9':62,'10':88,'NoAnswer':10},'under-16':{'1':2,'2':1,'3':1,'4':2,'5':2,'6':3,'7':5,'8':15,'9':9,'10':18},'16-19':{'1':9,'2':5,'3':6,'4':12,'5':6,'6':8,'7':10,'8':18,'9':23,'10':25,'NoAnswer':4},'19-22':{'1':12,'2':1,'3':6,'4':2,'5':9,'6':5,'7':14,'8':21,'9':13,'10':18,'NoAnswer':2},'22-26':{'1':6,'2':2,'3':4,'4':2,'5':5,'7':5,'8':5,'9':6,'10':8,'NoAnswer':1},'26+':{'1':5,'2':3,'3':1,'4':1,'5':4,'7':2,'8':3,'9':3,'10':9,'NoAnswer':2}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
          </graph>
          </TabPanel>

        </TabPanels>
      </div>

      <p>
        Older participants generally tend to agree that the plot of The Hidden World is incoherent mess, which it is:
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="THWPlotCoherency"
          :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
          :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
          :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
          :data="{'_multiSet':true,'all':{'1':78,'2':24,'3':38,'4':28,'5':29,'6':34,'7':53,'8':40,'9':42,'10':57,'NoAnswer':8},'under-16':{'1':6,'2':3,'3':4,'5':2,'6':6,'7':11,'8':6,'9':6,'10':13,'NoAnswer':1},'16-19':{'1':16,'2':7,'3':9,'4':9,'5':8,'6':13,'7':16,'8':14,'9':14,'10':17,'NoAnswer':3},'19-22':{'1':15,'2':10,'3':10,'4':8,'5':9,'6':8,'7':8,'8':12,'9':10,'10':12,'NoAnswer':1},'22-26':{'1':16,'2':2,'3':5,'4':1,'5':1,'6':2,'7':5,'8':4,'9':3,'10':4,'NoAnswer':1},'26+':{'1':11,'3':3,'4':2,'5':1,'6':2,'7':5,'8':1,'9':1,'10':6,'NoAnswer':1}}"
          :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
        > 
            <average
              :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
              :data="{'_multiSet':true,'all':{'1':78,'2':24,'3':38,'4':28,'5':29,'6':34,'7':53,'8':40,'9':42,'10':57,'NoAnswer':8},'under-16':{'1':6,'2':3,'3':4,'5':2,'6':6,'7':11,'8':6,'9':6,'10':13,'NoAnswer':1},'16-19':{'1':16,'2':7,'3':9,'4':9,'5':8,'6':13,'7':16,'8':14,'9':14,'10':17,'NoAnswer':3},'19-22':{'1':15,'2':10,'3':10,'4':8,'5':9,'6':8,'7':8,'8':12,'9':10,'10':12,'NoAnswer':1},'22-26':{'1':16,'2':2,'3':5,'4':1,'5':1,'6':2,'7':5,'8':4,'9':3,'10':4,'NoAnswer':1},'26+':{'1':11,'3':3,'4':2,'5':1,'6':2,'7':5,'8':1,'9':1,'10':6,'NoAnswer':1}}"
              :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
            ></average>
          
        </graph>
      </div>

      <p>
        The 'fitting end' graph should, therefore, comes as no surprise either.
      </p>

      <div class="graph-area">
        <graph
            class="graph-wide"
            title="THWFittingEnd"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':103,'2':20,'3':21,'4':32,'5':22,'6':15,'7':39,'8':35,'9':53,'10':84,'NoAnswer':7},'under-16':{'1':9,'2':3,'3':1,'4':2,'5':4,'6':1,'7':6,'8':13,'9':3,'10':15,'NoAnswer':1},'16-19':{'1':27,'2':3,'3':8,'4':9,'5':6,'6':5,'7':15,'8':7,'9':19,'10':24,'NoAnswer':3},'19-22':{'1':24,'2':2,'3':6,'4':6,'5':6,'6':3,'7':14,'8':7,'9':11,'10':23,'NoAnswer':1},'22-26':{'1':13,'2':5,'3':2,'4':2,'5':1,'6':2,'7':1,'9':6,'10':11,'NoAnswer':1},'26+':{'1':13,'2':3,'4':4,'5':1,'7':1,'8':2,'9':4,'10':4,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':103,'2':20,'3':21,'4':32,'5':22,'6':15,'7':39,'8':35,'9':53,'10':84,'NoAnswer':7},'under-16':{'1':9,'2':3,'3':1,'4':2,'5':4,'6':1,'7':6,'8':13,'9':3,'10':15,'NoAnswer':1},'16-19':{'1':27,'2':3,'3':8,'4':9,'5':6,'6':5,'7':15,'8':7,'9':19,'10':24,'NoAnswer':3},'19-22':{'1':24,'2':2,'3':6,'4':6,'5':6,'6':3,'7':14,'8':7,'9':11,'10':23,'NoAnswer':1},'22-26':{'1':13,'2':5,'3':2,'4':2,'5':1,'6':2,'7':1,'9':6,'10':11,'NoAnswer':1},'26+':{'1':13,'2':3,'4':4,'5':1,'7':1,'8':2,'9':4,'10':4,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
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
            title="HTTYD3VisualsRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':5,'2':2,'3':1,'4':5,'5':8,'6':10,'7':16,'8':34,'9':68,'10':275,'NoAnswer':7},'under-16':{'4':3,'6':1,'7':1,'8':2,'9':9,'10':42},'16-19':{'4':1,'5':2,'6':5,'7':3,'8':8,'9':18,'10':86,'NoAnswer':3},'19-22':{'2':1,'5':2,'6':1,'7':4,'8':7,'9':17,'10':70,'NoAnswer':1},'22-26':{'1':3,'3':1,'7':3,'8':6,'9':4,'10':25,'NoAnswer':2},'26+':{'4':1,'5':2,'6':1,'7':2,'8':3,'9':8,'10':15,'NoAnswer':1}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
              <average
                :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
                :data="{'_multiSet':true,'all':{'1':5,'2':2,'3':1,'4':5,'5':8,'6':10,'7':16,'8':34,'9':68,'10':275,'NoAnswer':7},'under-16':{'4':3,'6':1,'7':1,'8':2,'9':9,'10':42},'16-19':{'4':1,'5':2,'6':5,'7':3,'8':8,'9':18,'10':86,'NoAnswer':3},'19-22':{'2':1,'5':2,'6':1,'7':4,'8':7,'9':17,'10':70,'NoAnswer':1},'22-26':{'1':3,'3':1,'7':3,'8':6,'9':4,'10':25,'NoAnswer':2},'26+':{'4':1,'5':2,'6':1,'7':2,'8':3,'9':8,'10':15,'NoAnswer':1}}"
                :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
              ></average>
            
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
            :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
            :columns="[{'key':0,'label':'1 > 2 > 3'},{'key':1,'label':'1 > 3 > 2'},{'key':2,'label':'2 > 1 > 3'},{'key':3,'label':'2 > 3 > 1'},{'key':4,'label':'3 > 1 > 2'},{'key':5,'label':'3 > 2 > 1'},{'key':6,'label':'Shy'}]"
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'0':228,'1':79,'2':76,'3':16,'4':13,'5':11,'6':8},'under-16':{'0':18,'1':21,'2':13,'3':4,'4':1,'5':1},'16-19':{'0':61,'1':22,'2':24,'3':5,'4':6,'5':5,'6':3},'19-22':{'0':61,'1':14,'2':18,'3':3,'4':3,'5':2,'6':2},'22-26':{'0':30,'1':6,'2':6,'3':2},'26+':{'0':18,'1':6,'2':4,'4':1,'5':2,'6':2}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          > 
          </graph>
      </div>

      <p>
        I really like how older (19 and up) participants are, in general, "frst movie best, last movie worst" whereas the youngest cohort
        seems to be a bit more varied in their opinions.
      </p>

      <p>
        Moving on. Pop quiz: who thinks RTTE is canon?
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="IsRTTECanon"
          :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
          :columns="[{'key':1,'label':'Yes'},{'key':3,'label':'Neutral'},{'key':2,'label':'No'},{'key':0,'label':'Shy'}]"
          :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
          :data="{'_multiSet':true,'all':{'0':33,'1':235,'2':64,'3':99},'under-16':{'0':2,'1':39,'2':6,'3':11},'16-19':{'0':6,'1':80,'2':16,'3':24},'19-22':{'0':7,'1':55,'2':13,'3':28},'22-26':{'0':6,'1':15,'2':16,'3':7},'26+':{'0':7,'1':8,'2':7,'3':11}}"
          :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
        > 
        </graph>
      </div>

      <p>
        Probably nothing to do with this:
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="RTTERating"
          :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
          :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
          :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
          :data="{'_multiSet':true,'all':{'1':1,'2':2,'3':4,'4':10,'5':12,'6':19,'7':53,'8':65,'9':96,'10':119,'NoAnswer':50},'under-16':{'2':1,'5':1,'6':2,'7':4,'8':6,'9':16,'10':26,'NoAnswer':2},'16-19':{'1':1,'3':2,'4':3,'5':6,'6':3,'7':11,'8':17,'9':33,'10':40,'NoAnswer':10},'19-22':{'2':1,'4':2,'5':2,'6':4,'7':13,'8':20,'9':20,'10':26,'NoAnswer':15},'22-26':{'3':1,'4':2,'5':2,'6':4,'7':8,'8':6,'9':8,'10':5,'NoAnswer':8},'26+':{'3':1,'4':2,'6':1,'7':5,'8':6,'9':5,'10':4,'NoAnswer':9}}"
          :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
        > 
          <average
            :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
            :data="{'_multiSet':true,'all':{'1':1,'2':2,'3':4,'4':10,'5':12,'6':19,'7':53,'8':65,'9':96,'10':119,'NoAnswer':50},'under-16':{'2':1,'5':1,'6':2,'7':4,'8':6,'9':16,'10':26,'NoAnswer':2},'16-19':{'1':1,'3':2,'4':3,'5':6,'6':3,'7':11,'8':17,'9':33,'10':40,'NoAnswer':10},'19-22':{'2':1,'4':2,'5':2,'6':4,'7':13,'8':20,'9':20,'10':26,'NoAnswer':15},'22-26':{'3':1,'4':2,'5':2,'6':4,'7':8,'8':6,'9':8,'10':5,'NoAnswer':8},'26+':{'3':1,'4':2,'6':1,'7':5,'8':6,'9':5,'10':4,'NoAnswer':9}}"
            :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
          ></average>
        </graph>
      </div>

      <p>
        There's also some age differences in the 'favourite villain' part:
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="FavouriteVillain"
          :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
          :columns="[{'key':0,'label':'Green Death'},{'key':1,'label':'Drago'},{'key':2,'label':'Drago\'s Bewilderbeast'},{'key':3,'label':'Grimmel'},{'key':4,'label':'Viggo'},{'key':5,'label':'Ryker'},{'key':6,'label':'Dagur'},{'key':7,'label':'Johann'},{'key':8,'label':'Warlords'},{'key':9,'label':'Alvin'},{'key':10,'label':'Mildew'},{'key':11,'label':'Stoick'},{'key':12,'label':'Other'},{'key':13,'label':'Shy'},{'key':14,'label':'D.W.'}]"
          :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
          :data="{'_multiSet':true,'all':{'0':58,'1':60,'2':19,'3':55,'4':144,'5':1,'6':44,'7':14,'8':1,'9':4,'10':6,'11':3,'12':5,'13':17},'under-16':{'0':3,'1':7,'2':5,'3':9,'4':22,'6':4,'7':5,'10':1,'13':2},'16-19':{'0':18,'1':17,'2':4,'3':13,'4':50,'6':13,'7':2,'9':2,'11':1,'13':6},'19-22':{'0':13,'1':11,'2':7,'3':17,'4':31,'5':1,'6':9,'7':3,'8':1,'9':1,'10':2,'11':2,'12':2,'13':3},'22-26':{'0':8,'1':8,'2':1,'3':7,'4':10,'6':4,'7':1,'10':2,'12':2,'13':1},'26+':{'0':5,'1':8,'2':1,'3':2,'4':7,'6':5,'7':1,'9':1,'12':1,'13':2}}"
          :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
        > 
        </graph>
      </div>

      <p>
        And the older you get, the bigger the chance that of all draconids in the franchise, you'll like night furies the most.
      </p>

      <div class="graph-area">
        <graph
          class="graph-wide"
          title="FavouriteDraconid"
          :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
          :columns="[{'key':0,'label':'Night Fury'},{'key':1,'label':'Light Fury'},{'key':2,'label':'Night Lights'},{'key':3,'label':'Nadder'},{'key':8,'label':'Stormcutter'},{'key':5,'label':'Monstrous Nightmare'},{'key':7,'label':'Skrill'},{'key':9,'label':'Bewilderbeast'},{'key':10,'label':'Deathgripper'},{'key':13,'label':'Terrible Terror'},{'key':4,'label':'Gronckle'},{'key':12,'label':'Whispering Death'},{'key':14,'label':'Zippleback'},{'key':11,'label':'Gorecutter'},{'key':15,'label':'Other'},{'key':16,'label':'Shy'},{'key':17,'label':'D.W.'}]"
          :sets="[{'setKey':'all','setLabel':'All','color':'#000','border':'1px solid #c0f','dataCount':431},{'setKey':'','setLabel':' ','color':'#000','dataCount':0},{'setKey':'under-16','setLabel':'Under 16','color':'#fa6','dataCount':58},{'setKey':'16-19','setLabel':'16-19','color':'#f83','dataCount':126},{'setKey':'19-22','setLabel':'19-22','color':'#e31','dataCount':103},{'setKey':'22-26','setLabel':'22-26','color':'#c90000','dataCount':44},{'setKey':'26+','setLabel':'26+','color':'#a00','dataCount':33}]"
          :data="{'_multiSet':true,'all':{'0':230,'1':9,'2':19,'3':10,'4':3,'5':11,'6':4,'7':35,'8':31,'9':9,'10':10,'12':4,'13':1,'14':3,'15':41,'16':11,'17':4},'under-16':{'0':24,'1':1,'2':5,'3':1,'5':3,'7':4,'8':3,'9':3,'10':1,'12':1,'15':9,'16':3,'17':1},'16-19':{'0':71,'1':1,'2':4,'3':6,'4':3,'5':6,'7':14,'8':3,'9':2,'12':2,'14':1,'15':11,'16':2,'17':1},'19-22':{'0':55,'1':3,'2':5,'5':2,'6':3,'7':5,'8':12,'9':1,'10':4,'12':1,'14':1,'15':9,'16':2},'22-26':{'0':23,'1':1,'2':2,'7':7,'8':3,'9':1,'10':3,'13':1,'15':2,'16':1},'26+':{'0':25,'1':1,'2':1,'3':1,'8':1,'15':3,'16':1,'17':1}}"
          :dataCount="{'all':431,'':0,'under-16':58,'16-19':126,'19-22':103,'22-26':44,'26+':33}"
        > 
        </graph>
      </div>

      <p>
        Side note: due to small sample sizes, these graphs are sometimes surprisingly susceptible to cohort changes. Move the age cutoff one year up and down
        and the story can alter a bit.
      </p>

      </template>

      <!-- #endregion -->
      
      <!-- #region gender -->

      <h2 @click="deepDiveResults.gender = !deepDiveResults.gender">Results by gender</h2>
      <div class="collapsible-heading-hint">(Click title to expand or collapse the section)</div>
      <template v-if="deepDiveResults.gender">
        <p>&nbsp;</p>
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
          Interestingly enough, compared to the world, the gender gap is the smallest in the North America and — once you ignore the southern hemisphere due to
          insignificant amount of responses — the biggest in Europe.
        </p>

        <div class="graph-area">
          <graph
              class="graph-wide"
              title="Location"
              :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
              :columns="[{'key':6,'label':'Europe'},{'key':3,'label':'Asia'},{'key':1,'label':'Africa'},{'key':4,'label':'Australia'},{'key':7,'label':'NA'},{'key':8,'label':'SA'},{'key':2,'label':'Antarctica'},{'key':0,'label':'Shy'}]"
              :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
              :data="{'_multiSet':true,'male':{'1':2,'2':1,'3':22,'4':17,'6':112,'7':108,'8':7},'female':{'0':2,'3':7,'4':7,'6':34,'7':66}}"
              :dataCount="{'male':269,'female':116}"
            > 
            </graph>
        </div>

        <p>
          Let's do age by gender <i>and</i> location.
        </p>

        <Tabs v-model="tabs.gender.location">
          <Tab
            label="EU"
            val="eu"
          />
          <Tab
            label="NA"
            val="na"
          />
        </Tabs>

        <TabPanels v-model="tabs.gender.location">
          <TabPanel val="eu">
            <div class="graph-area">
              <graph
                  class="graph-wide"
                  title="Age (by gender, EU)"
                defaultMode="absolute"

                  :conf="{'size':'wide','barWidth':'4px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','hideZeroColumns':false}"
                  :columns="[{'key':10,'label':'10'},{'key':11,'label':''},{'key':12,'label':''},{'key':13,'label':''},{'key':14,'label':''},{'key':15,'label':'15'},{'key':16,'label':''},{'key':17,'label':''},{'key':18,'label':''},{'key':19,'label':''},{'key':20,'label':'20'},{'key':21,'label':''},{'key':22,'label':''},{'key':23,'label':''},{'key':24,'label':''},{'key':25,'label':'25'},{'key':26,'label':''},{'key':27,'label':''},{'key':28,'label':''},{'key':29,'label':''},{'key':30,'label':'30'},{'key':31,'label':''},{'key':32,'label':''},{'key':33,'label':''},{'key':34,'label':''},{'key':35,'label':'35'},{'key':36,'label':''},{'key':37,'label':''},{'key':38,'label':''},{'key':39,'label':''},{'key':40,'label':'40'},{'key':41,'label':''},{'key':42,'label':''},{'key':43,'label':''},{'key':44,'label':''},{'key':45,'label':'45'},{'key':46,'label':''},{'key':47,'label':''},{'key':48,'label':''},{'key':49,'label':''},{'key':'-1','label':'❄️'},{'key':'_dumm1','label':''},{'key':'_dumm4','label':''},{'key':'NoAnswer','label':'Shy'}]"
                  :sets="[
                    {'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},
                    {'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},
                  ]"
                  :data="{'_multiSet':true,'male-(eu)':{'14':3,'15':3,'16':8,'17':13,'18':16,'19':12,'20':9,'21':12,'22':6,'23':1,'24':4,'25':3,'26':3,'27':2,'28':1,'29':2,'31':1,'34':2,'NoAnswer':11},'female-(eu)':{'14':1,'15':1,'16':7,'17':4,'18':2,'19':4,'20':2,'21':1,'22':1,'23':1,'24':2,'26':2,'27':1,'NoAnswer':5},'male-(na)':{'13':2,'14':7,'15':4,'16':9,'17':12,'18':10,'19':9,'20':11,'21':6,'22':4,'23':3,'24':2,'25':2,'26':1,'27':1,'28':2,'29':2,'33':1,'34':1,'NoAnswer':18,'-1':1},'female-(na)':{'12':1,'13':1,'14':2,'15':4,'16':1,'17':5,'18':5,'19':11,'20':3,'21':3,'22':2,'23':3,'25':3,'26':2,'27':1,'28':3,'NoAnswer':14,'-1':2}}"
                  :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
                > 
                    <average
                      :sets="[
                        {'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},
                        {'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},
                      ]"
                      :data="{'_multiSet':true,'male-(eu)':{'14':3,'15':3,'16':8,'17':13,'18':16,'19':12,'20':9,'21':12,'22':6,'23':1,'24':4,'25':3,'26':3,'27':2,'28':1,'29':2,'31':1,'34':2,'NoAnswer':11},'female-(eu)':{'14':1,'15':1,'16':7,'17':4,'18':2,'19':4,'20':2,'21':1,'22':1,'23':1,'24':2,'26':2,'27':1,'NoAnswer':5},'male-(na)':{'13':2,'14':7,'15':4,'16':9,'17':12,'18':10,'19':9,'20':11,'21':6,'22':4,'23':3,'24':2,'25':2,'26':1,'27':1,'28':2,'29':2,'33':1,'34':1,'NoAnswer':18,'-1':1},'female-(na)':{'12':1,'13':1,'14':2,'15':4,'16':1,'17':5,'18':5,'19':11,'20':3,'21':3,'22':2,'23':3,'25':3,'26':2,'27':1,'28':3,'NoAnswer':14,'-1':2}}"
                      :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
                    ></average>
                  
                </graph>
            </div>
          </TabPanel>
          <TabPanel val="na">
            <div class="graph-area">
              <graph
                  class="graph-wide"
                  title="Age (by gender, NA)"
                defaultMode="absolute"
                  :conf="{'size':'wide','barWidth':'4px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','hideZeroColumns':false}"
                  :columns="[
                    {'key':10,'label':'10'},{'key':11,'label':''},{'key':12,'label':''},{'key':13,'label':''},{'key':14,'label':''},{'key':15,'label':'15'},{'key':16,'label':''},{'key':17,'label':''},{'key':18,'label':''},{'key':19,'label':''},{'key':20,'label':'20'},{'key':21,'label':''},{'key':22,'label':''},{'key':23,'label':''},{'key':24,'label':''},{'key':25,'label':'25'},{'key':26,'label':''},{'key':27,'label':''},{'key':28,'label':''},{'key':29,'label':''},{'key':30,'label':'30'},{'key':31,'label':''},{'key':32,'label':''},{'key':33,'label':''},{'key':34,'label':''},{'key':35,'label':'35'},{'key':36,'label':''},{'key':37,'label':''},{'key':38,'label':''},{'key':39,'label':''},{'key':40,'label':'40'},{'key':41,'label':''},{'key':42,'label':''},{'key':43,'label':''},{'key':44,'label':''},{'key':45,'label':'45'},{'key':46,'label':''},{'key':47,'label':''},{'key':48,'label':''},{'key':49,'label':''},{'key':'-1','label':'❄️'},{'key':'_dumm1','label':''},{'key':'_dumm4','label':''},{'key':'NoAnswer','label':'Shy'}]"
                  :sets="[{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                  :data="{'_multiSet':true,'male-(eu)':{'14':3,'15':3,'16':8,'17':13,'18':16,'19':12,'20':9,'21':12,'22':6,'23':1,'24':4,'25':3,'26':3,'27':2,'28':1,'29':2,'31':1,'34':2,'NoAnswer':11},'female-(eu)':{'14':1,'15':1,'16':7,'17':4,'18':2,'19':4,'20':2,'21':1,'22':1,'23':1,'24':2,'26':2,'27':1,'NoAnswer':5},'male-(na)':{'13':2,'14':7,'15':4,'16':9,'17':12,'18':10,'19':9,'20':11,'21':6,'22':4,'23':3,'24':2,'25':2,'26':1,'27':1,'28':2,'29':2,'33':1,'34':1,'NoAnswer':18,'-1':1},'female-(na)':{'12':1,'13':1,'14':2,'15':4,'16':1,'17':5,'18':5,'19':11,'20':3,'21':3,'22':2,'23':3,'25':3,'26':2,'27':1,'28':3,'NoAnswer':14,'-1':2}}"
                  :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
                > 
                    <average
                      :sets="[{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                      :data="{'_multiSet':true,'male-(eu)':{'14':3,'15':3,'16':8,'17':13,'18':16,'19':12,'20':9,'21':12,'22':6,'23':1,'24':4,'25':3,'26':3,'27':2,'28':1,'29':2,'31':1,'34':2,'NoAnswer':11},'female-(eu)':{'14':1,'15':1,'16':7,'17':4,'18':2,'19':4,'20':2,'21':1,'22':1,'23':1,'24':2,'26':2,'27':1,'NoAnswer':5},'male-(na)':{'13':2,'14':7,'15':4,'16':9,'17':12,'18':10,'19':9,'20':11,'21':6,'22':4,'23':3,'24':2,'25':2,'26':1,'27':1,'28':2,'29':2,'33':1,'34':1,'NoAnswer':18,'-1':1},'female-(na)':{'12':1,'13':1,'14':2,'15':4,'16':1,'17':5,'18':5,'19':11,'20':3,'21':3,'22':2,'23':3,'25':3,'26':2,'27':1,'28':3,'NoAnswer':14,'-1':2}}"
                      :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
                    ></average>
                  
                </graph>
            </div>
          </TabPanel>
        </TabPanels>

        <p>
          Maybe that redditor wasn't completely wacky, but overall ... still rather out of touch with the stereotypes.
        </p>

        <p>
          If you ignore the boomer tail in the answers of male respondent, the female population seems to be roughly older than the male population
          and also more widely distributed. But that 'over 27' tail that we see amongst male respondents and that we don't see among female respondents
          still manages to make the male part of the fanbase slightly older on average.
        </p>

        <p>
          It is worth noting that females used to be much more shyer when it comes to revealing their age: almost 20% of female respondents were age shy, 
          compared to the 10% of male respondents.
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
          And last but not least, female respondents tended to consider RTTE canon more often than male respondents.
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
            </graph>
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
              <average
                :sets="[{'setKey':'male','setLabel':'Male','color':'#66f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'2':2,'3':4,'4':3,'5':3,'6':3,'7':6,'8':29,'9':65,'10':152,'NoAnswer':2},'female':{'1':1,'2':3,'3':1,'4':4,'5':6,'6':2,'7':9,'8':12,'9':13,'10':64,'NoAnswer':1}}"
                :dataCount="{'male':269,'female':116}"
              ></average>
            </graph>
        </div>

        <p>
          And I think that the elephant in the room is starting to become harder to hide with each passing moment.
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
          This comes as a surprise when you know the gender of the biggest serial complainers on reddit and the main discord.
        </p>

        <p>
          And it's almost completely consistent, too! Male respondents rated every aspect of the movie higher, sometimes by as much 
          as a whole one rating higher on average! It's worth noting that female votes are often also way more contested. This <i>includes</i>
          everything about the light fury.
        </p>

        <div class="graph-area">
          <Tabs v-model="tabs.gender.thw">
            <Tab label="Plot" val="plot" />
            <Tab label="Emotion" val="emo" />
            <Tab label="Characters" val="char" />
            <Tab label="Theme" val="theme" />
            <Tab label="Visuals" val="visuals" />
            <Tab label="Score" val="ost" />
            <Tab label="Worst character" val="wchar" />
            <Tab label="LF character" val="tfcr" />
            <Tab label="LF design" val="tfdr" />
            <Tab label="Fitting end?" val="fe" />
          </Tabs>
          <TabPanels v-model="tabs.gender.thw">
            <TabPanel val="plot">
              <graph
                class="graph-wide"
                title="THW Plot Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':21,'2':14,'3':15,'4':13,'5':18,'6':36,'7':40,'8':45,'9':30,'10':34,'NoAnswer':3},'female':{'1':12,'2':13,'3':15,'4':6,'5':10,'6':10,'7':11,'8':9,'9':12,'10':16,'NoAnswer':2}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':21,'2':14,'3':15,'4':13,'5':18,'6':36,'7':40,'8':45,'9':30,'10':34,'NoAnswer':3},'female':{'1':12,'2':13,'3':15,'4':6,'5':10,'6':10,'7':11,'8':9,'9':12,'10':16,'NoAnswer':2}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
              </graph>
            </TabPanel>
            <TabPanel val="emo">
              <graph
                class="graph-wide"
                title="THW Emotion Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':11,'2':3,'3':7,'4':4,'5':13,'6':8,'7':15,'8':39,'9':38,'10':128,'NoAnswer':3},'female':{'1':4,'2':4,'3':6,'4':8,'5':9,'6':6,'7':5,'8':11,'9':7,'10':54,'NoAnswer':2}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':11,'2':3,'3':7,'4':4,'5':13,'6':8,'7':15,'8':39,'9':38,'10':128,'NoAnswer':3},'female':{'1':4,'2':4,'3':6,'4':8,'5':9,'6':6,'7':5,'8':11,'9':7,'10':54,'NoAnswer':2}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
              </graph>
            </TabPanel>
            <TabPanel val="char">
              <graph
                class="graph-wide"
                title="THW Character Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':16,'2':8,'3':6,'4':11,'5':16,'6':27,'7':30,'8':51,'9':44,'10':57,'NoAnswer':3},'female':{'1':13,'2':5,'3':4,'4':8,'5':10,'6':6,'7':11,'8':19,'9':15,'10':23,'NoAnswer':2}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':16,'2':8,'3':6,'4':11,'5':16,'6':27,'7':30,'8':51,'9':44,'10':57,'NoAnswer':3},'female':{'1':13,'2':5,'3':4,'4':8,'5':10,'6':6,'7':11,'8':19,'9':15,'10':23,'NoAnswer':2}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
              </graph>
            </TabPanel>
            <TabPanel val="theme">
              <graph
                class="graph-wide"
                title="THW Theme Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':30,'2':13,'3':10,'4':12,'5':12,'6':23,'7':24,'8':42,'9':39,'10':61,'NoAnswer':3},'female':{'1':24,'2':9,'3':5,'4':8,'5':10,'6':5,'7':3,'8':9,'9':13,'10':28,'NoAnswer':2}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':30,'2':13,'3':10,'4':12,'5':12,'6':23,'7':24,'8':42,'9':39,'10':61,'NoAnswer':3},'female':{'1':24,'2':9,'3':5,'4':8,'5':10,'6':5,'7':3,'8':9,'9':13,'10':28,'NoAnswer':2}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
                
              </graph>
            </TabPanel>
            <TabPanel val="visuals">
              <graph
                class="graph-wide"
                title="THW Visuals Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':2,'2':1,'3':1,'4':1,'5':2,'6':4,'7':8,'8':22,'9':44,'10':181,'NoAnswer':3},'female':{'1':2,'4':1,'5':5,'6':4,'7':4,'8':8,'9':17,'10':73,'NoAnswer':2}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':2,'2':1,'3':1,'4':1,'5':2,'6':4,'7':8,'8':22,'9':44,'10':181,'NoAnswer':3},'female':{'1':2,'4':1,'5':5,'6':4,'7':4,'8':8,'9':17,'10':73,'NoAnswer':2}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
                
              </graph>
            </TabPanel>
            <TabPanel val="ost">
              <graph
                class="graph-wide"
                title="THW Score Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':4,'2':1,'3':2,'4':4,'5':11,'6':12,'7':26,'8':46,'9':53,'10':105,'NoAnswer':5},'female':{'1':4,'2':1,'3':2,'4':3,'5':6,'6':1,'7':10,'8':21,'9':13,'10':52,'NoAnswer':3}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':4,'2':1,'3':2,'4':4,'5':11,'6':12,'7':26,'8':46,'9':53,'10':105,'NoAnswer':5},'female':{'1':4,'2':1,'3':2,'4':3,'5':6,'6':1,'7':10,'8':21,'9':13,'10':52,'NoAnswer':3}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
              </graph>
            </TabPanel>
            <TabPanel val="wchar">
              <graph
                class="graph-wide"
                title="THW Worst Character"
                :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
                :columns="[{'key':3,'label':'Hiccup'},{'key':4,'label':'Toothless'},{'key':5,'label':'Astrid'},{'key':7,'label':'Valka'},{'key':14,'label':'Cloudjumper'},{'key':16,'label':'Eret'},{'key':17,'label':'Light Fury'},{'key':18,'label':'Grimmel'},{'key':8,'label':'Gobber'},{'key':9,'label':'Ruffnut'},{'key':10,'label':'Tuffnut'},{'key':11,'label':'Twins'},{'key':12,'label':'Snotlout'},{'key':13,'label':'Fishlegs'},{'key':2,'label':'Other'},{'key':1,'label':'Shy'},{'key':'dwFlag','label':'D.W.'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':8,'2':14,'3':4,'4':13,'5':4,'6':1,'7':3,'9':21,'10':9,'12':50,'13':12,'16':18,'17':65,'18':47},'female':{'1':7,'2':6,'3':2,'4':8,'5':2,'7':1,'9':1,'10':3,'12':14,'13':4,'16':1,'17':43,'18':24}}"
                :dataCount="{'male':269,'female':116}"
              > 
              </graph>
            </TabPanel>
            <TabPanel val="tfcr">
              <graph
                class="graph-wide"
                title="Light Fury Character Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':23,'2':17,'3':15,'4':11,'5':30,'6':31,'7':46,'8':47,'9':19,'10':27,'NoAnswer':3},'female':{'1':15,'2':11,'3':11,'4':12,'5':14,'6':10,'7':11,'8':12,'9':10,'10':8,'NoAnswer':2}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':23,'2':17,'3':15,'4':11,'5':30,'6':31,'7':46,'8':47,'9':19,'10':27,'NoAnswer':3},'female':{'1':15,'2':11,'3':11,'4':12,'5':14,'6':10,'7':11,'8':12,'9':10,'10':8,'NoAnswer':2}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
                
              </graph>
            </TabPanel>
            <TabPanel val="tfdr">
              <graph
                class="graph-wide"
                title="Light Fury Design Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                :data="{'_multiSet':true,'male':{'1':10,'2':10,'3':12,'4':19,'5':17,'6':16,'7':44,'8':44,'9':48,'10':46,'NoAnswer':3},'female':{'1':13,'2':9,'3':4,'4':19,'5':11,'6':4,'7':10,'8':11,'9':14,'10':21}}"
                :dataCount="{'male':269,'female':116}"
              > 
                  <average
                    :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                    :data="{'_multiSet':true,'male':{'1':10,'2':10,'3':12,'4':19,'5':17,'6':16,'7':44,'8':44,'9':48,'10':46,'NoAnswer':3},'female':{'1':13,'2':9,'3':4,'4':19,'5':11,'6':4,'7':10,'8':11,'9':14,'10':21}}"
                    :dataCount="{'male':269,'female':116}"
                  ></average>
                
              </graph>
            </TabPanel>
            <TabPanel val="fe">
              <graph
              class="graph-wide"
              title="THWFittingEnd"
              :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
              :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
              :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
              :data="{'_multiSet':true,'male':{'1':55,'2':11,'3':11,'4':21,'5':17,'6':10,'7':25,'8':24,'9':39,'10':52,'NoAnswer':4},'female':{'1':34,'2':6,'3':7,'4':10,'5':2,'6':3,'7':8,'8':6,'9':12,'10':26,'NoAnswer':2}}"
              :dataCount="{'male':269,'female':116}"
            > 
                <average
                  :sets="[{'setKey':'male','setLabel':'Male','color':'#88f','dataCount':269},{'setKey':'female','setLabel':'Female','color':'#f48','dataCount':116}]"
                  :data="{'_multiSet':true,'male':{'1':55,'2':11,'3':11,'4':21,'5':17,'6':10,'7':25,'8':24,'9':39,'10':52,'NoAnswer':4},'female':{'1':34,'2':6,'3':7,'4':10,'5':2,'6':3,'7':8,'8':6,'9':12,'10':26,'NoAnswer':2}}"
                  :dataCount="{'male':269,'female':116}"
                ></average>
              
            </graph>
            </TabPanel>
          </TabPanels>
        </div>

      </template>

      <!-- #endregion gender -->

      <!-- #region location -->
      <h2 @click="deepDiveResults.location = !deepDiveResults.location">Results by location</h2>
      <div class="collapsible-heading-hint">(Click title to expand or collapse the section)</div>
      <template v-if="deepDiveResults.location">
        <p>
          Some aspects of 'by location' were already covered by the previous two sections, so I will not repeat myself
          too much here. Age by gender by location is in the gender section.
        </p>
        <p>
          Another thing worth noting is that in general, only EU and NA got enough answers to warrant putting them on 
          a graph. Sucks to not include the other continents, but such is life.
        </p>
        <p>
          Anyway — as far as age is concerned, EU is older on average ... although NA has more outliers on the high end.
          And they're less likely to volunteer their age, too.
        </p>

        <div class="graph-area">
          <graph
            class="graph-wide"
            title="Age"
            :conf="{'trackWidth':'6px !important','columnWidth':'8px !important','hideZeroColumns':false}"
            :columns="[{'key':10,'label':'10'},{'key':11,'label':''},{'key':12,'label':''},{'key':13,'label':''},{'key':14,'label':''},{'key':15,'label':'15'},{'key':16,'label':''},{'key':17,'label':''},{'key':18,'label':''},{'key':19,'label':''},{'key':20,'label':'20'},{'key':21,'label':''},{'key':22,'label':''},{'key':23,'label':''},{'key':24,'label':''},{'key':25,'label':'25'},{'key':26,'label':''},{'key':27,'label':''},{'key':28,'label':''},{'key':29,'label':''},{'key':30,'label':'30'},{'key':31,'label':''},{'key':32,'label':''},{'key':33,'label':''},{'key':34,'label':''},{'key':35,'label':'35'},{'key':36,'label':''},{'key':37,'label':''},{'key':38,'label':''},{'key':39,'label':''},{'key':40,'label':'40'},{'key':41,'label':''},{'key':42,'label':''},{'key':43,'label':''},{'key':44,'label':''},{'key':45,'label':'45'},{'key':46,'label':''},{'key':47,'label':''},{'key':48,'label':''},{'key':49,'label':''},{'key':'-1','label':'❄️'},{'key':'_dumm1','label':''},{'key':'_dumm4','label':''},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'14':4,'15':4,'16':19,'17':18,'18':18,'19':16,'20':14,'21':13,'22':7,'23':2,'24':6,'25':4,'26':5,'27':3,'28':1,'29':2,'31':1,'34':2,'63':1,'-1':1,'NoAnswer':19},'north-america':{'12':1,'13':3,'14':9,'15':10,'16':11,'17':20,'18':15,'19':21,'20':17,'21':11,'22':6,'23':6,'24':3,'25':5,'26':4,'27':2,'28':5,'29':2,'30':1,'33':1,'34':1,'35':1,'NoAnswer':36,'-1':3}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'14':4,'15':4,'16':19,'17':18,'18':18,'19':16,'20':14,'21':13,'22':7,'23':2,'24':6,'25':4,'26':5,'27':3,'28':1,'29':2,'31':1,'34':2,'63':1,'-1':1,'NoAnswer':19},'north-america':{'12':1,'13':3,'14':9,'15':10,'16':11,'17':20,'18':15,'19':21,'20':17,'21':11,'22':6,'23':6,'24':3,'25':5,'26':4,'27':2,'28':5,'29':2,'30':1,'33':1,'34':1,'35':1,'NoAnswer':36,'-1':3}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
        </div>

        <p>
          The upper end of the american curve is putting in some mad overtime on the fandom time chart, though: on average,
          NA respondents claim to be a part of the fandom for almost a full year longer than Europeans.
        </p>

        <div class="graph-area">
           <graph
            class="graph-wide"
            title="FandomTime"
            :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
            :columns="[{'key':0,'label':'<1'},{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10+'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'0':16,'1':10,'2':16,'3':16,'4':11,'5':15,'6':6,'7':19,'8':10,'9':7,'10':29,'NoAnswer':5},'north-america':{'0':16,'1':9,'2':15,'3':11,'4':8,'5':22,'6':10,'7':21,'8':8,'9':7,'10':63,'NoAnswer':4}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
          </graph>
        </div>

        <p>
          Incidence of furry is rather similar between the continents:
        </p>

        <div class="graph-area">
          <graph
            class="graph-wide"
            title="IsFurry"
            :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
            :columns="[{'key':0,'label':'None'},{'key':1,'label':'Furry'},{'key':2,'label':'Scalie'},{'key':3,'label':'Other'},{'key':4,'label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'0':115,'1':31,'2':21,'3':8,'4':8},'north-america':{'0':138,'1':39,'2':33,'3':12,'4':5}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
          </graph>
        </div>

        <p>
          But while Americans were less likely to volunteer their age, Europeans were less likely to volunteer their usernames.
        </p>
        
        <div class="graph-area">
          <graph
            class="graph-wide"
            title="UsernameProvided"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'Yes'},{'key':3,'label':'Neutral'},{'key':2,'label':'No'},{'key':0,'label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'1':50,'2':110},'north-america':{'1':73,'2':121}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
          </graph>
        </div>

        <p>
          And I am tempted to jump continents:
        </p>

        <div class="graph-area">
          <graph
            class="graph-wide"
            title="HTTYD1Rating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'1':1,'4':1,'7':4,'8':19,'9':56,'10':79},'north-america':{'6':1,'7':1,'8':23,'9':46,'10':123}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'1':1,'4':1,'7':4,'8':19,'9':56,'10':79},'north-america':{'6':1,'7':1,'8':23,'9':46,'10':123}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
        </div>

        <p>
          Look, I'd put in some tabs and all, but I am on the line 2994 of the HTML file and vscode is lagging, so you'll have to take my word
          when I say that similar thing can be seen on graphs that rate specific aspects of the movie.
        </p>

        <p>
          Another thing that pops up, <i>again</i>. Toothless is the more popular character in both cases, but wins by a much greater margin
          over here in Europe. Test drive has a convincing win over Forbidden Friendship in EU, but a minor loss over it among the NA respondents.
        </p>

        <p>
          Is that difference due to gender or due to location? Well, depends. When it comes to favourite character, location to have a stronger
          effect on the results than the gender (Toothless doesn't lead in EU just because it's the #1 choice for males, which represent a bigger
          portion of the EU responses compared to the NA responses) ... though location × gender results are still interesting in that case. While
          "Hiccup #1" responses are reasonably comparable across both genders among the NA respondents, there's a rather noticeable dip among the 
          femae/EU respondents.
        </p>

        <p>
          Location obfuscates some interesting bits in the 'favourite soundtrack' graph: namely: in the US, female respondents picked Forbidden 
          Friendship as their favourite noticeably more often than Test Drive (while male responses went the other way), but they sorta averaged out.
          In case of EU, though ... well, you could make that the 'favourite soundtrack by location' is actually the same thing as 'favourite soundtrack
          by gender.' But this won't be the last time 'gender × location' graph is gonna be more interesting than each of these two on their own.
        </p>

        <p>
          Shoutout to that three-way tie on EU/female 'favourite soundtrack by gender x location' graph.
        </p>

        <Tabs v-model="tabs.location.httydfav">
          <Tab
            label="Favourite Character"
            val="fc"
          />
          <Tab
            label="Favourite Soundtrack"
            val="fs"
          />
          <Tab
            label="Favourite Character (gender+location)"
            val="fcg"
          />
          <Tab
            label="Favourite Soundtrack (gender+location)"
            val="fsg"
          />
        </Tabs>

        <TabPanels v-model="tabs.location.httydfav">
          <TabPanel val="fc">
            <div class="graph-area">
               <graph
                  class="graph-wide"
                  title="HTTYD1FavouriteCharacter"
                  :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
                  :columns="[{'key':3,'label':'Hiccup'},{'key':4,'label':'Toothless'},{'key':5,'label':'Astrid'},{'key':6,'label':'Stoick'},{'key':8,'label':'Gobber'},{'key':9,'label':'Ruffnut'},{'key':10,'label':'Tuffnut'},{'key':11,'label':'Twins'},{'key':12,'label':'Snotlout'},{'key':13,'label':'Fishlegs'},{'key':2,'label':'Other'},{'key':1,'label':'Shy'},{'key':'dwFlag','label':'D.W.'}]"
                  :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                  :data="{'_multiSet':true,'europe':{'1':1,'2':4,'3':39,'4':97,'5':8,'6':1,'8':5,'9':1,'10':3,'12':1},'north-america':{'1':3,'2':7,'3':59,'4':104,'5':8,'6':5,'8':6,'9':1,'10':1}}"
                  :dataCount="{'europe':160,'north-america':194}"
                > 
                </graph>
            </div>
          </TabPanel>
          <TabPanel val="fs">
            <div class="graph-area">
              <graph
                class="graph-wide"
                title="HTTYD1FavouriteSoundtrack"
                :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
                :columns="[{'key':0,'label':'This is Berk'},{'key':1,'label':'Dragon Battle'},{'key':2,'label':'The Downed Dragon'},{'key':3,'label':'Dragon training'},{'key':4,'label':'Wounded'},{'key':5,'label':'The Dragon Book'},{'key':6,'label':'Focus, Hiccup!'},{'key':7,'label':'Forbidden Friendship'},{'key':8,'label':'New Tail'},{'key':9,'label':'See You Tomorrow'},{'key':10,'label':'Test Drive'},{'key':11,'label':'Not so Fireproof'},{'key':12,'label':'This Time For Sure'},{'key':13,'label':'Astrid Goes for a Spin'},{'key':14,'label':'Romantic Flight'},{'key':15,'label':'Dragon\'s Den'},{'key':16,'label':'The Cove'},{'key':17,'label':'The Kill Ring'},{'key':18,'label':'Ready The Ships'},{'key':19,'label':'Battling the Green Death'},{'key':20,'label':'Counter Attack'},{'key':21,'label':'Where\'s Hiccup'},{'key':22,'label':'Coming Back Around'},{'key':23,'label':'Sticks and Stones'},{'key':24,'label':'Vikings Have Their Tea'},{'key':25,'label':'Shy'},{'key':26,'label':'D.W.'}]"
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'2':1,'7':38,'8':5,'9':6,'10':55,'14':12,'21':1,'22':2,'23':9,'25':31},'north-america':{'7':59,'8':7,'9':6,'10':57,'14':13,'15':1,'21':2,'22':7,'23':14,'25':28}}"
                :dataCount="{'europe':160,'north-america':194}"
              > 
              </graph>
            </div>
          </TabPanel>
          <TabPanel val="fcg">
            <div class="graph-area">
              <graph
                class="graph-wide"
                title="HTTYD1FavouriteCharacter"
                :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
                :columns="[{'key':3,'label':'Hiccup'},{'key':4,'label':'Toothless'},{'key':5,'label':'Astrid'},{'key':6,'label':'Stoick'},{'key':8,'label':'Gobber'},{'key':9,'label':'Ruffnut'},{'key':10,'label':'Tuffnut'},{'key':11,'label':'Twins'},{'key':12,'label':'Snotlout'},{'key':13,'label':'Fishlegs'},{'key':2,'label':'Other'},{'key':1,'label':'Shy'},{'key':'dwFlag','label':'D.W.'}]"
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'2':3,'3':32,'4':69,'5':5,'8':2,'10':1},'female-(eu)':{'2':1,'3':5,'4':22,'5':3,'8':2,'10':1},'male-(na)':{'1':3,'3':32,'4':58,'5':5,'6':4,'8':5,'9':1},'female-(na)':{'2':7,'3':22,'4':31,'5':3,'6':1,'8':1,'10':1}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              > 
              </graph>
            </div>
          </TabPanel>
          <TabPanel val="fsg">
            <div class="graph-area">
              <graph
                class="graph-wide"
                title="HTTYD1FavouriteSoundtrack"
                :conf="{'columnXMargin':'1.2rem','size':'wide','barWidth':'8px !important','trackWidthMultiset':'8px !important','trackWidth':'16px !important','columnWidth':'72px !important','sidewaysLabels':true,'labelsHeight':'6rem','hideZeroColumns':true}"
                :columns="[{'key':0,'label':'This is Berk'},{'key':1,'label':'Dragon Battle'},{'key':2,'label':'The Downed Dragon'},{'key':3,'label':'Dragon training'},{'key':4,'label':'Wounded'},{'key':5,'label':'The Dragon Book'},{'key':6,'label':'Focus, Hiccup!'},{'key':7,'label':'Forbidden Friendship'},{'key':8,'label':'New Tail'},{'key':9,'label':'See You Tomorrow'},{'key':10,'label':'Test Drive'},{'key':11,'label':'Not so Fireproof'},{'key':12,'label':'This Time For Sure'},{'key':13,'label':'Astrid Goes for a Spin'},{'key':14,'label':'Romantic Flight'},{'key':15,'label':'Dragon\'s Den'},{'key':16,'label':'The Cove'},{'key':17,'label':'The Kill Ring'},{'key':18,'label':'Ready The Ships'},{'key':19,'label':'Battling the Green Death'},{'key':20,'label':'Counter Attack'},{'key':21,'label':'Where\'s Hiccup'},{'key':22,'label':'Coming Back Around'},{'key':23,'label':'Sticks and Stones'},{'key':24,'label':'Vikings Have Their Tea'},{'key':25,'label':'Shy'},{'key':26,'label':'D.W.'}]"
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'7':26,'8':4,'9':4,'10':44,'14':10,'21':1,'22':1,'23':7,'25':15},'female-(eu)':{'7':9,'8':1,'9':1,'10':9,'14':2,'22':1,'23':2,'25':9},'male-(na)':{'7':30,'8':4,'9':4,'10':36,'14':8,'15':1,'21':1,'22':5,'23':4,'25':15},'female-(na)':{'7':21,'8':3,'9':2,'10':16,'14':4,'21':1,'22':1,'23':8,'25':10}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              > 
              </graph>
            </div>
          </TabPanel>
        </TabPanels>

        <p>
          As far as the second movie is concerned, overall, the averages are tied. Per aspects, some aspects were rated higher by the EU (plot, characters, themes),
          and some were more popular amongst people from North America (score, visuals, emotion):
        </p>

        <Tabs v-model="tabs.location.httyd2">
          <Tab
            label="Overall"
            val="overall"
          />
          <Tab
            label="Plot"
            val="p"
          />
          <Tab
            label="Emotion"
            val="e"
          />
          <Tab
            label="Characters"
            val="c"
          />
          <Tab
            label="Theme"
            val="t"
          />
          <Tab
            label="Visuals"
            val="v"
          />
          <Tab
            label="Score"
            val="s"
          />
        </Tabs>

        <TabPanels v-model="tabs.location.httyd2">
          <TabPanel val="overall">
            <div class="graph-area">
               <graph
                  class="graph-wide"
                  title="HTTYD2PlotRating"
                  :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                  :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                  :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                  :data="{'_multiSet':true,'europe':{'3':2,'4':1,'5':6,'6':11,'7':33,'8':40,'9':38,'10':28,'NoAnswer':1},'north-america':{'1':1,'2':1,'4':3,'5':5,'6':11,'7':53,'8':46,'9':44,'10':28,'NoAnswer':2}}"
                  :dataCount="{'europe':160,'north-america':194}"
                > 
                    <average
                      :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                      :data="{'_multiSet':true,'europe':{'3':2,'4':1,'5':6,'6':11,'7':33,'8':40,'9':38,'10':28,'NoAnswer':1},'north-america':{'1':1,'2':1,'4':3,'5':5,'6':11,'7':53,'8':46,'9':44,'10':28,'NoAnswer':2}}"
                      :dataCount="{'europe':160,'north-america':194}"
                    ></average>
                </graph>
            </div>
          </TabPanel>
          <TabPanel val="p">
            <div class="graph-area">
              <graph
                  class="graph-wide"
                  title="HTTYD2PlotRating"
                  :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                  :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                  :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                  :data="{'_multiSet':true,'europe':{'3':2,'4':1,'5':6,'6':11,'7':33,'8':40,'9':38,'10':28,'NoAnswer':1},'north-america':{'1':1,'2':1,'4':3,'5':5,'6':11,'7':53,'8':46,'9':44,'10':28,'NoAnswer':2}}"
                  :dataCount="{'europe':160,'north-america':194}"
                > 
                    <average
                      :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                      :data="{'_multiSet':true,'europe':{'3':2,'4':1,'5':6,'6':11,'7':33,'8':40,'9':38,'10':28,'NoAnswer':1},'north-america':{'1':1,'2':1,'4':3,'5':5,'6':11,'7':53,'8':46,'9':44,'10':28,'NoAnswer':2}}"
                      :dataCount="{'europe':160,'north-america':194}"
                    ></average>
                </graph>
            </div>
          </TabPanel>
          <TabPanel val="e">
            <div class="graph-area">
              <graph
            class="graph-wide"
            title="HTTYD2EmotionRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'1':1,'2':1,'4':2,'5':3,'6':4,'7':10,'8':26,'9':42,'10':70,'NoAnswer':1},'north-america':{'1':1,'3':1,'4':1,'5':2,'6':6,'7':13,'8':24,'9':57,'10':87,'NoAnswer':2}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'1':1,'2':1,'4':2,'5':3,'6':4,'7':10,'8':26,'9':42,'10':70,'NoAnswer':1},'north-america':{'1':1,'3':1,'4':1,'5':2,'6':6,'7':13,'8':24,'9':57,'10':87,'NoAnswer':2}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
          <TabPanel val="c">
            <div class="graph-area">
                <graph
            class="graph-wide"
            title="HTTYD2CharacterRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'2':2,'3':1,'4':3,'5':2,'6':5,'7':14,'8':53,'9':33,'10':46,'NoAnswer':1},'north-america':{'1':1,'2':1,'4':2,'5':7,'6':8,'7':31,'8':37,'9':57,'10':48,'NoAnswer':2}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'2':2,'3':1,'4':3,'5':2,'6':5,'7':14,'8':53,'9':33,'10':46,'NoAnswer':1},'north-america':{'1':1,'2':1,'4':2,'5':7,'6':8,'7':31,'8':37,'9':57,'10':48,'NoAnswer':2}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
        
            </div>
          </TabPanel>
          <TabPanel val="t">
            <div class="graph-area">
               <graph
            class="graph-wide"
            title="HTTYD2ThemeRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'2':1,'4':4,'5':6,'6':14,'7':21,'8':38,'9':28,'10':46,'NoAnswer':2},'north-america':{'1':3,'2':1,'3':2,'4':4,'5':9,'6':11,'7':22,'8':40,'9':47,'10':53,'NoAnswer':2}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'2':1,'4':4,'5':6,'6':14,'7':21,'8':38,'9':28,'10':46,'NoAnswer':2},'north-america':{'1':3,'2':1,'3':2,'4':4,'5':9,'6':11,'7':22,'8':40,'9':47,'10':53,'NoAnswer':2}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
          <TabPanel val="v">
            <div class="graph-area">
                <graph
            class="graph-wide"
            title="HTTYD1VisualsRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'5':4,'6':7,'7':24,'8':35,'9':37,'10':52,'NoAnswer':1},'north-america':{'4':1,'5':2,'6':13,'7':21,'8':48,'9':44,'10':64,'NoAnswer':1}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'5':4,'6':7,'7':24,'8':35,'9':37,'10':52,'NoAnswer':1},'north-america':{'4':1,'5':2,'6':13,'7':21,'8':48,'9':44,'10':64,'NoAnswer':1}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
          <TabPanel val="s">
            <div class="graph-area">
               <graph
            class="graph-wide"
            title="HTTYD1ScoreRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
            :data="{'_multiSet':true,'europe':{'2':1,'5':2,'6':3,'7':5,'8':5,'9':17,'10':127},'north-america':{'3':1,'4':1,'5':1,'6':2,'7':3,'8':6,'9':12,'10':167,'NoAnswer':1}}"
            :dataCount="{'europe':160,'north-america':194}"
          > 
              <average
                :sets="[{'setKey':'europe','setLabel':'Europe','color':'#149','dataCount':160},{'setKey':'north-america','setLabel':'North America','color':'#fea','dataCount':194}]"
                :data="{'_multiSet':true,'europe':{'2':1,'5':2,'6':3,'7':5,'8':5,'9':17,'10':127},'north-america':{'3':1,'4':1,'5':1,'6':2,'7':3,'8':6,'9':12,'10':167,'NoAnswer':1}}"
                :dataCount="{'europe':160,'north-america':194}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
        </TabPanels>

        <p>
          But gender × location turns out to be the cooler daniel once more. Turns out that gender × location graph gets very interesting for the second movie.
          With the first movie, the answers didn't diverge enough to warrant a mention. There were gender differences, but not much location differences. With
          HTTYD2, the four groups (EU/male, EU/female, NA/male, NA/female) often get wildly different bell curves and peaks (with some double peaks as well).
          Remember some of the weirness I pointed out on early graphs? When viewed in gender × location, the mysteries start to unravel.
        </p>

        <p>
          (As a side note: I am aware that I am ignoring the age here — which is a factor that probably contributes to the double peaking we see here — but if
          I did age × location × gender, the graph would have too many columns to be useful. Therefore, I ignore the age at the moment.)
        </p>

        <Tabs v-model="tabs.location.httyd2gl">
          <Tab
            label="Overall"
            val="overall"
          />
          <Tab
            label="Plot"
            val="p"
          />
          <Tab
            label="Emotion"
            val="e"
          />
          <Tab
            label="Characters"
            val="c"
          />
          <Tab
            label="Theme"
            val="t"
          />
          <Tab
            label="Visuals"
            val="v"
          />
          <Tab
            label="Score"
            val="s"
          />
        </Tabs>

        <TabPanels v-model="tabs.location.httyd2gl">
          <TabPanel val="overall">
            <div class="graph-area">
              <graph
                class="graph-wide"
                title="HTTYD2Rating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'3':1,'5':2,'6':4,'7':14,'8':36,'9':24,'10':31},'female-(eu)':{'5':1,'7':2,'8':9,'9':11,'10':11},'male-(na)':{'2':1,'6':6,'7':18,'8':25,'9':28,'10':28,'NoAnswer':2},'female-(na)':{'1':1,'5':1,'6':4,'7':9,'8':11,'9':21,'10':19}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              > 
                  <average
                    :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                    :data="{'_multiSet':true,'male-(eu)':{'3':1,'5':2,'6':4,'7':14,'8':36,'9':24,'10':31},'female-(eu)':{'5':1,'7':2,'8':9,'9':11,'10':11},'male-(na)':{'2':1,'6':6,'7':18,'8':25,'9':28,'10':28,'NoAnswer':2},'female-(na)':{'1':1,'5':1,'6':4,'7':9,'8':11,'9':21,'10':19}}"
                    :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
                  ></average>
                
              </graph>
            </div>
          </TabPanel>
          <TabPanel val="p">
            <div class="graph-area">
              <graph
                class="graph-wide"
                title="HTTYD2PlotRating"
                :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
                :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'3':1,'4':1,'5':5,'6':8,'7':23,'8':24,'9':26,'10':24},'female-(eu)':{'6':2,'7':6,'8':12,'9':10,'10':4},'male-(na)':{'2':1,'4':1,'5':3,'6':5,'7':36,'8':22,'9':23,'10':16,'NoAnswer':1},'female-(na)':{'1':1,'4':2,'5':2,'6':5,'7':11,'8':16,'9':18,'10':10,'NoAnswer':1}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              > 
                  <average
                    :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                    :data="{'_multiSet':true,'male-(eu)':{'3':1,'4':1,'5':5,'6':8,'7':23,'8':24,'9':26,'10':24},'female-(eu)':{'6':2,'7':6,'8':12,'9':10,'10':4},'male-(na)':{'2':1,'4':1,'5':3,'6':5,'7':36,'8':22,'9':23,'10':16,'NoAnswer':1},'female-(na)':{'1':1,'4':2,'5':2,'6':5,'7':11,'8':16,'9':18,'10':10,'NoAnswer':1}}"
                    :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
                  ></average>
                
              </graph>
            </div>
          </TabPanel>
          <TabPanel val="e">
            <div class="graph-area">
              <graph
            class="graph-wide"
            title="HTTYD2EmotionRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
            :data="{'_multiSet':true,'male-(eu)':{'2':1,'4':1,'5':3,'6':3,'7':8,'8':18,'9':32,'10':46},'female-(eu)':{'4':1,'7':1,'8':3,'9':9,'10':20},'male-(na)':{'3':1,'4':1,'5':1,'6':6,'7':4,'8':13,'9':37,'10':44,'NoAnswer':1},'female-(na)':{'1':1,'5':1,'7':6,'8':7,'9':15,'10':35,'NoAnswer':1}}"
            :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
          > 
              <average
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'2':1,'4':1,'5':3,'6':3,'7':8,'8':18,'9':32,'10':46},'female-(eu)':{'4':1,'7':1,'8':3,'9':9,'10':20},'male-(na)':{'3':1,'4':1,'5':1,'6':6,'7':4,'8':13,'9':37,'10':44,'NoAnswer':1},'female-(na)':{'1':1,'5':1,'7':6,'8':7,'9':15,'10':35,'NoAnswer':1}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
          <TabPanel val="c">
            <div class="graph-area">
                <graph
            class="graph-wide"
            title="HTTYD2CharacterRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
            :data="{'_multiSet':true,'male-(eu)':{'2':1,'3':1,'4':3,'6':3,'7':9,'8':35,'9':27,'10':33},'female-(eu)':{'5':1,'7':4,'8':12,'9':6,'10':11},'male-(na)':{'2':1,'5':4,'6':3,'7':22,'8':23,'9':31,'10':23,'NoAnswer':1},'female-(na)':{'1':1,'4':2,'5':3,'6':3,'7':4,'8':12,'9':19,'10':21,'NoAnswer':1}}"
            :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
          > 
              <average
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'2':1,'3':1,'4':3,'6':3,'7':9,'8':35,'9':27,'10':33},'female-(eu)':{'5':1,'7':4,'8':12,'9':6,'10':11},'male-(na)':{'2':1,'5':4,'6':3,'7':22,'8':23,'9':31,'10':23,'NoAnswer':1},'female-(na)':{'1':1,'4':2,'5':3,'6':3,'7':4,'8':12,'9':19,'10':21,'NoAnswer':1}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              ></average>
            
          </graph>
        
            </div>
          </TabPanel>
          <TabPanel val="t">
            <div class="graph-area">
               <graph
            class="graph-wide"
            title="HTTYD2ThemeRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
            :data="{'_multiSet':true,'male-(eu)':{'4':3,'5':6,'6':10,'7':13,'8':30,'9':17,'10':32,'NoAnswer':1},'female-(eu)':{'4':1,'6':2,'7':6,'8':4,'9':11,'10':10},'male-(na)':{'1':1,'2':1,'3':1,'4':2,'5':5,'6':8,'7':10,'8':28,'9':25,'10':26,'NoAnswer':1},'female-(na)':{'1':2,'3':1,'4':1,'5':4,'6':1,'7':10,'8':10,'9':16,'10':20,'NoAnswer':1}}"
            :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
          > 
              <average
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'4':3,'5':6,'6':10,'7':13,'8':30,'9':17,'10':32,'NoAnswer':1},'female-(eu)':{'4':1,'6':2,'7':6,'8':4,'9':11,'10':10},'male-(na)':{'1':1,'2':1,'3':1,'4':2,'5':5,'6':8,'7':10,'8':28,'9':25,'10':26,'NoAnswer':1},'female-(na)':{'1':2,'3':1,'4':1,'5':4,'6':1,'7':10,'8':10,'9':16,'10':20,'NoAnswer':1}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
          <TabPanel val="v">
            <div class="graph-area">
               <graph
            class="graph-wide"
            title="HTTYD2VisualsRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
            :data="{'_multiSet':true,'male-(eu)':{'7':2,'8':18,'9':33,'10':59},'female-(eu)':{'8':4,'9':5,'10':25},'male-(na)':{'5':1,'6':2,'7':4,'8':11,'9':23,'10':66,'NoAnswer':1},'female-(na)':{'2':1,'4':1,'5':1,'7':4,'8':4,'9':11,'10':44}}"
            :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
          > 
              <average
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'7':2,'8':18,'9':33,'10':59},'female-(eu)':{'8':4,'9':5,'10':25},'male-(na)':{'5':1,'6':2,'7':4,'8':11,'9':23,'10':66,'NoAnswer':1},'female-(na)':{'2':1,'4':1,'5':1,'7':4,'8':4,'9':11,'10':44}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
          <TabPanel val="s">
            <div class="graph-area">
               <graph
            class="graph-wide"
            title="HTTYD2ScoreRating"
            :conf="{'columnXMargin':'1.2rem','barWidth':'8px','trackWidth':'8px','columnWidth':'72px','trackWidthMultiset':'auto','size':'wide','hideZeroColumns':false}"
            :columns="[{'key':1,'label':'1'},{'key':2,'label':'2'},{'key':3,'label':'3'},{'key':4,'label':'4'},{'key':5,'label':'5'},{'key':6,'label':'6'},{'key':7,'label':'7'},{'key':8,'label':'8'},{'key':9,'label':'9'},{'key':10,'label':'10'},{'key':'NoAnswer','label':'Shy'}]"
            :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
            :data="{'_multiSet':true,'male-(eu)':{'3':2,'5':2,'6':3,'7':10,'8':22,'9':21,'10':52},'female-(eu)':{'7':1,'8':9,'9':3,'10':21},'male-(na)':{'2':1,'5':1,'6':1,'7':5,'8':22,'9':22,'10':54,'NoAnswer':2},'female-(na)':{'4':2,'5':2,'6':4,'7':2,'8':6,'9':8,'10':42}}"
            :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
          > 
              <average
                :sets="[{'setKey':'male-(eu)','setLabel':'Male (EU)','color':'#33a','dataCount':112},{'setKey':'female-(eu)','setLabel':'Female (EU)','color':'#f33','dataCount':34},{'setKey':'male-(na)','setLabel':'Male (NA)','color':'#88f','dataCount':108},{'setKey':'female-(na)','setLabel':'Female (NA)','color':'#f48','dataCount':66}]"
                :data="{'_multiSet':true,'male-(eu)':{'3':2,'5':2,'6':3,'7':10,'8':22,'9':21,'10':52},'female-(eu)':{'7':1,'8':9,'9':3,'10':21},'male-(na)':{'2':1,'5':1,'6':1,'7':5,'8':22,'9':22,'10':54,'NoAnswer':2},'female-(na)':{'4':2,'5':2,'6':4,'7':2,'8':6,'9':8,'10':42}}"
                :dataCount="{'male-(eu)':112,'female-(eu)':34,'male-(na)':108,'female-(na)':66}"
              ></average>
            
          </graph>
            </div>
          </TabPanel>
        </TabPanels>

        <p>
          Other HTTYD2 graphs aren't very interesting in location × gender view. There are some minor difference, but nothing we've seen before.
        </p>

        <p>
          Now, let's move onto the THW graphs. In Europe, Americans are often stereotyped as "the big dumb" ... but the rating graphs suggest that this
          stereotype may be <i>very</i> incorrect. The results are disappointing enough that Tamius is franticly googling whether a set of Uno can be used
          as a <a href="https://en.wikipedia.org/wiki/Green_card" target="_blank">green card</a>.
        </p>

      </template>

      <!-- #endregion location -->


        <!-- TAB GROUP REFERENCE STUFF

        <Tabs v-model="tabs.gender.location">
          <Tab
            label="EU"
            val="eu"
          />
          <Tab
            label="NA"
            val="na"
          />
        </Tabs>

        <TabPanels v-model="tabs.gender.location">
          <TabPanel val="eu">
            <div class="graph-area">
               graph goes here
            </div>
          </TabPanel>
          <TabPanel val="na">
            <div class="graph-area">
              graph goes here
            </div>
          </TabPanel>
        </TabPanels>
        
         -->


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
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';
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
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
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
      enum2draconid,

      tabs: {
        base: {
          aggregatedRatings: 'overall'
        },
        age: {
          httyd1: 'overall',
          httyd2: 'overall',
          thwRatings: 'plot'
        },
        gender: {
          thw: 'plot',
          location: 'eu',
        },
        location: {
          httydfav: 'fc',
          httyd2: 'overall',
          httyd2gl: 'overall'
        }
      },

      deepDiveResults: {
        age: false,
        gender: false,
        location: false
      }
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
            // console.log('ans is obj:', answer)
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
            // console.log('ans is plain value', answer)
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

.tab-panel {
  .graph-normal, .graph-wide {
    margin: 0 auto;
  }
}
.tab {
  color: #fa6;
  cursor: pointer;
  user-select: none;

  border-bottom: 1px solid dotted #fa6 !important;
}
</style>
