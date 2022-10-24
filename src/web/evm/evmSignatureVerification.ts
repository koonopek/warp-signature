import { GQLNodeInterface } from 'warp-contracts';
import { WarpPlugin, WarpPluginType } from 'warp-contracts/lib/types/core/WarpPlugin';
import { ethers } from 'ethers';
import { stringify } from 'safe-stable-stringify';
import { Tag } from 'arweave/node/lib/transaction';
import { stringToB64Url } from 'arweave/node/lib/utils';

export interface Interaction {
  id: string;
  owner: { address: string };
  recipient: string;
  tags: { name: string; value: string }[];
  fee: {
    winston: string;
  };
  quantity: {
    winston: string;
  };
}

export class EvmSignatureVerificationPlugin implements WarpPlugin<GQLNodeInterface, boolean> {
  process(input: GQLNodeInterface): boolean {
    let encodedTags = [];

    for (const tag of input.tags) {
      try {
        encodedTags.push(new Tag(stringToB64Url(tag.name), stringToB64Url(tag.value)));
      } catch (e) {}
    }
    const interaction: Interaction = {
      id: input.id,
      owner: { address: input.owner.address },
      recipient: input.recipient,
      tags: encodedTags,
      fee: {
        winston: input.fee.winston
      },
      quantity: {
        winston: input.quantity.winston
      }
    };

    try {
      const recoveredAddress: string = ethers.utils.verifyMessage(stringify(interaction), input.signature);

      return recoveredAddress === input.owner.address;
    } catch (e) {
      return false;
    }
  }

  type(): WarpPluginType {
    return 'evm-signature-verification';
  }
}
