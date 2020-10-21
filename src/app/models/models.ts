export type Type = ['taxi', 'bus', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant']

export interface IPictures {
  description: string
  src: string
}

export interface IDestination {
  name: string
  description: string
  pictures?: IPictures[]
}

export interface IOffer {
  title: string
  price: number
}

export interface IOffersByType {
  type: string
  offers: IOffer[]
}

export interface IPoints {
  base_price: number
  date_from: string
  date_to: string
  destination: IDestination
  id: string
  is_favorite: boolean
  offers: IOffer[]
  type: Type
}

export interface IState {
  destinations: IDestination[]
  offers: IOffersByType[]
  points: any
}

export interface IRootState {
  root: IState
}
