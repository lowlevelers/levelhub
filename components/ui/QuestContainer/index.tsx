'use client';
import React, { useEffect, useState } from 'react';
import QuestCategoriesSection from '../QuestCategoriesSection';
import QuestCardList from '../QuestCardList';
import { fetchRepositoryIssues } from '@/utils/github/services/api';
import { GithubLabel, GithubRepositoryIssue } from '@/utils/github/models';
import LoadableContainer from '../LoadableContainer';
import { Skeleton } from 'antd';
import { countExistentialObject } from '@/utils/objectUtils';

type Props = {
  repositoryName: string;
  repositoryOwner: string;
};

const collectUniqueCategories = (repositoryIssues: GithubRepositoryIssue[]) => {
  const uniqueCategories: GithubLabel[] = [];
  const categoriesCount: Record<string, number> = {};
  for (const repositoryIssue of repositoryIssues) {
    for (const label of repositoryIssue.labels) {
      if (!categoriesCount[label.id]) uniqueCategories.push(label);
      categoriesCount[label.id] = (categoriesCount[label.id] || 0) + 1;
    }
  }
  return { uniqueCategories, categoriesCount };
};

const QuestContainer = ({ repositoryOwner, repositoryName }: Props) => {
  const [repositoryIssues, setRepositoryIssues] = useState<GithubRepositoryIssue[]>([]);
  const [categories, setCategories] = useState<GithubLabel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const repositoryIssues = await fetchRepositoryIssues('lowlevelers', 'lowlevelers.com');
        setRepositoryIssues(repositoryIssues);

        const globalCategories = collectUniqueCategories(repositoryIssues);
        const renderedCategories = globalCategories.uniqueCategories.map(category => ({
          ...category,
          name: `${category.name} (${globalCategories.categoriesCount[category.id]})`,
        }));
        setCategories(renderedCategories);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    init();
  }, [repositoryName, repositoryOwner]);

  return (
    <div>
      <div className="border-b border-gray-700 pb-4">
        <h1 className="font-medium text-xl text-gray-50 pb-2">Quests</h1>
        <p className="text-gray-500">
          Collect experience and items through open-source contribution
        </p>
      </div>
      <LoadableContainer isLoading={loading} loadComponent={<Skeleton />}>
        <QuestCategoriesSection categories={categories}>
          {selectedCategories => (
            <div className="mt-5">
              {countExistentialObject(selectedCategories) > 0 ? (
                <QuestCardList
                  issues={repositoryIssues.filter(issue =>
                    issue.labels.some(label => selectedCategories[label.id])
                  )}
                />
              ) : (
                <QuestCardList issues={repositoryIssues} />
              )}
            </div>
          )}
        </QuestCategoriesSection>
      </LoadableContainer>
    </div>
  );
};

export default QuestContainer;
