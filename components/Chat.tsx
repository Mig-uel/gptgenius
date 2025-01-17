'use client'

import { generateChatResponse } from '@/utils/actions'
import type { Query } from '@/utils/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from './Spinner'
import { errorMessage } from '@/utils/helpers'

export default function Chat() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Query[]>([])

  // react-query mutation
  const { isPending, mutate } = useMutation({
    mutationFn: (query: Query) => generateChatResponse([...messages, query]),

    onSuccess(data) {
      if (typeof data !== 'object') {
        toast.error(errorMessage(data))
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          content: data.content!,
          role: data.role,
        },
      ])
    },
  })

  // handle text submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!text) return

    const query: Query = {
      role: 'user',
      content: text,
    }

    mutate(query)

    setMessages((prev) => [...prev, query])
    setText('')
  }

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h2 className='text-4xl font-bold'>Chat</h2>

        {messages.map((message, index) => {
          const icon = message.role === 'assistant' ? '🤖' : '🧑'
          const bg =
            message.role === 'assistant' ? 'bg-base-100' : 'bg-base-200'

          return (
            <div
              key={index}
              className={`${bg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className='mr-4'>{icon}</span>
              <p className='max-w-3xl'>{message.content}</p>
            </div>
          )
        })}

        {isPending ? <Spinner className='mt-8' /> : null}
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

          <button
            disabled={isPending}
            className='btn btn-primary join-item uppercase'
            type='submit'
          >
            {isPending ? <Spinner /> : 'Ask Question'}
          </button>
        </div>
      </form>
    </div>
  )
}
