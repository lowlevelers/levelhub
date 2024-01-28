'use client';
import { fetchOptimizedRepositories } from '@/utils/github/services/cacheApi';
import React, { useEffect, useState } from 'react';
import QuestListContainer from '../QuestListContainer';
import { GitHubRepository } from '@/utils/github/models';

type Props = {
  containerTitle: string;
  containerDescription: string;
  organizationName: string;
};

const ClientQuestListContainer = ({
  organizationName,
  containerTitle,
  containerDescription,
}: Props) => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  useEffect(() => {
    const init = async () => {
      const _repositories = await fetchOptimizedRepositories(organizationName);
      setRepositories(_repositories);
    };
    init();
  }, [organizationName]);
  return (
    <QuestListContainer
      containerTitle={containerTitle}
      containerDescription={containerDescription}
      containerRepositories={repositories}
    />
  );
};

export default ClientQuestListContainer;
