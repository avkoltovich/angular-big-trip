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

export interface IPoint {
  basePrice: number
  dateFrom: string
  dateTo: string
  destination: IDestination
  id: string
  isFavorite: boolean
  offers: IOffer[]
  type: Type
}

export interface IPointsGroupedByDays {
  daysPassed: number
  date: string
  points: IPoint[]
}

export interface IPointRaw {
  base_price: number
  date_from: string
  date_to: string
  destination: IDestination
  id: string
  is_favorite: boolean
  offers: IOffer[]
  type: Type
}

export enum Table {
  table = 'table',
  stats = 'stats'
}

export enum Filter {
  everything = 'everything',
  future = 'future',
  past = 'past'
}

export enum Sorting {
  event = 'event',
  time = 'time',
  price = 'price'
}

export interface IState {
  destinations: IDestination[]
  offers: IOffersByType[]
  points: any
  currentTable: Table
  currentFilter: Filter
  currentSorting: Sorting
}

export interface IRootState {
  root: IState
}
