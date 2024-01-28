'use client';
import {
  EnkryptWallet,
  FearlessWallet,
  MantaWallet,
  PolkaGate,
  PolkadotjsWallet,
  SubWallet,
  TalismanWallet,
  WalletAccount,
} from '@talismn/connect-wallets';
import React, { useState } from 'react';
import Button from '../Button/Button';
import mergeTW from '@/utils/mergeTW';
import { MIDDLE_STYLE } from '@/constants';
import WalletSelect from './WalletSelect';
import { WalletOutlined } from '@ant-design/icons';
import { truncateMiddle } from './ListSkeleton';

type Props = {};

const DAPP_NAME = 'LevelUp!';

const PolkadotWalletSelector = (props: Props) => {
  const [selectedWalletAccount, setSelectedWalletAccount] = useState<WalletAccount | undefined>(
    undefined
  );

  const onAccountSelected = (walletAccount: WalletAccount) => {
    setSelectedWalletAccount(walletAccount);
  };

  return (
    <div>
      <WalletSelect
        showAccountsList
        onAccountSelected={onAccountSelected}
        dappName={DAPP_NAME}
        makeInstallable
        walletList={[
          new TalismanWallet(),
          new SubWallet(),
          new MantaWallet(),
          new PolkaGate(),
          new FearlessWallet(),
          new EnkryptWallet(),
          new PolkadotjsWallet(),
        ]}
        triggerComponent={
          (
            <Button
              style={{ width: '100%' }}
              child={<WalletOutlined />}
              className={mergeTW(
                `text-sm font-medium mt-4 mx-auto flex text-white bg-slate-800 hover:bg-slate-600 active:bg-gray-100 className="w-full justify-center mt-4"`
              )}>
              {selectedWalletAccount
                ? `${selectedWalletAccount.name} (${truncateMiddle(selectedWalletAccount.address)})`
                : 'Connect to Web3 wallet'}
            </Button>
          ) as any
        }
      />
    </div>
  );
};

export default PolkadotWalletSelector;
