/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import { hexToUint8, uint8ToHex, xor } from './utils';

const encoder = () => new TextEncoder();
const NAMESPACE = 'identity.mozilla.com/picl/v1/';

type hexstring = string;

// These functions implement the onepw protocol
// https://github.com/mozilla/fxa-auth-server/wiki/onepw-protocol

export async function getCredentials(email: string, password: string) {
  const passkey = await crypto.subtle.importKey(
    'raw',
    encoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const quickStretchedRaw = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder().encode(`${NAMESPACE}quickStretch:${email}`),
      iterations: 1000,
      hash: 'SHA-256',
    },
    passkey,
    256
  );
  const quickStretchedKey = await crypto.subtle.importKey(
    'raw',
    quickStretchedRaw,
    'HKDF',
    false,
    ['deriveBits']
  );
  const authPW = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      salt: new Uint8Array(0),
      // The builtin ts type definition for HKDF was wrong
      // at the time this was written, hence the ignore
      // @ts-ignore
      info: encoder().encode(`${NAMESPACE}authPW`),
      hash: 'SHA-256',
    },
    quickStretchedKey,
    256
  );
  const unwrapBKey = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      salt: new Uint8Array(0),
      // @ts-ignore
      info: encoder().encode(`${NAMESPACE}unwrapBkey`),
      hash: 'SHA-256',
    },
    quickStretchedKey,
    256
  );
  return {
    authPW: uint8ToHex(new Uint8Array(authPW)),
    unwrapBKey: uint8ToHex(new Uint8Array(unwrapBKey)),
  };
}

export async function deriveBundleKeys(
  key: hexstring,
  keyInfo: string,
  payloadBytes: number = 64
) {
  const baseKey = await crypto.subtle.importKey(
    'raw',
    hexToUint8(key),
    'HKDF',
    false,
    ['deriveBits']
  );
  const keyMaterial = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      salt: new Uint8Array(0),
      // @ts-ignore
      info: encoder().encode(`${NAMESPACE}${keyInfo}`),
      hash: 'SHA-256',
    },
    baseKey,
    (32 + payloadBytes) * 8
  );
  const hmacKey = await crypto.subtle.importKey(
    'raw',
    new Uint8Array(keyMaterial, 0, 32),
    {
      name: 'HMAC',
      hash: 'SHA-256',
      length: 256,
    },
    true,
    ['verify']
  );
  const xorKey = new Uint8Array(keyMaterial, 32);
  return {
    hmacKey,
    xorKey,
  };
}

export async function unbundleKeyFetchResponse(
  key: hexstring,
  bundle: hexstring
) {
  const b = hexToUint8(bundle);
  const keys = await deriveBundleKeys(key, 'account/keys');
  const ciphertext = b.subarray(0, 64);
  const expectedHmac = b.subarray(b.byteLength - 32);
  const valid = await crypto.subtle.verify(
    'HMAC',
    keys.hmacKey,
    expectedHmac,
    ciphertext
  );
  if (!valid) {
    throw new Error('Bad HMac');
  }
  const keyAWrapB = xor(ciphertext, keys.xorKey);
  return {
    kA: uint8ToHex(keyAWrapB.subarray(0, 32)),
    wrapKB: uint8ToHex(keyAWrapB.subarray(32)),
  };
}

export function unwrapKB(wrapKB: hexstring, unwrapBKey: hexstring) {
  return uint8ToHex(xor(hexToUint8(wrapKB), hexToUint8(unwrapBKey)));
}

export async function checkWebCrypto() {
  try {
    await crypto.subtle.importKey(
      'raw',
      crypto.getRandomValues(new Uint8Array(16)),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    await crypto.subtle.importKey(
      'raw',
      crypto.getRandomValues(new Uint8Array(32)),
      'HKDF',
      false,
      ['deriveKey']
    );
    await crypto.subtle.importKey(
      'raw',
      crypto.getRandomValues(new Uint8Array(32)),
      {
        name: 'HMAC',
        hash: 'SHA-256',
        length: 256,
      },
      false,
      ['sign']
    );
    await crypto.subtle.digest(
      'SHA-256',
      crypto.getRandomValues(new Uint8Array(16))
    );
    return true;
  } catch (err) {
    try {
      console.warn('loading webcrypto shim', err);
      // prettier-ignore
      // @ts-ignore
      window.asmCrypto = await import(/* webpackChunkName: "asmcrypto.js" */ 'asmcrypto.js');
      // prettier-ignore
      // @ts-ignore
      await import(/* webpackChunkName: "webcrypto-liner" */ 'webcrypto-liner');
      return true;
    } catch (e) {
      return false;
    }
  }
}
