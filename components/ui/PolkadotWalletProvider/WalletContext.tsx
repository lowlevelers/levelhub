import { Wallet, WalletAccount } from '@talismn/connect-wallets';
import React from 'react';

export const WalletContext = React.createContext<{
  wallet: Wallet | undefined;
  walletAccount: WalletAccount | undefined;
  setWallet: (wallet: Wallet | undefined) => void;
  setWalletAccount: (walletAccount: WalletAccount | undefined) => void;
}>({
  wallet: undefined,
  walletAccount: undefined,
  setWallet(wallet) {},
  setWalletAccount(walletAccount) {},
});
