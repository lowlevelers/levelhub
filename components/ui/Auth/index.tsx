'use client';

import { useSupabase } from '@/components/supabase/provider';
import { useCallback, useEffect, useState } from 'react';
import AvatarMenu from '../AvatarMenu';
import axios from 'axios';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Brand from '@/components/ui/Brand';
import { GithubProvider } from '../AuthProviderButtons';
import ProfileService from '@/utils/supabase/services/profile';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useRouter } from 'next/navigation';
import { Wallet, getWallets } from '@talismn/connect-wallets';
import PolkadotWalletSelector from '../PolkadotWalletSelector';
// Supabase auth needs to be triggered client-side

export default function Auth({ onLogout }: { onLogout?: () => void }) {
  const { supabase, session, user } = useSupabase();
  const [isGithubAuthLoad, setGithubAuthLoad] = useState<boolean>(false);
  const [isModalActive, setModalActive] = useState<boolean>(false);

  const router = useRouter();

  const profile = new ProfileService(createBrowserClient());

  const handleGitHubLogin = async () => {
    setGithubAuthLoad(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });

    if (error != null) {
      console.log({ error });
    }
    setGithubAuthLoad(false);
    setModalActive(false);
  };

  const HandleSignInNotification = useCallback(() => {
    const eventListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN' && session?.user) {
        profile.getById(session?.user.id as string).then(async user => {
          if (!user?.updated_at) {
            await axios.post('/api/login', {
              firstName: user?.full_name as string,
              personalEMail: session.user.email as string,
            });
            await profile.update(
              user?.id as string,
              {
                updated_at: new Date().toISOString(),
              } as any
            );
          }
        });
        eventListener.data.subscription.unsubscribe();
      }
    });
  }, []);

  useEffect(() => {
    HandleSignInNotification();
  }, []);

  return Boolean(session) ? (
    <div className="hidden md:block">
      <AvatarMenu session={session} onLogout={onLogout} />
    </div>
  ) : (
    <div className="flex items-center">
      <Button variant="shiny" onClick={() => setModalActive(true)}>
        Sign In
      </Button>
      <Modal
        variant="custom"
        isActive={isModalActive}
        onCancel={() => setModalActive(false)}
        className="max-w-md">
        <div className="text-center p-2">
          <div className="">
            <Brand w="130" h="40" className="mx-auto" />
            <h1 className="text-gray-50 text-lg font-semibold">Log in to your account</h1>
            <p className="text-gray-300">Let's level up your Polkadot career together!</p>
          </div>
          <GithubProvider
            isLoad={isGithubAuthLoad}
            onClick={handleGitHubLogin}
            className="w-full justify-center mt-4"
          />
          <PolkadotWalletSelector />
        </div>
      </Modal>
    </div>
  );
}
