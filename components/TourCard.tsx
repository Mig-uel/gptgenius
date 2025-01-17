import type { TourData } from '@/utils/types'
import Link from 'next/link'

export default function TourCard({ tour }: { tour: TourData }) {
  const { city, country, id } = tour

  return (
    <Link
      href={`/tours/${id}`}
      className='card card-compact rounded-xl bg-base-100'
    >
      <div className='card-body items-center text-center'>
        <h2 className='card-title text-center'>
          {city}, {country}
        </h2>
      </div>
    </Link>
  )
}
