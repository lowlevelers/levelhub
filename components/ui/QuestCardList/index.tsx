'use client';

import { GithubIssueEdge, GithubIssuesData } from '@/utils/github/models';
import React from 'react';

import Name from '@/components/ui/ToolCard/Tool.Name';
import Tags from '@/components/ui/ToolCard/Tool.Tags';
import mergeTW from '@/utils/mergeTW';
import { IconVote } from '@/components/Icons';
import QuestCardContributorAvatar from './QuestCardContributorAvatar';
import QuestCard from '../QuestCard';

const QuestCardList = ({ issues }: { issues: GithubIssuesData }) => {
  const collectTotalReactionCount = (issueEdge: GithubIssueEdge) => {
    const reactionList = issueEdge.node.comments.nodes.map(node => node.reactions.totalCount);
    return reactionList.length > 0 ? reactionList.reduce((a, b) => a + b) : 0;
  };
  return (
    <div>
      {issues.edges.map(edge => (
        <QuestCard href="" issueNode={edge.node}>
          <div style={{ marginRight: 5 }}>
            <QuestCardContributorAvatar assignees={edge.node.assignees} />
          </div>
          <div className="space-y-1">
            <Name href={`https://github.com/lowlevelers/lowlevelers.com/issues/${edge.node.id}`}>
              {edge.node.title}
            </Name>
            <Tags items={edge.node.labels.nodes.map(node => node.name)} />
          </div>
          <div className="flex-1 self-center flex justify-end">
            <button
              id="vote-item"
              className={mergeTW(
                `px-4 py-1 text-center text-gray-400 active:scale-[1.5] duration-200 rounded-md border bg-[linear-gradient(180deg,_#1E293B_0%,_rgba(30,_41,_59,_0.00)_100%)] ${'border-gray-700 hover:text-green-300'} opacity-60`
              )}>
              <IconVote className="mt-1 w-4 h-4 mx-auto pointer-events-none" />
              <span className="text-sm pointer-events-none">{collectTotalReactionCount(edge)}</span>
            </button>
          </div>
        </QuestCard>
      ))}
    </div>
  );
};

export default QuestCardList;
