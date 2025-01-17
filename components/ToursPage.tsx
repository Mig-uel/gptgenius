'use client'

import { getAllTours } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { Spinner, ToursList } from '@/components'

export default function ToursPage() {
  const { data, isPending } = useQuery({
    queryKey: ['tours'],

    queryFn: () => getAllTours(),
  })

  return (
    <div className='mt-8'>
      {/* @ts-expect-error fix prisma types later */}
      <>{isPending ? <Spinner /> : <ToursList data={data} />}</>
    </div>
  )
}
