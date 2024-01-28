import { Wallet, getWallets } from '@talismn/connect-wallets';
import React from 'react';
import Button from '../Button/Button';
import mergeTW from '@/utils/mergeTW';
import { MIDDLE_STYLE } from '@/constants';

type Props = {};

const PolkadotWalletSelector = (props: Props) => {
  const supportedWallets: Wallet[] = getWallets();
  return (
    <div>
      {supportedWallets.map(wallet => (
        <div>
          <Button
            {...props}
            style={{ ...MIDDLE_STYLE, width: '100%' }}
            child={
              <img style={{ height: 30, width: 30 }} src={wallet.logo.src} alt={wallet.logo.alt} />
            }
            className={mergeTW(
              `text-sm font-medium mt-4 mx-auto flex text-white bg-slate-800 hover:bg-slate-600 active:bg-gray-100`
            )}>
            {wallet.title}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PolkadotWalletSelector;
