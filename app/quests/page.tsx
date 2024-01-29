import HomePageHeader from '@/components/ui/HomePageHeader';
import Link from 'next/link';

export default async function Quests() {
  return (
    <div>
      <HomePageHeader />
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="lg:flex lg:justify-evenly">
          {[
            {
              title: 'Nomad Quests',
              img: '/jumbotron/handbook-banner.webp',
              href: 'https://handbook.lowlevelers.com',
            },
            {
              title: 'LowLevelers Quests',
              img: '/jumbotron/discussion-forum-banner.webp',
              href: 'https://github.com/orgs/lowlevelers/discussions',
            },
            {
              title: 'Elder Quests',
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
