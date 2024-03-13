export interface Recipe {
  _id: string
  userId: UserId 
  title: string
  uploadData: string
  description: string
  ingredients: Ingredient[]
  minQta: number
  steps: Step[]
  type: string
  cookingTime: string
  mainPictureUrl: string
}

export interface Ingredient {
  _id: string
  name: string
  qta: string
  pictureUrl: string
}

export interface Step {
  _id: string
  title: string
  description: string
  pictureUrl: string
}

export interface UserId {
  _id: string
  username: string
  name: string
  profilePictureUrl: string
  surname: string
}