/* eslint-disable import/no-anonymous-default-export */
'use client';

import { IconVote, IconArrowTopRight, IconArrowLongLeft } from '@/components/Icons';
import LinkShiny from '@/components/ui/LinkShiny';
import { Tabs } from '@/components/ui/TabsLink';
import TabLink from '@/components/ui/TabsLink/TabLink';
import { Tag, TagsGroup } from '@/components/ui/TagsGroup';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';
import { GithubIssueNode } from '@/utils/github/models';
import GithubAvatarList from '../GithubAvatarList';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import QuestCardLabels from '../QuestCard/QuestCardLabels';

export default ({
  href,
  repositoryIssue,
  close,
}: {
  href: string;
  repositoryIssue: GithubIssueNode;
  close: () => void;
}) => {
  const collectTotalReactionCount = (issueNode: GithubIssueNode) => {
    const reactionList = issueNode.comments.nodes.map(node => node.reactions.totalCount);
    return reactionList.length > 0 ? reactionList.reduce((a, b) => a + b) : 0;
  };
  const repositoryIssueAsignees = repositoryIssue.assignees.nodes.map(node => node.login);

  const router = useRouter();

  const tabs = [
    {
      name: 'About product',
      sectionId: 'about',
    },
    {
      name: 'Comments',
      sectionId: 'comments',
    },
  ];

  const stats = [
    {
      count: collectTotalReactionCount(repositoryIssue),
      icon: <IconVote />,
      label: 'Reactions',
    },
  ];

  return (
    <>
      <Modal
        isActive={true}
        onCancel={close}
        variant="custom"
        classNameContainer="px-0 py-0 sm:py-8"
        className="max-w-4xl bg-gray-900 px-0 py-8 view-modal">
        <div>
          <div className="container-custom-screen pt-4 pb-10">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-x-2 py-2 px-4 text-gray-50 border border-gray-700 rounded-lg hover:bg-slate-500 duration-150">
              <IconArrowLongLeft />
              Go back
            </button>
          </div>
          <div className="container-custom-screen" id="about">
            <h1 className="mt-3 text-gray-100 font-medium">{repositoryIssue.title}</h1>
            <div className="text-sm mt-3 flex items-center gap-x-3">
              <LinkShiny
                href={repositoryIssue.id}
                target="_blank"
                className="flex items-center gap-x-2">
                View on Github
                <IconArrowTopRight />
              </LinkShiny>
            </div>
            <div className="mt-10">
              <GithubAvatarList usernames={repositoryIssueAsignees} />
            </div>
          </div>
        </div>
        <Tabs
          ulClassName="container-custom-screen"
          className="mt-20 sticky pt-2 top-0 z-10 bg-gray-900">
          {tabs.map((item, idx) => (
            <TabLink variant="nonlink" sectionId={item.sectionId} key={idx}>
              {item.name}
            </TabLink>
          ))}
        </Tabs>
        <div className="space-y-20">
          <div>
            <div className="relative overflow-hidden pb-12">
              <div className="absolute top-0 w-full h-[100px] opacity-40 bg-[linear-gradient(180deg,_rgba(124,_58,_237,_0.06)_0%,_rgba(72,_58,_237,_0)_100%)]"></div>
              <div className="relative container-custom-screen mt-12">
                <Markdown
                  remarkPlugins={[[remarkGfm]]}
                  className={'markdown-renderer-container text-gray-100 whitespace-pre-wrap'}
                  children={repositoryIssue.body}
                  rehypePlugins={[rehypeRaw]}
                />
                {repositoryIssue.labels.totalCount > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-3 items-center">
                    <h3 className="text-sm text-gray-400 font-medium">Classified in</h3>
                    <TagsGroup>
                      <QuestCardLabels labels={repositoryIssue.labels.nodes} />
                    </TagsGroup>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="container-custom-screen" id="launches">
            <h3 className="text-gray-50 font-medium">Other similar Quests</h3>
          </div>
        </div>
      </Modal>
    </>
  );
};
