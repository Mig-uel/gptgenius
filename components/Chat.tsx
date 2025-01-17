'use client'

import { generateChatResponse } from '@/utils/actions'
import type { Query } from '@/utils/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from './Spinner'

export default function Chat() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<Query[]>([])

  // react-query mutation
  const { isPending, mutate } = useMutation({
    mutationFn: (query: Query) => generateChatResponse([...messages, query]),

    onSuccess(data) {
      if (typeof data !== 'object') {
        toast.error(`${data.substring(0, data.length - data.length / 2)}...`)
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
