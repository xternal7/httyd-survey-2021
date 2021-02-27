import axios from 'axios';
import neatCsv from 'neat-csv';
import { Answer } from '../enums/answer.enum';
import { Aspect } from '../enums/aspect-enum';
import { Character } from '../enums/character.enum';
import { Community } from '../enums/community.enum';
import { Continent } from '../enums/continent.enum';
import { Draconid, draconid2enum } from '../enums/draconid.enum';
import { FurryCommunity } from '../enums/furry-community.enum';
import { Gender } from '../enums/gender.enum';
import { HTTYDAppealReason } from '../enums/httyd-appeal-reason.enum';
import { HTTYDShort } from '../enums/httyd-short.enum';
import { MovieOrder } from '../enums/movie-order.enum';
import { Question } from '../enums/question.enum';
import { ost2enum } from '../enums/soundtrack.enum';
import { THWOpinionChange } from '../enums/thw-opinion-change.enum';
import { THWTheme } from '../enums/thw-theme.enum';
import { Villain, villain2enum } from '../enums/villain.enum';
import headers from '../stuff/csv-headers';
import fs from 'fs';

export interface ColumnIntegrityData {
  col: string,
  rowOffset?: number,
  isMatchingAtOffset?: boolean,
  leftMatches?: number,
  rightMatches?: number,
};

export interface LineIntegrityData {
  line: number,
  columns?: ColumnIntegrityData[],
  lineInvalid?: boolean,
}

const ratingQuestions = [
  Question.HTTYD1Rating,
  Question.HTTYD1ScoreRating,
  Question.HTTYD1PlotRating,
  Question.HTTYD1CharacterRating,
  Question.HTTYD1EmotionRating,
  Question.HTTYD1VisualsRating,
  Question.HTTYD1ThemeRating,
  Question.HTTYD2Rating,
  Question.HTTYD2ScoreRating,
  Question.HTTYD2PlotRating,
  Question.HTTYD2CharacterRating,
  Question.HTTYD2EmotionRating,
  Question.HTTYD2VisualsRating,
  Question.HTTYD2ThemeRating,
  Question.HTTYD3Rating,
  Question.HTTYD3ScoreRating,
  Question.HTTYD3PlotRating,
  Question.HTTYD3CharacterRating,
  Question.HTTYD3EmotionRating,
  Question.HTTYD3VisualsRating,
  Question.HTTYD3ThemeRating,
  Question.ThotfuryCharacterRating,
  Question.ThotfuryDesignRating,
  Question.THWFittingEnd,
  Question.THWPlotCoherency,
  Question.THWThemeApproval,
  Question.GONFRating,
  Question.BoneknapperRating,
  Question.BookOfDragonsRating,
  Question.DawnOfDragonRidersRating,
  Question.HomecomingRating,
  Question.RidersOfBerkRating,
  Question.RTTERating,
  Question.SideCharactersLikabilityAgreement,
  Question.YouCanEnjoyGarbageAgreement,
  Question.FavouriteDraconidReasonScore,      // not actually question
  Question.FavouriteVillainReasonScore,
]

export class GdocsScrapper {

  sheetUrl: string;
  dataCache: any;
  test = "wow";

  /**
   * We will re-fetch gsheet data 
   */
  maxAge: number;
  private lastCacheRefresh: any;


  headers = headers;

  /**
   * Initializes the GdocsScrapper
   * @param sheetUrl URL to gsheet we want to get
   * @param maxAge max age in milliseconds (1h default)
   */
  constructor(sheetUrl: string, maxAge: number = 3600000) {
    this.sheetUrl = sheetUrl;
    this.maxAge = maxAge;
  }

  getData = async (forceRefresh?: boolean): Promise<any> => {

    if (
      !this.lastCacheRefresh
        || Date.now() - this.lastCacheRefresh > this.maxAge 
        || forceRefresh
    ) {
      // prevent multiple requests that arrive in quick succession from
      // triggering the parsing
      this.lastCacheRefresh = Date.now();

      // if force refresh, we wait for loadData to finish,
      // otherwise we return the cached value
      if (forceRefresh || !this.lastCacheRefresh) {
        await this.loadData();
      } else {
        this.loadData();
      }

      return this.dataCache;
    }

    return this.dataCache;
  }

  private async gsheet2json(headers: Question[] | string[] = this.headers) {
    const csvString = (await axios.get(this.sheetUrl)).data;
    return await neatCsv(csvString, {headers});
  }

  private async loadData() {
    console.log("trying to load data.")
    const csvString = (await axios.get(this.sheetUrl)).data;
    let data = await neatCsv(csvString, {headers: this.headers});
    // console.log(data);

    // process data, condense stuff to enums where possible
    const dataOut = this.processData(data);

    fs.writeFile('survey-data.js', `export default ${JSON.stringify(dataOut)}`, (error)=>{
      if (error) {
        return console.error('Failed to save file:', error);
      }
      console.log('File saved!')
    });
  }


  //#region data-processing
  processData(data: any) {
    const processedData = [];
    let deletedCount = 0;

    for (const row of data) {

      // skip over things we marked as a duplicate
      if (row[Question.IsDeleted]) {
        console.warn('Skipping row as it\'s been marked a duplicate. Row:\n', row);
        deletedCount++;
        continue;
      }

      let rowOut: any = {};

      // these are guaranteed to be a number or empty
      for (const q of ratingQuestions) {
        if (row[q])
          rowOut[q] = +row[q];
        else {
          rowOut[q] = undefined;
        }
      }

      // age
      if (!row[Question.Age]) {
        rowOut[Question.Age] = undefined;
      } else if (isNaN(row[Question.Age]) || row[Question.Age] > 100) {
        rowOut[Question.Age] = -1;                                      // negative values for invalid ages
      } else {
        rowOut[Question.Age] = +row[Question.Age]
      }

      // gender
      if (row[Question.Gender].startsWith('Funny Answer')) {
        rowOut[Question.Gender] = Gender.Apache;
      } else if (row[Question.Gender].startsWith('Snowflake')) {
        rowOut[Question.Gender] = Gender.Snowflake;
      } else if (row[Question.Gender] === 'Male') {
        rowOut[Question.Gender] = Gender.Male;
      } else if (row[Question.Gender] === 'Female') {
        rowOut[Question.Gender] = Gender.Female;
      } else if (!(row[Question.Gender].trim()) || row[Question.Gender] === 'Prefer Not To Answer') {
        rowOut[Question.Gender] = Gender.Shy;
      } else {
        rowOut[Question.Gender] = Gender.Other;
      }

      // community
      const community = row[Question.Community].split(';');
      const communityOut: any = {
        value: this.communtiy2enum(community[0])
      };
      if (community.length > 1) {
        communityOut['dwFlag'] = true;
      }
      rowOut[Question.Community] = communityOut;

      // location
      rowOut[Question.Location] = this.continent2enum(row[Question.Location]);

      // fandom time
      if (row[Question.FandomTime].startsWith('<')) {
        rowOut[Question.FandomTime] = 0;
      } else if (row[Question.FandomTime].startsWith('10+')) {
        rowOut[Question.FandomTime] = 10;
      } else if (row[Question.FandomTime].startsWith('P')){
        rowOut[Question.FandomTime] = undefined;
      } else if (row[Question.FandomTime].trim()){
        rowOut[Question.FandomTime] = + (row[Question.FandomTime].split(' Y')[0]);
      } else {
        rowOut[Question.FandomTime] = undefined;
      }

      // previous survey
      switch (row[Question.SurveyParticipation2020]) {
        case 'Yes':
          rowOut[Question.SurveyParticipation2020] = Answer.Yes;
          break;
        case 'No':
          rowOut[Question.SurveyParticipation2020] = Answer.No;
          break;
        default:
          rowOut[Question.SurveyParticipation2020] = Answer.Neutral;
      }

      // is furry?
      const isFurry = row[Question.IsFurry];

      rowOut[Question.IsFurry] = [];
      if (isFurry.indexOf('Furry')) {
        rowOut[Question.IsFurry].push(FurryCommunity.Furry);
      }
      if (isFurry.indexOf('Scaly')) {
        rowOut[Question.IsFurry].push(FurryCommunity.Scalie);
      }
      if (isFurry.indexOf('Other Related')) {
        rowOut[Question.IsFurry].push(FurryCommunity.Other);
      }
      if (isFurry.indexOf('Prefer Not To Answer')) {
        rowOut[Question.IsFurry].push(FurryCommunity.AnswerShy);
      }
      if (isFurry.indexOf('I do not identify')) {
        rowOut[Question.IsFurry].push(FurryCommunity.None);
      }
      if (isFurry.trim().length === 0) {
        rowOut[Question.IsFurry].push(FurryCommunity.AnswerShy);
      }

      // count people who provided usernames, but omit the actual username
      rowOut[Question.UsernameProvided] = !!row[Question.UsernameProvided];

      // favourite characters go
      const httyd1fav = row[Question.HTTYD1FavouriteCharacter].split('; ');
      const httyd1worst = row[Question.HTTYD1WorstCharacter].split('; ');
      const httyd2fav = row[Question.HTTYD2FavouriteCharacter].split('; ');
      const httyd2worst = row[Question.HTTYD2WorstCharacter].split('; ');
      const httyd3fav = row[Question.HTTYD3FavouriteCharacter].split('; ');
      const httyd3worst = row[Question.HTTYD3WorstCharacter].split('; ');

      rowOut[Question.HTTYD1FavouriteCharacter] = {value: this.character2enum(httyd1fav[0]), dwFlag: httyd1fav[1] && httyd1fav[1].indexOf('This Sign Can\'t Stop Me') !== -1};
      rowOut[Question.HTTYD2FavouriteCharacter] = {value: this.character2enum(httyd2fav[0]), dwFlag: httyd2fav[1] && httyd2fav[1].indexOf('This Sign Can\'t Stop Me') !== -1};
      rowOut[Question.HTTYD3FavouriteCharacter] = {value: this.character2enum(httyd3fav[0]), dwFlag: httyd3fav[1] && httyd3fav[1].indexOf('This Sign Can\'t Stop Me') !== -1};

      rowOut[Question.HTTYD1WorstCharacter] = {value: this.character2enum(httyd1worst[0]), dwFlag: httyd1worst[1] && httyd1worst[1].indexOf('This Sign Can\'t Stop Me') !== -1};
      rowOut[Question.HTTYD2WorstCharacter] = {value: this.character2enum(httyd2worst[0]), dwFlag: httyd2worst[1] && httyd2worst[1].indexOf('This Sign Can\'t Stop Me') !== -1};
      rowOut[Question.HTTYD3WorstCharacter] = {value: this.character2enum(httyd3worst[0]), dwFlag: httyd3worst[1] && httyd3worst[1].indexOf('This Sign Can\'t Stop Me') !== -1};

      // favourite songs
      const httyd1ost = row[Question.HTTYD1FavouriteSoundtrack].split('; ');
      const httyd2ost = row[Question.HTTYD2FavouriteSoundtrack].split('; ');
      const httyd3ost = row[Question.HTTYD3FavouriteSoundtrack].split('; ');

      rowOut[Question.HTTYD1FavouriteSoundtrack] = {value: ost2enum(1, httyd1ost[0]), dwFlag: httyd1ost[1] && httyd1ost[1].indexOf('This Sign Can\'t Stop Me') !== -1};
      rowOut[Question.HTTYD2FavouriteSoundtrack] = {value: ost2enum(2, httyd2ost[0]), dwFlag: httyd2ost[1] && httyd2ost[1].indexOf('This Sign Can\'t Stop Me') !== -1};
      rowOut[Question.HTTYD3FavouriteSoundtrack] = {value: ost2enum(3, httyd3ost[0]), dwFlag: httyd3ost[1] && httyd3ost[1].indexOf('This Sign Can\'t Stop Me') !== -1};

      // bonus questions for 2 and thw
      const valkaVillain = row[Question.HTTYD2ValkaVillain];
      if (valkaVillain.startsWith('Yes')) {
        rowOut[Question.HTTYD2ValkaVillain] = Answer.Yes;
      } else if (valkaVillain.startsWith('No')) {
        rowOut[Question.HTTYD2ValkaVillain] = Answer.No;
      } else if (valkaVillain.startsWith('Neu')) {
        rowOut[Question.HTTYD2ValkaVillain] = Answer.Neutral;
      } else {
        rowOut[Question.HTTYD2ValkaVillain] = Answer.Unanswered;
      }

      const dragoRedemption = row[Question.HTTYD3DragoRedemptionArc];
      if (dragoRedemption.startsWith('Yes')) {
        rowOut[Question.HTTYD3DragoRedemptionArc] = Answer.Yes;
      } else if (dragoRedemption.startsWith('No')) {
        rowOut[Question.HTTYD3DragoRedemptionArc] = Answer.No;
      } else if (dragoRedemption.startsWith('Neu')) {
        rowOut[Question.HTTYD3DragoRedemptionArc] = Answer.Neutral;
      } else {
        rowOut[Question.HTTYD3DragoRedemptionArc] = Answer.Unanswered;
      }

      // favourite short
      const favShort = row[Question.FavouriteShort];
      if (favShort.startsWith('Gift')) {
        rowOut[Question.FavouriteShort] = HTTYDShort.GotNF;
      } else if (favShort.startsWith('Legend')) {
        rowOut[Question.FavouriteShort] = HTTYDShort.Boneknapper;
      } else if (favShort.startsWith('The Book')) {
        rowOut[Question.FavouriteShort] = HTTYDShort.BookOfDragons;
      } else if (favShort.startsWith('Dawn of')) {
        rowOut[Question.FavouriteShort] = HTTYDShort.DawnOfDragonRiders;
      } else if (favShort.startsWith('Ho')) {
        rowOut[Question.FavouriteShort] = HTTYDShort.Homecoming;
      } else {
        rowOut[Question.FavouriteShort] = HTTYDShort.NoAnswer;
      }

      // RTTE canon?
      const rtteCanon = row[Question.IsRTTECanon];
      if (rtteCanon.startsWith('Yes')) {
        rowOut[Question.IsRTTECanon] = Answer.Yes;
      } else if (rtteCanon.startsWith('No')) {
        rowOut[Question.IsRTTECanon] = Answer.No;
      } else if (rtteCanon.startsWith('Neu')) {
        rowOut[Question.IsRTTECanon] = Answer.Neutral;
      } else {
        rowOut[Question.IsRTTECanon] = Answer.Unanswered;
      }

      // THW themes
      const thwThemes = row[Question.THWStrongestThemes];
      rowOut[Question.THWStrongestThemes] = [];
      if (thwThemes.indexOf('Growing Up and Letting Go') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.GrowingUp);
      }
      if (thwThemes.indexOf('Putting Aside Idealism When Nessecary') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.PuttingAsideIdealism);
      }
      if (thwThemes.indexOf('Accepting That Friendships Sometimes End') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.AcceptingFriendshipsEnd);
      }
      if (thwThemes.indexOf('Negative Effects Humans Sometimes Have on Animals and/or the Environment') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.Moralfagging);
      }
      if (thwThemes.indexOf('Love and Loss') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.LoveLoss);
      }
      if (thwThemes.indexOf('_salt') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.SarcasticAnswer);
      }
      if (thwThemes.indexOf('_all-garbage') !== -1) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.AllGarbage);
      }
      if (thwThemes.indexOf('_other')) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.Other);
      }
      if (!thwThemes || thwThemes.trim().length === 0) {
        rowOut[Question.THWStrongestThemes].push(THWTheme.NoAnswer);
      }

      // best opening
      const favOpening = row[Question.FavouriteOpeningScene];
      if (favOpening === 'HTTYD 1') {
        rowOut[Question.FavouriteOpeningScene] = 1;
      } else if (favOpening === 'HTTYD 2') {
        rowOut[Question.FavouriteOpeningScene] = 1;
      } else if (favOpening === 'HTTYD: THW') {
        rowOut[Question.FavouriteOpeningScene] = 1;
      }

      // movie ranking
      switch (row[Question.MovieRanking]) {
        case '1 > 2 > 3':
          rowOut[Question.MovieRanking] = MovieOrder.r123;
          break;
        case '1 > 3 > 2':
          rowOut[Question.MovieRanking] = MovieOrder.r132;
          break;
        case '2 > 1 > 3':
          rowOut[Question.MovieRanking] = MovieOrder.r213;
          break;
        case '2 > 3 > 1':
        case '2> 3 > 1':
          rowOut[Question.MovieRanking] = MovieOrder.r231;
          break;
        case '3 > 1 > 2':
          rowOut[Question.MovieRanking] = MovieOrder.r312;
          break;
        case '3 > 2 > 1':
          rowOut[Question.MovieRanking] = MovieOrder.r321;
      }

      // movie watching order
      switch (row[Question.MovieWatchingOrder]) {
        case '1 -> 2 -> 3':
          rowOut[Question.MovieWatchingOrder] = MovieOrder.r123;
          break;
        case '1 -> 3 -> 2':
          rowOut[Question.MovieWatchingOrder] = MovieOrder.r132;
          break;
        case '2 -> 1 -> 3':
          rowOut[Question.MovieWatchingOrder] = MovieOrder.r213;
          break;
        case '2 -> 3 -> 1':
          rowOut[Question.MovieWatchingOrder] = MovieOrder.r231;
          break;
        case '3 -> 1 -> 2':
          rowOut[Question.MovieWatchingOrder] = MovieOrder.r312;
          break;
        case '3 -> 2 -> 1':
          rowOut[Question.MovieWatchingOrder] = MovieOrder.r321;
      }

      // thw opinion change
      const opinionChange = row[Question.THWOpinionChange];
      if (opinionChange.startsWith('No')) {
        rowOut[Question.THWOpinionChange] = THWOpinionChange.Unchanged;
      } else if (opinionChange.startsWith('Yes, I liked it l')) {
        rowOut[Question.THWOpinionChange] = THWOpinionChange.LikedItLess;
      } else if (opinionChange.startsWith('Yes, I liked it m')) {
        rowOut[Question.THWOpinionChange] = THWOpinionChange.LikedItMore;
      }

      // reasons for fandom
      const fandomReason = row[Question.HTTYDAppealReasons];
      rowOut[Question.HTTYDAppealReasons] = [];
      if (fandomReason.indexOf('I love fantasy, so of course I\'ll love HTTYD.') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.FantasyFan);
      }
      if (fandomReason.indexOf('I found the characters or events of the franchise personally relatable and/or touching.') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.Relatable);
      }
      if (fandomReason.indexOf('I have fond memories of the franchise from my early childhood, so of course I still love it now!') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.Nostalgia);
      }
      if (fandomReason.indexOf('The world of the franchise interests and fascinates me.') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.FascinatingWorld);
      }
      if (fandomReason.indexOf('I find the franchise (or at least parts of it) to be of outstanding objective quality.') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.ObjectiveQuality);
      }
      if (fandomReason.indexOf('I\'m interested in animation, film-making, or other fields related to the franchise.') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.AnimationInterest);
      }
      if (fandomReason.indexOf('Dragons are cool!') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.DragonsCool);
      }
      if (fandomReason.indexOf('Other') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.Other);
      }
      if (fandomReason.indexOf('_other') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.Other);
      }
      if (fandomReason.indexOf('I ship one or more sets of characters in the franchise.') !== -1) {
        rowOut[Question.HTTYDAppealReasons].push(HTTYDAppealReason.CharacterShipping);
      }

      // most important aspect
      const importantAspects = row[Question.MostImportantAspects];
      rowOut[Question.MostImportantAspects] = [];
      if (importantAspects.indexOf('Plot') !== -1) {
        rowOut[Question.MostImportantAspects].push(Aspect.Plot);
      }
      if (importantAspects.indexOf('Theme') !== -1) {
        rowOut[Question.MostImportantAspects].push(Aspect.Theme);
      }
      if (importantAspects.indexOf('Characters') !== -1) {
        rowOut[Question.MostImportantAspects].push(Aspect.Characters);
      }
      if (importantAspects.indexOf('Visual') !== -1) {
        rowOut[Question.MostImportantAspects].push(Aspect.Visuals);
      }
      if (importantAspects.indexOf('Soundtrack') !== -1) {
        rowOut[Question.MostImportantAspects].push(Aspect.Soundtrack);
      }
      if (importantAspects.indexOf('Emotion') !== -1) {
        rowOut[Question.MostImportantAspects].push(Aspect.Emotion);
      }

      // fav dragon
      const favDraconid = row[Question.FavouriteDraconid].split('; ');
      const fdReason = row[Question.FavouriteDraconidReason];
      const fdScore = row[Question.FavouriteDraconidReasonScore];
      const draconidType = draconid2enum(favDraconid[0]);

      let dwFlag;
      if (favDraconid[1] && favDraconid[1].indexOf('This Sign Can\'t Stop Me Because I Can\'t Read') !== -1) {
        dwFlag = true;
      }
      
      rowOut[Question.FavouriteDraconid] = {
        value: draconidType,
        originalValue: draconidType === Draconid.Other ? favDraconid[0].trim().toLowerCase() : undefined,
        reason: fdReason,
        reasonScore: this.parseNumber(fdScore),
        dwFlag
      };

      // fav villain
      const favVillain = row[Question.FavouriteVillain].split('; ');
      const fvReason = row[Question.FavouriteVillainReason];
      const fvScore = row[Question.FavouriteVillainReasonScore];
      const villainType = villain2enum(favVillain[0]);

      let dwFlag2;
      if (favVillain[1] && favVillain[1].indexOf('This Sign Can\'t Stop Me Because I Can\'t Read') !== -1) {
        dwFlag2 = true;
      }

      rowOut[Question.FavouriteVillain] = {
        value: villainType,
        originalValue: villainType === Villain.Other ? favVillain[0].trim().toLowerCase() : undefined,
        reason: fvReason,
        reasonScore: this.parseNumber(fvScore),
        dwFlag: dwFlag2
      }

      processedData.push(rowOut);
    }

    return {
      deletedCount: deletedCount,
      processedData: processedData
    };
  }

  parseNumber(num: any) {
    if (!num || isNaN(+num)) {
      return null;
    }
    return +num;
  }

  character2enum(character: string) {
    if (!character) {
      return Character.NoAnswer;
    }
    switch (character.trim()) {
      case 'Hiccup':
        return Character.Hiccup;
      case 'Toothless':
        return Character.Toothless;
      case 'Astrid':
        return Character.Astrid;
      case 'Stoick':
        return Character.Stoick;
      case 'Gobber':
        return Character.Gobber;
      case 'Ruffnut':
        return Character.Ruffnut;
      case 'Tuffnut':
        return Character.Tuffnut;
      case 'Twins':
        return Character.Twins;
      case 'Snotlout':
        return Character.Snotlout;
      case 'Fishlegs':
        return Character.Fishlegs;
      case 'Cloudjumper':
        return Character.Cloudjumper;
      case 'Drago':
        return Character.Drago;
      case 'Eret':
        return Character.Eret;
      case 'Light Fury':
        return Character.Thotfury;
      case 'Grimmel':
        return Character.Grimmel;
      default:
        return Character.Other;
    }
  }

  communtiy2enum(community: string) {
    if (!community) {
      return Community.Shy;
    }
    switch (community.trim()) {
      case '':
      case undefined:
      case null:
      case 'Prefer Not To Answer':
        return Community.Shy;
      case 'Discord':
        return Community.Discord;
      case 'The Subreddit':
        return Community.Reddit;
      case 'Youtube':
        return Community.Youtube;
      case 'Twitter':
        return Community.Twitter;
      case 'Instagram':
        return Community.Instagram;
      case 'Amino':
        return Community.Amino;
      case 'The HTTYD Wiki (FANDOM)':
        return Community.Fandom;
      case 'Tumblr':
        return Community.Tumblr;
      case 'Berk\'s Grapevine':
        return Community.Grapevine;
      default:
        return Community.Other;
    }
  }

  continent2enum(continent: string) {
    if (!continent) {
      return Continent.Shy;
    }
    switch (continent) {
      case 'Africa':
        return Continent.Africa;
      case 'Antarctica':
        return Continent.Antarctica;
      case 'Asia':
        return Continent.Asia;
      case 'Australia':
        return Continent.Australia;
      case 'Europe':
        return Continent.Europe;
      case 'North America':
        return Continent.NorthAmerica;
      case 'South America':
        return Continent.SouthAmerica;
      default: 
        return Continent.Shy;
    }
  }

  isRatingQuestion(col: string) {
    switch (col) {
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
        return true;
      default: 
        return false;
    }
  }


  //#endregion

  //#region integrity-check

  /**
   * Generates excel column names up to a given column.
   * It only handles up to two letter columns because thats
   * what we need and I don't wanan spend time coming up
   * with a general solution
   * @param lastColumn 
   */
  // generateExcelColums(lastColumn: string = 'Z'): string[] {
  //   const cols = [];

  //   // guard against users doing user things
  //   lastColumn = lastColumn.toUpperCase();

  //   let ccNumber = 10;        // we can do (number).toString(radix). 
  //   let currentColumn = 'A';  // 10.toString(11) returns 'a', which is neat.

  //   while (true) {
  //     cols.push(currentColumn);

  //     if (currentColumn === lastColumn) {
  //       break;
  //     }

  //     ccNumber++;
  //     if (ccNumber % 36 === 0) {
  //       ccNumber += 10;      // let's make that A again
  //     }
  //     currentColumn = ccNumber.toString(36).toUpperCase();
  //   }

  //   return cols;
  // }

  // async checkDataIntegrity(truthFile: string) {
  //   const columns = this.generateExcelColums('BR');
  //   const column2index: {[x: string]: number} = {};

  //   // make so we can convert columns to index and back again
  //   for (let i in columns) {
  //     column2index[columns[i]] = +i;
  //   }

  //   const integrityCheckResult: LineIntegrityData[] = [];

  //   const deletedLines: {
  //     line: number;
  //     columns: {
  //       col: string,
  //       content: string,
  //     }
  //   }[];

  //   const surveyData = await this.gsheet2json(columns);
  //   const truthData = await neatCsv(truthFile, {headers: columns});

  //   // it is assumed that compared to the truth file, gsheet results
  //   // will only have rows that are shifted up (due to deduping)

  //   for (const [row, value] of Object.entries(surveyData)) {

  //     if (+row >= truthData.length) {
  //       break;
  //     }

  //     // create new integrityCheckResult object for the new line
  //     let lineIntegrity: LineIntegrityData = {
  //       line: +row,
  //       columns: [] as ColumnIntegrityData[],
  //     };


  //     // first, we compare the time to get base offset 
  //     // if row remains -1, then there's something wrong with the data
  //     let baseOffset = -1;
  //     for (let i = +row; i < truthData.length; i++) {
  //       if (surveyData[+row]['A'] === truthData[i]['A']) {
  //         baseOffset = i - +row;
  //       }
  //     }

  //     if (baseOffset === -1) {
  //       lineIntegrity.lineInvalid = true;
  //       integrityCheckResult.push(lineIntegrity);
  //       continue;
  //     }

  //     // do a sliding window to establish which columns are offset. Five consecutive mismatches mean there's something wrong
  //     let offsetMismatchBroken = false;
  //     let truthTableRow = +row + baseOffset;

  //     for (const [colIndex, col] of Object.entries(columns)) {
  //       let leftMatches = 5;
  //       let rightMatches = 5;

  //       for (let i = Math.max(+colIndex - leftMatches, 0); i < +colIndex; i++) {
  //         if (surveyData[+row][columns[i]] !== truthData[truthTableRow][columns[i]]) {
  //           leftMatches--;
  //         }
  //       }
  //       for (let i = Math.min(+colIndex + rightMatches, columns.length - 1), i > +colIndex; i--) {
  //         if (surveyData[+row][columns[i]] !== truthData[truthTableRow][columns[i]]) {
  //           rightMatches--;
  //         }
  //       }
  //     }
      

  //     // first pass:
  //     // we do multiple passes for each row. First, we check for 
  //     // naive offsets — whether stuff from survey data matches
  //     // our truth table
  //     // for (const [col, columnValue] of Object.entries(value)) {

  //     //   // if values don't match, the value was changed
  //     //   if (surveyData[+row][col] === truthData[+row][col]) {
  //     //     lineIntegrity.columns.push({
  //     //       col: col,
  //     //       naiveOffset: 0
  //     //     });
  //     //   } else {
  //     //     // check column until a match is found. We do this for non-trusted columns as well,
  //     //     // since naiveOffset _can_ be used to confirm the offset we got in answers that 
  //     //     // are unique in a jiffy.
  //     //     let foundMatch = false;
  //     //     for (let i = +row; i < truthData.length; i++) {
  //     //       if (foundMatch = surveyData[+row][col] === truthData[i][col]) {
  //     //         lineIntegrity.columns.push({
  //     //           col: col,
  //     //           naiveOffset: i - +row
  //     //         });
  //     //         break;
  //     //       }
  //     //     }

  //     //     // if match was not found in the truth table, then our entry was edited.
  //     //     if (!foundMatch) {
  //     //       lineIntegrity.columns.push({
  //     //         col: col,
  //     //         wasEdited: true,
  //     //       });
  //     //     }
  //     //   }
  //     // }

  //     // second pass:
  //     // 
  //   }
  // }

  // private findRowOffset(truthData: any[], row: number, col: string, value: string) {

  // }

  // private checkOffsetValidity(truthData: any[], row: number, col: string, offset: number, expectedValue: string) {
  //   return truthData[row + offset][col] === expectedValue;
  // }
  //#endregion
}
