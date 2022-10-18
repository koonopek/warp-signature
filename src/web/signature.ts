import { MetaMaskInpageProvider } from '@metamask/providers';
import Transaction from 'arweave/node/lib/transaction';
import { encodeTxId } from 'utils';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const evmSignature = async (tx: Transaction) => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  console.log('Connected account: ' + accounts[0]);

  tx.owner = accounts[0];
  tx.addTag('Signature-type', 'EVM');
  tx.signature = await window.ethereum.request<string>({
    method: 'personal_sign',
    params: [accounts[0], JSON.stringify(tx)]
  });
  console.log('Signature: ' + tx.signature);

  tx.id = await encodeTxId(tx.signature);

  console.log(tx);
  return tx;
};
