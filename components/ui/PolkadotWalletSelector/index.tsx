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
import React from 'react';
import Button from '../Button/Button';
import mergeTW from '@/utils/mergeTW';
import WalletSelect from './WalletSelect';
import { WalletOutlined } from '@ant-design/icons';
import { truncateMiddle } from './ListSkeleton';
import { saveAndDispatchAccountSelect } from '@/utils/web3-wallet';
import { useWalletContext } from '@/hooks/useWalletContext';

type Props = {};

export const DAPP_NAME = 'LevelUp!';

const PolkadotWalletSelector = (props: Props) => {
  const { setWalletAccount, setWallet, walletAccount } = useWalletContext();
  const onAccountSelected = (walletAccount: WalletAccount) => {
    if (walletAccount.wallet) {
      walletAccount.wallet.sign?.(walletAccount.address, `Authentication ${DAPP_NAME}`);
    }
    saveAndDispatchAccountSelect(walletAccount);
    setWalletAccount(walletAccount);
    setWallet(walletAccount.wallet);
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
              child={<WalletOutlined />}
              className={mergeTW(
                `text-sm font-medium mx-auto flex text-white bg-slate-800 hover:bg-slate-600 active:bg-gray-100 w-full justify-center`
              )}>
              {walletAccount
                ? `${walletAccount.name} (${truncateMiddle(walletAccount.address)})`
                : 'Connect to Web3 wallet'}
            </Button>
          ) as any
        }
      />
    </div>
  );
};

export default PolkadotWalletSelector;
