'use server'
import OpenAI from 'openai'
import type { Query } from './types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
