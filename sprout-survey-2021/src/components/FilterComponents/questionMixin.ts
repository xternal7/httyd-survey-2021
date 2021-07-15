import { Answer } from '@/enums/answer.enum';
import { Character } from '@/enums/character.enum';
import { Community } from '@/enums/community.enum';
import { Continent } from '@/enums/continent.enum';
import { Draconid } from '@/enums/draconid.enum';
import { FurryCommunity } from '@/enums/furry-community.enum';
import { Gender } from '@/enums/gender.enum';
import { HTTYDShort } from '@/enums/httyd-short.enum';
import { MovieAspect } from '@/enums/movie-aspect';
import { MovieOrder } from '@/enums/movie-order.enum';
import { MovieRankEnum } from '@/enums/movie-ranking.enum';
import { Question } from '@/enums/question.enum';
import { HTTYD2Soundtrack, HTTYDSoundtrack, THWSoundtrack } from '@/enums/soundtrack.enum';
import { THWOpinionChange } from '@/enums/thw-opinion-change.enum';
import { THWTheme } from '@/enums/thw-theme.enum';
import { Villain } from '@/enums/villain.enum';

const questionMixin = {
  methods: {
    getQuestionEnum(questionEnum) {
      if (this.isYesNoQuestion(questionEnum)) {
        return Answer;
      }

      switch (Question[questionEnum]) {
        case Question.Gender:
          return Gender;
        case Question.Community:
          return Community;
        case Question.Location:
          return Continent;
        case Question.IsFurry:
          return FurryCommunity;
        case Question.HTTYD1FavouriteCharacter:
        case Question.HTTYD2FavouriteCharacter:
        case Question.HTTYD3FavouriteCharacter:
        case Question.HTTYD1WorstCharacter:
        case Question.HTTYD2WorstCharacter:
        case Question.HTTYD3WorstCharacter:
          return Character;
        case Question.HTTYD1FavouriteSoundtrack:
          return HTTYDSoundtrack;
        case Question.HTTYD2FavouriteCharacter:
          return HTTYD2Soundtrack;
        case Question.HTTYD3FavouriteSoundtrack:
          return THWSoundtrack;
        case Question.THWStrongestThemes:
          return THWTheme;
        case Question.FavouriteShort:
          return HTTYDShort;
        case Question.MovieRanking:
          return MovieRankEnum;
        case Question.MovieWatchingOrder:
          return MovieOrder;
        case Question.FavouriteDraconid:
          return Draconid;
        case Question.FavouriteVillain:
          return Villain;
        case Question.MostImportantAspects:
          return MovieAspect;
        case Question.THWOpinionChange:
          return THWOpinionChange;
        default:
          return undefined;
      }
    },

    enum2labels(enumm: any) {
      const labels: any[] = [];
      for (const a in enumm) {
        labels.push(enumm[a]);
      }
      return labels;
    },

    isRatingOrAgeQuestion(questionEnum: string | Question) {
      const v = isNaN(+questionEnum) ? Question[`${questionEnum}`] : questionEnum;

      if (v === Question.Age) {
        return true;
      }
      if (v === Question.FandomTime) {
        return true;
      }

      return this.isRatingQuestion(questionEnum);
    },

    // determine the correct enum for the question with these
    isRatingQuestion(questionEnum: string) {
      const v = isNaN(+questionEnum) ? Question[`${questionEnum}`] : questionEnum;

      switch (v) {
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
      const v = isNaN(+questionEnum) ? Question[`${questionEnum}`] : questionEnum;

      switch(v) {
        case Question.SurveyParticipation2020:
        case Question.UsernameProvided:        // for the purposes of this filter ...
        case Question.SurveyFeedbackProvided:  // for the purposes of this filter ...
        case Question.IsRTTECanon:
        case Question.SurveyFeedbackProvided:
        case Question.THWOpinionChange:
        case Question.HTTYD2ValkaVillain:
        case Question.HTTYD3DragoRedemptionArc:
        // case Question.THWFittingEnd:
          return true;
        default:
          return false;
      }
    }
  }
};

export default questionMixin;