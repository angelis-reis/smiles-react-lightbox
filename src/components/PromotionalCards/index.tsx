import React, { useState, useEffect } from 'react';
import { IPromotionalCard } from './types';
import Porto from '../../assets/images/porto-alegre.png';
import Airplane from '../../assets/icons/flight.svg';

export type { IPromotionalCard };

export const PromotionalCard: React.FC<IPromotionalCard> = ({
	cardPromotion,
	cardOrigin,
	cardDestiny,
	cardText,
	cardPrice,
	cardIconPath,
	...props
}) => {
	useEffect(() => {}, []);

	return (
		<div className='promotional-card'>
			{/* <img
				className='card-image'
				src={Porto}
				alt='Porto Alegre'
			/> */}

			<div className='wrapper'>
				<img
					className='card-icon'
					src={cardIconPath}
					alt='Ícone de avião'
				/>

				<span className='card-promotion'>{cardPromotion}</span>

				<span className='card-origin'>{cardOrigin}</span>

				<span className='card-destiny'>{cardDestiny}</span>

				<span className='card-text'>{cardText}</span>

				<span className='card-price'>{cardPrice}</span>
			</div>
		</div>
	);
};
