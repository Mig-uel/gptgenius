'use client'

import { Spinner } from '@/components'
import {
  createNewTour,
  generateTourResponse,
  getExistingTour,
} from '@/utils/actions'
import { errorMessage } from '@/utils/helpers'
import type { Tour } from '@/utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import TourInfo from './TourInfo'

export default function NewTour() {
  const queryClient = useQueryClient()

  const {
    data: tour,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: async (destination: Tour) => {
      // find existing tour
      const existingTour = await getExistingTour(destination)
      if (existingTour) return existingTour

      // generate new tour
      const newTour = await generateTourResponse(destination)

      // if newTour response is an successful
      if (typeof newTour === 'object' && newTour) {
        // create new tour
        await createNewTour(newTour)

        // invalidate tours
        queryClient.invalidateQueries({
          queryKey: ['tours'],
        })

        return newTour
      }

      // if newTour response is not successful
      toast.error(errorMessage(newTour!))
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
