export type Query = {
  role: 'assistant' | 'user'
  content: string
}

export type Tour = {
  city: string
  country: string
}

export type { Tour as TourData } from '@prisma/client'
