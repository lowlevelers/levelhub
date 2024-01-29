import { IconChevronRight } from '@/components/Icons/IconChevronRight';
import { truncateMiddle } from './ListSkeleton';
import styles from './WalletSelect.module.css';
import { ListWithClickProps } from '../../../utils/web3-wallet/types';
import { WalletAccount } from '@talismn/connect-wallets';
import React from 'react';

export function AccountList(props: ListWithClickProps<WalletAccount>) {
  const { items, onClick } = props;
  if (!items) {
    return null;
  }
  return (
    <React.Fragment>
      {items?.map(account => {
        return (
          <button
            key={`${account.source}-${account.address}`}
            className={styles['row-button']}
            style={{ marginTop: 10 }}
            onClick={() => onClick?.(account)}>
            <span style={{ textAlign: 'left' }}>
              <div>{account.name}</div>
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {truncateMiddle(account.address)}
              </div>
            </span>
            <IconChevronRight />
          </button>
        );
      })}
    </React.Fragment>
  );
}
