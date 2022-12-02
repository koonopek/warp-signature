# Warp Signature

Warp Signature is a tool to be used in [Warp](https://github.com/warp-contracts/warp) contracts. It allows to sign transactions using non-Arweave wallet. Currently, it is possible to connect to EVM wallet using Metamask plugin in browser environment.

## Signing transactions

```ts
await this.contract.connect({ signer: evmSignature, signatureType: 'ethereum' }).writeInteraction({
  function: 'function'
});
```

## Signature verification

In order to verify signatures for the given contract, one needs to use `EvmSignatureVerificationPlugin` while initializing Warp. Plugin will be then fired up when reading contract state and all interactions' signatures will be then verified. If incorrect signature will be detected, contract state will be evaluated without it.

```ts
const warp = await WarpFactory.forMainnet().use(new EvmSignatureVerificationPlugin());
```

## Future plans

1. Expand to NodeJs environment.
2. Usage of other wallets (e.g. Solana) and plugins.
3. Add option to deploy contracts using Warp Signature.

## Common problems

### Next.js server side imports
"Next.js requires that any code you import from `node_modules` need to be compatible with Node.js" - [discussed here](https://github.com/vercel/next.js/issues/31518). So to be able to import "only" `web` compatible lib like this one we have to use workaround with dynamic `import()`.

`const { evmSignature, EvmSignatureVerificationWebPlugin } = await import('warp-signature');`
