export interface IRealisation {
  difficulty: number,
  preparationTime: number;
  bakingTime: number;
}

export interface IRecipe {
  _id: string,
  accountId: string,
  title: string
  category?: string,
  nbOfPeople?: number,
  realisation?: IRealisation,
  ingredients?: string[],
  instructions?: string[],
  privacyLevel?: number,
  creationDate?: Date,
  modificationDate?: Date
}