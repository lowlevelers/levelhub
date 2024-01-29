import { Wallet, WalletAccount } from '@talismn/connect-wallets';
import { isWalletInstalled } from '@talismn/connect-wallets';
import { getJsonData, storeJsonData } from '../cacheUtils';

export const WEB3_SELECTED_WALLET_NAME = '@lowlevelers/selected-wallet-name';
export const WEB3_SELECTED_ACCOUNT_ADDRESS = '@lowlevelers/selected-account-address';

export function saveAndDispatchWalletSelect(wallet: Wallet) {
  storeJsonData(WEB3_SELECTED_WALLET_NAME, wallet.extensionName);

  const walletSelectedEvent = new CustomEvent(WEB3_SELECTED_WALLET_NAME, {
    detail: wallet,
  });

  document.dispatchEvent(walletSelectedEvent);
  console.info(`Event: ${WEB3_SELECTED_WALLET_NAME}`, wallet);
}

export function saveAndDispatchAccountSelect(walletAccount: WalletAccount) {
  storeJsonData(WEB3_SELECTED_ACCOUNT_ADDRESS, walletAccount.address);

  const walletSelectedEvent = new CustomEvent(WEB3_SELECTED_ACCOUNT_ADDRESS, {
    detail: walletAccount,
  });

  document.dispatchEvent(walletSelectedEvent);
  console.info(`Event: ${WEB3_SELECTED_ACCOUNT_ADDRESS}`, walletAccount);
}

export function getPersistedWalletDetail() {
  const walletName = getJsonData(WEB3_SELECTED_WALLET_NAME);
  const walletAccountAddress = getJsonData(WEB3_SELECTED_ACCOUNT_ADDRESS);
  return {
    walletName,
    walletAccountAddress,
  };
}

export function removeIfUninstalled() {
  // Check saved `@talisman-connect/selected-wallet-name`
  // to see if the it is still installed or not.
  const selectedName = localStorage.getItem('@talisman-connect/selected-wallet-name');
  if (!isWalletInstalled(selectedName)) {
    localStorage.removeItem('@talisman-connect/selected-wallet-name');
  }
}
