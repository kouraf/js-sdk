import { LitNodeClient } from './lit-node-client';
import * as LITCONFIG from 'lit.config.json';
import { processTx } from '../../../../tx-handler';
import { AuthSig } from '@lit-protocol/types';
import { ethers } from 'ethers';
import { SIGTYPE } from '@lit-protocol/constants';
import { AuthMethodType } from '../../../types/src/lib/enums';
let client: LitNodeClient;

jest.setTimeout(60000);

describe('Lit Actions', () => {
  client = new LitNodeClient({
    litNetwork: 'cayenne',
    debug: true
  });

  beforeAll(async () => {
    await client.connect();
  });

  it('should be connected', () => {
    expect(client.ready).toBe(true);
  });

  it('lit action log should return hello world', async () => {
    const res = await processTx(
      expect.getState().currentTestName,
      await client.executeJs({
        authSig: LITCONFIG.CONTROLLER_AUTHSIG,
        code: `(async () => {
          console.log('hello world')
        })();`,
        jsParams: {
          publicKey: LITCONFIG.PKP_PUBKEY,
        },
      })
    );

    expect(res.logs).toContain('hello world');
  });

  it('lit action response should return json {hello: "world"}', async () => {
    const res = await processTx(
      expect.getState().currentTestName,
      await client.executeJs({
        authSig: LITCONFIG.CONTROLLER_AUTHSIG,
        code: `(async () => {
            LitActions.setResponse({
              response: JSON.stringify({hello: 'world'})
            });
          })();`,
        jsParams: {
          publicKey: LITCONFIG.PKP_PUBKEY,
        },
      })
    );

    expect(res.response).toEqual({ hello: 'world' });
  });

  it('lit action should sign a message', async () => {
    const res = await processTx(
      expect.getState().currentTestName,
      await client.executeJs({
        authSig: LITCONFIG.CONTROLLER_AUTHSIG,
        code: `(async () => {
            const sigShare = await LitActions.signEcdsa({
              toSign,
              publicKey,
              sigName
            });
          })();`,
        jsParams: {
          // hello world in Uint8Array
          toSign: [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
          publicKey: LITCONFIG.PKP_PUBKEY,
          sigName: 'hello-world-sig',
        },
      })
    );

    expect(res.signatures['hello-world-sig']).toBeDefined();
    expect(res.signatures['hello-world-sig'].publicKey).toEqual(
      LITCONFIG.PKP_PUBKEY
    );
  });

  it('pkp sign endpoint should sign message', async () => {
    const data = {
      // hello world in Uint8Array
      toSign: [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
      publicKey: LITCONFIG.PKP_PUBKEY,
      sigName: 'hello-world-sig',
    };

    let sig = await client.pkpSign({
      toSign: data.toSign,
      pubKey: data.publicKey,
      authMethods: [],
      authSig: LITCONFIG.CONTROLLER_AUTHSIG,
    });

    // add padding
    sig.publicKey =
      sig.publicKey.length % 2 == 0 ? sig.publicKey : '0' + sig.publicKey;
    expect(sig.publicKey).toBeDefined();
  });

  
  it('should claim key id from auth method', async () => {
    /*
    let res = await client.claimKeyId({
      authMethod: {
        authMethodType: 6,
        accessToken:
          LITCONFIG.AUTH_METHOD_ACCESS_TOKEN
      }
    });
    */
    const data = {
      // hello world in Uint8Array
      toSign: [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
      publicKey: LITCONFIG.PKP_PUBKEY,
      sigName: 'hello-world-sig',
    };

    let sig = await client.pkpSign({
      toSign: data.toSign,
      pubKey: "0450b6e7be0fec43784126dea8d5996fdf736b405007bdb215b6a01712b3a5da44b00c71b47d39c380800a046cdb75bdfd2f39454a95755d7bcdf195ad0bc35dd0",
      authMethods: [{
        authMethodType: 6,
        accessToken: LITCONFIG.AUTH_METHOD_ACCESS_TOKEN 
      }],
      authSig: LITCONFIG.CONTROLLER_AUTHSIG,
    });

    expect(sig.publicKey.toLowerCase()).toEqual("02f7139d7b4290be04c83c3dd6cdd6a84a76f29f22b79a33e996f0649d17c078df".toLowerCase());
  }, 20_0000);
});
