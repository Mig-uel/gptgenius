import { ToursPage } from '@/components'
import { getAllTours } from '@/utils/actions'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['tours'],

    queryFn: () => getAllTours(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h2 className='text-4xl font-bold'>Tours</h2>

      <ToursPage />
    </HydrationBoundary>
  )
}
