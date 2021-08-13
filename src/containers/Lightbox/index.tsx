import React, { useState, useEffect } from 'react';
import {
	SmlsModal,
	SmlsCheckbox,
	SmlsButton
} from '@smiles/smiles-ui-kit-react';
import { asyncGetTerms } from '../../services/getTerms/index';
import Cards from '../../assets/images/cards.png';
import Logo from '../../assets/images/logo.png';

const Lightbox: React.FC = () => {
	const [isOpenlightbox, setIsOpenlightbox] = useState<boolean>(true);

	const [hasLogo, setHasLogo] = useState<boolean>(false);
	const [hasLightboxContent, setHasLightboxContent] = useState<boolean>(true);
	const [hasPromotionalCards, setHasPromotionalCards] =
		useState<boolean>(false);
	const [hasRulesCheckbox, setHasRulesCheckbox] = useState<boolean>(true);
	const [hasHelpButton, setHasHelpButton] = useState<boolean>(true);
	const [hasOptOutCheckbox, setHasOptOutCheckbox] = useState<boolean>(false);

	const [rulesCheckboxIsChecked, setRulesCheckboxIsChecked] =
		useState<boolean>(false);
	const [optOutCheckboxIsChecked, setOptOutCheckboxIsChecked] =
		useState<boolean>(false);
	const [modalWidthClass, setModalWidthClass] = useState<string>('');
	const [confirmButtonColor, setConfirmButtonColor] = useState<string>('');

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
		if (hasPromotionalCards) {
			setModalWidthClass('width-664');
		} else {
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

				{hasPromotionalCards ? (
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
