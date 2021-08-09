import React, { useState, useEffect, useRef, useContext } from 'react';
import { IScrollBar } from './types';
import { ScrollModalContext } from '../../containers/LgpdBanner/index';

export type { IScrollBar };

export const ScrollBar: React.FC<IScrollBar> = () => {
	const [scroll, setScroll] = useState<number>(0);
	const { isScrolled, setIsScrolled } = useContext(ScrollModalContext);
	const [scrollPositionModal, setScrollPositionModal] = useState<number>(0);
	const ticking: React.MutableRefObject<boolean> = useRef(false);

	const updateScrollBar = () => {
		const scrollableContainer: Element =
			document.getElementsByClassName('modal-content')[0];
		const modalHeight: number =
			document.getElementsByClassName('modal-content')[0].scrollHeight;
		const modalClientHeight: number =
			document.getElementsByClassName('modal-content')[0].clientHeight;
		const scrollPosition: number = scrollableContainer.scrollTop;
		setScrollPositionModal(scrollPosition);
		if (!ticking.current) {
			const windowHeight: number = modalHeight - modalClientHeight;
			window.requestAnimationFrame(() => {
				setScroll(Math.floor((scrollPosition / windowHeight) * 100));
				ticking.current = false;
			});
		}
		ticking.current = true;
	};

	useEffect(() => {
		const scrollableContainer: Element =
			document.getElementsByClassName('modal-content')[0];

		if (scrollableContainer) {
			scrollableContainer.addEventListener('scroll', updateScrollBar);
			updateScrollBar();
			return () =>
				scrollableContainer.removeEventListener(
					'scroll',
					updateScrollBar
				);
		}
	}, []);

	if (!isScrolled && scrollPositionModal > 50) {
		setIsScrolled(true);
	}
	if (isScrolled && scrollPositionModal < 50) {
		setIsScrolled(false);
	}

	return (
		<>
			<div
				className='modal-scroll-bar'
				style={{
					background: `linear-gradient(to right, #FF7020 ${scroll}%, transparent 0)`
				}}
			/>
		</>
	);
};
