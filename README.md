# Warp Signature

Warp Signature is a tool to be used in [Warp](https://github.com/warp-contracts/warp) contracts. It allows to sign transactions using non-Areave wallet. Currently, it is possible to connect to EVM wallet using Metamask plugin in browser environment.

## Usage

```ts
await this.contract.connect(evmSignature).writeInteraction({
  function: 'function'
});
```

## Future plans

1. Expand to NodeJs environment.
2. Usage of other wallets (e.g. Solana) and plugins.
3. Add option to deploy contracts using Warp Signature.