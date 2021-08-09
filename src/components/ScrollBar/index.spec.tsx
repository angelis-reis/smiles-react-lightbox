import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollBar } from './index';
import Lgpd from '../../containers/LgpdBanner/index';

describe('ScrollBar', () => {
	it(' should be able to renders correctly', () => {
		const renderBanner = render(<Lgpd />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		const scrollElement = document.querySelector(
			'#lgpdModal > div > div > div:nth-child(2)'
		) as HTMLElement;
		expect(scrollElement).not.toBeInTheDocument();
		userEvent.click(policyButton);
		const scrollElement2 = document.querySelector(
			'#lgpdModal > div > div > div:nth-child(2)'
		) as HTMLElement;
		expect(scrollElement2).toBeInTheDocument();
	});
	it(' should be able to stick modal title on scroll  ', async () => {
		render(<Lgpd />);
		render(<ScrollBar />);
		const policyButton = screen.getByText(
			/ler regulamento/i
		) as HTMLElement;
		userEvent.click(policyButton);
		const stickTitle = document.querySelector(
			'.title-stick'
		) as HTMLElement;
		expect(stickTitle).toBeNull();
		const modalContainer = document.querySelector(
			'.modal-content'
		) as HTMLElement;
		modalContainer.dispatchEvent(new Event('scroll'));
		await fireEvent.scroll(modalContainer, { target: { scrollTop: 60 } });
		const stickTitle2 = document.querySelector(
			'.title-stick'
		) as HTMLElement;
		expect(stickTitle2).not.toBeNull();
		await fireEvent.scroll(modalContainer, { target: { scrollTop: 40 } });
		const stickTitle3 = document.querySelector(
			'.title-stick'
		) as HTMLElement;
		expect(stickTitle3).toBeNull();
	});
});
