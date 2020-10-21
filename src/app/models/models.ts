export interface IPictures {
  description: string
  src: string
}

export interface IDestinations {
  name: string
  description: string
  pictures?: IPictures[]
}

export interface IState {
  destinations: IDestinations
  offers: any
  points: any
}
