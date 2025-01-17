'use server'
import OpenAI from 'openai'
import type { Query, Tour } from './types'

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
export const generateTourResponse = async (tour: Tour) => {
  return null
}

/**
 * @description Get existing tours
 * @method POST
 */
export const createNewTour = async (tour: Tour) => {
  return null
}