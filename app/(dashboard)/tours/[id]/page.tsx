import { Spinner, TourInfo } from '@/components'
import GeneratedImage from '@/components/GeneratedImage'
import { getTour } from '@/utils/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const tour = await getTour(id)

  if (!tour) return redirect('/tours')

  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        <FaArrowLeft /> Back to Tours
      </Link>

      <Suspense fallback={<Spinner />}>
        <GeneratedImage tour={tour} />
      </Suspense>

      <TourInfo tour={tour} />
    </div>
  )
}
