import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {
	SmlsModal,
	SmlsCheckbox,
	SmlsButton
} from '@smiles/smiles-ui-kit-react';
// import { asyncGetTerms } from '../../services/getTerms/index';
import Data from '../../services/getTerms/newModelData';
import { PromotionalCard } from '../../components/PromotionalCards/index';

const Lightbox: React.FC = () => {
	const [isOpenlightbox, setIsOpenlightbox] = useState<boolean>(true);
	const [optOutCookies, setOptOutCookies] = useState<string>(
		localStorage.getItem('cookies')
	);

	const [hasLogo, setHasLogo] = useState<boolean>(false);
	const [hasHtmlContentName, setHasHtmlContentName] = useState<boolean>(true);
	const [hasPromotionalCards, setHasPromotionalCards] =
		useState<boolean>(true);
	const [hasConfirmCheckbox, setHasConfirmCheckbox] = useState<boolean>(true);
	const [hasHelpButton, setHasHelpButton] = useState<boolean>(true);
	const [hasOptOutCheckbox, setHasOptOutCheckbox] = useState<boolean>(true);

	const [confirmCheckboxIsChecked, setConfirmCheckboxIsChecked] =
		useState<boolean>(false);
	const [optOutCheckboxIsChecked, setOptOutCheckboxIsChecked] =
		useState<boolean>(false);
	const [modalWidthClass, setModalWidthClass] = useState<string>('');
	const [confirmButtonColor, setConfirmButtonColor] = useState<string>('');
	const [confirmButtonActive, setConfirmButtonActive] =
		useState<boolean>(true);

	// states to render
	const [logoPath, setLogoPath] = useState<string>();
	const [titleContentName, setTitleContentName] = useState<string>();
	const [htmlContentName, setHtmlContentName] = useState<string>();

	const [helpButtonType, setHelpButtonType] = useState<string>();
	const [helpButtonText, setHelpButtonText] = useState<string>();
	const [helpButtonAction, setHelpButtonAction] = useState<string>();

	const [confirmCheckboxText, setConfirmCheckboxText] = useState<string>();
	const [optOutCheckboxText, setOptOutCheckboxText] = useState<string>();

	const [confirmButtonType, setConfirmButtonType] =
		useState<string>('CALLBACK');

	const [confirmButtonText, setConfirmButtonText] = useState<string>();

	const [confirmButtonAction, setConfirmButtonAction] = useState<string>();

	const [buttonColor, setButtonColor] = useState<string>();

	const [cards, setCards] = useState<any[]>([]);

	// states for logic

	const [searchId, setSearchId] = useState<string>();
	// const [priority, setPriority] = useState<number>(0);
	// const [primaryKey, setPrimaryKey] = useState<string | undefined>(
	// 	'CLUB2000MENSALPROMO'
	// );
	// const [isTwoMonthToBonusVip, setIsTwoMonthToBonusVip] = useState(null);
	// const [isSuspended, setIsSuspended] = useState(null);
	// const [isRenovationPeriod, setIsRenovationPeriod] = useState(null);
	// const [isOutlet, setIsOutlet] = useState(null);
	// const [isIncompleteData, setIsIncompleteData] = useState(null);
	// const [isForcedOffer, setIsForcedOffer] = useState<string>('Y');
	// const [isCobrandedIsAproved, setIsCobrandedIsAproved] = useState(null);
	// const [isClubMember, setIsClubMember] = useState(null);
	// const [hasntAvailableBonusVip, setHasntAvailableBonusVip] = useState(null);
	// const [hasAvailableBonusVip, setHasAvailableBonusVip] = useState(null);
	// const [cookiePeriod, setCookiePeriod] = useState<number>(5);
	// const [cookieName, setCookieName] = useState<string | undefined>(
	// 	'CLUB2000MENSALPROMO'
	// );

	const getData = async () => {
		const data: any = await Data;
		if (data) {
			if (data.hasLogo === 'Y') {
				setHasLogo(true);

				if (data.logoPath) {
					const logoPathFinal =
						require(`../../assets/${data.logoPath}`).default;
					setLogoPath(logoPathFinal);
				}
			}
			if (data.hasConfirmCheckbox === 'Y') {
				setHasConfirmCheckbox(true);
			}
			if (data.hasOptOutCheckbox === 'Y') {
				setHasOptOutCheckbox(true);
			}
			if (data.hasPromotionalCards === 'Y') {
				setHasPromotionalCards(true);
			}

			if (data.titleContentName) {
				setTitleContentName(data.titleContentName);
			}
			if (data.htmlContentName) {
				setHtmlContentName(data.htmlContentName);
			}

			if (data.buttonColor) {
				setButtonColor(data.buttonColor);
			}

			if (data.confirmButtonAction) {
				setConfirmButtonAction(data.confirmButtonAction);
			}
			if (data.confirmButtonText) {
				setConfirmButtonText(data.confirmButtonText);
			}
			if (data.confirmButtonType) {
				setConfirmButtonType(data.confirmButtonType);
			}

			if (data.helpButtonAction) {
				setHelpButtonAction(data.helpButtonAction);
			}
			if (data.helpButtonText) {
				setHelpButtonText(data.helpButtonText);
			}
			if (data.helpButtonType) {
				setHelpButtonType(data.helpButtonType);
			}

			if (data.confirmCheckbox) {
				setConfirmCheckboxText(data.confirmCheckbox);
			}

			if (data.optOutCheckbox) {
				setOptOutCheckboxText(data.optOutCheckbox);
			}

			if (data.promotionalCards) {
				setCards(data.promotionalCards);
			}

			if (data.promotionalCards) {
				setCards(data.promotionalCards);
			}

			if (data.searchId) {
				setSearchId(data.searchId);
			}
		}
	};

	const modalWidth = () => {
		if (hasPromotionalCards) {
			setModalWidthClass('width-664');
		} else {
			setModalWidthClass('width-472');
		}
	};

	const checkConfirmCheckbox = (): void => {
		setConfirmCheckboxIsChecked((prevState) => !prevState);
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
		getData();
		modalWidth();

		if (hasConfirmCheckbox) {
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
			window.location.href = helpButtonAction;
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
		window.location.href = helpButtonAction;
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
				{hasLogo ? <img className='modal-logo' src={logoPath} /> : null}

				<h4 className='modal-title'>{titleContentName}</h4>

				{hasHtmlContentName ? (
					<section
						className='modal-html-content'
						dangerouslySetInnerHTML={{
							__html: `${htmlContentName}`
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

				{hasConfirmCheckbox ? (
					<div className='rules-checkbox'>
						<SmlsCheckbox
							className='modal-rules-checkbox'
							id='acceptRules'
							checked={confirmCheckboxIsChecked}
							onClick={checkConfirmCheckbox}
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
