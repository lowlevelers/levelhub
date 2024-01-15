import { GithubLabel } from '@/utils/github/models';

/* eslint-disable import/no-anonymous-default-export */
export default ({ labels }: { labels: GithubLabel[] }) => (
  <div className="flex flex-wrap items-center gap-x-3 text-sm text-gray-400 overflow-hidden">
    {labels.map(label => (
      <div
        style={{ border: `1px solid #${label.color} 50%` || 'gray' }}
        className="px-2 bg-slate-800 text-white rounded m-1">
        <span style={{ fontSize: 11, backgroundColor: label.color }} className="flex-none">
          {label.name}
        </span>
      </div>
    ))}
  </div>
);
