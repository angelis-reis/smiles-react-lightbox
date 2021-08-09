/* eslint-disable no-restricted-syntax */
import {
	Helpers,
	Config,
	Services,
	InitializeTypes,
	IFinalResponse
} from '@smiles/core-smiles';

const CoreHelpers = Helpers;
const CoreServices = Services;

const WINDOW = window as any;
let smlsEnv = WINDOW.smlsEnv as string;
if (smlsEnv.includes('uat')) smlsEnv = smlsEnv.replace(/uat/, 'hml');
const ENV_CORE = smlsEnv?.toLocaleUpperCase() || 'MOCK';

const configLib: InitializeTypes = {
	service: {
		environment: ENV_CORE as any,
		logger: false,
		timeout: 60000,
		region: 'Brasil'
	},
	channel: 'WEB',
	receiveConstants: true,
	loggerXstate: false
};

export const constants = {} as any;

export async function init(): Promise<void> {
	await Config.initialize(configLib);
}

export { CoreHelpers, CoreServices, Config };
export type { IFinalResponse };
