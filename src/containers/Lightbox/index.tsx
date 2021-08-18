import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import {
	SmlsModal,
	SmlsCheckbox,
	SmlsButton
} from '@smiles/smiles-ui-kit-react';
import { asyncGetTerms } from '../../services/getTerms/index';
import { PromotionalCard } from '../../components/PromotionalCards/index';

import Logo from '../../assets/images/logo.png';

const Lightbox: React.FC = () => {
	const [isOpenlightbox, setIsOpenlightbox] = useState<boolean>(true);
	const [optOutCookies, setOptOutCookies] = useState(
		localStorage.getItem('cookies')
	);

	const [hasLogo, setHasLogo] = useState<boolean>(false);
	const [hasLightboxContent, setHasLightboxContent] =
		useState<boolean>(false);
	const [hasPromotionalCards, setHasPromotionalCards] =
		useState<boolean>(true);
	const [hasRulesCheckbox, setHasRulesCheckbox] = useState<boolean>(false);
	const [hasHelpButton, setHasHelpButton] = useState<boolean>(false);
	const [hasOptOutCheckbox, setHasOptOutCheckbox] = useState<boolean>(false);
	const [rulesCheckboxIsChecked, setRulesCheckboxIsChecked] =
		useState<boolean>(false);
	const [optOutCheckboxIsChecked, setOptOutCheckboxIsChecked] =
		useState<boolean>(false);
	const [modalWidthClass, setModalWidthClass] = useState<string>('');
	const [confirmButtonColor, setConfirmButtonColor] = useState<string>('');
	const [confirmButtonActive, setConfirmButtonActive] = useState(true);

	// states to render

	const [lightboxTitle, setLightboxTitle] = useState<string | undefined>(
		`Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜`
	);
	const [lightboxContent, setLightboxContent] = useState<string | undefined>(
		'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>'
	);
	const [helpButtonType, setHelpButtonType] = useState<string | undefined>(
		'REDIRECT'
	);
	const [helpButtonText, setHelpButtonText] = useState<string | undefined>(
		'Conhecer outros planos do Clube'
	);
	const [helpButtonAction, setHelpButtonAction] = useState<
		string | undefined
	>('/club/smiles/client');

	const [confirmCheckboxText, setConfirmCheckboxText] = useState<
		string | undefined
	>(
		'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>'
	);
	const [optOutCheckboxText, setOptOutCheckboxText] = useState<
		string | undefined
	>('Não exibir essa mensagem novamente');
	const [confirmButtonType, setConfirmButtonType] = useState<
		string | undefined
	>('CALLBACK');
	const [confirmButtonText, setConfirmButtonText] = useState<
		string | undefined
	>('Subir');
	const [confirmButtonAction, setConfirmButtonAction] = useState<
		string | undefined
	>('/minhaconta/meusdados');
	const [buttonColor, setButtonColor] = useState('color-product-club');

	const [cardPromotion, setCardPromotion] = useState(
		'15% OFF com Clube Smiles'
	);
	const [cardOrigin, setCardOrigin] = useState('Santarém (STM)');
	const [cardDestiny, setCardDestiny] = useState('Saindo de Brasília (BSB)');
	const [cardText, setCardText] = useState('A partir de');
	const [cardPrice, setCardPrice] = useState('6.400 milhas/trecho');
	const [cardIconPath, setCardIconPath] = useState(
		'https://static.smiler.com.br/bs-theme/assets/logos/smiles/lg-smiles-white.svg'
	);

	const [cards, setCards] = useState([
		{
			id: 436969,
			iconPath: '../../assets/icons/flight.svg',
			imagePath: '../../assets/images/porto-alegre.png',
			promotion: '15% OFF com Clube Smiles',
			flyDestiny: 'Santarém (STM)',
			flyOrigin: 'Saindo de Brasília (BSB)',
			text: 'A partir de',
			flyPrice: '6.400 milhas/trecho'
		},
		{
			id: 435979,
			iconPath: '../../assets/icons/flight.svg',
			imagePath: '../../assets/images/porto-alegre.png',
			promotion: '15 OFF com Clube Smiles',
			flyDestiny: 'Porto Alegre (POA)',
			flyOrigin: 'Saindo de São Paulo (GRU)',
			text: 'A partir de',
			flyPrice: '9.700 milhas/trecho'
		}
	]);

	// states for logic

	const [searchId, setSearchId] = useState<string | undefined>(
		'CLUB2000MENSALPROMO'
	);
	const [priority, setPriority] = useState<number>(0);
	const [primaryKey, setPrimaryKey] = useState<string | undefined>(
		'CLUB2000MENSALPROMO'
	);
	const [isTwoMonthToBonusVip, setIsTwoMonthToBonusVip] = useState(null);
	const [isSuspended, setIsSuspended] = useState(null);
	const [isRenovationPeriod, setIsRenovationPeriod] = useState(null);
	const [isOutlet, setIsOutlet] = useState(null);
	const [isIncompleteData, setIsIncompleteData] = useState(null);
	const [isForcedOffer, setIsForcedOffer] = useState<string>('Y');
	const [isCobrandedIsAproved, setisCobrandedIsAproved] = useState(null);
	const [isClubMember, setIsClubMember] = useState(null);
	const [hasntAvailableBonusVip, setHasntAvailableBonusVip] = useState(null);
	const [hasAvailableBonusVip, setHasAvailableBonusVip] = useState(null);
	const [cookiePeriod, setCookiePeriod] = useState<number>(5);
	const [cookieName, setCookieName] = useState<string | undefined>(
		'CLUB2000MENSALPROMO'
	);

	// const getData = async () => {
	// 	const data: Content | any = await asyncGetTerms();
	// 	if (data) {
	// 		setModalText(data.modalText);
	// 		setModalTitle(data.modalTitle);
	// 		setModalButtonText(data.modalButtonText);

	// 	}
	// };

	const modalWidth = () => {
		if (hasPromotionalCards) {
			setModalWidthClass('width-664');
		} else {
			setModalWidthClass('width-472');
		}
	};

	const checkRulesCheckbox = (): void => {
		setRulesCheckboxIsChecked((prevState) => !prevState);
		setConfirmButtonActive((prevState) => !prevState);
	};
	const checkOptOutCheckbox = (): void => {
		setOptOutCheckboxIsChecked((prevState) => !prevState);
	};
	const closeModal = () => {
		if (optOutCheckboxIsChecked) {
			localStorage.setItem('cookies', 'optedOut');
			setOptOutCookies('optedOut');
		}
	};

	useEffect(() => {
		// getData();
		modalWidth();

		if (hasRulesCheckbox) {
			setConfirmButtonActive(false);
		}

		const showModal = setTimeout(() => {
			setIsOpenlightbox(true);
		}, 800);
		return () => {
			clearTimeout(showModal);
		};
	}, []);

	if (optOutCookies === 'optedOut') {
		return null;
	}

	// 	let actionController = {
	// 		goToCheckout: function (milesQuantity, typePayment) {
	// 			let chosenPlanURL = '';
	// 			let addToCheckoutURL = '';
	// 			let namespaceCheckout = '';
	// 			let stringParams = '';
	// 			let div = parent.document.getElementById('alertaModaloadingairplane');
	// 			div.style.display = 'block';
	// 			div.style.zIndex = 2147483647;
	// 			div.className += \" in\";
	// 			parent.document.getElementById('newLightModal').style.display = 'none';
	// 			let xhttp_clubChangePlan = new XMLHttpRequest();
	// 			xhttp_clubChangePlan.onreadystatechange = function () {
	// 				if (this.readyState == 4 && this.status == 200) {
	// 					let parser = new DOMParser();
	// 					let doc = parser.parseFromString(xhttp_clubChangePlan.responseText, \"text/html\");
	// 					chosenPlanURL = doc.getElementById('chosenPlanAvailableURL').value;
	// 					addToCheckoutURL = doc.getElementById('addToCheckoutURL').value;
	// 					namespaceCheckout = doc.getElementById('namespace').value;
	// 					stringParams += '&' + namespaceCheckout + 'milesQuantity=' + milesQuantity + '&' + namespaceCheckout + 'typePayment=' + typePayment; console.log(addToCheckoutURL + stringParams);
	// 					xhttp_addToCheckout.open(\"GET\", addToCheckoutURL + stringParams, true);
	// 					xhttp_addToCheckout.timeout = 45000;
	// 					xhttp_addToCheckout.send();
	// 				}

	// 			}
	// 			let xhttp_addToCheckout = new XMLHttpRequest();
	// 			xhttp_addToCheckout.onreadystatechange = function () {
	// 				if (this.readyState == 4 && this.status == 200) {
	// 					console.log(xhttp_addToCheckout.responseText)
	// 				}
	// 			}
	// 			xhttp_addToCheckout.ontimeout = function () {
	// 				console.error(\"The request timed out.\")
	// 			};
	// 			xhttp_addToCheckout.onload = function () {
	// 						if (this.readyState == 4 && this.status == 200) {
	// 							console.log(xhttp_addToCheckout.responseText)
	// 							try {
	// 								data = JSON.parse(xhttp_addToCheckout.responseText);
	// 							} catch (e) {
	// 								console.error(e);
	// 							}
	// 							if (data.successOrderId) {
	// 								window.open('/group/guest/checkout/sucesso?orderId=' + data.successOrderId, '_parent');
	// 							}
	// 							else if (data.status) {
	// 								window.open('/group/guest/checkout', '_parent');
	// 							} else {
	// 								if (data.errorCode === \"201\") {
	// 								console.log(\"Error redirecting to checkout\");console.log(data);
	// 							}
	// 							else {
	// 								console.log(\"Error redirecting to checkout\");
	// 								console.log(data);
	// 				}
	// 				parent.document.getElementById('alertaModaloadingairplane').style.display = 'none';
	// 			}
	// 		}
	// 	};
	// 	xhttp_clubChangePlan.open(\"GET\", window.location.origin + '/clube-smiles/clientes', true);
	// 	xhttp_clubChangePlan.send();

	// }, redirectUser: function () {
	// 		window.open(window.location.origin + '/group/guest/minha-conta/clube-smiles/mudar-de-plano', '_parent');
	// }
	// }



	return (
		<>
			<SmlsModal
				id={searchId}
				isOpen={isOpenlightbox}
				type='right'
				toggle={() => setIsOpenlightbox(!isOpenlightbox)}
				onClosed={closeModal}
				className={modalWidthClass}
			>
				{hasLogo ? <img className='modal-logo' src={Logo} /> : null}

				<h4 className='modal-title'>{lightboxTitle}</h4>

				{hasLightboxContent ? (
					<section
						className='modal-html-content'
						dangerouslySetInnerHTML={{
							__html: `${lightboxContent}`
						}}
					/>
				) : null}

				{hasPromotionalCards ? (
					<div className='modal-cards'>
						{/* <PromotionalCard
							cardImagePath='https://www.smiles.com.br/documents/20124/59884/login_opt1.jpg/ed8d40b5-cdb9-6afa-d6e8-4ddda77495de?t=1609444388733'
							cardIconPath={cardIconPath}
							cardPromotion={cardPromotion}
							cardOrigin={cardOrigin}
							cardDestiny={cardDestiny}
							cardText={cardText}
							cardPrice={cardPrice}
						/> */}

						{cards.map((card) => (
							<PromotionalCard
								key={card.id}
								cardIconPath={require('../../assets/icons/flight.svg')}
								// cardIconPath={require(card.promotion)}
								cardImagePath={require('../../assets/images/porto-alegre.png')}
								cardPromotion={card.promotion}
								cardOrigin={card.flyOrigin}
								cardDestiny={card.flyDestiny}
								cardText={card.text}
								cardPrice={card.flyPrice}
							/>
						))}
					</div>
				) : null}

				{hasRulesCheckbox ? (
					<div className='rules-checkbox'>
						<SmlsCheckbox
							className='modal-rules-checkbox'
							id='acceptRules'
							checked={rulesCheckboxIsChecked}
							onClick={checkRulesCheckbox}
						/>
						<span
							className='modal-rules-checkbox-text'
							dangerouslySetInnerHTML={{
								__html: `${confirmCheckboxText}`
							}}
						/>
					</div>
				) : null}

				<div className='modal-confirm-button'>
					<SmlsButton
						className={buttonColor}
						color='primary'
						id='btn_confirmPassword'
						text={confirmButtonText}
						onClick={() => console.log('Koca: ')}
						disabled={!confirmButtonActive}
					/>
				</div>

				{hasHelpButton ? (
					<a className='modal-help-button' href={helpButtonAction}>
						{helpButtonText}
					</a>
				) : null}

				{hasOptOutCheckbox ? (
					<SmlsCheckbox
						className='modal-opt-out-checkbox'
						id='optOut'
						label={optOutCheckboxText}
						checked={optOutCheckboxIsChecked}
						onClick={checkOptOutCheckbox}
					/>
				) : null}
			</SmlsModal>
		</>
	);
};
export default Lightbox;
