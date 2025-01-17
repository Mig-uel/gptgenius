'use client'

import { generateChatResponse } from '@/utils/actions'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function Chat() {
  const [text, setText] = useState('')
  // const [messages, setMessage] = useState([])

  // react-query mutation
  const { mutate } = useMutation({
    mutationFn: (message: string) => generateChatResponse(message),
  })

  // handle text submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(text)
  }

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h2 className='text-5xl'>Messages</h2>
      </div>

      <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Message GPTGenius'
            className='input input-bordered join-item w-full'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <button className='btn btn-primary join-item uppercase' type='submit'>
            Ask Question
          </button>
        </div>
      </form>
    </div>
  )
}
