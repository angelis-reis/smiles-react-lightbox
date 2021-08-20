import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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
	const [optOutCookies, setOptOutCookies] = useState<string>(
		localStorage.getItem('cookies')
	);

	const [hasLogo, setHasLogo] = useState<boolean>(false);
	const [hasLightboxContent, setHasLightboxContent] = useState<boolean>(true);
	const [hasPromotionalCards, setHasPromotionalCards] =
		useState<boolean>(false);
	const [hasRulesCheckbox, setHasRulesCheckbox] = useState<boolean>(false);
	const [hasHelpButton, setHasHelpButton] = useState<boolean>(false);
	const [hasOptOutCheckbox, setHasOptOutCheckbox] = useState<boolean>(false);


	const [rulesCheckboxIsChecked, setRulesCheckboxIsChecked] =
		useState<boolean>(false);
	const [optOutCheckboxIsChecked, setOptOutCheckboxIsChecked] =
		useState<boolean>(false);
	const [modalWidthClass, setModalWidthClass] = useState<string>('');
	const [confirmButtonColor, setConfirmButtonColor] = useState<string>('');
	const [confirmButtonActive, setConfirmButtonActive] =
		useState<boolean>(true);

	// states to render

	const [lightboxTitle, setLightboxTitle] = useState<string>(
		`Conheça o Meu Bônus Vip, novo benefício do Clube Smiles 💜`
	);
	const [lightboxContent, setLightboxContent] = useState<string>(
		'<style>#modal-content p {font-family:Nunito,Arial,sans-serif;color:#666666;font-size:16px;line-height:24px;}</style><div id="modal-content"><p>Ganhe ainda mais milhas ao transferir os pontos do seu cartão de crédito pra Smiles e aproveite um mundo de oportunidades!</p></div>'
	);

	const [helpButtonType, setHelpButtonType] = useState<string>('REDIRECT');
	const [helpButtonText, setHelpButtonText] = useState<string>(
		'Conhecer outros planos do Clube'
	);
	const [helpButtonAction, setHelpButtonAction] = useState<string>(
		'/club/smiles/client'
	);

	const [confirmCheckboxText, setConfirmCheckboxText] = useState<string>(
		'<style>.terms-text-lbx a{text-decoration: underline;}</style><span class="terms-text-lbx">Li e aceito o <a href="/clube-smiles/regulamento/" target=\'_blank\'>Regulamento do Clube Smiles</a></span>'
	);
	const [optOutCheckboxText, setOptOutCheckboxText] = useState<string>(
		'Não exibir essa mensagem novamente'
	);

	const [confirmButtonType, setConfirmButtonType] =
		useState<string>('CALLBACK');

	const [confirmButtonText, setConfirmButtonText] =
		useState<string>('Acessar benefício');

	const [confirmButtonAction, setConfirmButtonAction] = useState<string>(
		"actionController.goToCheckout('2000','Monthly')"
	);

	const [buttonColor, setButtonColor] = useState<string>(
		'color-product-club?'
	);

	const [cards, setCards] = useState([
		{
			id: 436969,
			iconPath: 'icons/flight.svg',
			imagePath: 'images/sant.svg',
			promotion: '15% OFF com Clube Smiles',
			flyDestiny: 'Santarém (STM)',
			flyOrigin: 'Saindo de Brasília (BSB)',
			text: 'A partir de',
			flyPrice: '6.400 milhas/trecho'
		},
		{
			id: 436969,
			iconPath: 'icons/flight.svg',
			imagePath: 'images/sant.svg',
			promotion: '15% OFF com Clube Smiles',
			flyDestiny: 'Santarém (STM)',
			flyOrigin: 'Saindo de Brasília (BSB)',
			text: 'A partir de',
			flyPrice: '6.400 milhas/trecho'
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

	const actionController = {
		goToCheckout: (milesQuantity: string, typePayment: string) => {
			let chosenPlanURL: string = '';
			let addToCheckoutURL: string = '';
			let namespaceCheckout: string = '';
			let stringParams: string = '';

			const div = parent.document.getElementById(
				'alertaModaloadingairplane'
			);
			div.style.display = 'block';
			div.style.zIndex = '2147483647';
			div.className += 'in';
			parent.document.getElementById('newLightModal').style.display =
				'none';

			const xhttpCubChangePlan = new XMLHttpRequest();

			xhttpCubChangePlan.onreadystatechange = () => {
				if (
					xhttpCubChangePlan.readyState === 4 &&
					xhttpCubChangePlan.status === 200
				) {
					const parser = new DOMParser();

					const doc = parser.parseFromString(
						xhttpCubChangePlan.responseText,
						'text/html'
					);

					chosenPlanURL = (
						doc.getElementById(
							'chosenPlanAvailableURL'
						) as HTMLInputElement
					).value;

					addToCheckoutURL = (
						doc.getElementById(
							'addToCheckoutURL'
						) as HTMLInputElement
					).value;

					namespaceCheckout = (
						doc.getElementById('namespace') as HTMLInputElement
					).value;

					stringParams += `&${namespaceCheckout}milesQuantity=${milesQuantity}&${namespaceCheckout}typePayment=${typePayment}`;
					console.log(addToCheckoutURL + stringParams);

					xhttpAddToCheckout.open(
						'GET',
						addToCheckoutURL + stringParams,
						true
					);
					xhttpAddToCheckout.timeout = 45000;
					xhttpAddToCheckout.send();
				}
			};

			let xhttpAddToCheckout = new XMLHttpRequest();

			xhttpAddToCheckout.onreadystatechange = () => {
				if (
					xhttpAddToCheckout.readyState === 4 &&
					xhttpAddToCheckout.status == 200
				) {
					console.log(xhttpAddToCheckout.responseText);
				}
			};
			xhttpAddToCheckout.ontimeout = () => {
				console.error('The request timed out.');
			};
			xhttpAddToCheckout.onload = () => {
				if (
					xhttpAddToCheckout.readyState === 4 &&
					xhttpAddToCheckout.status === 200
				) {
					console.log(xhttpAddToCheckout.responseText);
					try {
						const data = JSON.parse(
							xhttpAddToCheckout.responseText
						);
						if (data.successOrderId) {
							window.open(
								`/group/guest/checkout/sucesso?orderId=${data.successOrderId}`,
								'_parent'
							);
						} else if (data.status) {
							window.open('/group/guest/checkout', '_parent');
						} else if (data.errorCode === '201') {
							console.log('Error redirecting to checkout');
							console.log(data);
						} else {
							console.log('Error redirecting to checkout');
							console.log(data);
						}
					} catch (e) {
						console.error(e);
					}
				}
			};
			parent.document.getElementById(
				'alertaModaloadingairplane'
			).style.display = 'none';
			xhttpCubChangePlan.open(
				'GET',
				`${window.location.origin}/clube-smiles/clientes`,
				true
			);
			xhttpCubChangePlan.send();
		},

		redirectUser: () => {
			window.open(
				`${window.location.origin}/group/guest/minha-conta/clube-smiles/mudar-de-plano`,
				'_parent'
			);
		}
	};

	if (optOutCookies === 'optedOut') {
		return null;
	}

	const confirmButtonActionType = (): void => {
		if (confirmButtonType === 'REDIRECT') {
			console.log('redirect');
			<Link to={helpButtonAction} />;
		} else if (confirmButtonType === 'CALLBACK') {
			console.log('callback');
			const confirmButtonActionFunction = eval(
				`(${confirmButtonAction})`
			);
			confirmButtonActionFunction();
		}
	};

	const helpButtonRedirectAction = (): void => {
		console.log('redirect');
		<Link to={helpButtonAction} />;
	};

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
						{cards.map((card) => (
							<PromotionalCard
								key={card.id}
								cardIconPath={card.iconPath}
								cardImagePath={card.imagePath}
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
						disabled={!confirmButtonActive}
						onClick={confirmButtonActionType}
					/>
				</div>

				{hasHelpButton ? (
					<SmlsButton
						className='modal-help-button'
						color='hyperlink'
						id='btn_help'
						text={helpButtonText}
						onClick={helpButtonRedirectAction}
					/>
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
