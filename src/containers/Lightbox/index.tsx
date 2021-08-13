import React, { useState, useEffect } from 'react';
import {
	SmlsModal,
	SmlsCheckbox,
	SmlsButton,
	SmlsCard
} from '@smiles/smiles-ui-kit-react';
import { asyncGetTerms } from '../../services/getTerms/index';
import Cards from "../../assets/images/cards.png"

const Lightbox: React.FC = () => {

	// states for behaver

	const [isOpenlightbox, setIsOpenlightbox] = useState<boolean>(true);

	const [hasRulesCheckbox, setHasRulesCheckbox] =
		useState<boolean>(true);
	const [rulesCheckboxIsChecked, setRulesCheckboxIsChecked] =
		useState<boolean>(false);
	const [hasOptOutCheckbox, setHasOptOutCheckbox] =
		useState<boolean>(true);
	const [optOutCheckboxIsChecked, setOptOutCheckboxIsChecked] =
		useState<boolean>(false);
	const [hasCards, setHasCards] = useState<boolean>(true);
	const [modalWidthClass, setModalWidthClass] = useState<string>('');


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
		`<style>.modal-body__terms {padding: 0 8px 0 8px;    border: 1px solid white;    border-radius: 4px;}.modal-body__terms label{margin-top: 8px;}.terms-text-lbx {padding: 0 0 0 32px;}.terms-text-lbx a{text-decoration: underline;}</style><p class="terms-text-lbx">Eu aceito o <a href="/clube-smiles/regulamento/"  target='_blank'>Regulamento do Clube Smiles</a>`
	);
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
	const [cancelButtonText, setCancelButtonText] = useState<
		string | undefined
	>('Não desejo receber mais milhas');






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
				<img className='modal-logo'></img>

				<h4 className='modal-title'>{lightboxTitle}</h4>

				<section
					className='modal-html-content'
					dangerouslySetInnerHTML={{
						__html: `${lightboxContent}`
					}}
				/>

				{hasCards ? (
					<div className='modal-cards'>
						<img src={Cards} />
					</div>
				) : null}

				<div className='rules-checkbox'>
					<SmlsCheckbox
						className='modal-rules-checkbox'
						id=''
						checked={rulesCheckboxIsChecked}
						onClick={checkRulesCheckbox}
					/>
					<p
						dangerouslySetInnerHTML={{
							__html: `${confirmCheckboxText}`
						}}
						className='modal-rules-checkbox-text'
					/>
				</div>

				<SmlsButton
					id='btn_confirmPassword'
					color='primary'
					text={confirmButtonText}
					onClick={() => console.log('Koca: ')}
					className='modal-confirm-button'
				/>

				<a className='modal-help-button' href='helpButtonAction'>
					{helpButtonText}
				</a>

				<SmlsCheckbox
					className='modal-opt-out-checkbox'
					id=''
					label='Não exibir essa mensagem novamente'
					checked={optOutCheckboxIsChecked}
					onClick={checkOptOutCheckbox}
				/>
			</SmlsModal>
		</>
	);
};
export default Lightbox;
