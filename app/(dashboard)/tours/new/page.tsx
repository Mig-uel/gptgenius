import { NewTour } from '@/components'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default function Page() {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h2 className='text-4xl font-bold'>New Tour</h2>

      <NewTour />
    </HydrationBoundary>
  )
}
