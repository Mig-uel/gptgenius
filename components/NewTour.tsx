'use client'

import TourInfo from './TourInfo'

export default function NewTour() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const destination = Object.fromEntries(formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className='text-4xl font-bold'>New Tour</h2>

        <div className='join w-full mt-6'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />

          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />

          <button className='btn btn-primary join-item' type='submit'>
            Generate Tour
          </button>
        </div>
      </form>

      <div className='mt-16'>
        <TourInfo />
      </div>
    </>
  )
}
