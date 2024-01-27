import QuestContainer from '@/components/ui/QuestContainer';

export default async function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-3 ...">
          <div className="p-7">
            <QuestContainer repositoryOwner="lowlevelers" repositoryName="lowlevelers.com" />
          </div>
        </div>
      </div>
    </div>
  );
}
