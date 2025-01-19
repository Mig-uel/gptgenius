import { fetchOrGenerateUserTokensById } from '@/utils/actions'
import { auth, currentUser, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function MemberProfile() {
  const user = await currentUser()
  const { userId } = auth()

  if (!user) return redirect('/')

  await fetchOrGenerateUserTokensById(userId!)

  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton />

      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
