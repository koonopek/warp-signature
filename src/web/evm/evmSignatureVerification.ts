import { GQLNodeInterface } from 'warp-contracts';
import { WarpPlugin, WarpPluginType } from 'warp-contracts/lib/types/core/WarpPlugin';
import { ethers } from 'ethers';
import { stringify } from 'safe-stable-stringify';

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
    const interaction: Interaction = {
      id: input.id,
      owner: { address: input.owner.address },
      recipient: input.recipient,
      tags: input.tags,
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
