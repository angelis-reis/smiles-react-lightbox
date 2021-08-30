import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { IPromotionalCard } from './types';

export type { IPromotionalCard };
export const PromotionalCard: React.FC<IPromotionalCard> = ({
	cardPromotion,
	cardOrigin,
	cardDestiny,
	cardPrice,
	cardIconPath,
	cardImagePath,
	redirectPath,
	cardId,
	...props
}) => {
	// const iconPathFinal = require(`${cardIconPath}`).default;
	// const imagePathFinal = require(`${cardImagePath}`).default;

	const iconPathFinal = require(`../../assets/${cardIconPath}`).default;
	const imagePathFinal = require(`../../assets/${cardImagePath}`).default;

	return (
		<Router>
			<Link to={redirectPath} className='card-link'>
				<div
					id=''
					className='promotional-card'
					style={{ backgroundImage: `url(${imagePathFinal})` }}
				>
					<div className='card-wrapper'>
						<img
							id=''
							className='card-icon'
							src={iconPathFinal}
							alt='Ícone de avião'
						/>
						<span id='' className='card-promotion'>
							{cardPromotion}
						</span>
						<span id='' className='card-origin'>
							{cardOrigin}
						</span>
						<span id='' className='card-destiny'>
							{cardDestiny}
						</span>
						<span id='' className='card-text'>
							A partir de
						</span>
						<span id='' className='card-price'>
							{cardPrice}
						</span>
					</div>
				</div>
			</Link>
		</Router>
	);
};
