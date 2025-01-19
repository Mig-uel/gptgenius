import { fetchUserTokensById } from '@/utils/actions'
import { auth, UserProfile } from '@clerk/nextjs'

export default async function Page() {
  const { userId } = auth()

  const tokens = await fetchUserTokensById(userId!)

  return (
    <div>
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>Tokens: {tokens}</h2>

      <UserProfile />
    </div>
  )
}
