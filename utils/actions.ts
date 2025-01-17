'use server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateChatResponse = async (chatMessage: string) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant with a dialect from the 70s',
      },
      {
        role: 'user',
        content: chatMessage,
      },
    ],

    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  console.log(response.choices[0])
  console.log(response)

  return 'awesome'
}
