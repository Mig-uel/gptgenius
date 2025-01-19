import { generateTourImage } from '@/utils/actions'
import type { TourData } from '@/utils/types'
import Image from 'next/image'

export default async function GeneratedImage({ tour }: { tour: TourData }) {
  const tourImage = await generateTourImage(tour)

  if (!tourImage) return null

  return (
    <div>
      <Image
        src={tourImage}
        alt={tour.title}
        width={300}
        height={300}
        className='rounded-xl shadow-xl mb-16 h-96 w-96 object-center'
        priority
      />
    </div>
  )
}
