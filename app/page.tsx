import HomePageHeader from '@/components/ui/HomePageHeader';
import ClientQuestListContianer from '@/components/ui/QuestContainer/ClientQuestListContainer';
import React from 'react';

export default async function Home() {
  return (
    <React.Fragment>
      <HomePageHeader />
      <ClientQuestListContianer
        containerTitle="Community Quests"
        containerDescription="Collect experience and items through open-source contribution"
        organizationName={'lowlevelers'}
      />
    </React.Fragment>
  );
}
