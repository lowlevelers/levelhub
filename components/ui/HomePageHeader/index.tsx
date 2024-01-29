'use client';
import { useSupabase } from '@/components/supabase/provider';
import React from 'react';
import PolkadotWalletSelector from '../PolkadotWalletSelector';
import { MIDDLE_STYLE } from '@/constants';
import Avatar from '../Avatar/Avatar';
import { Space } from 'antd';

type Props = {};

const HomePageHeader = (props: Props) => {
  const { user } = useSupabase();
  return (
    <div>
      {user && (
        <div
          className="border-b border-gray-700 pb-4"
          style={{ ...MIDDLE_STYLE, justifyContent: 'space-between' }}>
          <div>
            <Space size={20}>
              <Avatar className="w-10 h-10" src={user.avatar_url || ''} />
              <div>
                <h1 className="font-medium text-xl text-gray-50">{user.username}</h1>
                <p className="text-gray-500">
                  Your current community rank is{' '}
                  <span className="text-green-500 font-md">Nomad</span>
                </p>
              </div>
            </Space>
          </div>
          <PolkadotWalletSelector />
        </div>
      )}
    </div>
  );
};

export default HomePageHeader;
