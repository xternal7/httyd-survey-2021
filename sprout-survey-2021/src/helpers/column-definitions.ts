import { Answer } from '@/enums/answer.enum';
import { Character } from '@/enums/character.enum';
import { Community } from '@/enums/community.enum';
import { Continent } from '@/enums/continent.enum';
import { Draconid } from '@/enums/draconid.enum';
import { FurryCommunity } from '@/enums/furry-community.enum';
import { Gender } from '@/enums/gender.enum';
import { HTTYDAppealReason } from '@/enums/httyd-appeal-reason.enum';
import { HTTYDShort } from '@/enums/httyd-short.enum';
import { MovieAspect } from '@/enums/movie-aspect';
import { MovieOrder } from '@/enums/movie-order.enum';
import { Question } from '@/enums/question.enum';
import { HTTYD2Soundtrack, HTTYDSoundtrack, THWSoundtrack } from '@/enums/soundtrack.enum';
import { THWTheme } from '@/enums/thw-theme.enum';
import { Villain } from '@/enums/villain.enum';

let graphColumnDefinitions = {
  [Question.Age]: () => {
    const cols: any[] = [];
    for (let i = 10; i < 50; i++) {
      cols.push({
        key: i,
        label: i % 5 === 0 ? `${i}` : ''
      });
    }

    cols.push(
      {key: "-1", label: "❄️"},
      {key: '_dumm1', label: ''},
      {key: '_dumm4', label: ''},
      {key: 'NoAnswer', label: 'Shy'}
    );

    return cols;
  },
  [Question.Gender]: () => {
    return [
      {
        key: Gender.Male,
        label: 'Male'
      },
      {
        key: Gender.Female,
        label: 'Female'
      },
      {
        key: Gender.Other,
        label: 'Other'
      },
      {
        key: Gender.Shy,
        label: 'Shy'
      },
      {key: '_dumm4', label: ''},
      {
        key: Gender.Apache,
        label: '🚁'
      },
      {
        key: Gender.Snowflake,
        label: "❄️"
      }
    ]
  },
  [Question.Location]: () => {
    return [
      {
        key: Continent.Europe,
        label: 'Europe'
      },
      {
        key: Continent.Asia,
        label: 'Asia'
      },
      {
        key: Continent.Africa,
        label: 'Africa'
      },
      {
        key: Continent.Australia,
        label: 'Australia'
      },
      {
        key: Continent.NorthAmerica,
        label: 'NA'
      },
      {
        key: Continent.SouthAmerica,
        label: 'SA'
      },
      {
        key: Continent.Antarctica,
        label: 'Antarctica'
      },
      {
        key: Continent.Shy,
        label: 'Shy'
      }
    ];
  },
  [Question.Community]: () => {
    return [
      {
        key: Community.Reddit,
        label: 'Reddit'
      },
      {
        key: Community.Discord,
        label: 'Discord'
      },
      {
        key: Community.Instagram,
        label: 'Instagram'
      },
      {
        key: Community.Fandom,
        label: 'Fandom'
      },
      {
        key: Community.Grapevine,
        label: 'Grapewine'
      },
      {
        key: Community.Amino,
        label: 'Amino'
      },
      {
        key: Community.Tumblr,
        label: 'Tumblr'
      },
      {
        key: Community.Twitter,
        label: 'Twitter'
      },
      {
        key: Community.Youtube,
        label: 'Youtube'
      }, 
      {
        key: Community.Other,
        label: 'Other'
      },
      {
        key: Community.Shy,
        label: 'Shy'
      },
      {
        key: Community.Multiple,
        label: 'D.W.'
      }
    ]
  },
  rating1to10: () => {
    const cols: any[] = [];
    for (let i = 1; i <= 10; i++) {
      cols.push({
        key: i,
        label: `${i}`
      });
    }

    cols.push({key: "NoAnswer", label: "Shy"});

    return cols;
  },
  [Question.FandomTime]: () => {
    const cols: any[] = [];

    cols.push({key: 0, label: '<1'});

    for (let i = 1; i < 10; i++) {
      cols.push({
        key: i,
        label: `${i}`
      });
    }

    cols.push({key: 10, label: '10+'});
    cols.push({key: "NoAnswer", label: "Shy"});

    return cols;
  },
  yesNoNeutral() {
    return [
      {
        key: Answer.Yes,
        label: 'Yes'
      },
      {
        key: Answer.Neutral,
        label: 'Neutral'
      },
      {
        key: Answer.No,
        label: 'No'
      },
      {
        key: Answer.Unanswered,
        label: 'Shy'
      }
    ]
  },
  [Question.SurveyParticipation2020]: () => {
    return [
      {
        key: Answer.Yes,
        label: 'Yes'
      },
      {
        key: Answer.Neutral,
        label: 'Unsure'
      },
      {
        key: Answer.No,
        label: 'No'
      },
      {
        key: Answer.Unanswered,
        label: 'Shy'
      }
    ]
  },
  httydCharacter: (movie: 1 | 2 | 3) => {
    const commonChars = [
      {
        key: Character.Hiccup,
        label: 'Hiccup'
      },
      {
        key: Character.Toothless,
        label: 'Toothless'
      },
      {
        key: Character.Astrid,
        label: 'Astrid'
      },
    ];
    const commonCharsTail = [
      {
        key: Character.Gobber,
        label: 'Gobber'
      },
      {
        key: Character.Ruffnut,
        label: 'Ruffnut'
      },
      {
        key: Character.Tuffnut,
        label: 'Tuffnut'
      },
      {
        key: Character.Twins,
        label: 'Twins'
      },
      {
        key: Character.Snotlout,
        label: 'Snotlout'
      },
      {
        key: Character.Fishlegs,
        label: 'Fishlegs'
      },
      {
        key: Character.Other,
        label: 'Other'
      },
      {
        key: Character.NoAnswer,
        label: 'Shy'
      }, {
        key: Character.Multiple,
        label: 'D.W.'
      }
    ];
    
    switch (movie) {
      case 1:
        return [
          ...commonChars,
          {
            key: Character.Stoick,
            label: 'Stoick'
          },
          ...commonCharsTail
        ];
      case 2:
        return [
          ...commonChars,
          {
            key: Character.Stoick,
            label: 'Stoick'
          },
          {
            key: Character.Valka,
            label: 'Valka'
          },
          {
            key: Character.Cloudjumper,
            label: 'Cloudjumper'
          },
          {
            key: Character.Drago,
            label: 'Drago'
          },
          {
            key: Character.Eret,
            label: 'Eret'
          },
          ...commonCharsTail
        ];
      case 3:
      default:
        return [
          ...commonChars,
          {
            key: Character.Valka,
            label: 'Valka'
          },
          {
            key: Character.Cloudjumper,
            label: 'Cloudjumper'
          },
          {
            key: Character.Eret,
            label: 'Eret'
          },
          {
            key: Character.Thotfury,
            label: 'Light Fury'
          },
          {
            key: Character.Grimmel,
            label: 'Grimmel'
          },
          ...commonCharsTail
        ];
    }
  },
  [Question.HTTYD1FavouriteSoundtrack]: () => {
    return [
      {
        key: HTTYDSoundtrack.ThisIsBerk,
        label: 'This is Berk',
      },
      {
        key: HTTYDSoundtrack.DragonBattle,
        label: 'Dragon Battle'
      },
      {
        key: HTTYDSoundtrack.DownedDragon,
        label: 'The Downed Dragon'
      },
      {
        key: HTTYDSoundtrack.DragonTraining,
        label: 'Dragon training'
      },
      {
        key: HTTYDSoundtrack.Wounded,
        label: 'Wounded',
      },
      {
        key: HTTYDSoundtrack.DragonBook,
        label: 'The Dragon Book',
      },
      {
        key: HTTYDSoundtrack.FocusHiccup,
        label: 'Focus, Hiccup!'
      },
      {
        key: HTTYDSoundtrack.ForbiddenFriendship,
        label: 'Forbidden Friendship'
      },
      {
        key: HTTYDSoundtrack.NewTail,
        label: 'New Tail'
      },
      {
        key: HTTYDSoundtrack.SeeYouTomorrow,
        label: 'See You Tomorrow'
      },
      {
        key: HTTYDSoundtrack.TestDrive,
        label: 'Test Drive'
      },
      {
        key: HTTYDSoundtrack.NotSoFireproof,
        label: 'Not so Fireproof'
      },
      {
        key: HTTYDSoundtrack.ThisTimeForSure,
        label: 'This Time For Sure'
      },
      {
        key: HTTYDSoundtrack.AstridGoesForASpin,
        label: 'Astrid Goes for a Spin'
      },
      {
        key: HTTYDSoundtrack.RomanticFlight,
        label: 'Romantic Flight'
      },
      {
        key: HTTYDSoundtrack.DragonsDen,
        label: 'Dragon\'s Den'
      },
      {
        key: HTTYDSoundtrack.Cove,
        label: 'The Cove'
      },
      {
        key: HTTYDSoundtrack.KillRing,
        label: 'The Kill Ring'
      },
      {
        key: HTTYDSoundtrack.ReadyTheShips,
        label: 'Ready The Ships'
      },
      {
        key: HTTYDSoundtrack.BattlingGreenDeath,
        label: 'Battling the Green Death'
      },
      {
        key: HTTYDSoundtrack.CounterAttack,
        label: 'Counter Attack'
      },
      {
        key: HTTYDSoundtrack.WheresHiccup,
        label: 'Where\'s Hiccup'
      },
      {
        key: HTTYDSoundtrack.ComingBackAround,
        label: 'Coming Back Around'
      },
      {
        key: HTTYDSoundtrack.SticksStones,
        label: 'Sticks and Stones'
      },
      {
        key: HTTYDSoundtrack.VikingsHaveTHeirTea,
        label: 'Vikings Have Their Tea'
      },
      {
        key: HTTYDSoundtrack.None,
        label: 'Shy'
      },
      {
        key: HTTYDSoundtrack.Multiple,
        label: 'D.W.'
      }
    ]
  },
  [Question.HTTYD2FavouriteSoundtrack]: () => {
    return [{
      key: HTTYD2Soundtrack.DragonRacing,
      label: 'Dragon Racing'
    },{
      key: HTTYD2Soundtrack.TogetherMapTheWorld,
      label: 'Together We Map The World'
    },{
      key: HTTYD2Soundtrack.HiccupTheChief,
      label: 'Hiccup the Chief'
    },{
      key: HTTYD2Soundtrack.ToothlessLost,
      label: 'Toothless Lost'
    }, {
      key: HTTYD2Soundtrack.ShouldIKnowYou,
      label: 'Should I Know You'
    },{
      key: HTTYD2Soundtrack.ValkaDragonSanctuary,
      label: 'Valka\'s Dragon Sacntuary'
    },{
      key: HTTYD2Soundtrack.LosingMom,
      label: 'Losing Mom'
    },{
      key: HTTYD2Soundtrack.MeetDrago,
      label: 'Meet Drago'
    },{
      key: HTTYD2Soundtrack.StoickFindsBeauty,
      label: 'Stoick Finds Beauty'
    },{
      key: HTTYD2Soundtrack.FlyingWithMother,
      label: 'Flying With Mother'
    },{
      key: HTTYD2Soundtrack.DancingAndTheDreaming,
      label: 'For the Dancing and the Dreaming'
    }, {
      key: HTTYD2Soundtrack.BattleBewilderbeast,
      label:  'Battle of the Bewilderbeast'
    },{
      key: HTTYD2Soundtrack.HiccupConfrontsDrago,
      label: 'Hiccup Confronts Drago'
    },{
      key: HTTYD2Soundtrack.StoickSavesHiccup,
      label: 'Stoick Saves Hiccup'
    }, {
      key: HTTYD2Soundtrack.StoicksShip,
      label: 'Stoick\'s ship'
    }, {
      key: HTTYD2Soundtrack.AlphaComesToBerk,
      label: 'Alpha Comes To Berk',
    }, {
      key: HTTYD2Soundtrack.TwoNewAlphas,
      label: 'Two New Alphas'
    },{
      key: HTTYD2Soundtrack.ToothlessFound,
      label: 'Toothless Found'
    }, {
      key: HTTYD2Soundtrack.WhereNoOneGoes,
      label: 'Where No One Goes'
    },{
      key: HTTYD2Soundtrack.IntoAFantasy,
      label: 'Into A Fantasy',
    }, {
      key: HTTYD2Soundtrack.None,
      label: 'Shy'
    }, {
      key: HTTYD2Soundtrack.Multiple,
      label: 'D.W.'
    }]
  },
  [Question.HTTYD3FavouriteSoundtrack]: () => {
    return [{
      key: THWSoundtrack.RaidersReturn,
      label: 'Raiders Return to Busy, Busy Berk'
    }, {
      key: THWSoundtrack.DinnerTalk,
      label: 'Dinner Talk'
    }, {
      key: THWSoundtrack.LegendHasIt,
      label: 'Legend Has It'
    }, {
      key: THWSoundtrack.ToothlessSmitten,
      label: 'Toothless: Smitten'
    }, {
      key: THWSoundtrack.WorstPepTalk,
      label: 'Worst Pep Talk Ever',
    }, {
      key: THWSoundtrack.NightFuryKiller,
      label: 'Night Fury Killer',
    },{
      key: THWSoundtrack.Exodus,
      label: 'Exodus!'
    }, {
      key: THWSoundtrack.ThirdDate,
      label: 'Third Date'
    }, {
      key: THWSoundtrack.NewNewTail,
      label: 'New New Tail'
    }, {
      key: THWSoundtrack.FuriesInLove,
      label: 'Furies in Love'
    }, {
      key: THWSoundtrack.KillerDragons,
      label: 'Killer Dragons',
    }, {
      key: THWSoundtrack.GreatWaterfall,
      label: 'With Love Comes a Great Waterfall'
    }, {
      key: THWSoundtrack.THW,
      label: 'The Hidden World'
    }, {
      key: THWSoundtrack.ArmadaBattle,
      label: 'Armada Battle'
    }, {
      key: THWSoundtrack.AsLongAsHesSafe,
      label: 'As Long As He\'s Safe'
    }, {
      key: THWSoundtrack.OnceThereWereDragons,
      label: 'Once There Were Dragons'
    }, {
      key: THWSoundtrack.TogetherFromAfar,
      label: 'Together From Afar'
    }, {
      key: THWSoundtrack.THWSuite,
      label: 'The Hidden World Suite'
    }, {
      key: THWSoundtrack.None,
      label: 'Shy'
    }, {
      key: THWSoundtrack.Multiple,
      label: 'D.W.'
    },{
      key: THWSoundtrack.AffirmativeNone,
      label: 'Salt squad'
    }]
  },
  [Question.FavouriteShort]: () => {
    return [{
      key: HTTYDShort.Boneknapper,
      label: 'The Legend of the Boneknapper'
    },{
      key: HTTYDShort.BookOfDragons,
      label: 'The Book of Dragons'
    },{
      key: HTTYDShort.DawnOfDragonRiders,
      label: 'Dawn of the Dragon Riders'
    },{
      key: HTTYDShort.GotNF,
      label: 'Gift of the Night Fury'
    },{
      key: HTTYDShort.Homecoming,
      label: 'Homecoming'
    },{
      key: HTTYDShort.NoAnswer,
      label: 'Shy'
    }];
  },
  [Question.HTTYDAppealReasons]: () => {
    return [{
      key: HTTYDAppealReason.AnimationInterest,
      label: 'Animation interest'
    },{
      key: HTTYDAppealReason.CharacterShipping,
      label: 'Character shipping'
    },{
      key: HTTYDAppealReason.DragonsCool,
      label: 'Dragons are cool'
    },{
      key: HTTYDAppealReason.FantasyFan,
      label: 'Fan of fantasy'
    },{
      key: HTTYDAppealReason.FascinatingWorld,
      label: 'Fascinating world'
    },{
      key: HTTYDAppealReason.Nostalgia,
      label: 'Nostalgia'
    },{
      key: HTTYDAppealReason.ObjectiveQuality,
      label: 'Objective quality'
    },{
      key: HTTYDAppealReason.Relatable,
      label: 'It\'s relatable'
    },{
      key: HTTYDAppealReason.Other,
      label: 'Other'
    },{
      key: HTTYDAppealReason.NoAnswer,
      label: 'Shy'
    },{
      key: HTTYDAppealReason.TooManyAnswers,
      label: 'They tried'
    }];
  },
  [Question.THWStrongestThemes]: () => {
    return [{
      key: THWTheme.AcceptingFriendshipsEnd,
      label: 'Accepting friendships end'
    },{
      key: THWTheme.GrowingUp,
      label: 'Growing up and letting go'
    },{
      key: THWTheme.LoveLoss,
      label: 'Love and loss'
    },{
      key: THWTheme.Moralfagging,
      label: 'Misantrophy'
    },{
      key: THWTheme.PuttingAsideIdealism,
      label: 'Putting aside idealism'
    },{
      key: 'spacer-1',
      label: ''
    },{
      key: 'spacer-2',
      label: ''
    },{
      key: THWTheme.AllGarbage,
      label: 'All garbage'
    },{
      key: THWTheme.SarcasticAnswer,
      label: '🧂'
    },{
      key: THWTheme.Other,
      label: 'Other'
    },{
      key: THWTheme.NoAnswer,
      label: 'Shy'
    },{
      key: THWTheme.TooManyAnswers,
      label: 'They tried'
    }];
  },
  [Question.FavouriteDraconid]: () => {
    return [
      {
        key: Draconid.NightFury,
        label: 'Night Fury'
      }, {
        key: Draconid.ThotFury,
        label: 'Light Fury'
      }, {
        key: Draconid.ThotLights,
        label: 'Night Lights',
      }, {
        key: Draconid.Nadder,
        label: 'Nadder'
      }, {
        key: Draconid.Stormcutter,
        label: 'Stormcutter'
      }, {
        key: Draconid.Nightmare,
        label: 'Monstrous Nightmare'
      }, {
        key: Draconid.Skrill,
        label: 'Skrill'
      }, {
        key: Draconid.Bewilderbeast,
        label: 'Bewilderbeast'
      }, {
        key: Draconid.Deathgripper,
        label: 'Deathgripper'
      }, {
        key: Draconid.Terror,
        label: 'Terrible Terror'
      }, {
        key: Draconid.Gronckle,
        label: 'Gronckle'
      }, {
        key: Draconid.WhisperingDeath,
        label: 'Whispering Death'
      }, {
        key: Draconid.Zippleback,
        label: 'Zippleback'
      }, {
        key: Draconid.Gorecutter,
        label: 'Gorecutter'
      }, {
        key: Draconid.Other,
        label: 'Other'
      }, {
        key: Draconid.None,
        label: 'Shy'
      }, {
        key: Draconid.Multiple,
        label: 'D.W.'
      }
    ]
  },
  [Question.FavouriteVillain]: () => {
    return [
      {
        key: Villain.GreenDeath,
        label: 'Green Death'
      }, {
        key: Villain.Drago,
        label: 'Drago'
      }, {
        key: Villain.DragoBewilderbeast,
        label: 'Drago\'s Bewilderbeast'
      }, {
        key: Villain.Grimmel,
        label: 'Grimmel'
      }, {
        key: Villain.Viggo,
        label: 'Viggo'
      }, {
        key: Villain.Ryker,
        label: 'Ryker'
      }, {
        key: Villain.Dagur,
        label: 'Dagur'
      }, {
        key: Villain.Johann,
        label: 'Johann'
      }, {
        key: Villain.THWWarlords,
        label: 'Warlords',
      }, {
        key: Villain.Alvin,
        label: 'Alvin'
      }, {
        key: Villain.Mildew,
        label: 'Mildew'
      }, {
        key: Villain.Stoick,
        label: 'Stoick',
      }, {
        key: Villain.Other,
        label: 'Other'
      }, {
        key: Villain.None,
        label: 'Shy',
      }, {
        key: Villain.Multiple,
        label: 'D.W.'
      }
    ];
  },
  [Question.FavouriteOpeningScene]: () => {
    return [
      {
        key: 1,
        label: 'HTTYD1'
      },{
        key: 2,
        label: 'HTTYD2'
      },{
        key: 3,
        label: 'HTTYD: THW'
      },{
        key: 0,
        label: 'Shy'
      }
    ]
  },
  [Question.MovieWatchingOrder]: () => {
    return [
      {
        key: MovieOrder.r123,
        label: '1 → 2 → 3'
      }, {
        key: MovieOrder.r132,
        label: '1 → 3 → 2'
      }, {
        key: MovieOrder.r213,
        label: '2 → 1 → 3'
      }, {
        key: MovieOrder.r231,
        label: '2 → 3 → 1'
      }, {
        key: MovieOrder.r312,
        label: '3 → 1 → 2'
      }, {
        key: MovieOrder.r321,
        label: '3 → 2 → 1'
      }, {
        key: MovieOrder.Shy,
        label: 'Shy'
      }
    ];
  },
  [Question.MovieRanking]: () => {
    return [
      {
        key: MovieOrder.r123,
        label: '1 > 2 > 3'
      }, {
        key: MovieOrder.r132,
        label: '1 > 3 > 2'
      }, {
        key: MovieOrder.r213,
        label: '2 > 1 > 3'
      }, {
        key: MovieOrder.r231,
        label: '2 > 3 > 1'
      }, {
        key: MovieOrder.r312,
        label: '3 > 1 > 2'
      }, {
        key: MovieOrder.r321,
        label: '3 > 2 > 1'
      }, {
        key: MovieOrder.Shy,
        label: 'Shy'
      }
    ];
  },
  [Question.HTTYDAppealReasons]: () => {
    return [
      {
        key: HTTYDAppealReason.AnimationInterest,
        label: 'Interested in animation'
      },{
        key: HTTYDAppealReason.DragonsCool,
        label: 'Dragons are cool'
      },{
        key: HTTYDAppealReason.FantasyFan,
        label: 'Like fantasy',
      },{
        key: HTTYDAppealReason.FascinatingWorld,
        label: 'Found world fascinating'
      },{
        key: HTTYDAppealReason.ObjectiveQuality,
        label: 'At least a part of the fracnhise is objectively good'
      }, {
        key: HTTYDAppealReason.Relatable,
        label: 'Found the story relatable'
      }, {
        key: HTTYDAppealReason.CharacterShipping,
        label: 'Character shipping'
      }, {
        key: HTTYDAppealReason.Other,
        label: 'Other'
      }, {
        key: HTTYDAppealReason.NoAnswer,
        label: 'Shy'
      }, {
        key: HTTYDAppealReason.TooManyAnswers,
        label: 'They tried'
      }
    ];
  },
  [Question.MostImportantAspects]: () => {
    return [
      {
        key: MovieAspect.Characters,
        label: 'Characters'
      }, {
        key: MovieAspect.Emotion,
        label: 'Emotion'
      }, {
        key: MovieAspect.Plot,
        label: 'Plot'
      }, {
        key: MovieAspect.Soundtrack,
        label: 'Soundtrack'
      }, {
        key: MovieAspect.Theme,
        label: 'Theme'
      }, {
        key: MovieAspect.Visuals,
        label: 'Visuals'
      }, {
        key: MovieAspect.NoAnswer,
        label: 'Shy'
      }, {
        key: MovieAspect.TooManyAnswers,
        label: 'They tried'
      }
    ];
  },
  [Question.IsFurry]: () => {
    return [
      {
        key: FurryCommunity.None,
        label: 'None',
      },{
        key: FurryCommunity.Furry,
        label: 'Furry'
      },{
        key: FurryCommunity.Scalie,
        label: 'Scalie'
      },{
        key: FurryCommunity.Other,
        label: 'Other'
      },{
        key: FurryCommunity.AnswerShy,
        label: 'Shy'
      }
    ];
  }
  
}

export default graphColumnDefinitions;