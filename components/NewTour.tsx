'use client'

import { Spinner } from '@/components'
import { generateTourResponse } from '@/utils/actions'
import type { Tour } from '@/utils/types'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import TourInfo from './TourInfo'

export default function NewTour() {
  const {
    data: tour,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: async (destination: Tour) => {
      const newTour = await generateTourResponse(destination)

      if (newTour) {
        return newTour
      }

      toast.error('No matching city found...')
      return null
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const destination = Object.fromEntries(formData) as Tour

    mutate(destination)
  }

  if (isPending) {
    return <Spinner />
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className='text-4xl font-bold'>New Tour</h2>

        <div className='join w-full mt-6'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />

          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />

          <button
            disabled={isPending}
            className='btn btn-primary join-item'
            type='submit'
          >
            {isPending ? <Spinner className='loading-lg' /> : 'Generate Tour'}
          </button>
        </div>
      </form>

      <div className='mt-16'>{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  )
}
