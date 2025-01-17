'use client'

import { getAllTours } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { Spinner, ToursList } from '@/components'
import { useState } from 'react'

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isPending } = useQuery({
    queryKey: ['tours', searchTerm],

    queryFn: () => getAllTours(searchTerm),
  })

  return (
    <div className='mt-8'>
      <form className='max-w-lg mb-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='enter city or country here...'
            className='input input-bordered join-item w-full'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            className='btn btn-primary join-item'
            type='button'
            disabled={isPending}
            onClick={() => setSearchTerm('')}
          >
            {isPending ? <Spinner /> : 'Reset'}
          </button>
        </div>
      </form>

      {/* @ts-expect-error fix prisma types later */}
      <>{isPending ? <Spinner /> : <ToursList data={data} />}</>
    </div>
  )
}
