import type { TourData } from '@/utils/types'

export default function TourInfo({ tour }: { tour: TourData }) {
  const { description, stops, title } = tour

  return (
    <div className='max-w-2xl'>
      <h1 className='text-4xl font-semibold mb-4'>{title}</h1>

      <p className='leading-loose mb-6'>{description}</p>

      <ul>
        {stops &&
          Array.isArray(stops) &&
          stops.map((stop) => (
            <li key={String(stop)} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p>{typeof stop === 'string' ? stop : JSON.stringify(stop)}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}
