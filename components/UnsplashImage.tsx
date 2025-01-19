import type { TourData } from '@/utils/types'
import axios from 'axios'
import Image from 'next/image'

export default async function UnsplashImage({ tour }: { tour: TourData }) {
  const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=`

  const { data } = await axios(`${url}${tour.city}`)

  if (!data) return null

  const tourImage = data?.results[0]?.urls?.raw

  if (!tourImage) return null

  return (
    <div>
      <Image
        src={tourImage}
        width={300}
        height={300}
        className='rounded-xl shadow-xl mb-16 h-96 w=96 object-cover'
        alt={tour.title}
        priority
      />
    </div>
  )
}
