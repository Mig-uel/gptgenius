import type { TourData } from '@/utils/types'
import TourCard from './TourCard'

export default function ToursList({ data }: { data: TourData[] }) {
  if (!data.length) return <h4 className='text-lg'>No tours found...</h4>

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
      {data.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}
