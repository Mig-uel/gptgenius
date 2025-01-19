'use client'

import { Spinner } from '@/components'
import {
  createNewTour,
  fetchUserTokensById,
  generateTourResponse,
  getExistingTour,
  subtractTokens,
} from '@/utils/actions'
import { errorMessage } from '@/utils/helpers'
import type { Tour } from '@/utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import TourInfo from './TourInfo'
import { auth } from '@clerk/nextjs'

export default function NewTour() {
  const { userId } = auth()
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

      // check token balance
      const tokenBalance = await fetchUserTokensById(userId!)

      if (tokenBalance === null || tokenBalance === undefined) {
        toast.error('Something went wrong, please try again...')
        return
      }

      if (tokenBalance < 300) {
        toast.error('Your token balance is too low. Please top-up...')
        return
      }

      // generate new tour
      const newTour = await generateTourResponse(destination)

      // check if newTour is a string (function return error string if error)
      if (typeof newTour === 'string' || !newTour) {
        toast.error(errorMessage(newTour!))
        return null
      }

      // if newTour response is an successful, create new tour
      await createNewTour(newTour.tour)

      // invalidate tours
      queryClient.invalidateQueries({
        queryKey: ['tours'],
      })

      // subtract tokens used for prompt
      const updatedTokens = await subtractTokens(newTour.tokens, userId!)
      toast.success(`${updatedTokens} tokens remaining...`)

      return newTour.tour
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
