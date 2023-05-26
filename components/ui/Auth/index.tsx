'use client'

import { useSupabase } from '@/components/supabase/provider'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AvatarMenu from '../AvatarMenu'
// Supabase auth needs to be triggered client-side
export default function Auth({ onLogout }: { onLogout?: () => void }) {
  const { supabase, session } = useSupabase()
  const router = useRouter()
  const [isLoad, setLoad] = useState(false)

  const handleGitHubLogin = async () => {
    setLoad(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })

    if (error != null) {
      console.log({ error })
      setLoad(false)
    }
  }

  // console.log(session && session.user)

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration

  return session != null ? (
    <AvatarMenu avatar_url={session && session.user.user_metadata.avatar_url} onLogout={onLogout} />
  ) : (
    <Button isLoad={isLoad} variant="shiny" className="justify-center w-full md:w-auto" onClick={handleGitHubLogin}>
      Sign In
    </Button>
  )
}
