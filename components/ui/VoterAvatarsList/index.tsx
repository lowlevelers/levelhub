/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
'use client';

import { createBrowserClient } from '@/utils/supabase/browser';
import ProductsService from '@/utils/supabase/services/products';
import { Profile } from '@/utils/supabase/types';
import { useEffect, useState } from 'react';
import AvatarListItem from './AvatarListItem';

export default ({ productId, owner }: { productId: number; owner: Profile }) => {
  const productsService = new ProductsService(createBrowserClient());
  const [votersList, setVotersList] = useState([]);

  async function getVoters() {
    let voters = await productsService.getVoters(productId);
    voters = voters.filter((item: Profile) => item.id !== owner.id);
    setVotersList(voters);
  }

  useEffect(() => {
    getVoters();
  }, []);

  return (
    <ul className="max-w-4xl mx-auto gap-3 flex flex-wrap items-center">
      {[owner, ...votersList].map((item: Profile, idx) => (
        <li className="flex-none w-8 h-8 hover:scale-105 duration-200 sm:w-10 sm:h-10">
          <AvatarListItem highlighted={idx === 0} item={item} />
        </li>
      ))}
    </ul>
  );
};
