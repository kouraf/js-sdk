import { FetchKeyParams, ListKeysParams, StoreKeyParams } from './types';
import { generateRequestId, getBaseRequestParams, makeRequest } from './utils';
import {
  StoredKeyData,
  StoredKeyMetadata,
  StoreEncryptedKeyResult,
} from '../types';
import { getPkpAddressFromSessionSig } from '../utils';

/** Fetches previously stored private key metadata from the wrapped keys service.
 * Note that this list will not include `cipherText` or `dataToEncryptHash` necessary to decrypt the keys.
 * Use `fetchPrivateKey()` to get those values.
 *
 * @param { FetchKeyParams } params Parameters required to fetch the private key metadata
 * @returns { Promise<StoredKeyMetadata[]> } The private key metadata object
 */
export async function listPrivateKeyMetadata(
  params: ListKeysParams
): Promise<StoredKeyMetadata[]> {
  const { litNetwork, sessionSig } = params;

  const { baseUrl, initParams } = getBaseRequestParams({
    litNetwork,
    sessionSig,
    method: 'GET',
  });

  const pkpAddress = getPkpAddressFromSessionSig(sessionSig);

  const requestId = generateRequestId();
  const url = new URL(`${baseUrl}/${pkpAddress}`);
  url.searchParams.set('requestId', requestId);

  return makeRequest<StoredKeyMetadata[]>({
    url: url.toString(),
    init: initParams,
    requestId,
  });
}

/** Fetches complete previously stored private key data from the wrapped keys service.
 * Includes the `ciphertext` and `dataToEncryptHash` necessarily to decrypt the key.
 *
 * @param { FetchKeyParams } params Parameters required to fetch the private key data
 * @returns { Promise<StoredKeyData> } The private key metadata object
 */
export async function fetchPrivateKey(
  params: FetchKeyParams
): Promise<StoredKeyData> {
  const { litNetwork, sessionSig, id } = params;

  const { baseUrl, initParams } = getBaseRequestParams({
    litNetwork,
    sessionSig,
    method: 'GET',
  });
  const pkpAddress = getPkpAddressFromSessionSig(sessionSig);

  const requestId = generateRequestId();

  const url = new URL(`${baseUrl}/${pkpAddress}/${id}`);
  url.searchParams.set('requestId', requestId);
  return makeRequest<StoredKeyData>({
    url: url.toString(),
    init: initParams,
    requestId,
  });
}

/** Stores private key metadata into the wrapped keys service backend
 *
 * @param { StoreKeyParams } params Parameters required to store the private key metadata
 * @returns { Promise<StoreEncryptedKeyResult> } `true` on successful write to the service. Otherwise, this method throws an error.
 */
export async function storePrivateKey(
  params: StoreKeyParams
): Promise<StoreEncryptedKeyResult> {
  const { litNetwork, sessionSig, storedKeyMetadata } = params;

  const { baseUrl, initParams } = getBaseRequestParams({
    litNetwork,
    sessionSig,
    method: 'POST',
  });
  const requestId = generateRequestId();

  const { pkpAddress, id } = await makeRequest<StoreEncryptedKeyResult>({
    url: baseUrl,
    init: {
      ...initParams,
      body: JSON.stringify({ ...storedKeyMetadata, requestId }),
    },
    requestId,
  });

  return { pkpAddress, id };
}
