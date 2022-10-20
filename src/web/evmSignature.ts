import { MetaMaskInpageProvider } from '@metamask/providers';
import Transaction from 'arweave/node/lib/transaction';
import { encodeTxId } from '../utils';
import MetaMaskOnboarding from '@metamask/onboarding';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const evmSignature = async (tx: Transaction) => {
  if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
    throw new Error('Account could not be loaded. Metamask not detected');
  }
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  tx.owner = accounts[0];
  tx.addTag('Signature-Type', 'ethereum');
  tx.signature = await window.ethereum.request<string>({
    method: 'personal_sign',
    params: [accounts[0], JSON.stringify(tx)]
  });

  tx.id = await encodeTxId(tx.signature);

  return tx;
};
