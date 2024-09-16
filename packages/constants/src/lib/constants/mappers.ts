import depd from 'depd';

import {
  cayenne,
  manzano,
  habanero,
  datilDev,
  datilTest,
  datil,
} from '@lit-protocol/contracts';

import { LIT_NETWORK_VALUES } from './constants';

const deprecated = depd('lit-js-sdk:constants:mappers');

/**
 * Mapping of network context by network value.
 */
export const NETWORK_CONTEXT_BY_NETWORK: {
  [key in LIT_NETWORK_VALUES]:
    | typeof cayenne
    | typeof manzano
    | typeof habanero
    | typeof datilDev
    | typeof datilTest
    | typeof datil;
} = {
  cayenne: cayenne,
  manzano: manzano,
  habanero: habanero,
  'datil-dev': datilDev,
  'datil-test': datilTest,
  datil: datil,

  // just use datil dev abis for custom
  custom: datilDev,
} as const;

export const GLOBAL_OVERWRITE_IPFS_CODE_BY_NETWORK: {
  [key in LIT_NETWORK_VALUES]: boolean;
} = {
  cayenne: false,
  manzano: false,
  habanero: true,
  'datil-dev': false,
  'datil-test': false,
  datil: false,
  custom: false,
};
