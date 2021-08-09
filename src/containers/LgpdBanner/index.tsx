import React, { useState, useEffect, createContext } from 'react';
import { SmlsModal, SmlsCheckbox } from '@smiles/smiles-ui-kit-react';
import { ScrollBar } from '../../components/ScrollBar/index';
import { asyncGetTerms } from '../../services/getTerms/index';

export const ScrollModalContext = createContext<any>(0);

interface Content {
	modalTitle: string | undefined;
	modalText: string | undefined;
}

const Lgpd: React.FC = () => {
	const [lgpdCookies, setLgpdCookies] = useState(
		localStorage.getItem('cookies')
	);
	const [isOpenBanner, setIsOpenBanner] = useState<boolean>(false);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string | undefined>(
		'Carregando...'
	);
	const [modalText, setModalText] = useState<string | undefined>(
		'Carregando...'
	);

	const getData = async () => {
		const data: Content | any = await asyncGetTerms();
		if (data) {
			setModalText(data.modalText);
			setModalTitle(data.modalTitle);
		}
	};

	useEffect(() => {
		getData();
		const showBanner = setTimeout(() => {
			setIsOpenBanner(true);
		}, 800);
		return () => {
			clearTimeout(showBanner);
		};
	}, []);

	const lgpdCookiesAccepted = (): void => {
		localStorage.setItem('cookies', 'accepted');
		setLgpdCookies('accepted');
	};

	const showPolicy = (): void => {
		setIsOpenModal(true);
	};

	const checkCheckbox = (): void => {
		setIsChecked((prevState) => !prevState);
		if (!isChecked) {
			localStorage.setItem('cookies', 'accepted');
			setLgpdCookies('accepted');
		} else {
			localStorage.removeItem('cookies');
			setLgpdCookies(null);
		}
	};

	if (lgpdCookies === 'accepted' && isOpenModal === false) {
		return null;
	}

	return (
		<>
			<ScrollModalContext.Provider
				value={{
					isScrolled,
					setIsScrolled
				}}
			>
				<div
					className={
						isOpenBanner
							? 'lgpd-banner'
							: 'hidden-banner lgpd-banner'
					}
				>
					<div className='lgpd-banner-content'>
						<span>
							Utilizamos cookies e outras tecnologias pra melhorar
							a sua experiência no nosso site.
						</span>
					</div>
					<button
						type='button'
						className='lgpd-banner-policy-button'
						onClick={showPolicy}
						id='showPolicy'
					>
						<span>Ler regulamento</span>
					</button>
					<button
						type='button'
						className='lgpd-banner-accept-button'
						onClick={lgpdCookiesAccepted}
						id='qualID?'
					>
						<span>Aceitar</span>
					</button>
				</div>
				<SmlsModal
					id='lgpdModal'
					isOpen={isOpenModal}
					type='right'
					toggle={() => setIsOpenModal(!isOpenModal)}
				>
					<ScrollBar />
					<header className='policy-modal-header-content'>
						<h4
							className={
								isScrolled
									? 'policy-modal-header-title title-stick'
									: 'policy-modal-header-title'
							}
						>
							{modalTitle}
						</h4>
						<SmlsCheckbox
							id='termsOfUseCheck'
							checked={isChecked}
							label='Não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse.'
							onClick={checkCheckbox}
							className='policy-modal-checkbox'
						/>
					</header>
					<section
						className='policy-modal-content'
						id='policy-cookies'
						dangerouslySetInnerHTML={{ __html: `${modalText}` }}
					/>
				</SmlsModal>
			</ScrollModalContext.Provider>
		</>
	);
};
export default Lgpd;
