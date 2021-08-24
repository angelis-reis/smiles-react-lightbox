import '@testing-library/jest-dom';

import { enableFetchMocks } from 'jest-fetch-mock';

// adicionar para que rode no cra
require('jest-canvas-mock');
require('jest-mock');

enableFetchMocks();

const smlsEnv = { smlsEnv: 'uat-5' };
Object.assign(global.window, smlsEnv);
