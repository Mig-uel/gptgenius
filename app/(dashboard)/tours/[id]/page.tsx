import { TourInfo } from '@/components'
import { getTour } from '@/utils/actions'
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

  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        <FaArrowLeft /> Back to Tours
      </Link>

      <TourInfo tour={tour} />
    </div>
  )
}