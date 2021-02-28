import { Question } from '@/enums/question.enum';

export type GraphFilterConstraint = {
  question: Question,
  operand: 'eq' | 'lseq' | 'greq' | 'in',
  value: any | any[]
}

export type GraphFilter = {
  groupName: string,
  groupColor?: string,
  columnColorFrom?: string,
  columnColorTo?: string,
  columnColors?: string[],
  constraints: GraphFilterConstraint[]
};

export type GraphColumnData = {
  label: string,
  columnValues: number[] | string[],
  columnValuesPercent: number[]
}