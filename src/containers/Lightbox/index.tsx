import React, { useState, useEffect, useCallback } from 'react';
import {
	SmlsModal,
	SmlsCheckbox,
	SmlsButton
} from '@smiles/smiles-ui-kit-react';
import { jsonData } from '../../services/getContent/newModelData';
import { asyncGetContent } from '../../services/getContent/index';
import { PromotionalCard } from '../../components/PromotionalCards/index';

const Lightbox: React.FC = () => {
	const [isOpenlightbox, setIsOpenlightbox] = useState<boolean>(true);
	const [hasData, setHasData] = useState<boolean>(false);
	const [optOutCookies, setOptOutCookies] = useState<string>(
		localStorage.getItem('cookies')
	);
	const [cookies, setCookies] = useState<string>(
		localStorage.getItem('cookies')
	);

	const [hasLogo, setHasLogo] = useState<boolean>();
	const [hasHtmlContentName, setHasHtmlContentName] = useState<boolean>();
	const [hasPromotionalCards, setHasPromotionalCards] = useState<boolean>();
	const [hasConfirmCheckbox, setHasConfirmCheckbox] = useState<boolean>();
	const [hasHelpButton, setHasHelpButton] = useState<boolean>();
	const [hasOptOutCheckbox, setHasOptOutCheckbox] = useState<boolean>();

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

	const [cookiePeriod, setCookiePeriod] = useState<number>();
	const [cookieName, setCookieName] = useState<string | undefined>('');

	const getData = async () => {
		const data: any = await asyncGetContent();
		// console.table(data);

		const fakeData: any = await jsonData();
		if (data) {
			setHasData(true);
			if (data.hasLogo === 'true') {
				setHasLogo(true);
				if (data.logoPath) {
					const logoPathFinal =
						// require(`${data.logoPath}`).default;
						require(`../../assets/${fakeData.logoPath}`).default;
					setLogoPath(logoPathFinal);
				}
			}
			if (data.hasConfirmCheckbox === 'true') {
				setHasConfirmCheckbox(true);
				setConfirmButtonActive(false);
			}
			if (data.hasOptOutCheckbox === 'true') {
				setHasOptOutCheckbox(true);
			}
			if (data.hasPromotionalCards === 'true') {
				setHasPromotionalCards(true);
				setModalWidthClass('width-664');
			}
			if (data.titleContentName) {
				setTitleContentName(data.titleContentName);
			}
			if (data.htmlContentName) {
				setHasHtmlContentName(true);
				setHtmlContentName(data.htmlContentName);
			}

			if (data.buttonColor) {
				let buttonColorContent: string = data.buttonColor;
				let edit1 = buttonColorContent.replace(`[\"`, '');
				let edit2 = edit1.replace(`"\]`, '');
				setButtonColor(edit2);
			}

			if (data.confirmButtonAction) {
				let confirmButtonActionContent: string =
					data.confirmButtonAction;
				let edit1 = confirmButtonActionContent.replace(`[\"`, '');
				let edit2 = edit1.replace(`"\]`, '');
				setConfirmButtonAction(edit2);
			}
			if (data.confirmButtonText) {
				setConfirmButtonText(data.confirmButtonText);
			}
			if (data.confirmButtonType) {
				let confirmButtonTypeContent: string = data.confirmButtonType;
				let edit1 = confirmButtonTypeContent.replace(`[\"`, '');
				let edit2 = edit1.replace(`"\]`, '');
				setConfirmButtonType(edit2);
			}
			if (data.helpButtonAction) {
				setHelpButtonAction(data.helpButtonAction);
			}
			if (data.helpButtonText) {
				setHasHelpButton(true);
				setHelpButtonText(data.helpButtonText);
			}
			if (data.helpButtonType) {
				let helpButtonTypeContent: string = data.helpButtonType;
				let edit1 = helpButtonTypeContent.replace(`[\"`, '');
				let edit2 = edit1.replace(`"\]`, '');
				setHelpButtonType(edit2);
			}

			if (data.confirmCheckbox) {
				setConfirmCheckboxText(data.confirmCheckbox);
			}

			if (data.optOutCheckbox) {
				setOptOutCheckboxText(data.optOutCheckbox);
			}

			if (data.promotionalCards) {
				// setCards(data.promotionalCards);
				setCards(fakeData.promotionalCards);
			}

			if (data.cookieName) {
				setCookieName(data.cookieName);
			}

			if (data.cookiePeriod) {
				setCookiePeriod(data.cookiePeriod);
			}
		}
	};
	const checkConfirmCheckbox = (): void => {
		setConfirmCheckboxIsChecked((prevState) => !prevState);
		setConfirmButtonActive((prevState) => !prevState);
	};
	const checkOptOutCheckbox = (): void => {
		setOptOutCheckboxIsChecked((prevState) => !prevState);
	};
	const closeModal = (): void => {
		// if (optOutCheckboxIsChecked) {
		// 	localStorage.setItem('cookies', 'optedOut');
		// 	setOptOutCookies('optedOut');
		// }
	};
	const actionController = {
		goToCheckout: (milesQuantity: string, typePayment: string) => {
			let chosenPlanURL: string = '';
			let addToCheckoutURL: string = '';
			let namespaceCheckout: string = '';
			let stringParams: string = '';
			// const div = parent.document.getElementById(
			// 	'alertaModaloadingairplane'
			// );
			// div.style.display = 'block';
			// div.style.zIndex = '2147483647';
			// div.className += 'in';
			// parent.document.getElementById('newLightModal').style.display = 'none';
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
			// parent.document.getElementById(
			// 	'alertaModaloadingairplane'
			// ).style.display = 'none';
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
	const confirmButtonActionType = (): void => {
		if (confirmButtonType === 'REDIRECT') {
			console.log('redirect');
			window.location.href = helpButtonAction;
		} else if (confirmButtonType === 'CALLBACK') {
			console.log('callback');
			const confirmButtonActionFunction = eval(
				`(${confirmButtonAction})`
			);
			setIsOpenlightbox(false);

			confirmButtonActionFunction();
		}
	};
	const helpButtonRedirectAction = (): void => {
		console.log('redirect');
		window.location.href = helpButtonAction;
	};
	// const modalAnimation = () => {
	// 	const showModal = setTimeout(() => {
	// 		setIsOpenlightbox(true);
	// 	}, 800);
	// 	return () => {
	// 		clearTimeout(showModal);
	// 	};
	// };
	const activeButton = (): void => {
		if (hasConfirmCheckbox) {
			setConfirmButtonActive(false);
		}
	};
	const setCookie = (cname: string, cvalue: string, exdays: number) => {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	};

	const getCookie = (cname: string) => {
		let name = cname + '=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	};

	const checkCookie = () => {
		let session = getCookie(cookieName);
		console.log('Koca: session ', session);
		if (session === '' || session == null) {
			setCookie(cookieName, 'true', cookiePeriod);
		}
		if (session === 'true') {
			setOptOutCookies('optedOut');
		}
	};

	useEffect((): void => {
		getData();
		activeButton();

		// modalAnimation();
	}, []);

	useEffect((): void => {
		checkCookie();
	}, [cookiePeriod]);

	// if (optOutCookies === 'optedOut') {
	// 	return null;
	// }

	if (optOutCookies === 'optedOut') {
		console.log('VAZIO');
		// return null;
	}
	return (
		<>
			{hasData ? (
				<SmlsModal
					idBtnClose='btn_closeLightbox'
					isOpen={isOpenlightbox}
					type='right'
					toggle={() => setIsOpenlightbox(!isOpenlightbox)}
					onClosed={closeModal}
					className={modalWidthClass}
				>
					<div className='modal-content-wrapper'>
						{hasLogo ? (
							<img
								className='modal-logo'
								src={logoPath}
								id='lbl_logoLightbox'
							/>
						) : null}

						<h4 id='lbl_titleLightbox' className='modal-title'>
							{titleContentName}
						</h4>

						{hasHtmlContentName ? (
							<section
								id='lbl_msgLightbox'
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
										cardId=''
										redirectPath={card.redirectPath}
										cardIconPath={card.iconPath}
										cardImagePath={card.imagePath}
										cardPromotion={card.promotion}
										cardOrigin={card.flyOrigin}
										cardDestiny={card.flyDestiny}
										cardPrice={card.flyPrice}
									/>
								))}
							</div>
						) : null}

						{hasConfirmCheckbox ? (
							<div className='rules-checkbox'>
								<SmlsCheckbox
									className='modal-rules-checkbox'
									id='chk_regulationLightbox'
									checked={confirmCheckboxIsChecked}
									onClick={checkConfirmCheckbox}
								/>
								<span
									id='lbl_regulationLightbox'
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
								id='btn_primaryLightbox'
								text={confirmButtonText}
								disabled={!confirmButtonActive}
								onClick={confirmButtonActionType}
							/>
						</div>

						{hasHelpButton ? (
							<SmlsButton
								className='modal-help-button'
								color='hyperlink'
								id='btn_secondaryLightbox'
								text={helpButtonText}
								onClick={helpButtonRedirectAction}
							/>
						) : null}

						{hasOptOutCheckbox ? (
							<SmlsCheckbox
								className='modal-opt-out-checkbox'
								id='chk_doNotShowLightbox'
								idLabel='lbl_doNotShowLightbox'
								label={optOutCheckboxText}
								checked={optOutCheckboxIsChecked}
								onClick={checkOptOutCheckbox}
							/>
						) : null}
					</div>
				</SmlsModal>
			) : null}
		</>
	);
};
export default Lightbox;
