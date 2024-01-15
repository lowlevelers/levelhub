import QuestCardList from '@/components/ui/QuestCardList';
import { fetchRepositoryIssues } from '@/utils/github/services/api';

export default async function Home() {
  const repositoryIssues = await fetchRepositoryIssues('lowlevelers', 'lowlevelers.com');
  return (
    <div>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-3 ...">
          <div className="p-7">
            <div className="border-b border-gray-700 pb-4">
              <h1 className="font-medium text-xl text-gray-50 pb-2">Quests</h1>
              <p className="text-gray-500">
                Collect experience and items through open-source contribution
              </p>
            </div>
            <ul className="mt-3 divide-y divide-gray-800/60">
              <QuestCardList issues={repositoryIssues} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
