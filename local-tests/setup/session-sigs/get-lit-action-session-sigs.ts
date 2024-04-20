import { LitActionResource, LitPKPResource } from '@lit-protocol/auth-helpers';
import { LitAbility, LitResourceAbilityRequest } from '@lit-protocol/types';
import { LitNetwork } from '@lit-protocol/constants';
import { Person, TinnyEnvironment } from '../tinny';

const VALID_SESSION_SIG_LIT_ACTION_CODE = `
// Works with an AuthSig AuthMethod
if (Lit.Auth.authMethodContexts.some(e => e.authMethodType === 1)) {
  LitActions.setResponse({ response: "true" });
} else {
  LitActions.setResponse({ response: "false" });
}
`;

const INVALID_SESSION_SIG_LIT_ACTION_CODE = `
(async () => {
  let utf8Encode = new TextEncoder();
  const toSign = utf8Encode.encode('This message is exactly 32 bytes');
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
})();
`;

export const getLitActionSessionSigs = async (
  devEnv: TinnyEnvironment,
  alice: Person,
  resourceAbilityRequests?: LitResourceAbilityRequest[]
) => {
  if (devEnv.litNodeClient.config.litNetwork === LitNetwork.Manzano) {
    console.warn(
      'Manzano network detected. Adding capacityDelegationAuthSig to litActionSessionSigs'
    );
  }

  // Use default resourceAbilityRequests if not provided
  const _resourceAbilityRequests = resourceAbilityRequests || [
    {
      resource: new LitPKPResource('*'),
      ability: LitAbility.PKPSigning,
    },
    {
      resource: new LitActionResource('*'),
      ability: LitAbility.LitActionExecution,
    },
  ];

  const litActionSessionSigs = await devEnv.litNodeClient.getPkpSessionSigs({
    pkpPublicKey: alice.authMethodOwnedPkp.publicKey,
    authMethods: [alice.authMethod],
    resourceAbilityRequests: _resourceAbilityRequests,
    litActionCode: Buffer.from(VALID_SESSION_SIG_LIT_ACTION_CODE).toString(
      'base64'
    ),
    jsParams: {
      publicKey: alice.authMethodOwnedPkp.publicKey,
      sigName: 'unified-auth-sig',
    },

    // -- only add this for manzano network
    ...(devEnv.litNodeClient.config.litNetwork === LitNetwork.Manzano
      ? { capacityDelegationAuthSig: devEnv.superCapacityDelegationAuthSig }
      : {}),
  });

  return litActionSessionSigs;
};

export const getInvalidLitActionSessionSigs = async (
  devEnv: TinnyEnvironment,
  alice: Person
) => {
  const litActionSessionSigs = await devEnv.litNodeClient.getPkpSessionSigs({
    pkpPublicKey: alice.authMethodOwnedPkp.publicKey,
    authMethods: [alice.authMethod],
    resourceAbilityRequests: [
      {
        resource: new LitPKPResource('*'),
        ability: LitAbility.PKPSigning,
      },
    ],
    litActionCode: Buffer.from(INVALID_SESSION_SIG_LIT_ACTION_CODE).toString(
      'base64'
    ),
    jsParams: {
      publicKey: alice.authMethodOwnedPkp.publicKey,
      sigName: 'unified-auth-sig',
    },
  });

  return litActionSessionSigs;
};
