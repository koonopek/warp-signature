import { MetaMaskInpageProvider } from '@metamask/providers';
import Transaction from 'arweave/node/lib/transaction';
declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}
export declare const evmSignature: (tx: Transaction) => Promise<Transaction>;
