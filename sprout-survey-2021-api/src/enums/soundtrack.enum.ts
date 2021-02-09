export enum HTTYDSoundtrack {
  ThisIsBerk,
  DragonBattle,
  DownedDragon,
  DragonTraining,
  Wounded,
  DragonBook,
  FocusHiccup,
  ForbiddenFriendship,
  NewTail,
  SeeYouTomorrow,
  TestDrive,
  NotSoFireproof,
  ThisTimeForSure,
  AstridGoesForASpin,
  RomanticFlight,
  DragonsDen,
  Cove,
  KillRing,
  ReadyTheShips,
  BattlingGreenDeath,
  CounterAttack,
  WheresHiccup,
  ComingBackAround,
  SticksStones,
  VikingsHaveTHeirTea,
  None,
  Multiple
}

export enum HTTYD2Soundtrack {
  DragonRacing,
  TogetherMapTheWorld,
  HiccupTheChief,
  ToothlessLost,
  ShouldIKnowYou,
  ValkaDragonSanctuary,
  LosingMom,
  MeetDrago,
  StoickFindsBeauty,
  FlyingWithMother,
  DancingAndTheDreaming,
  BattleBewilderbeast,
  HiccupConfrontsDrago,
  StoickSavesHiccup,
  StoicksShip,
  AlphaComesToBerk,
  TwoNewAlphas,
  ToothlessFound,
  WhereNoOneGoes,
  IntoAFantasy,
  None,
  Multiple
}

export enum THWSoundtrack {
  RaidersReturn,
  DinnerTalk,
  LegendHasIt,
  ToothlessSmitten,
  WorstPepTalk,
  NightFuryKiller,
  Exodus,
  ThirdDate,
  NewNewTail,
  FuriesInLove,
  KillerDragons,
  GreatWaterfall,
  THW,
  ArmadaBattle,
  AsLongAsHesSafe,
  OnceThereWereDragons,
  TogetherFromAfar,
  THWSuite,
  Multiple,
  None,
  AffirmativeNone
}

export function ost2enum(movie: number, song: string) {
  if (movie === 1) {
    switch (song.trim()) {
      case 'This Is Berk':
        return HTTYDSoundtrack.ThisIsBerk;
      case 'Dragon Battle':
        return HTTYDSoundtrack.DragonBattle;
      case 'The Downed Dragon':
        return HTTYDSoundtrack.DownedDragon;
      case 'Dragon Training':
        return HTTYDSoundtrack.DragonTraining;
      case 'Wounded':
        return HTTYDSoundtrack.Wounded;
      case 'The Dragon Book':
        return HTTYDSoundtrack.DragonBook;
      case 'Focus, Hiccup!':
        return HTTYDSoundtrack.FocusHiccup;
      case 'Forbidden Friendship':
        return HTTYDSoundtrack.ForbiddenFriendship;
      case 'New Tail':
        return HTTYDSoundtrack.NewTail;
      case 'See You Tomorrow':
        return HTTYDSoundtrack.SeeYouTomorrow;
      case 'Test Drive':
        return HTTYDSoundtrack.TestDrive;
      case 'Not So Fireproof':
        return HTTYDSoundtrack.NotSoFireproof;
      case 'This Time For Sure':
        return HTTYDSoundtrack.ThisTimeForSure;
      case 'Astrid Goes For A Spin':
        return HTTYDSoundtrack.AstridGoesForASpin;
      case 'Romantic Flight':
        return HTTYDSoundtrack.RomanticFlight;
      case 'Dragon\'s Den':
        return HTTYDSoundtrack.DragonsDen;
      case 'The Cove':
        return HTTYDSoundtrack.Cove;
      case 'The Kill Ring':
        return HTTYDSoundtrack.KillRing;
      case 'Ready The Ships':
        return HTTYDSoundtrack.ReadyTheShips;
      case 'Battling The Green Death':
        return HTTYDSoundtrack.BattlingGreenDeath;
      case 'Counter Attack':
        return HTTYDSoundtrack.CounterAttack;
      case 'Where\'s Hiccup?':
        return HTTYDSoundtrack.WheresHiccup;
      case 'Coming Back Around':
        return HTTYDSoundtrack.ComingBackAround;
      case 'Sticks and Stones (From the Credits)':
      case 'Sticks & Stones':
        return HTTYDSoundtrack.SticksStones;
      case 'The Vikings Have Their Tea':
      case 'Vikings Have Their Tea':
        return HTTYDSoundtrack.VikingsHaveTHeirTea;
      case 'none':
      case 'None':
      default:
        return HTTYDSoundtrack.None;
    }
  } else if (movie === 2) {
    switch (song.trim()) {
      case 'Dragon Racing':
        return HTTYD2Soundtrack.DragonRacing;
      case 'Together We Map the World':
      case 'Together, We Map the World':
        return HTTYD2Soundtrack.TogetherMapTheWorld;
      case 'Hiccup, the Cheif / Drago\'s Coming':
        return HTTYD2Soundtrack.HiccupTheChief;
      case 'Toothless Lost':
        return HTTYD2Soundtrack.ToothlessLost;
      case 'Should I Know You?':
        return HTTYD2Soundtrack.ShouldIKnowYou;
      case 'Valka\'s Dragon Sanctuary':
        return HTTYD2Soundtrack.ValkaDragonSanctuary;
      case 'Losing Mom / Meet the Good Alpha':
        return HTTYD2Soundtrack.LosingMom;
      case 'Meet Drago':
        return HTTYD2Soundtrack.MeetDrago;
      case 'Stoick Finds Beauty':
        return HTTYD2Soundtrack.StoickFindsBeauty;
      case 'Flying With Mother':
        return HTTYD2Soundtrack.FlyingWithMother;
      case 'For the Dancing and the Dreaming':
        return HTTYD2Soundtrack.DancingAndTheDreaming;
      case 'Battle of the Bewilderbeast':
        return HTTYD2Soundtrack.BattleBewilderbeast;
      case 'Hiccup Confronts Drago':
        return HTTYD2Soundtrack.HiccupConfrontsDrago;
      case 'Stoick Saves Hiccup':
        return HTTYD2Soundtrack.StoickSavesHiccup;
      case 'Stoick\'s Ship':
        return HTTYD2Soundtrack.StoicksShip;
      case 'Alpha Comes to Berk':
        return HTTYD2Soundtrack.AlphaComesToBerk;
      case 'Toothless Found':
        return HTTYD2Soundtrack.ToothlessFound;
      case 'Where No One Goes':
      case 'Where No One Goes (From the Credits)':
        return HTTYD2Soundtrack.WhereNoOneGoes;
      case 'Into a Fantasy':
      case 'Into a Fantasy (From "How to Train Your Dragon 2")':
        return HTTYD2Soundtrack.IntoAFantasy;
      default:
        return HTTYD2Soundtrack.None;
    }
  } else {
    switch (song.trim()) {
      case 'Raiders Return to a Busy, Busy Berk':
        return THWSoundtrack.RaidersReturn;
      case 'Dinner Talk / Grimmel\'s Introduction':
        return THWSoundtrack.DinnerTalk;
      case 'Legend Has It / Cliffside Playtime':
        return THWSoundtrack.LegendHasIt;
      case 'Toothless: Smitten':
        return THWSoundtrack.ToothlessSmitten;
      case 'Worst Pep Talk Ever':
        return THWSoundtrack.WorstPepTalk;
      case 'Night Fury Killer':
        return THWSoundtrack.NightFuryKiller;
      case 'Exodus!':
      case 'Exodus':
        return THWSoundtrack.Exodus;
      case 'Third Date':
        return THWSoundtrack.ThirdDate;
      case 'New \'New Tail\'':
        return THWSoundtrack.NewNewTail;
      case 'Furies in Love':
        return THWSoundtrack.FuriesInLove;
      case 'Killer Dragons':
        return THWSoundtrack.KillerDragons;
      case 'With Love Comes a Great Waterfall':
        return THWSoundtrack.GreatWaterfall;
      case 'The Hidden World':
        return THWSoundtrack.THW;
      case 'Armada Battle':
        return THWSoundtrack.ArmadaBattle;
      case 'As Long As He\'s Safe':
        return THWSoundtrack.AsLongAsHesSafe;
      case 'Once There Were Dragons':
        return THWSoundtrack.OnceThereWereDragons;
      case 'Together From Afar':
      case 'Together from Afar':
        return THWSoundtrack.TogetherFromAfar;
      case 'The Hidden World Suite [Bonus Track]':
        return THWSoundtrack.THWSuite;
      case 'None':
        return THWSoundtrack.AffirmativeNone;
      default:
        return THWSoundtrack.None;
    }
  }
}