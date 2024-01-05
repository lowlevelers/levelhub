'use client';

import React, { useEffect, useState } from 'react';
import ProfileService from '@/utils/supabase/services/profile';
import { createBrowserClient } from '@/utils/supabase/browser';
import AvatarListItem from '../VoterAvatarsList/AvatarListItem';
import { Profile } from '@/utils/supabase/types';
import { ContributionBasic } from '@/utils/github/models';
import GithubApiService from '@/utils/github/services/api';
import GithubAvatarListItem from './GithubAvatarListItem';

export default function GithubAvatarList({ usernames }: { usernames: string[] }) {
  const browserService = createBrowserClient();
  const [onlyGithubUsers, setOnlyGithubUsers] = useState<ContributionBasic[]>([]);
  const [existingProfiles, setExistingProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      const _onlyGithubUsers: ContributionBasic[] = [];
      const _existingProfiles: Profile[] = [];
      for (const username of usernames) {
        const profile = await new ProfileService(browserService).getByUsername(username);
        if (profile) {
          _existingProfiles.push(profile);
        } else {
          const githubUser = await GithubApiService.fetchGitHubUser(username);
          if (githubUser) _onlyGithubUsers.push(githubUser);
        }
      }
      setOnlyGithubUsers(_onlyGithubUsers);
      setExistingProfiles(_existingProfiles);
    };
    loadUserData();
  }, []);
  return (
    <div className="mt-3">
      <ul className="max-w-4xl mx-auto gap-3 flex flex-wrap items-center">
        {existingProfiles.map((item: Profile) => (
          <li className="flex-none w-5 h-5 hover:scale-105 duration-200 sm:w-8 sm:h-8">
            <AvatarListItem highlighted item={item} />
          </li>
        ))}
        {onlyGithubUsers.map(item => (
          <li className="flex-none w-5 h-5 hover:scale-105 duration-200 sm:w-8 sm:h-8">
            <GithubAvatarListItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
