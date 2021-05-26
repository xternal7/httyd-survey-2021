export enum Question {
  Timestamp = '0',                         // —————————-- QUESTIONS AS ASKED ON POLL (note that order doesn't line up with csv headers perfectly) 
  Age = '1',                               // X  What is your age? 
  Gender = '2',                            // X  What is your gender identity?
  Location = '3',                          // X  What continent do you live on?
  Community = '4',                         // X  Which of the following HTTYD communities do you most frequently use?
  FandomTime = '5',                        //    How long have you been a member of the HTTYD fandom?
  SurveyParticipation2020 = '6',           // X  Did you complete the previous survey I made which was distributed in 2020?
  IsFurry = '7',                           // X  Do you identify as a member of any of the following communities? [furry/scalie/nope]
  HTTYD1Rating = '8',                      // X  What is your overall opinion of the first film on a scale of 1-10, with 10 being the most positive?
  UsernameProvided = '9',                  //    gib username? we promise to not tell
  HTTYD1PlotRating = '10',                 // X  [How'd you rate HTTYD1's] Plot
  HTTYD1EmotionRating = '11',              // X  Emotion
  HTTYD1CharacterRating = '12',            // X  etc
  HTTYD1ThemeRating = '13',                // X  those enums are really self-documenting
  HTTYD1VisualsRating = '14',              // X  im gonna stop with the comments now
  HTTYD1ScoreRating = '15',                // X  im also gonna stop marking rating questions, they're all up already
  HTTYD1FavouriteCharacter = '16',
  HTTYD1WorstCharacter = '17',
  HTTYD1FavouriteSoundtrack = '18',

  HTTYD2Rating              = '19',       // btw this repeats for HTTYD2 and THW
  HTTYD2PlotRating          = '20',
  HTTYD2EmotionRating       = '21',
  HTTYD2CharacterRating     = '22',
  HTTYD2ThemeRating         = '23',
  HTTYD2VisualsRating       = '24',
  HTTYD2ScoreRating         = '25',
  HTTYD2FavouriteCharacter  = '26',
  HTTYD2WorstCharacter      = '27',
  HTTYD2FavouriteSoundtrack = '28',
  HTTYD3Rating              = '29',       // this is where THW starts
  HTTYD3PlotRating          = '30',
  HTTYD3EmotionRating       = '31',
  HTTYD3CharacterRating     = '32',
  HTTYD3ThemeRating         = '33',
  HTTYD3VisualsRating       = '34',
  HTTYD3ScoreRating         = '35',
  HTTYD3FavouriteCharacter  = '36',
  HTTYD3WorstCharacter      = '37',
  HTTYD3FavouriteSoundtrack = '38',       // ↓↓↓ note that valka question is out of order ↓↓↓

  HTTYD2ValkaVillain = '39',              // X   Originally, Dean DeBlois planned to have Valka be HTTYD 2's sympathetic villain. Do you think this idea, if it had made it into the final product, would have improved the film?
  HTTYD3DragoRedemptionArc = '40',        // X   Originally, Dean DeBlois planned a redemption arc for Drago in the third film. Do you think this idea, if it had made it into the final product, would have improved the film?
  ThotfuryCharacterRating = '41',         // X   what is your opinion on the Light Fury as a character?
  ThotfuryDesignRating = '42',            // X   what is your opinion on the Light Fury's visual design?
  THWFittingEnd = '43',                   // X   Rate your agreement with the following statement "The ending of The Hidden World was a fitting end to the franchise."
  THWPlotCoherency = '44',                // X   [...]"The plot of The Hidden World makes sense and has clear cause and effect.
  THWStrongestThemes = '45',              // !   Which of the following themes / messages do you feel The Hidden World most strongly conveys? Try to limit yourself to picking no more than 2 of these.
  THWThemeApproval = '49',                // X   Regarding the themes you see in The Hidden World, rate the extent to which you agree with / approve of those themes.
  BondType = '50',                        // b   Do you view the bond between Hiccup and Toothless as being more "Master and Pet" or "Mutual Friends?
  FavouriteShort = '51',                  // X   Which short is your favorite?
  GONFRating = '52',                      // X   ill also stop with comments here, all ratings are included already
  BoneknapperRating = '53',
  BookOfDragonsRating = '54',
  DawnOfDragonRidersRating = '55',
  RidersOfBerkRating = '56',
  RTTERating = '57',
  SideCharactersLikabilityAgreement = '58',  // X     Rate your agreement with the following statement: "The side characters (Snotlout, Fishlegs, the Twins, etc) were generally more likable in Race to the Edge than in the films."
  IsRTTECanon = '59',                     // X    Do you consider Race to the Edge canon to the films?
  MovieRanking = '60',                    // X    How would you rank the three movies?' (best to worst)
  FavouriteDraconid = '61',               // !    Which breed of dragon from the franchise is your personal favorite?
  FavouriteVillain = '62',                // !    Which villain is your personal favorite?
  FavouriteOpeningScene = '63',           // !    Which film's opening scene was your favorite?
  MovieWatchingOrder = '64',              // X    In which order did you see the each film for the first time?
  THWOpinionChange = '65',                // X    If you watched The Hidden World before seeing the other two films, did your opinion of The Hidden World change after watching them? If this question does not apply to you, leave it blank.
  YouCanEnjoyGarbageAgreement = '66',     // X    Rate your agreement with the following statement: "Personal enjoyment of a piece of media is different and independent of the quality of that piece of media.
  MostImportantAspects = '67',            // !    Of the following aspects of films/shows in general, which do you feel are the MOST important? Try not to check more than 2 boxes.
  HTTYDAppealReasons = '68',              // X    Which of the following best describe/describes your reason for being drawn to HTTYD? Try not to check more than 2 boxes.
  SurveyFeedbackProvided = '69',          //      whether user provided survey feedback or not
  FavouriteDraconidReason = '70',         //      why is ${FavouriteDracoind} your favourite
  FavouriteVillainReason = '71',          //      why is ${FavouriteVillain} your favourite
  HomecomingRating = '72',
  IsDeleted = '73',
  DeletedReason = '74',
  TamFeedback = '75',
  BrusselFeedback = '76',
  FavouriteDraconidReasonScore = '77',
  FavouriteVillainReasonScore = '78',
  SuperSecretFormulas = '79',
}
