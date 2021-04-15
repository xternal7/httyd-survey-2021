import { Community } from '@/enums/community.enum';
import { Continent } from '@/enums/continent.enum';
import { Gender } from '@/enums/gender.enum';
import { Question } from '@/enums/question.enum';

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
        key: 'dw',
        label: 'multi'
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
  }
}

export default graphColumnDefinitions;