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
	redirectPath: string,
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
		redirectPath: '',
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
			content.titleContentName = innerContent.contentFieldValue.data;
		}
		if (name === 'htmlContentName') {
			content.htmlContentName = innerContent.contentFieldValue.data;
		}
		if (name === 'buttonColor') {
			content.buttonColor = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonAction') {
			content.confirmButtonAction = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonActionParams') {
			content.confirmButtonActionParams =
				innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonText') {
			content.confirmButtonText = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmButtonType') {
			content.confirmButtonType = innerContent.contentFieldValue.data;
		}
		if (name === 'helpButtonAction') {
			content.helpButtonAction = innerContent.contentFieldValue.data;
		}
		if (name === 'helpButtonText') {
			content.helpButtonText = innerContent.contentFieldValue.data;
		}
		if (name === 'Selecionarnusu') {
			content.helpButtonType = innerContent.contentFieldValue.data;
		}
		if (name === 'hasConfirmCheckbox') {
			content.hasConfirmCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'confirmCheckbox') {
			content.confirmCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'hasOptOutCheckbox') {
			content.hasOptOutCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'optOutCheckbox') {
			content.optOutCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'optOutCheckbox') {
			content.optOutCheckbox = innerContent.contentFieldValue.data;
		}
		if (name === 'cookieName') {
			content.cookieName = innerContent.contentFieldValue.data;
		}
		if (name === 'cookiePeriod') {
			content.cookiePeriod = innerContent.contentFieldValue.data;
		}
		if (name === 'hasPromotionalCards') {
			content.hasPromotionalCards = innerContent.contentFieldValue.data;
		}
	});
	return content;
};
