import QuestContainer from '@/components/ui/QuestContainer';
import { MIDDLE_STYLE } from '@/constants';
import { GitHubRepository } from '@/utils/github/models';

interface Props {
  containerRepositories: GitHubRepository[];
  containerTitle: string;
  containerDescription?: string;
  questOwner?: string;
}

export default function QuestListContainer({
  containerRepositories,
  containerTitle,
  containerDescription,
  questOwner,
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-3 ...">
          <div className="border-b border-gray-700 pb-4">
            <h1 className="font-medium text-xl text-gray-50 pb-2">{containerTitle}</h1>
            <p className="text-gray-500">{containerDescription}</p>
          </div>
          <div style={{ ...MIDDLE_STYLE, justifyContent: 'center', flexDirection: 'column' }}>
            {containerRepositories
              .filter(repository => repository.open_issues_count > 0)
              .sort(
                (repositoryA, repositoryB) =>
                  repositoryB.open_issues_count - repositoryA.open_issues_count
              )
              .map(repository => (
                <QuestContainer questOwner={questOwner} repository={repository} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
