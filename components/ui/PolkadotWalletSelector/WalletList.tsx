import { Wallet } from '@talismn/connect-wallets';
import { ListWithClickProps } from '@/utils/web3-wallet/types';
import Button from '../Button/Button';
import { MIDDLE_STYLE } from '@/constants';
import mergeTW from '@/utils/mergeTW';

export function WalletList(props: ListWithClickProps<Wallet>) {
  const { items, onClick, makeInstallable } = props;
  if (!items) {
    return null;
  }

  const handleWalletClicked = (wallet: Wallet) => {
    if (wallet.installed) {
      onClick && onClick(wallet);
    } else if (!wallet.installed || makeInstallable) {
      window.open(wallet.installUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div>
      {items.map(wallet => {
        return (
          <Button
            {...props}
            style={{ ...MIDDLE_STYLE, width: '100%' }}
            child={
              <img style={{ height: 30, width: 30 }} src={wallet.logo.src} alt={wallet.logo.alt} />
            }
            onClick={() => handleWalletClicked(wallet)}
            className={mergeTW(
              `text-sm font-medium mt-4 mx-auto flex text-white bg-slate-800 hover:bg-slate-600 active:bg-gray-100`
            )}>
            {wallet.title}{' '}
            {wallet.installed && (
              <div className="px-2 ml-3 bg-slate-700 text-white rounded m-1 flex justify-center items-center">
                <span style={{ fontSize: 11 }} className="flex-none">
                  Installed
                </span>
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
}
