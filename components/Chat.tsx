'use client'

import {
  fetchUserTokensById,
  generateChatResponse,
  subtractTokens,
} from '@/utils/actions'
import type { Query } from '@/utils/types'
import { useAuth } from '@clerk/nextjs'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

export default function Chat() {
  const { userId } = useAuth()
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Query[]>([])

  // react-query mutation
  const { isPending, mutate } = useMutation({
    mutationFn: async (query: Query) => {
      const tokenBalance = await fetchUserTokensById(userId!)

      if (tokenBalance === undefined || tokenBalance === null) {
        toast.error('Something went wrong, please try again...')
        return
      }

      if (tokenBalance < 100) {
        toast.error('Token balance is too low...')
        return
      }

      const response = await generateChatResponse([...messages, query])

      if (
        typeof response === 'string' ||
        !response.message ||
        !response.tokens
      ) {
        toast.error('Something went wrong, please try again later...')
        return
      }

      setMessages((prev) => [...prev, response.message as Query])

      const updatedTokens = await subtractTokens(response.tokens, userId!)

      toast.success(`${updatedTokens} tokens remaining...`)
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
