import { fetchUserTokensById } from '@/utils/actions'
import { UserProfile } from '@clerk/nextjs'

export default async function Page() {
  const tokens = await fetchUserTokensById()

  return (
    <div>
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>Tokens: {tokens}</h2>

      <UserProfile />
    </div>
  )
}
