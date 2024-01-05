import QuestCardList from '@/components/ui/QuestCardList';
import ToolCardList, { ITool } from '@/components/ui/ToolCardList/ToolCardList';
import { MOCK_DATA } from '@/utils/github/mock';
import { createBrowserClient } from '@/utils/supabase/browser';
import ProductsService from '@/utils/supabase/services/products';
import ProfileService from '@/utils/supabase/services/profile';

export default async function Home() {
  const browserService = createBrowserClient();
  const profileService = new ProfileService(browserService);
  const { data: products } = await new ProductsService(browserService).getProducts();
  const activities = await profileService.getAllUserActivities();
  return (
    <div>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2 ...">
          <div className="p-7">
            <div className="border-b border-gray-700 pb-4">
              <h1 className="font-medium text-2xl text-gray-50 pb-2">Quests</h1>
              <p className="text-gray-500">
                Collect experience and items through open-source contribution
              </p>
            </div>
            <ul className="mt-3 divide-y divide-gray-800/60">
              <QuestCardList issues={MOCK_DATA.data.repository.issues} />
            </ul>
          </div>
        </div>
        <div className="p-7">
          <div className="border-b border-gray-700 pb-4">
            <h1 className="font-medium text-2xl text-gray-50 pb-2">Member Projects</h1>
            <p className="text-gray-500">Discover products built by the community</p>
          </div>
          <ul className="mt-3 divide-y divide-gray-800/60">
            {products.map((product, idx) => (
              <ToolCardList key={idx} tool={product as ITool} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
