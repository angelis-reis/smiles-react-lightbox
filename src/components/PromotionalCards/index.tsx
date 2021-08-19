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
	
	const iconPathFinal = require(`../../assets/${cardIconPath}`).default;

	const imagePathFinal = require(`../../assets/${cardImagePath}`).default;

	return (
		<div
			className='promotional-card'
			style={{ backgroundImage: `url(${imagePathFinal})` }}
		>
			<div className='card-wrapper'>
				<img
					className='card-icon'
					// src={iconPathFinal.default}
					src={iconPathFinal}
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
