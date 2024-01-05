'use client';

import ProductsService, { ProductLaunchGroup } from '@/utils/supabase/services/products';
import ToolCardEffect from '@/components/ui/ToolCardEffect/ToolCardEffect';
import { ProductType } from '@/type';
// import { shuffleToolsBasedOnDate } from '@/utils/helpers';
import { createBrowserClient } from '@/utils/supabase/browser';
import CountdownPanel from '@/components/ui/CountdownPanel';

import { useEffect, useState } from 'react';
import SkeletonToolCard from '@/components/ui/Skeletons/SkeletonToolCard';
import { ExtendedProduct } from '@/utils/supabase/CustomTypes';
import LoadableContainer from '@/components/ui/LoadableContainer';
import Button from '@/components/ui/Button/Button';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import Link from 'next/link';

export default function LaunchPadScreen() {
  const today = new Date();
  const productService = new ProductsService(createBrowserClient());
  const [launchWeeks, setLaunchWeeks] = useState<ProductLaunchGroup[]>([]);
  const [weeklyWinners, setWeeklyWinners] = useState<ExtendedProduct[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { isLoggedin } = useSupabaseAuth();

  useEffect(() => {
    const fetchData = async () => {
      const week = await productService.getWeekNumber(today, 2);
      const [launchWeeks, weeklyWinners] = await Promise.all([
        productService.getPrevLaunchWeeks(today.getFullYear(), 2, week, 1),
        productService.getWeeklyWinners(week),
      ]);
      setLaunchWeeks(launchWeeks);
      setWeeklyWinners(weeklyWinners);
      setLoading(false);
    };
    fetchData();
  }, []);

  function weekTools(group: any) {
    return (
      <>
        <div className="mt-3 text-gray-400 text-sm">This week's tools</div>
        <div className="mt-3 text-gray-400 text-sm">
          ❗ Vote for your favorite <b className="text-green-400">↳</b>
        </div>
        <ul className="mt-3 divide-y divide-gray-800/60">
          {group.products.map((product: ProductType, idx: number) => (
            <ToolCardEffect key={idx} tool={product} />
          ))}
        </ul>
      </>
    );
  }

  function prevWeekTools(group: { products: ExtendedProduct[] }) {
    return (
      <LoadableContainer isLoading={group.products.length === 0} loadComponent={<></>}>
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-green-500">
          <p className="mt-8">Past winners 👑</p>
        </div>
        <ul className="mt-3 divide-y divide-gray-800/60">
          {group.products.slice(0, 3).map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
        </ul>
      </LoadableContainer>
    );
  }

  function weekWinnerTools(products: ExtendedProduct[]) {
    return (
      <LoadableContainer isLoading={products.length === 0} loadComponent={<></>}>
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-green-500">
          <p className="mt-8">Past winners 👑</p>
        </div>
        <ul className="relative mt-3 divide-y divide-gray-800/60">
          {products.map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
          <div className="absolute -inset-x-2 -inset-y-0 -z-20 bg-graydark/40 rounded-xl sm:-inset-x-3"></div>
        </ul>
      </LoadableContainer>
    );
  }

  const LoadingSkeletonPlaceholders = () => {
    return (
      <div className="mt-14">
        <div>
          <div className="w-24 h-3 rounded-full bg-gray-700 animate-pulse"></div>
          <div className="w-32 h-3 mt-2 rounded-full bg-gray-700 animate-pulse"></div>
        </div>
        <ul className="mt-5 space-y-4">
          {Array(25)
            .fill('')
            .map((item, idx) => (
              <SkeletonToolCard key={idx} />
            ))}
        </ul>
      </div>
    );
  };

  const NoProductsLaunchedPlaceholder = () => {
    return (
      <div className="flex mt-5 border rounded-xl border-gray-800 bg-graydark p-5 flex-col gap-1 md:gap-2 items-center justify-end">
        <div className="max-w-lg text-gray-400">
          <div>😢 There is no products / ideas submitted</div>
          <Link
            href={isLoggedin ? '/account/tools' : '/login'}
            className={`mt-5 block bg-green-500 hover:bg-green-600 text-white text-center rounded-lg px-3 p-2`}>
            Submit Now 🔥
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-4xl mt-5 lg:mt-10 mx-auto px-4 md:px-8">
      <CountdownPanel />
      <LoadableContainer isLoading={isLoading} loadComponent={<LoadingSkeletonPlaceholders />}>
        <LoadableContainer
          isLoading={launchWeeks.length === 0}
          loadComponent={<NoProductsLaunchedPlaceholder />}>
          <div className="mt-10 mb-12">
            {launchWeeks.map((group, index) =>
              index > 0 ? prevWeekTools(group) : weekTools(group)
            )}
            {weekWinnerTools(weeklyWinners)}
          </div>
        </LoadableContainer>
      </LoadableContainer>
    </section>
  );
}
