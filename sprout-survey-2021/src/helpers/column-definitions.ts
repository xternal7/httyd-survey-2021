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
  }
}

export default graphColumnDefinitions;