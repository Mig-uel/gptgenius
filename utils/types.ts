export type Query = {
  role: 'assistant' | 'user'
  content: string
}

export type Tour = {
  city: string
  country: string
}

export type TourData = {
  city: string
  country: string
  title: string
  description: string
  stops: string[]
}
