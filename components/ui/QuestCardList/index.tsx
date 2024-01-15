'use client';

import React from 'react';

import Name from '@/components/ui/ToolCard/Tool.Name';
import mergeTW from '@/utils/mergeTW';
import { IconVote } from '@/components/Icons';
import QuestCardContributorAvatar from './QuestCardContributorAvatar';
import QuestCard from '../QuestCard';
import { GithubRepositoryIssue } from '@/utils/github/models';
import { TagsGroup } from '../TagsGroup';
import QuestCardLabels from '../QuestCard/QuestCardLabels';
import { shortenString } from '@/utils/stringUtils';
import moment from 'moment';

const QuestCardList = ({ issues }: { issues: GithubRepositoryIssue[] }) => {
  return (
    <div>
      {issues.map(issue => (
        <QuestCard href={''} issue={issue}>
          <div style={{ marginRight: 5 }}>
            <QuestCardContributorAvatar assignees={issue.assignees} />
          </div>
          <div className="space-y-1">
            <Name href={issue.html_url}>{shortenString(issue.title, 100)}</Name>
            <p className="text-gray-500" style={{ fontSize: 'smaller' }}>
              Created at {moment.utc(issue.created_at).format('DD-MM-YYYY HH:mm')}
            </p>
            <div style={{ marginTop: 10 }}>
              <TagsGroup>
                <QuestCardLabels labels={issue.labels} />
              </TagsGroup>
            </div>
          </div>
          <div className="flex-1 self-center flex justify-end">
            <button
              id="vote-item"
              className={mergeTW(
                `px-4 py-1 text-center text-gray-400 active:scale-[1.5] duration-200 rounded-md border bg-[linear-gradient(180deg,_#1E293B_0%,_rgba(30,_41,_59,_0.00)_100%)] ${'border-gray-700 hover:text-green-300'} opacity-60`
              )}>
              <IconVote className="mt-1 w-4 h-4 mx-auto pointer-events-none" />
              <span className="text-sm pointer-events-none">{issue.reactions.total_count}</span>
            </button>
          </div>
        </QuestCard>
      ))}
    </div>
  );
};

export default QuestCardList;
