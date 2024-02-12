/// <reference types="jest" />

import {
  messageHex,
  publicKeyHex,
  shares,
  signatureHex,
} from './frost-data.spec.json';
import { frostCombine, frostVerify, init } from './ng';

const message = Buffer.from(messageHex, 'hex');
const publicKey = Buffer.from(publicKeyHex, 'hex');
const signature = Buffer.from(signatureHex, 'hex');

describe('FROST', () => {
  beforeEach(async () => {
    await init();
  });

  it('should sign and verify', () => {
    expect(
      Buffer.from(
        frostCombine(
          'Ed25519Sha512',
          message,
          publicKey,
          shares.map((s) => Buffer.from(s.identifierHex, 'hex')),
          shares.map((s) => Buffer.from(s.hidingNonceHex, 'hex')),
          shares.map((s) => Buffer.from(s.bindingNonceHex, 'hex')),
          shares.map((s) => Buffer.from(s.signatureShareHex, 'hex')),
          shares.map((s) => Buffer.from(s.verifyingShareHex, 'hex'))
        )
      )
    ).toEqual(signature);

    frostVerify('Ed25519Sha512', message, publicKey, signature);
  });

  it('should reject invalid signatures', () => {
    const invalidSignature = Buffer.from(signature);
    invalidSignature[0] ^= 0x01;
    expect(() =>
      frostVerify('Ed25519Sha512', message, publicKey, invalidSignature)
    ).toThrow();
  });
});
