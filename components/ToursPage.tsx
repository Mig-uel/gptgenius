'use client'

import { getAllTours } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'
import { Spinner, ToursList } from '@/components'

export default function ToursPage() {
  const { data, isPending } = useQuery({
    queryKey: ['tours'],

    queryFn: () => getAllTours(),
  })

  // @ts-expect-error fix prisma types later
  return <>{isPending ? <Spinner /> : <ToursList data={data} />}</>
}
