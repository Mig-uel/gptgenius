import { MemberProfile, NavLinks, SidebarHeader, Spinner } from '@/components'
import { Suspense } from 'react'

export default function Sidebar() {
  return (
    <div className='px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]'>
      {/* First Row */}
      <SidebarHeader />

      {/* Second Row */}
      <NavLinks />

      {/* Third Row */}
      <Suspense fallback={<Spinner />}>
        <MemberProfile />
      </Suspense>
    </div>
  )
}
