import { TourInfo } from '@/components'
import { generateTourImage, getTour } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const tour = await getTour(id)

  if (!tour) return redirect('/tours')

  const tourImage = await generateTourImage(tour)

  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        <FaArrowLeft /> Back to Tours
      </Link>

      {tourImage ? (
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
      ) : null}

      <TourInfo tour={tour} />
    </div>
  )
}
