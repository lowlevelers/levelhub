'use client';
import { getPersistedWalletDetail } from '@/utils/web3-wallet';
import { Wallet, WalletAccount, getWallets } from '@talismn/connect-wallets';
import React, { useEffect, useState } from 'react';
import { WalletContext } from './WalletContext';
import { DAPP_NAME } from '../PolkadotWalletSelector';

type Props = {
  children: React.ReactNode;
};

const PolkadotWalletProvider = ({ children }: Props) => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined);
  const [selectedWalletAccount, setSelectedWalletAccount] = useState<WalletAccount | undefined>(
    undefined
  );

  const onLoadWalletInfo = async () => {
    for (const wallet of getWallets()) {
      const { walletAccountAddress, walletName } = getPersistedWalletDetail();
      if (wallet.extensionName === walletName) {
        await wallet.enable(DAPP_NAME);
        const walletAccounts = await wallet.getAccounts();
        for (const walletAccount of walletAccounts) {
          if (walletAccount.address === walletAccountAddress) {
            setSelectedWalletAccount(walletAccount);
          }
        }
      }
    }
  };

  useEffect(() => {
    onLoadWalletInfo();
  }, []);
  return (
    <WalletContext.Provider
      value={{
        wallet: selectedWallet,
        walletAccount: selectedWalletAccount,
        setWallet(wallet) {
          setSelectedWallet(wallet);
        },
        setWalletAccount(walletAccount) {
          setSelectedWalletAccount(walletAccount);
        },
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export default PolkadotWalletProvider;
