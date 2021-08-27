import { IFinalResponse, CoreServices } from '../core/index';
import { IHeadlessResponse } from '../types/index';

interface Cards {
	iconPath: string;
	imagePath: string;
	promotion: string;
	flyDestiny: string;
	flyOrigin: string;
	flyPrice: string;
	redirectPath: string;
}

interface Content {
	hasLogo: string;
	logoPath: string;
	titleContentName: string;
	htmlContentName: string;
	buttonColor: string;
	confirmButtonAction: string;
	confirmButtonText: string;
	confirmButtonType: string;
	helpButtonAction: string;
	confirmButtonActionParams: string;
	helpButtonText: string;
	helpButtonType: string;
	hasConfirmCheckbox: string;
	confirmCheckbox: string;
	hasOptOutCheckbox: string;
	optOutCheckbox: string;
	hasPromotionalCards: string;
	promotionalCards: Cards[];
	cookieName: string;
	cookiePeriod: number;
}

const getContent = async (): Promise<IFinalResponse> => {
	const data = CoreServices.UtilsServices.findHeadlessDelivery({
		flatter: true,
		filter: [
			{
				param: 'friendlyUrlPath',
				conditional: 'eq',
				value: 'lbox_club2000mensalpromo'
			}
		]
	});
	return data;
};

export const asyncGetContent = async () => {
	const response = await getContent();
	const data = response.data as Array<IHeadlessResponse>;

	if (!data.length) return;

	let promotionalCard: Cards = {
		iconPath: '',
		imagePath: '',
		promotion: '',
		flyDestiny: '',
		flyOrigin: '',
		flyPrice: '',
		redirectPath: ''
	};

	let content: Content = {
		hasLogo: '',
		logoPath: '',
		titleContentName: '',
		htmlContentName: '',
		buttonColor: '',
		confirmButtonAction: '',
		confirmButtonActionParams: '',
		confirmButtonText: '',
		confirmButtonType: '',
		helpButtonAction: '',
		helpButtonText: '',
		helpButtonType: '',
		hasConfirmCheckbox: '',
		confirmCheckbox: '',
		hasOptOutCheckbox: '',
		optOutCheckbox: '',
		hasPromotionalCards: '',
		promotionalCards: [],
		cookieName: '',
		cookiePeriod: 0
	};

	data[0].contentFields.forEach((innerContent: any) => {
		const { name } = innerContent;

		if (name === 'promotionalCards') {
			const cards: any = innerContent.nestedContentFields;

			cards.forEach((cardContent: any) => {
				const card = cardContent;
				const cardItem = card.nestedContentFields;

				cardItem.forEach((cardItemInnerContent: any) => {
					const { name } = cardItemInnerContent;

					if (name === 'iconPath') {
						promotionalCard.iconPath =
							cardItemInnerContent.contentFieldValue.document.contentUrl;
					}
					if (name === 'imagePath') {
						promotionalCard.imagePath =
							cardItemInnerContent.contentFieldValue.document.contentUrl;
					}
					if (name === 'promotion') {
						promotionalCard.promotion =
							cardItemInnerContent.contentFieldValue.data;
					}
					if (name === 'flyDestiny') {
						promotionalCard.flyDestiny =
							cardItemInnerContent.contentFieldValue.data;
					}
					if (name === 'flyOrigin') {
						promotionalCard.flyOrigin =
							cardItemInnerContent.contentFieldValue.data;
					}
					if (name === 'flyPrice') {
						promotionalCard.flyPrice =
							cardItemInnerContent.contentFieldValue.data;
					}
				});
				content.promotionalCards.push(promotionalCard);
			});
		}
		if (name === 'hasLogo') {
			content.hasLogo = innerContent.contentFieldValue.data;
		}
		if (name === 'logoPath') {
			content.logoPath =
				innerContent.contentFieldValue.document.contentUrl;
		}
		if (name === 'titleContentName') {
			// console.log('Koca: haslogo', );
			content.titleContentName = innerContent.contentFieldValue.data;
		}
		if (name === 'htmlContentName') {
			// console.log('Koca: haslogo', );
			content.htmlContentName = innerContent.contentFieldValue.data;
		}
		if (name === 'buttonColor') {
			// console.log('Koca: haslogo', );
			content.buttonColor = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonAction') {
			// console.log('Koca: haslogo', );
			content.confirmButtonAction = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonActionParams') {
			// console.log('Koca: haslogo', );
			content.confirmButtonActionParams =
				innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonText') {
			// console.log('Koca: haslogo', );
			content.confirmButtonText = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonType') {
			// console.log('Koca: haslogo', );
			content.confirmButtonType = innerContent.contentFieldValue.data;
		}
		if (name === 'helpButtonAction') {
			// console.log('Koca: haslogo', );
			content.helpButtonAction = innerContent.contentFieldValue.data;
		}
		if (name === 'helpButtonText') {
			// console.log('Koca: haslogo', );
			content.helpButtonText = innerContent.contentFieldValue.data;
		}
		if (name === 'Selecionarnusu') {
			// console.log('Koca: haslogo', );
			content.helpButtonType = innerContent.contentFieldValue.data;
		}
		if (name === 'hasConfirmCheckbox') {
			// console.log('Koca: haslogo', );
			content.hasConfirmCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmCheckbox') {
			// console.log('Koca: haslogo', );
			content.confirmCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'hasOptOutCheckbox') {
			// console.log('Koca: haslogo', );
			content.hasOptOutCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'optOutCheckbox') {
			// console.log('Koca: haslogo', );
			content.optOutCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'optOutCheckbox') {
			// console.log('Koca: haslogo', );
			content.optOutCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'cookieName') {
			// console.log('Koca: haslogo', );
			content.cookieName = innerContent.contentFieldValue.data;
		}
		if (name === 'cookiePeriod') {
			// console.log('Koca: haslogo', );
			content.cookiePeriod = innerContent.contentFieldValue.data;
		}
		if (name === 'hasPromotionalCards') {
			// console.log('Koca: haslogo', );
			content.hasPromotionalCards = innerContent.contentFieldValue.data;
		}
	});
	return content;
};
