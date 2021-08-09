import {
	act,
	screen,
	render,
	waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lgpd from './index';
import * as mockGetTerms from '../../services/getTerms/index';
const lgpdText: string =
	'Utilizamos cookies e outras tecnologias pra melhorar a sua experiência no nosso site.';
global.scroll = jest.fn();

describe('Lgpd', () => {
	afterEach(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	it(' should be able to render API data', async () => {
		jest.spyOn(mockGetTerms, 'asyncGetTerms').mockResolvedValueOnce({
			modalTitle: 'Titulo do modal',
			modalText: '<p>Texto do modal</p>'
		});
		await act(async () => render(<Lgpd />));
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		await act(async () => userEvent.click(policyButton));
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		expect(screen.getByText(/Titulo do modal/i)).toBeInTheDocument();
	});

	it(' should be able renders correctly', () => {
		render(<Lgpd />);
		const lgpdBannerText = screen.getByText(lgpdText) as HTMLElement;
		expect(lgpdBannerText).toBeInTheDocument();
	});
	it(' should be able to render modal text content ', async () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const modalData = screen.getByRole('heading', {
			name: /carregando\.\.\./i
		});
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		expect(modalData).toBeInTheDocument();
	});
	it(' should be able to render cookies text', () => {
		render(<Lgpd />);
		const lgpdBannerText = screen.getByText(lgpdText) as HTMLElement;
		expect(lgpdBannerText).toBeInTheDocument();
	});
	it(' should be able to open modal by clicking on "read policy" button', () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		expect(policyButton).toBeInTheDocument();
		userEvent.click(policyButton);
		const modalElement = screen.getByText(
			/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
	});
	it(' should be able to close banner by clicking on "accept" button', async () => {
		render(<Lgpd />);
		expect(screen.queryByText(lgpdText)).toBeInTheDocument();
		const acceptButton = screen.getByText(/aceitar/i) as HTMLElement;
		userEvent.click(acceptButton);
		expect(screen.queryByText(lgpdText)).not.toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to close modal by clicking on close button', async () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const modalElement = document.querySelector(
			'.policy-modal-header-content'
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		expect(closeModalButton).toBeInTheDocument();
		const outsideModal = screen.getByRole('dialog') as HTMLElement;
		expect(outsideModal).toBeInTheDocument();
		userEvent.click(closeModalButton);
		await waitForElementToBeRemoved(() =>
			screen.getByText(
				/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
			)
		);
		expect(modalElement).not.toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to close modal by clicking outside of modal', async () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const modalElement = document.querySelector(
			'.policy-modal-header-content'
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
		const outsideModal = screen.getByRole('dialog') as HTMLElement;
		expect(outsideModal).toBeInTheDocument();
		userEvent.click(outsideModal);
		await waitForElementToBeRemoved(() =>
			screen.getByText(
				/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
			)
		);
		expect(modalElement).not.toBeInTheDocument();
		expect(policyButton).toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to check the modal checkbox and close modal and banner by clicking on close button', () => {
		const renderBanner = render(<Lgpd />);
		const lgpdBannerDiv = renderBanner.container.querySelector('.lgpd');
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		if (lgpdBannerDiv) {
			expect(lgpdBannerDiv).toBeInTheDocument();
		}
		userEvent.click(policyButton);
		const modalElement = document.querySelector(
			'.policy-modal-header-content'
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		const checkBox = screen.getByRole('checkbox', {
			name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
		}) as HTMLElement;
		expect(checkBox).not.toBeChecked();
		userEvent.click(checkBox);
		expect(checkBox).toBeChecked();
		userEvent.click(closeModalButton);
		expect(modalElement).not.toBeInTheDocument();
		expect(lgpdBannerDiv).not.toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to check the modal checkbox and close modal and banner by clicking outside of modal', async () => {
		const renderBanner = render(<Lgpd />);
		const lgpdBannerDiv = renderBanner.container.querySelector('.lgpd');
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		if (lgpdBannerDiv) {
			expect(lgpdBannerDiv).toBeInTheDocument();
		}
		userEvent.click(policyButton);
		const modalElement = document.querySelector(
			'.policy-modal-header-content'
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		const outsideModal = screen.getByRole('dialog') as HTMLElement;
		expect(outsideModal).toBeInTheDocument();
		const checkBox = screen.getByRole('checkbox', {
			name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
		}) as HTMLElement;
		expect(checkBox).not.toBeChecked();
		userEvent.click(checkBox);
		expect(checkBox).toBeChecked();
		userEvent.click(outsideModal);
		await waitForElementToBeRemoved(() =>
			screen.getByText(
				/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
			)
		);
		expect(closeModalButton).not.toBeInTheDocument();
		expect(lgpdBannerDiv).not.toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to check the modal checkbox, unchecked it and close only modal by clicking on close button', async () => {
		const renderBanner = render(<Lgpd />);
		const lgpdBannerText = screen.getByText(
			/utilizamos cookies e outras tecnologias pra melhorar a sua experiência no nosso site\./i
		);
		const lgpdBannerDiv = renderBanner.container.querySelector('.lgpd');
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		if (lgpdBannerDiv) {
			expect(lgpdBannerDiv).toBeInTheDocument();
		}
		userEvent.click(policyButton);
		const modalElement = document.querySelector(
			'.policy-modal-header-content'
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		const checkBox = screen.getByRole('checkbox', {
			name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
		}) as HTMLElement;
		expect(checkBox).not.toBeChecked();
		userEvent.click(checkBox);
		expect(checkBox).toBeChecked();
		userEvent.click(checkBox);
		expect(checkBox).not.toBeChecked();
		userEvent.click(closeModalButton);
		await waitForElementToBeRemoved(() =>
			screen.getByText(
				/não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
			)
		);
		expect(closeModalButton).not.toBeInTheDocument();
		expect(lgpdBannerText).toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to render modal content text', () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const policyModalContent = document.querySelector(
			'.policy-modal-content'
		) as HTMLElement;
		expect(policyModalContent).toBeInTheDocument();
	});
	it(' should be able to render progressbar ', () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const modalElement = document.querySelector(
			'.policy-modal-content'
		) as HTMLElement;
		expect(modalElement).toBeInTheDocument();
		const scrollBar = document.querySelector(
			'.modal-scroll-bar'
		) as HTMLElement;
		expect(scrollBar).toBeInTheDocument();
	});
	it(' should be able to save a "accepted" cookie in localStorage by clicking on "accept" button', async () => {
		render(<Lgpd />);
		expect(screen.queryByText(lgpdText)).toBeInTheDocument();
		const acceptButton = screen.getByText(/aceitar/i) as HTMLElement;
		userEvent.click(acceptButton);
		expect(screen.queryByText(lgpdText)).not.toBeInTheDocument();
		const cookie = localStorage.getItem('cookies');
		expect(cookie).toMatch('accepted');
		localStorage.clear();
	});
	it(' should not be able to render banner on page reload after accepted cookies', async () => {
		render(<Lgpd />);
		expect(screen.queryByText(lgpdText)).toBeInTheDocument();
		const acceptButton = screen.getByText(/aceitar/i) as HTMLElement;
		userEvent.click(acceptButton);
		expect(screen.queryByText(lgpdText)).not.toBeInTheDocument();
		const cookie = localStorage.getItem('cookies');
		expect(cookie).toMatch('accepted');
		render(<Lgpd />);
		expect(screen.queryByText(lgpdText)).not.toBeInTheDocument();
		localStorage.clear();
	});
	it(' should be able to check the modal checkbox and save a "accepted" cookie in localStorage ', async () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		const checkBox = screen.getByRole('checkbox', {
			name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
		}) as HTMLElement;
		userEvent.click(checkBox);
		expect(checkBox).toBeChecked();
		const cookies = await localStorage.getItem('cookies');
		expect(cookies).toMatch('accepted');
		localStorage.clear();
	});
	it(' should be able to check the modal checkbox and save a "accepted" cookie in localStorage, then unchecked it and erase the cookie in localStorage ', async () => {
		render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const closeModalButton = screen.getByRole('button', {
			name: /close/i
		}) as HTMLElement;
		const checkBox = screen.getByRole('checkbox', {
			name: /não aceito compartilhar cookies de marketing para receber ofertas e propagandas adaptadas ao meu interesse\./i
		}) as HTMLElement;
		userEvent.click(checkBox);
		expect(checkBox).toBeChecked();
		const cookies = await localStorage.getItem('cookies');
		expect(cookies).toMatch('accepted');
		userEvent.click(checkBox);
		expect(checkBox).not.toBeChecked();
		expect(localStorage.getItem('cookies')).toBeNull();
		localStorage.clear();
	});
	it(' should be able to show banner 800ms after render', async () => {
		jest.useFakeTimers();
		render(<Lgpd />);
		act(() => {
			jest.advanceTimersByTime(900);
		});
		const lgpdBannerText = document.querySelector(
			'.lgpd-banner'
		) as HTMLElement;
		expect(lgpdBannerText).toBeInTheDocument();
	});
});
