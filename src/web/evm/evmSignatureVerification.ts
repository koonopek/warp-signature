import { GQLNodeInterface } from 'warp-contracts';
import { WarpPlugin, WarpPluginType } from 'warp-contracts/lib/types/core/WarpPlugin';
import { ethers } from 'ethers';
import { stringify } from 'safe-stable-stringify';
import { Tag } from 'arweave/web/lib/transaction';
import { stringToB64Url } from 'arweave/web/lib/utils';
import { encodeTxId } from '../../utils';

export interface Interaction {
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

export class EvmSignatureVerificationPlugin implements WarpPlugin<GQLNodeInterface, Promise<boolean>> {
  async process(input: GQLNodeInterface): Promise<boolean> {
    let encodedTags: Tag[] = [];

    for (const tag of input.tags) {
      try {
        encodedTags.push(new Tag(stringToB64Url(tag.name), stringToB64Url(tag.value)));
      } catch (e) {
        throw new Error(`Unable to encode tag ${tag.name}. Error message: ${e.message}.`);
      }
    }
    const interaction: Interaction = {
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

    if (!input.signature) {
      throw new Error(`Unable to verify message due to lack of interaction signature.`);
    }

    try {
      const recoveredAddress: string = ethers.utils.verifyMessage(stringify(interaction), input.signature);
      const verifiedId = await encodeTxId(input.signature);
      return verifiedId === input.id && recoveredAddress.toLowerCase() === input.owner.address.toLowerCase();
    } catch (e) {
      throw new Error(`Unable to verify message. Error message: ${e.message}.`);
    }
  }

  type(): WarpPluginType {
    return 'evm-signature-verification';
  }
}
