
export const jsonData = async () => {
	const data = {
		hasLogo: 'Y',
		logoPath: 'images/logo.png',
		titleContentName:
			'Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜',
		htmlContentName:
			'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>',
		buttonColor: 'color-product-club',
		confirmButtonAction: "actionController.goToCheckout('2000','Monthly')",
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
		searchId: 'CLUB2000MENSALPROMO'
	};

	return data;
};
