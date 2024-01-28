import { WalletAccount } from '@talismn/connect-wallets';
import styles from './WalletSelect.module.css';

export const truncateMiddle = (str = '', start = 4, end = 4) =>
  str && str.length
    ? str.length <= start + end
      ? str
      : `${str.substring(0, start)}...` + (end > 0 ? str.substring(str.length - end) : '')
    : null;

export function ListSkeleton() {
  const listItems = Array.from(
    { length: 2 },
    (v, i): WalletAccount => ({
      name: 'dummy',
      source: `${i}`,
      address: 'dummy',
    })
  );
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {listItems?.map(account => {
        return (
          <div key={`${account.source}-${account.address}`} className={styles['row-button']}>
            <span
              style={{
                textAlign: 'left',
                opacity: 0,
              }}>
              <div>{account.name}</div>
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {truncateMiddle(account.address)}
              </div>
            </span>
          </div>
        );
      })}
    </>
  );
}
