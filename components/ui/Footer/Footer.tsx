'use client';

import Brand from '../Brand/Brand';

export default () => {
  const footerNavs = [
    {
      href: '/the-story',
      name: 'About',
    },
    {
      href: 'https://github.com/MarsX-dev/devhunt',
      name: 'GitHub Repository',
    },
    {
      href: '/blog',
      name: 'Blog',
    },
    {
      href: 'https://twitter.com/johnrushx',
      name: 'Contact',
    },
  ];

  return (
    <footer className="mt-20 text-slate-400 bg-slate-900 px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="border-t border-slate-800 pt-8">
        <div className="max-w-lg sm:mx-auto sm:text-center">
          <Brand className="sm:m-auto" />
          <p className="leading-relaxed mt-3 text-slate-300 text-[15px]">
            A launchpad for dev tools, built by developers. Open-source and fair.
          </p>
        </div>
        <ul className="text-sm font-medium items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
          {footerNavs.map((item, idx) => (
            <li>
              <a key={idx} href={item.href} className="block hover:text-slate-200">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <style jsx>{`
          .svg-icon path,
          .svg-icon polygon,
          .svg-icon rect {
            fill: currentColor;
          }
        `}</style>
      </div>
    </footer>
  );
};
