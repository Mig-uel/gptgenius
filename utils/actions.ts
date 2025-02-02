'use server'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'
import prisma from './db'
import type { Query, Tour, TourData } from './types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * @description Generate Chat Response
 */
export const generateChatResponse = async (chatMessages: Query[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant with a dialect from the 70s',
        },
        ...chatMessages,
      ],

      model: 'gpt-3.5-turbo',
      temperature: 0,
      max_tokens: 100,
    })

    return {
      message: response.choices[0].message,
      tokens: response.usage?.total_tokens,
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return (error as Error).message
  }
}

/**
 * @description Generate Tour Response
 */
export const generateTourResponse = async ({ city, country }: Tour) => {
  const query = `Find a ${city} in this ${country}.
If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["stop name", "stop name","stop name"]
  }
}
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'you are a tour guide',
        },
        {
          role: 'user',
          content: query,
        },
      ],

      model: 'gpt-3.5-turbo',
      temperature: 0,
    })

    const tourData = JSON.parse(response.choices[0].message.content!)

    if (!tourData.tour) throw new Error('Place not found...')

    return { tour: tourData.tour, tokens: response.usage?.total_tokens } as {
      tour: TourData
      tokens: number
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)

      return error.message
    }
  }
}

/**
 * @description Get existing tour
 * @method GET
 */
export const getExistingTour = async ({ city, country }: Tour) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  })
}

/**
 * @description Create New Tour
 * @method POST
 */
export const createNewTour = async ({
  city,
  country,
  description,
  stops,
  title,
}: TourData) => {
  return prisma.tour.create({
    data: {
      city,
      country,
      description,
      // @ts-expect-error fix prisma type later
      stops,
      title,
    },
  })
}

/**
 * @description Get Existing Tours
 * @method GET
 */
export const getAllTours = async (searchTerm?: string) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc',
      },
    })

    return tours
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: 'asc',
    },
  })

  return tours
}

/**
 * @description Get Tour
 */
export const getTour = async (id: string) => {
  return prisma.tour.findUnique({
    where: {
      id: id,
    },
  })
}

/**
 * @description Generate tour image
 */

export const generateTourImage = async ({ city, country }: Tour) => {
  try {
    const tourImage = await openai.images.generate({
      n: 1,
      prompt: `panoramic view of ${city} ${country}`,
      size: '512x512',
    })

    return tourImage?.data[0]?.url
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)

      return error.message
    }
  }
}

/** Fetch User Tokens */
export const fetchUserTokensById = async (clerkId: string) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  })

  return result?.tokens
}

/** Generate User Tokens */
export const generateUserTokensForId = async (clerkId: string) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  })

  return result?.tokens
}

/** Fetch or Generate User Tokens */
export const fetchOrGenerateUserTokensById = async (clerkId: string) => {
  const userTokens = await fetchUserTokensById(clerkId)

  if (userTokens) {
    return userTokens
  }

  return await generateUserTokensForId(clerkId)
}

/** Subtract User Tokens */
export const subtractTokens = async (tokens: number, clerkId: string) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  })

  revalidatePath('/profile')

  return result.tokens
}
