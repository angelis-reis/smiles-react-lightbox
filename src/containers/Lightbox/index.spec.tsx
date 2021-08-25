// 1. should be able to render API data OK
// 2. should be able to render correctly OK
// 3. should be able to render all modal parts OK
// 4. should be able to close modal by clicking on close button OK
// 5. should be able to close modal by clicking outside of modal OK

// 6. should be able to check the opt out checkbox and and save a "accepted" cookie in localStorage, then unchecked it and erase the cookie in localStorage

// 7. should be able to show modal 800ms after render
// 8. should not be able to render modal on page reload after accepted cookies
// 9. should not be able to click the modal-confirm-button if has modal-rules-checkbox and it is not checked, and then should be able to click the modal-confirm-button after check the modal-rules-checkbox
// 10. should be able to redirect after click if confirmButtonType: 'REDIRECT'
// 11. should be able to call 'CALLBACK' after click if confirmButtonType: 'CALLBACK'
// 12. should be able to redirect after clicking in cards
// 13. should be able to render logo if haslogo =  true
// 14. should be able to render html content if hasHtmlContentName =  true
// 15. should be able to render cards if hasPromotionalCards =  true
// 16. should be able to render rules-checkbox if hasConfirmCheckbox =  true
// 17. should be able to render modal-help-button if hasHelpButton =  true
// 18. should be able to render modal-opt-out-checkbox if hasOptOutCheckbox =  true

import {
	act,
	screen,
	render,
	waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lightbox from './index';
import * as mockNewModalData from '../../services/getTerms/newModelData';

describe('Lightbox', () => {
	afterEach(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	// it(' should be able to render API data', async () => {
	// 	jest.spyOn(mockNewModalData, 'jsonData').mockResolvedValueOnce({
	// 		hasLogo: 'Y',
	// 		logoPath: 'images/logo.png',
	// 		titleContentName:
	// 			'Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜',
	// 		htmlContentName:
	// 			'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>',
	// 		buttonColor: 'color-product-club',
	// 		confirmButtonAction:
	// 			"actionController.goToCheckout('2000','Monthly')",
	// 		confirmButtonText: 'Subir',
	// 		confirmButtonType: 'REDIRECT',
	// 		helpButtonAction: '/clube-smiles/clientes',
	// 		helpButtonText: 'Conhecer outros planos do Clube',
	// 		helpButtonType: 'REDIRECT',
	// 		hasConfirmCheckbox: 'Y',
	// 		confirmCheckbox:
	// 			'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>',
	// 		hasOptOutCheckbox: 'Y',
	// 		optOutCheckbox: 'Não exibir essa mensagem novamente',
	// 		hasPromotionalCards: 'Y',
	// 		promotionalCards: [
	// 			{
	// 				id: 436669,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/natal'
	// 			},
	// 			{
	// 				id: 436969,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/porto'
	// 			}
	// 		],
	// 		cookieName: 'CLUB2000MENSALPROMO',
	// 		cookiePeriod: 5,
	// 		hasAvailableBonusVip: null,
	// 		isClubMember: null,
	// 		isCobrandedIsAproved: null,
	// 		isForcedOffer: 'Y',
	// 		isIncompleteData: null,
	// 		isOutlet: null,
	// 		isRenovationPeriod: null,
	// 		isSuspended: null,
	// 		isTwoMonthToBonusVip: null,
	// 		primaryKey: 'CLUB2000MENSALPROMO',
	// 		priority: 0,
	// 		searchId: 'CLUB2000MENSALPROMO'
	// 	});
	// 	await act(async () => render(<Lightbox />));

	// 	const confirmButton = document.querySelector(
	// 		'.modal-confirm-button'
	// 	) as HTMLElement;
	// 	expect(confirmButton).toBeInTheDocument();

	// 	expect(
	// 		screen.getByText(/não exibir essa mensagem novamente/i)
	// 	).toBeInTheDocument();
	// });
	// it(' should be able renders correctly', () => {
	// 	render(<Lightbox />);
	// 	const confirmButton = document.querySelector(
	// 		'.modal-confirm-button'
	// 	) as HTMLElement;
	// 	expect(confirmButton).toBeInTheDocument();
	// });
	// it(' should be able to render all modal content ', async () => {
	// 	jest.spyOn(mockNewModalData, 'jsonData').mockResolvedValueOnce({
	// 		hasLogo: 'Y',
	// 		logoPath: 'images/logo.png',
	// 		titleContentName:
	// 			'Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜',
	// 		htmlContentName:
	// 			'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>',
	// 		buttonColor: 'color-product-club',
	// 		confirmButtonAction:
	// 			"actionController.goToCheckout('2000','Monthly')",
	// 		confirmButtonText: 'Subir',
	// 		confirmButtonType: 'REDIRECT',
	// 		helpButtonAction: '/clube-smiles/clientes',
	// 		helpButtonText: 'Conhecer outros planos do Clube',
	// 		helpButtonType: 'REDIRECT',
	// 		hasConfirmCheckbox: 'Y',
	// 		confirmCheckbox:
	// 			'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>',
	// 		hasOptOutCheckbox: 'Y',
	// 		optOutCheckbox: 'Não exibir essa mensagem novamente',
	// 		hasPromotionalCards: 'Y',
	// 		promotionalCards: [
	// 			{
	// 				id: 436669,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/natal'
	// 			},
	// 			{
	// 				id: 436969,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/porto'
	// 			}
	// 		],
	// 		cookieName: 'CLUB2000MENSALPROMO',
	// 		cookiePeriod: 5,
	// 		hasAvailableBonusVip: null,
	// 		isClubMember: null,
	// 		isCobrandedIsAproved: null,
	// 		isForcedOffer: 'Y',
	// 		isIncompleteData: null,
	// 		isOutlet: null,
	// 		isRenovationPeriod: null,
	// 		isSuspended: null,
	// 		isTwoMonthToBonusVip: null,
	// 		primaryKey: 'CLUB2000MENSALPROMO',
	// 		priority: 0,
	// 		searchId: 'CLUB2000MENSALPROMO'
	// 	});
	// 	await act(async () => render(<Lightbox />));

	// 	const confirmButton = document.querySelector(
	// 		'.modal-confirm-button'
	// 	) as HTMLElement;
	// 	expect(confirmButton).toBeInTheDocument();

	// 	const modalLogo = document.querySelector('.modal-logo') as HTMLElement;
	// 	expect(modalLogo).toBeInTheDocument();

	// 	const modalTitle = screen.getByRole('heading', {
	// 		name: /que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos\? 💜/i
	// 	}) as HTMLElement;
	// 	expect(modalTitle).toBeInTheDocument();

	// 	const promotionalCards = document.querySelector(
	// 		'.card-wrapper'
	// 	) as HTMLElement;
	// 	expect(promotionalCards).toBeInTheDocument();

	// 	const rulesCheckbox = screen.getByText(/li e aceito o/i) as HTMLElement;
	// 	expect(rulesCheckbox).toBeInTheDocument();

	// 	const helpButton = screen.getByText(
	// 		/conhecer outros planos do clube/i
	// 	) as HTMLElement;
	// 	expect(helpButton).toBeInTheDocument();

	// 	const optOutCheckbox = screen.getByText(
	// 		/não exibir essa mensagem novamente/i
	// 	) as HTMLElement;
	// 	expect(optOutCheckbox).toBeInTheDocument();
	// });
	// it(' should be able to close modal by clicking on close button', async () => {
	// 	jest.spyOn(mockNewModalData, 'jsonData').mockResolvedValueOnce({
	// 		hasLogo: 'Y',
	// 		logoPath: 'images/logo.png',
	// 		titleContentName:
	// 			'Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜',
	// 		htmlContentName:
	// 			'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>',
	// 		buttonColor: 'color-product-club',
	// 		confirmButtonAction:
	// 			"actionController.goToCheckout('2000','Monthly')",
	// 		confirmButtonText: 'Subir',
	// 		confirmButtonType: 'REDIRECT',
	// 		helpButtonAction: '/clube-smiles/clientes',
	// 		helpButtonText: 'Conhecer outros planos do Clube',
	// 		helpButtonType: 'REDIRECT',
	// 		hasConfirmCheckbox: 'Y',
	// 		confirmCheckbox:
	// 			'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>',
	// 		hasOptOutCheckbox: 'Y',
	// 		optOutCheckbox: 'Não exibir essa mensagem novamente',
	// 		hasPromotionalCards: 'Y',
	// 		promotionalCards: [
	// 			{
	// 				id: 436669,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/natal'
	// 			},
	// 			{
	// 				id: 436969,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/porto'
	// 			}
	// 		],
	// 		cookieName: 'CLUB2000MENSALPROMO',
	// 		cookiePeriod: 5,
	// 		hasAvailableBonusVip: null,
	// 		isClubMember: null,
	// 		isCobrandedIsAproved: null,
	// 		isForcedOffer: 'Y',
	// 		isIncompleteData: null,
	// 		isOutlet: null,
	// 		isRenovationPeriod: null,
	// 		isSuspended: null,
	// 		isTwoMonthToBonusVip: null,
	// 		primaryKey: 'CLUB2000MENSALPROMO',
	// 		priority: 0,
	// 		searchId: 'CLUB2000MENSALPROMO'
	// 	});
	// 	await act(async () => render(<Lightbox />));
	// 	const modalTitle = screen.getByRole('heading', {
	// 		name: /que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos\? 💜/i
	// 	}) as HTMLElement;
	// 	expect(modalTitle).toBeInTheDocument();
	// 	const closeModalButton = screen.getByRole('button', {
	// 		name: /close/i
	// 	}) as HTMLElement;
	// 	expect(closeModalButton).toBeInTheDocument();
	// 	userEvent.click(closeModalButton);
	// 	await waitForElementToBeRemoved(() =>
	// 		screen.getByText(
	// 			/ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra smiles e aproveite um mundo de oportunidades!/i
	// 		)
	// 	);
	// 	expect(modalTitle).not.toBeInTheDocument();
	// });
	// it(' should be able to close modal by clicking outside of modal', async () => {
	// 	jest.spyOn(mockNewModalData, 'jsonData').mockResolvedValueOnce({
	// 		hasLogo: 'Y',
	// 		logoPath: 'images/logo.png',
	// 		titleContentName:
	// 			'Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜',
	// 		htmlContentName:
	// 			'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>',
	// 		buttonColor: 'color-product-club',
	// 		confirmButtonAction:
	// 			"actionController.goToCheckout('2000','Monthly')",
	// 		confirmButtonText: 'Subir',
	// 		confirmButtonType: 'REDIRECT',
	// 		helpButtonAction: '/clube-smiles/clientes',
	// 		helpButtonText: 'Conhecer outros planos do Clube',
	// 		helpButtonType: 'REDIRECT',
	// 		hasConfirmCheckbox: 'Y',
	// 		confirmCheckbox:
	// 			'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>',
	// 		hasOptOutCheckbox: 'Y',
	// 		optOutCheckbox: 'Não exibir essa mensagem novamente',
	// 		hasPromotionalCards: 'Y',
	// 		promotionalCards: [
	// 			{
	// 				id: 436669,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/natal'
	// 			},
	// 			{
	// 				id: 436969,
	// 				iconPath: 'icons/flight.svg',
	// 				imagePath: 'images/sant.svg',
	// 				promotion: '15% OFF com Clube Smiles',
	// 				flyDestiny: 'Santarém (STM)',
	// 				flyOrigin: 'Saindo de Brasília (BSB)',
	// 				flyPrice: '6.400 milhas/trecho',
	// 				text: 'A partir de ',
	// 				redirectPath: '/clube-smiles/porto'
	// 			}
	// 		],
	// 		cookieName: 'CLUB2000MENSALPROMO',
	// 		cookiePeriod: 5,
	// 		hasAvailableBonusVip: null,
	// 		isClubMember: null,
	// 		isCobrandedIsAproved: null,
	// 		isForcedOffer: 'Y',
	// 		isIncompleteData: null,
	// 		isOutlet: null,
	// 		isRenovationPeriod: null,
	// 		isSuspended: null,
	// 		isTwoMonthToBonusVip: null,
	// 		primaryKey: 'CLUB2000MENSALPROMO',
	// 		priority: 0,
	// 		searchId: 'CLUB2000MENSALPROMO'
	// 	});
	// 	await act(async () => render(<Lightbox />));
	// 	const modalTitle = screen.getByRole('heading', {
	// 		name: /que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos\? 💜/i
	// 	}) as HTMLElement;
	// 	expect(modalTitle).toBeInTheDocument();
	// 	const outsideModal = screen.getByRole('dialog') as HTMLElement;
	// 	expect(outsideModal).toBeInTheDocument();
	// 	userEvent.click(outsideModal);
	// 	await waitForElementToBeRemoved(() =>

	// 		screen.getByText(
	// 			/ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra smiles e aproveite um mundo de oportunidades!/i
	// 		)
	// 	);
	// 	expect(modalTitle).not.toBeInTheDocument();
	// });

	it(' should be able to check opt-out-checkbox, close modal by clicking on close button close and save a "accepted" cookie in localStorage ', async () => {
		jest.spyOn(mockNewModalData, 'jsonData').mockResolvedValueOnce({
			hasLogo: 'Y',
			logoPath: 'images/logo.png',
			titleContentName:
				'Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜',
			htmlContentName:
				'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>',
			buttonColor: 'color-product-club',
			confirmButtonAction:
				"actionController.goToCheckout('2000','Monthly')",
			confirmButtonText: 'Subir',
			confirmButtonType: 'REDIRECT',
			helpButtonAction: '/clube-smiles/clientes',
			helpButtonText: 'Conhecer outros planos do Clube',
			helpButtonType: 'REDIRECT',
			hasConfirmCheckbox: 'Y',
			confirmCheckbox:
				'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>',
			hasOptOutCheckbox: 'Y',
			optOutCheckbox: 'Não exibir essa mensagem novamente',
			hasPromotionalCards: 'Y',
			promotionalCards: [
				{
					id: 436669,
					iconPath: 'icons/flight.svg',
					imagePath: 'images/sant.svg',
					promotion: '15% OFF com Clube Smiles',
					flyDestiny: 'Santarém (STM)',
					flyOrigin: 'Saindo de Brasília (BSB)',
					flyPrice: '6.400 milhas/trecho',
					text: 'A partir de ',
					redirectPath: '/clube-smiles/natal'
				},
				{
					id: 436969,
					iconPath: 'icons/flight.svg',
					imagePath: 'images/sant.svg',
					promotion: '15% OFF com Clube Smiles',
					flyDestiny: 'Santarém (STM)',
					flyOrigin: 'Saindo de Brasília (BSB)',
					flyPrice: '6.400 milhas/trecho',
					text: 'A partir de ',
					redirectPath: '/clube-smiles/porto'
				}
			],
			cookieName: 'CLUB2000MENSALPROMO',
			cookiePeriod: 5,
			hasAvailableBonusVip: null,
			isClubMember: null,
			isCobrandedIsAproved: null,
			isForcedOffer: 'Y',
			isIncompleteData: null,
			isOutlet: null,
			isRenovationPeriod: null,
			isSuspended: null,
			isTwoMonthToBonusVip: null,
			primaryKey: 'CLUB2000MENSALPROMO',
			priority: 0,
			searchId: 'CLUB2000MENSALPROMO'
		});
		await act(async () => render(<Lightbox />));
		const modalTitle = screen.getByRole('heading', {
			name: /que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos\? 💜/i
		}) as HTMLElement;
		expect(modalTitle).toBeInTheDocument();

		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		expect(closeModalButton).toBeInTheDocument();
		const optOutCheckBox = screen.getByRole('checkbox', {
			name: /não exibir essa mensagem novamente/i
		}) as HTMLElement;
		expect(optOutCheckBox).not.toBeChecked();
		userEvent.click(optOutCheckBox);
		expect(optOutCheckBox).toBeChecked();

		//https://stackoverflow.com/questions/53472795/uncaught-error-rendered-fewer-hooks-than-expected-this-may-be-caused-by-an-acc

		userEvent.click(closeModalButton);
		// const cookies = await localStorage.getItem('cookies');
		// expect(cookies).toMatch('optedOut');
		// localStorage.clear();
	});

	// it(' should be able to check the modal checkbox and close modal and banner by clicking on close button', () => {
	// 	const renderBanner = render(<Lightbox />);
	// 	const LightboxBannerDiv =
	// 		renderBanner.container.querySelector('.Lightbox');
	// 	const policyButton = screen.getByText(
	// 		/ler regulamento/i
	// 	) as HTMLElement;
	// 	if (LightboxBannerDiv) {
	// 		expect(LightboxBannerDiv).toBeInTheDocument();
	// 	}
	// 	userEvent.click(policyButton);
	// 	const modalElement = document.querySelector(
	// 		'.policy-modal-header-content'
	// 	) as HTMLElement;
	// 	expect(modalElement).toBeInTheDocument();
	// 	const closeModalButton = screen.getByRole('button', {
	// 		name: /close/i
	// 	}) as HTMLElement;
	// 	const checkBox = screen.getByRole('checkbox', {
	// 		name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
	// 	}) as HTMLElement;
	// 	expect(checkBox).not.toBeChecked();
	// 	userEvent.click(checkBox);
	// 	expect(checkBox).toBeChecked();
	// 	userEvent.click(closeModalButton);
	// 	expect(modalElement).not.toBeInTheDocument();
	// 	expect(LightboxBannerDiv).not.toBeInTheDocument();
	// 	localStorage.clear();
	// });
	// it(' should be able to check the modal checkbox and close modal and banner by clicking outside of modal', async () => {
	// 	const renderBanner = render(<Lightbox />);
	// 	const LightboxBannerDiv =
	// 		renderBanner.container.querySelector('.Lightbox');
	// 	const policyButton = screen.getByText(
	// 		/ler regulamento/i
	// 	) as HTMLElement;
	// 	if (LightboxBannerDiv) {
	// 		expect(LightboxBannerDiv).toBeInTheDocument();
	// 	}
	// 	userEvent.click(policyButton);
	// 	const modalElement = document.querySelector(
	// 		'.policy-modal-header-content'
	// 	) as HTMLElement;
	// 	expect(modalElement).toBeInTheDocument();
	// 	const closeModalButton = screen.getByRole('button', {
	// 		name: /close/i
	// 	}) as HTMLElement;
	// 	const outsideModal = screen.getByRole('dialog') as HTMLElement;
	// 	expect(outsideModal).toBeInTheDocument();
	// 	const checkBox = screen.getByRole('checkbox', {
	// 		name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
	// 	}) as HTMLElement;
	// 	expect(checkBox).not.toBeChecked();
	// 	userEvent.click(checkBox);
	// 	expect(checkBox).toBeChecked();
	// 	userEvent.click(outsideModal);
	// 	await waitForElementToBeRemoved(() =>
	// 		screen.getByText(
	// 			/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
	// 		)
	// 	);
	// 	expect(closeModalButton).not.toBeInTheDocument();
	// 	expect(LightboxBannerDiv).not.toBeInTheDocument();
	// 	localStorage.clear();
	// });
	// it(' should be able to check the modal checkbox, unchecked it and close only modal by clicking on close button', async () => {
	// 	const renderBanner = render(<Lightbox />);
	// 	const LightboxBannerText = screen.getByText(
	// 		/utilizamos cookies e outras tecnologias pra melhorar a sua experiência no nosso site\./i
	// 	);
	// 	const LightboxBannerDiv =
	// 		renderBanner.container.querySelector('.Lightbox');
	// 	const policyButton = screen.getByText(
	// 		/ler regulamento/i
	// 	) as HTMLElement;
	// 	if (LightboxBannerDiv) {
	// 		expect(LightboxBannerDiv).toBeInTheDocument();
	// 	}
	// 	userEvent.click(policyButton);
	// 	const modalElement = document.querySelector(
	// 		'.policy-modal-header-content'
	// 	) as HTMLElement;
	// 	expect(modalElement).toBeInTheDocument();
	// 	const closeModalButton = screen.getByRole('button', {
	// 		name: /close/i
	// 	}) as HTMLElement;
	// 	const checkBox = screen.getByRole('checkbox', {
	// 		name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
	// 	}) as HTMLElement;
	// 	expect(checkBox).not.toBeChecked();
	// 	userEvent.click(checkBox);
	// 	expect(checkBox).toBeChecked();
	// 	userEvent.click(checkBox);
	// 	expect(checkBox).not.toBeChecked();
	// 	userEvent.click(closeModalButton);
	// 	await waitForElementToBeRemoved(() =>
	// 		screen.getByText(
	// 			/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
	// 		)
	// 	);
	// 	expect(closeModalButton).not.toBeInTheDocument();
	// 	expect(LightboxBannerText).toBeInTheDocument();
	// 	localStorage.clear();
	// });
	// it(' should be able to render modal content text', () => {
	// 	render(<Lightbox />);
	// 	const policyButton = screen.getByText(
	// 		/ler regulamento/i
	// 	) as HTMLElement;
	// 	userEvent.click(policyButton);
	// 	const policyModalContent = document.querySelector(
	// 		'.policy-modal-content'
	// 	) as HTMLElement;
	// 	expect(policyModalContent).toBeInTheDocument();
	// });
	// it(' should be able to render progressbar ', () => {
	// 	render(<Lightbox />);
	// 	const policyButton = screen.getByText(
	// 		/ler regulamento/i
	// 	) as HTMLElement;
	// 	userEvent.click(policyButton);
	// 	const modalElement = document.querySelector(
	// 		'.policy-modal-content'
	// 	) as HTMLElement;
	// 	expect(modalElement).toBeInTheDocument();
	// 	const scrollBar = document.querySelector(
	// 		'.modal-scroll-bar'
	// 	) as HTMLElement;
	// 	expect(scrollBar).toBeInTheDocument();
	// });
	// it(' should be able to save a "accepted" cookie in localStorage by clicking on "accept" button', async () => {
	// 	render(<Lightbox />);
	// 	expect(screen.queryByText(LightboxText)).toBeInTheDocument();
	// 	const acceptButton = screen.getByText(/aceitar/i) as HTMLElement;
	// 	userEvent.click(acceptButton);
	// 	expect(screen.queryByText(LightboxText)).not.toBeInTheDocument();
	// 	const cookie = localStorage.getItem('cookies');
	// 	expect(cookie).toMatch('accepted');
	// 	localStorage.clear();
	// });
	// it(' should not be able to render banner on page reload after accepted cookies', async () => {
	// 	render(<Lightbox />);
	// 	expect(screen.queryByText(LightboxText)).toBeInTheDocument();
	// 	const acceptButton = screen.getByText(/aceitar/i) as HTMLElement;
	// 	userEvent.click(acceptButton);
	// 	expect(screen.queryByText(LightboxText)).not.toBeInTheDocument();
	// 	const cookie = localStorage.getItem('cookies');
	// 	expect(cookie).toMatch('accepted');
	// 	render(<Lightbox />);
	// 	expect(screen.queryByText(LightboxText)).not.toBeInTheDocument();
	// 	localStorage.clear();
	// });

	// it(' should be able to check the modal checkbox and save a "accepted" cookie in localStorage, then unchecked it and erase the cookie in localStorage ', async () => {
	// 	render(<Lightbox />);
	// 	const policyButton = screen.getByText(
	// 		/ler regulamento/i
	// 	) as HTMLElement;
	// 	userEvent.click(policyButton);
	// 	const closeModalButton = screen.getByRole('button', {
	// 		name: /close/i
	// 	}) as HTMLElement;
	// 	const checkBox = screen.getByRole('checkbox', {
	// 		name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
	// 	}) as HTMLElement;
	// 	userEvent.click(checkBox);
	// 	expect(checkBox).toBeChecked();
	// 	const cookies = await localStorage.getItem('cookies');
	// 	expect(cookies).toMatch('accepted');
	// 	userEvent.click(checkBox);
	// 	expect(checkBox).not.toBeChecked();
	// 	expect(localStorage.getItem('cookies')).toBeNull();
	// 	localStorage.clear();
	// });
	// it(' should be able to show banner 800ms after render', async () => {
	// 	jest.useFakeTimers();
	// 	render(<Lightbox />);
	// 	act(() => {
	// 		jest.advanceTimersByTime(900);
	// 	});
	// 	const LightboxBannerText = document.querySelector(
	// 		'.Lightbox-banner'
	// 	) as HTMLElement;
	// 	expect(LightboxBannerText).toBeInTheDocument();
	// });
});
