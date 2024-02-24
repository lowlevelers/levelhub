import HomePageHeader from '@/components/ui/HomePageHeader';
import ClientQuestListContianer from '@/components/ui/QuestContainer/ClientQuestListContainer';

export default async function JobBoardPage() {
  return (
    <div>
      <ClientQuestListContianer
        containerTitle="Job Board"
        containerDescription="Finding job opportunities in the Polkadot ecosystem"
        organizationName={'openguild-labs'}
        organizationRepositories={['job-board']}
      />
    </div>
  );
}
