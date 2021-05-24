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
          ></graph>
        </div>

        <p>
          Needless to say, I find 'least favourite' results a little bit surprising, with Gobber getting a #2 (though I guess I can see why
          people voted that way).
        </p>

        <div class="graph-area">
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
              size: 'wide'
            }"
            :columns="graphColumnDefinitions[Question.HTTYD1FavouriteSoundtrack]()"
            :data="graphData?.['all']?.[Question.HTTYD1FavouriteSoundtrack]"
          ></graph>
        </div>
      
        <p>
          RESULT COMMENTARY HERE
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
          ></graph>
        </div>

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
          ></graph>
        </div>

        <p>
          Well that's unexpected.
        </p>

        <div class="graph-area">
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
              size: 'wide'
            }"
            :columns="graphColumnDefinitions[Question.HTTYD2FavouriteSoundtrack]()"
            :data="graphData?.['all']?.[Question.HTTYD2FavouriteSoundtrack]"
          ></graph>
        </div>
      
        <p>
          RESULT COMMENTARY HERE
        </p>

        <p>Last but not least: our special question.</p>

        <div class="graph-area">
          <graph
            title="Would the movie be better, had Valka been a villain?"
            description="Originally, Dean DeBlois planned to have Valka be HTTYD 2's sympathetic villain. The question asked: Do you think this idea, if it had made it into the final product, would have improved the film?"
            :conf="{
              barWidth: '20px !important',
              trackWidthMultiset: '16px !important',
              trackWidth: '16px !important',
              columnWidth: '96px !important',
            }"
            :columns="graphColumnDefinitions.yesNoNeutral()"
            :data="graphData?.['all']?.[Question.HTTYD2ValkaVillain]"
          ></graph>
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
          ></graph>
        </div>

        <div class="graph-area">
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
          ></graph>
        </div>

        <p>
          BTW that graph also needs revision ↑↑↑
        </p>

        <div class="graph-area">
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
              size: 'wide'
            }"
            :columns="graphColumnDefinitions[Question.HTTYD3FavouriteSoundtrack]()"
            :data="graphData?.['all']?.[Question.HTTYD3FavouriteSoundtrack]"
          ></graph>
        </div>
      
        <p>
          If you wonder about what the 'salt squad' represents on the graph — it's the people who answered with any variant of 
          <i>'I actually hate all of them.'</i>like  The reason The Hidden World gets this category while the other movies don't is because
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
          <graph
            title="Would Drago redemption arc improve the movie?"
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
      <h1>Favourite things</h1>

      <p>
        This year, we have also asked people for a few favourite things. Let's start with the 'favourite draconid'
        category to start things off. Furthermore, we've decided to ask people to explain their pick and show some
        of the most well-written answers (where the criteria was mostly how specific the reasoning given was).
        The reasons people gave for their answer are sorted per answer.
      </p>

      <div class="graph-area">
        <graph
          title="Favourite draconid"
          :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
          :columns="graphColumnDefinitions[Question.FavouriteDraconid]"
          :data="graphData?.['all']?.[Question.FavouriteDraconid]"
        ></graph>
      </div>
      
      todo: add reason


      <p>
        The 'favourite villain' question largely follows the same format as the previous one, so I don't feel
        the need to repeat myself. Let's go straight to the results.
      </p>

      <div class="graph-area">
        <graph
          title="Favourite villain"
          :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
          :columns="graphColumnDefinitions[Question.FavouriteVillain]"
          :data="graphData?.['all']?.[Question.FavouriteVillain]"
        ></graph>
      </div>
      
      todo: add reason

      <p>
        Last but not least: favourite opening scene.
      </p>

      <div class="graph-area">
        <graph
          title="Favourite opening scene"
          :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
          :columns="graphColumnDefinitions[Question.FavouriteOpeningScene]"
          :data="graphData?.['all']?.[Question.FavouriteOpeningScene]"
        ></graph>
      </div>

      <p>
        Unlike the previous two, this question came without a 'please explain' field — mostly because Tamius 
        didn't forsee anything interesting coming out of it, and thus only annoyed Brussel into adding the 
        'please explain' section to the previous two questions.
      </p>
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
          <graph
            title="What is your opinion on the Light Fury as a character?"
            description="0: garbage tier, 5-6: eh, 10: perfect"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.ThotfuryCharacterRating]"
          ></graph>
          <graph
            title="What is your opinion on the Light Fury's visual design?"
            description="0: garbage tier, 5-6: eh, 10: perfect"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.ThotfuryDesignRating]"
          ></graph>
        </div>

        <p>
          Almost no surprises here. The ratings are about as contested as the rest of the The Hidden World related questions so far.
        </p>

        <div class="graph-area">
          <graph
            title="Was THW a fitting end to the franchise?"
            description="0: hell no, 5-6: eh, 10: perfect"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.THWFittingEnd]"
          ></graph>
          <graph
            title="The plot of The Hidden World makes sense and has clear cause and effect"
            description="0: hell no, 5-6: eh, 10: enough sense to make me a millionare"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.THWPlotCoherency]"
          ></graph>
        </div>

        <p>
          I really like how both of these got (on average) worse results than the plot rating. Let's plot them on the same graph, just for shits and giggles:
        </p>

        <div class="graph-area">
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
          ></graph>
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
          ></graph>
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
          ></graph>
          <graph
            title="Theme approval"
            description="Regarding the themes you see in The Hidden World, rate the extent to which you agree with / approve of those themes."
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.THWThemeApproval]"
          ></graph>
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


        <p>
          TODO: COMMENTARY
        </p>

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
          <graph
            title="Favourite short"
            :conf="{
              trackWidth: '8px',
              barWidth: '16px !important',
              columnWidth: '32px !important',
              sidewaysLabels: true,
              labelsHeight: '16rem'
            }"
            :columns="graphColumnDefinitions[Question.FavouriteShort]()"
            :data="{
              ...graphData?.['all']?.[Question.FavouriteShort],
              _multiSet: false
            }"
          ></graph>

          <graph
            title="Rate [short] from 1 to 10"
            :conf="{
              columnXMargin: '0.125rem',
              barWidth: '8px',
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
          ></graph>
        </div>

        <p>
          todo: commentary, if any
        </p>

        <div class="graph-area">
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
          ></graph>

          <graph
            title="Likability of side characters in RTTE"
            description="Rate your agreement with the following statement: 'The side characters (Snotlout, Fishlegs, the Twins, etc) were generally more likable in Race to the Edge than in the films.'"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.SideCharactersLikabilityAgreement]"
          ></graph>
        </div>

        <p>todo: commentary, if any</p>

        <p>
          Last but not least — even though Race to the Edge is <b>not</b> canon to the movie franchise as far as cold, hard facts
          are concerned, we will see people insisting that it is from time to time. Which begs the question — how many people <i>do</i>
          think that RTTE is canon? Well ...
        </p>

        <div class="graph-area">
          <graph
            title="Do you consider Race to the Edge canon to the films?"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.yesNoNeutral()"
            :data="graphData?.['all']?.[Question.IsRTTECanon]"
          ></graph>
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
          <graph
            title="Personal enjoyment vs. objective quality."
            description="Rate the following statement: 'Personal enjoyment of a piece of media is different and independent of the quality of that piece of media.' Agreement on the scale from 1 - 10. Bigger number means more agreement."
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.YouCanEnjoyGarbageAgreement]"
          ></graph>
        </div>
         <p>
            Given reddit, I honestly expected this graph would be so contested it'd make <a href="https://wowpedia.fandom.com/wiki/Tarren_Mill#Tarren_Mill_is_under_attack.21" target="_blank">Tarren Mill</a> seem like a peaceful Lordaeron village.
        </p>

        <div class="graph-area">
          <graph
            title="Most important aspects of a movie (TODO: answer keys!)"
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
          ></graph>
        </div>

        <p>
          todo commentary
        </p>


        <div class="graph-area">
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
          ></graph>

          <graph
            title="Do you view the bond between Hiccup and Toothless as being more 'Master and Pet' or 'Mutual Friends?'"
            description="0 - master/pet, 10 - mutual friends"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.rating1to10()"
            :data="graphData?.['all']?.[Question.BondType]"
          ></graph>
        </div>


        <p>
          TODO: commentary
        </p>

        <div class="graph-area">
          <graph
            title="Movie ranking"
            description="From best to worst"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions[Question.MovieRanking]"
            :data="graphData?.['all']?.[Question.MovieRanking]"
          ></graph>

          <graph
            title="Movie watching order"
            description="In which order did you see the each film for the first time?"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions[Question.MovieWatchingOrder]"
            :data="graphData?.['all']?.[Question.MovieWatchingOrder]"
          ></graph>

          <graph
            title="The Hidden World opinion change"
            description="If you watched The Hidden World before seeing the other two films, did your opinion of The Hidden World change after watching them?"
            :conf="{trackWidth: '8px', barWidth: '16px !important', columnWidth: '32px !important'}"
            :columns="graphColumnDefinitions.yesNoNeutral()"
            :data="graphData?.['all']?.[Question.THWOpinionChange]"
          ></graph>
        </div>
        

        <p>
          todo: commentary
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
