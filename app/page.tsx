import QuestListContainer from '@/components/ui/QuestListContainer';
import { fetchRepositories } from '@/utils/github/services/api';
import Link from 'next/link';

export default async function Home() {
  const repositories = await fetchRepositories('lowlevelers');
  return (
    <div>
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
            <Link
              href={topic.href}
              key={topic.title}
              style={{
                minWidth: 350,
                maxWidth: 400,
              }}
              className="mx-3 my-5 max-w-lg overflow-hidden rounded bg-stone-950 shadow-lg">
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
          ))}
        </div>
      </div>
      <QuestListContainer
        containerTitle="Community Quests"
        containerDescription="Collect experience and items through open-source contribution"
        containerRepositories={repositories}
      />
    </div>
  );
}
