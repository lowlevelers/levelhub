import { useSupabase } from '@/components/supabase/provider';
import { useRouter } from 'next/navigation';

export const useSupabaseAuth = () => {
  const router = useRouter();
  const { supabase, session } = useSupabase();

  const isLoggedin = session?.user;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push('/');
    if (error != null) {
      console.log({ error });
    }
  };

  return { isLoggedin, session, supabase, handleLogout };
};
