'use server'
import OpenAI from 'openai'
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
    })

    return response.choices[0].message
  } catch (error) {
    if (error instanceof Error) console.log(error.message)

    return (error as Error).message
  }
}

/**
 * @description Get existing tours
 * @method GET
 */
export const getExistingTour = async (tour: Tour) => {
  return null
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
    "description": "description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
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

    if (!tourData.tour) return null

    return tourData.tour as TourData
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)

      return error.message
    }
  }
}

/**
 * @description Get existing tours
 * @method POST
 */
export const createNewTour = async (tour: Tour) => {
  return null
}
