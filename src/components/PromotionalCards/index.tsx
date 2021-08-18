import React, { useState, useEffect } from 'react';
import { IPromotionalCard } from './types';
import Porto from '../../assets/images/porto-alegre.png';
import Airplane from '../../assets/icons/flight.svg';

export type { IPromotionalCard };

export const PromotionalCard: React.FC<IPromotionalCard> = ({
	key,
	cardPromotion,
	cardOrigin,
	cardDestiny,
	cardText,
	cardPrice,
	cardIconPath,
	cardImagePath,
	...props
}) => {
	// let cardIcon = require(`../../assets/icons/flight.svg`);

	console.log('Koca: cardIconPath ', cardIconPath);

	return (
		<div
			className='promotional-card'
			style={{ backgroundImage: `url(${cardImagePath.default})` }}
		>
			<div className='wrapper'>
				<img
					className='card-icon'
					src={cardIconPath.default}
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
