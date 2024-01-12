// Usage: DEBUG=true NETWORK=manzano yarn test:e2e:nodejs --filter=test-recap-from-lit
import path from 'path';
import { success, fail, testThis } from '../../tools/scripts/utils.mjs';
import LITCONFIG from '../../lit.config.json' assert { type: 'json' };
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitAbility, LitRLIResource } from '@lit-protocol/auth-helpers';

import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ethers } from 'ethers';
import * as siwe from 'siwe';

export async function main() {
  if (process.env.LOAD_ENV === 'false') {
    console.log('❗️ This test cannot be run with LOAD_ENV=false');
    process.exit();
  }

  // NOTE: In this example, the dApp owner would be both the RLI delegator and the delegatee (end user)
  // for ease of testing.
  // ==================== Setup ====================

  // ====================================================
  // =               dApp Owner's Perspetive            =
  // ====================================================
  const dAppOwnerWallet = globalThis.LitCI.wallet;
  const dAppOwnerWallet_address = globalThis.LitCI.wallet.address;
  const dAppOwnerWallet_authSig = globalThis.LitCI.CONTROLLER_AUTHSIG;
  const dAppOwnerWallet_pkpPublicKey = globalThis.LitCI.PKP_INFO.publicKey;

  console.log('dAppOwnerWallet_authSig:', dAppOwnerWallet_authSig);
  console.log('dAppOwnerWallet_address:', dAppOwnerWallet_address);
  console.log('dAppOwnerWallet_pkpPublicKey:', dAppOwnerWallet_pkpPublicKey);

  const delegatedWalletB = new ethers.Wallet.createRandom();
  const delegatedWalletB_address = delegatedWalletB.address;

  // As a dApp owner, I want to mint a Rate Limit Increase NFT so he who owns or delegated to
  // would be able to perform 14400 requests per day
  let contractClient = new LitContracts({
    signer: dAppOwnerWallet,
    debug: process.env.DEBUG === 'true' ?? LITCONFIG.TEST_ENV.debug,
    network: process.env.NETWORK ?? LITCONFIG.TEST_ENV.litNetwork,
  });

  await contractClient.connect();

  const rliTokenIdStr = '15';
  // const { rliTokenIdStr } = await contractClient.mintRLI({
  //   requestsPerDay: 14400, // 10 request per minute
  //   daysUntilUTCMidnightExpiration: 2,
  // });

  // console.log('rliTokenIdStr:', rliTokenIdStr);

  const litNodeClient = new LitNodeClient({
    litNetwork: process.env.NETWORK ?? LITCONFIG.TEST_ENV.litNetwork,
    debug: process.env.DEBUG === 'true' ?? LITCONFIG.TEST_ENV.debug,
    minNodeCount: undefined,
    checkNodeAttestation: process.env.CHECK_SEV ?? false,
  });

  await litNodeClient.connect();

  // we will create an delegation auth sig, which internally we will create
  // a recap object, add the resource "lit-ratelimitincrease://{tokenId}" to it, and add it to the siwe
  // message. We will then sign the siwe message with the dApp owner's wallet.
  const { rliDelegationAuthSig, litResource } =
    await litNodeClient.createRliDelegationAuthSig({
      dAppOwnerWallet: dAppOwnerWallet,
      rliTokenId: rliTokenIdStr,
      addresses: [dAppOwnerWallet_address, delegatedWalletB_address],
    });

  console.log('rliDelegationAuthSig:', rliDelegationAuthSig);
  console.log('litResource:', JSON.stringify(litResource));

  // ====================================================
  // =                  As an end user                  =
  // ====================================================

  // We need to setup a generic siwe auth callback that will be called by the lit-node-client
  const authNeededCallback = async ({ resources, expiration, uri }) => {
    console.log('XX resources:', resources);
    console.log('XX expiration:', expiration);
    console.log('XX uri:', uri);

    const message = new siwe.SiweMessage({
      domain: 'example.com',
      address: dAppOwnerWallet_address,
      statement: 'Sign a session key to use with Lit Protocol',
      uri,
      version: '1',
      chainId: '1',
      expirationTime: expiration,
      resources,
    });
    let toSign = message.prepareMessage();
    const signature = await dAppOwnerWallet.signMessage(toSign);

    toSign = toSign.replace(/\/\/n/g, '/n'); // note: might be serialisation issue

    const authSig = {
      sig: signature,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: toSign,
      address: dAppOwnerWallet_address,
    };

    return authSig;
  };

  // 1. When generating a session sigs, we need to specify the resourceAbilityRequests, which
  // is a list of resources and abilities that we want to be able to perform. In this case,
  // we want to be able to perform the ability "rate-limit-increase-auth" on the resource
  // "lit-ratelimitincrease://{tokenId}" that the dApp owner has delegated to us.
  // 2. We also included the rliDelegationAuthSig that we created earlier, which would be
  // added to the capabilities array in the signing template.
  let sessionSigs = await litNodeClient.getSessionSigs({
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
    chain: 'ethereum',
    resourceAbilityRequests: [
      {
        resource: new LitRLIResource(rliTokenIdStr),
        ability: LitAbility.RateLimitIncreaseAuth,
      },
    ],
    authNeededCallback,
    rliDelegationAuthSig,
  });

  console.log('XX sessionSigs:', sessionSigs);

  // -- now try to run lit action
  // errConstructorFunc {
  //   message: "auth_sig passed is invalid or couldn't be verified",
  //   errorCode: 'NodeInvalidAuthSig',
  //   errorKind: 'Validation',
  //   status: 401,
  //   details: [
  //     'validation error: Invalid URI for top level auth sig: lit:session:b27d3888442ea04e9f87d17272710942bbeb30fd344b18c66ece95affd29cce0'
  //   ]
  // }

  // Finally, we use the session sigs that includes the RLI delegation auth sig to sign
  const res = await litNodeClient.executeJs({
    // authSig: globalThis.LitCI.CONTROLLER_AUTHSIG,
    sessionSigs,
    code: `(async () => {
      const sigShare = await LitActions.signEcdsa({
        toSign: dataToSign,
        publicKey,
        sigName: "sig",
      });
    })();`,
    authMethods: [],
    jsParams: {
      dataToSign: ethers.utils.arrayify(
        ethers.utils.keccak256([1, 2, 3, 4, 5])
      ),
      publicKey: dAppOwnerWallet_pkpPublicKey,
    },
  });

  console.log('res:', res);

  process.exit();

  return fail(`Failed to get proof from Recap Session Capability`);
}

await testThis({ name: path.basename(import.meta.url), fn: main });
