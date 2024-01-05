import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Profile } from '@/utils/supabase/types';

const AvatarListItem = ({ item, highlighted }: { item: Profile; highlighted?: boolean }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link href={`/@${item.username}`}>
            <Avatar.Root key={item.username}>
              <Avatar.Image
                className={`w-full h-full object-cover rounded-xl ${
                  highlighted ? 'border-2 border-green-500' : ''
                }`}
                src={item.avatar_url as string}
                alt={item.full_name as string}
              />
              <Avatar.Fallback
                className="flex items-center justify-center text-gray-300 h-full w-full bg-slate-500 text-[15px] font-medium rounded-xl"
                delayMs={600}>
                {item.full_name?.slice(0, 2).toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="px-2 py-1 rounded-full text-gray-300 text-xs font-medium bg-gray-700 will-change-[transform,opacity]"
            sideOffset={5}>
            {item.full_name || 'No name'} {highlighted ? ' (author) ' : ''}
            <Tooltip.Arrow className="fill-gray-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default AvatarListItem;
