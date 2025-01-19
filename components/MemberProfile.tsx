import { fetchOrGenerateUserTokensById } from '@/utils/actions'
import { currentUser, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function MemberProfile() {
  const user = await currentUser()

  if (!user) return redirect('/')

  await fetchOrGenerateUserTokensById()

  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton />

      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
