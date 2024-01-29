'use client';
import HomePageHeader from '@/components/ui/HomePageHeader';
import MemberList from '@/components/ui/MemberList';
import ClientQuestListContianer from '@/components/ui/QuestContainer/ClientQuestListContainer';
import { useBreakpoint } from '@/hooks';
import { createBrowserClient } from '@/utils/supabase/browser';
import UsersService from '@/utils/supabase/services/users';
import { Profile } from '@/utils/supabase/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ClientComponentHomePage = () => {
  const [members, setMembers] = useState<Profile[]>([]);
  const { isTablet } = useBreakpoint();

  useEffect(() => {
    const init = async () => {
      const browserService = createBrowserClient();
      const usersService = new UsersService(browserService);
      const _members = await usersService.getAllUserProfiles();
      setMembers(_members);
    };
    init();
  }, []);

  return (
    <React.Fragment>
      <HomePageHeader />
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="lg:flex lg:justify-evenly">
          {[
            {
              title: 'Community Handbook',
              description: 'Find all information about TheLowLevelers community in the handbook',
              img: '/jumbotron/handbook-banner.webp',
              href: 'https://handbook.lowlevelers.com',
            },
            {
              title: 'Discussion Forum',
              description: 'Learn more from other community members from the discussion forum',
              img: '/jumbotron/discussion-forum-banner.webp',
              href: 'https://github.com/orgs/lowlevelers/discussions',
            },
            {
              title: 'Members',
              description: 'Discover talented people in the community',
              img: '/jumbotron/member-banner.webp',
              href: 'http://lowlevelers.com/about',
            },
          ].map(topic => (
            <div
              style={{
                minWidth: 350,
                maxWidth: 400,
              }}
              className="border border-gray-700 mx-3 my-5 max-w-lg overflow-hidden rounded bg-stone-950 shadow-lg">
              <Link href={topic.href} key={topic.title}>
                <div
                  style={{
                    background: `url(${topic.img})`,
                    marginBottom: 5,
                    height: 100,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="px-6 py-4">
                  <div className="mb-2 text-md text-white font-bold">{topic.title}</div>
                  <p className="text-base text-gray-500">{topic.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className={!isTablet && members.length > 0 ? 'col-span-2' : 'col-span-3'}>
          <ClientQuestListContianer
            containerTitle="Community Quests"
            containerDescription="Collect experience and items through open-source contribution"
            organizationName={'lowlevelers'}
          />
        </div>
        {!isTablet && members.length > 0 && (
          <div>
            <div className="border-b border-gray-700 pb-4">
              <h1 className="font-medium text-xl text-gray-50 pb-2">Members</h1>
              <p className="text-gray-500">Connect with other members in the community</p>
            </div>
            <MemberList members={members} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ClientComponentHomePage;
