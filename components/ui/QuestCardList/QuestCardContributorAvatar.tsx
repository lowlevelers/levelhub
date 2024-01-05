import { GithubAssignees } from '@/utils/github/models';
import React from 'react';
import GithubAvatarList from '../GithubAvatarList';

const QuestCardContributorAvatar = ({ assignees }: { assignees: GithubAssignees }) => {
  return (
    <div>
      {assignees.nodes.length > 0 ? (
        <GithubAvatarList usernames={assignees.nodes.map(asignee => asignee.login)} />
      ) : (
        <ul className="max-w-4xl mx-auto gap-3 flex flex-wrap items-center">
          <li className="flex-none w-5 h-5 hover:scale-105 duration-200 sm:w-8 sm:h-8 bg-slate-600 rounded-md flex justify-center items-center">
            <li className="flex-none w-5 h-5 hover:scale-105 duration-200 sm:w-7 sm:h-7 bg-slate-800 rounded-md flex justify-center items-center">
              <h1 className="text-slate-400">?</h1>
            </li>
          </li>
        </ul>
      )}
    </div>
  );
};

export default QuestCardContributorAvatar;
