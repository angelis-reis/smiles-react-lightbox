import React, { useState, useEffect } from 'react';
import {
	SmlsModal,
	SmlsCheckbox,
	SmlsButton,
	SmlsCard
} from '@smiles/smiles-ui-kit-react';
import { asyncGetTerms } from '../../services/getTerms/index';
import Cards from "../../assets/images/cards.png"
import Logo from '../../assets/images/logo.png';


const Lightbox: React.FC = () => {

	// states for behaver

	const [isOpenlightbox, setIsOpenlightbox] = useState<boolean>(true);


	const [hasLogo, setHasLogo] = useState<boolean>(false);
	const [hasLightboxContent, setHasLightboxContent] = useState<boolean>(true);
	const [hasCards, setHasCards] = useState<boolean>(false);
	const [hasRulesCheckbox, setHasRulesCheckbox] = useState<boolean>(true);
	const [hasHelpButton, setHasHelpButton] = useState<boolean>(true);
	const [hasOptOutCheckbox, setHasOptOutCheckbox] = useState<boolean>(false);




	const [rulesCheckboxIsChecked, setRulesCheckboxIsChecked] =
		useState<boolean>(false);

	const [optOutCheckboxIsChecked, setOptOutCheckboxIsChecked] =
		useState<boolean>(false);


	const [modalWidthClass, setModalWidthClass] = useState<string>('');
	const [confirmButtonColor, setConfirmButtonColor] =
		useState<string>('');



	// states to render

	const [lightboxTitle, setLightboxTitle] = useState<
		string | undefined
	>(`Que tal ganhar o dobro de milhas a cada 3 meses e aproveitar ainda mais benefícios exclusivos? 💜`);
	const [lightboxContent, setLightboxContent] = useState<string | undefined>(
		`

		<style >body {margin: 0;padding: 0;}@media (max-width: 600px) {.logo_mobile {display: block;margin: 0px auto;padding: 32px 8px 32px 8px;}.logo {display: none;}.main-lbx {background-color: #663399;}#img {display: none;max-height: 100px;width: 100px;float: left;margin: 40px 20px 40px 0px;}.img {width: 100%;height: 100px;}#anuncio {max-height: 180px;float: left;}div.anuncio>.title {color: #FFFFFF;font-family: Nunito;font-size: 18px;font-weight: 400;text-align: left;}div.anuncio>.body {color: #FFFFFF;font-family: Nunito;font-size: 18px;font-weight: 300;line-height: 20px;text-align: left;margin-top: 10px;}div.anuncio {display: block;margin: 0 auto;margin-left: 10px;}}@media(min-width: 601px) {.logo {margin: 0px auto;padding: 32px 8px 32px 8px;}.logo_mobile {display: none;}.main-lbx {background-color: #663399;}.logo>#img {max-height: 80px;width: 80px;float: left;margin: 35px 20px 40px 20px;}.logo>#anuncio {max-height: 180px;float: left;}div.anuncio>.title {color: #FFFFFF;font-family: Nunito;font-size: 18px;font-weight: 400;width: 210px;text-align: left;}div.anuncio>.body {color: #FFFFFF;font-family: Nunito;font-size: 18px;font-weight: 300;line-height: 20px;text-align: left;margin-top: 10px;}div.anuncio {max-height: 180px;float: left;margin-right: 10px;}}.offer {margin: 0px auto;}.offer>img {margin: 0px auto;width: 300px;}.text {margin: 0px auto;width: 300px;padding: 20px 0px 20px 0px;color: white;text-shadow: 3px;}</style><script type=\"text/javascript\">var actionController = {goToCheckout: function (milesQuantity, typePayment) {var chosenPlanURL = '';var addToCheckoutURL = '';var namespaceCheckout = '';var stringParams = '';var div = parent.document.getElementById('alertaModaloadingairplane');div.style.display = 'block';div.style.zIndex = 2147483647;div.className += \" in\";parent.document.getElementById('newLightModal').style.display = 'none';var xhttp_clubChangePlan = new XMLHttpRequest();xhttp_clubChangePlan.onreadystatechange = function () {if (this.readyState == 4 && this.status == 200) {var parser = new DOMParser();var doc = parser.parseFromString(xhttp_clubChangePlan.responseText, \"text/html\");chosenPlanURL = doc.getElementById('chosenPlanAvailableURL').value;addToCheckoutURL = doc.getElementById('addToCheckoutURL').value;namespaceCheckout = doc.getElementById('namespace').value;stringParams += '&' + namespaceCheckout + 'milesQuantity=' + milesQuantity + '&' + namespaceCheckout + 'typePayment=' + typePayment;console.log(addToCheckoutURL + stringParams);xhttp_addToCheckout.open(\"GET\", addToCheckoutURL + stringParams, true);xhttp_addToCheckout.timeout = 45000;xhttp_addToCheckout.send();}}var xhttp_addToCheckout = new XMLHttpRequest();xhttp_addToCheckout.onreadystatechange = function () {if (this.readyState == 4 && this.status == 200) {console.log(xhttp_addToCheckout.responseText)}}xhttp_addToCheckout.ontimeout = function () {console.error(\"The request timed out.\");};xhttp_addToCheckout.onload = function () {if (this.readyState == 4 && this.status == 200) {console.log(xhttp_addToCheckout.responseText)try {data = JSON.parse(xhttp_addToCheckout.responseText);} catch (e) { console.error(e); }if (data.successOrderId) {window.open('/group/guest/checkout/sucesso?orderId=' + data.successOrderId, '_parent');} else if (data.status) {window.open('/group/guest/checkout', '_parent');} else {if (data.errorCode === \"201\") {console.log(\"Error redirecting to checkout\");console.log(data);} else {console.log(\"Error redirecting to checkout\");console.log(data);}parent.document.getElementById('alertaModaloadingairplane').style.display = 'none';}}};xhttp_clubChangePlan.open(\"GET\", window.location.origin + '/clube-smiles/clientes', true);xhttp_clubChangePlan.send();},redirectUser: function () {window.open(window.location.origin + '/group/guest/minha-conta/clube-smiles/mudar-de-plano', '_parent');}}strong</script><div class=\"main-lbx\"><div class=\"anuncio\"><div class=\"body\"><span style=\"color: rgb(0, 0, 0); font-family: Nunito; font-size: 18px;\">Suba agora para o Clube Smiles 2.000 e pague de <s style=\"display:inline-block\">R$ 78/mês</s> por <strong>R$ 42/mês</strong>, nos três primeiros meses<br />(valor do plano 1.000) </span></div>












		`
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

	const [confirmCheckboxText, setConfirmCheckboxText] = useState<string | undefined>(
		`<style>
            .terms-text-lbx a{
                text-decoration: underline;
            }
        </style>
        <span class="terms-text-lbx">
            Li e aceito o <a href="/clube-smiles/regulamento/"  target='_blank'>Regulamento do Clube Smiles</a>
        </span>
        `
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
	const [buttonColor, setButtonColor] = useState('secondary');






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
		if (hasCards) {
			setModalWidthClass('width-664');
		}
		else {
			setModalWidthClass('width-472');
		}


	};

	useEffect(() => {
		// getData();
		modalWidth();

		const showModal = setTimeout(() => {
			setIsOpenlightbox(true);
		}, 800);
		return () => {
			clearTimeout(showModal);
		};
	}, []);

	const checkRulesCheckbox = (): void => {
		setRulesCheckboxIsChecked((prevState) => !prevState);
	};
	const checkOptOutCheckbox = (): void => {
		setOptOutCheckboxIsChecked((prevState) => !prevState);
	};

	useEffect(() => {}, []);

	return (
		<>
			<SmlsModal
				id={searchId}
				isOpen={isOpenlightbox}
				type='right'
				toggle={() => setIsOpenlightbox(!isOpenlightbox)}
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

				{hasCards ? (
					<div className='modal-cards'>
						<img src={Cards} />
					</div>
				) : null}

				{hasRulesCheckbox ? (
					<div className='rules-checkbox'>
						<SmlsCheckbox
							className='modal-rules-checkbox'
							id=''
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

				<SmlsButton
					className='modal-confirm-button'
					id='btn_confirmPassword'
					color='primary'
					text={confirmButtonText}
					onClick={() => console.log('Koca: ')}
				/>

				{hasHelpButton ? (
					<a className='modal-help-button' href='helpButtonAction'>
						{helpButtonText}
					</a>
				) : null}

				{hasOptOutCheckbox ? (
					<SmlsCheckbox
						className='modal-opt-out-checkbox'
						id=''
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
