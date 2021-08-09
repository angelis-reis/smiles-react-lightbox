import { IFinalResponse, CoreServices } from '../core/index';
import { IHeadlessResponse } from '../../services/types/index';

interface Content {
	modalTitle: string;
	modalText: string;
}

const getTerms = async (): Promise<IFinalResponse> => {
	const data = CoreServices.UtilsServices.findHeadlessDelivery({
		flatter: true,
		filter: [
			{
				param: 'friendlyUrlPath',
				conditional: 'eq',
				value: 'lgpd_politica_cookies'
			}
		]
	});
	return data;
};

export const asyncGetTerms = async () => {
	const response = await getTerms();
	const data = response.data as Array<IHeadlessResponse>;
	if (!data.length) return;
	let title: string = '';
	let style: string = '';
	let content: string = '';

	data[0].contentFields.forEach((innerContent: any) => {
		const { name, contentFieldValue } = innerContent;
		if (name === 'headline') {
			title = String(innerContent.contentFieldValue.data);
		}
		if (name === 'stylesheetWeb') {
			style = String(innerContent.contentFieldValue.data);
		}
		if (name === 'content') {
			content = String(innerContent.contentFieldValue.data);
		}
	});
	let styleString = ` <style> ${style} </style>`;
	let completeHtml = styleString.concat(content);
	let modalContent: Content = {
		modalTitle: title,
		modalText: completeHtml
	};
	return modalContent;
};
