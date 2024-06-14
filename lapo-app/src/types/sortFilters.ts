export interface Filters {
  sex: string[];
  size: string[];
  age: string[];
  sterilized: boolean,
  vaccinated: boolean,
};

export type FilterType = keyof Filters;

export const sizeFilter = {
  small: 'Маленький (до 30 см)',
  average: 'Середній (30-50 см)',
  big: 'Великий (від 60 см)',
}

export const sexFilter = {
  male: 'Хлопчик',
  female: 'Дівчинка',
}

export const ageFilter = {
  young: 'До 1 року',
  teenager: '1-5 років',
  old: '5+ років',
}