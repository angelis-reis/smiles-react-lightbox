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
	...props
}) => {
	const iconPathFinal = require(`../../assets/${cardIconPath}`).default;
	const imagePathFinal = require(`../../assets/${cardImagePath}`).default;
	return (
		<Router>
			<Link to={redirectPath} className='card-link'>
				<div
					className='promotional-card'
					style={{ backgroundImage: `url(${imagePathFinal})` }}
				>
					<div className='card-wrapper'>
						<img
							className='card-icon'
							src={iconPathFinal}
							alt='Ícone de avião'
						/>
						<span className='card-promotion'>{cardPromotion}</span>
						<span className='card-origin'>{cardOrigin}</span>
						<span className='card-destiny'>{cardDestiny}</span>
						<span className='card-text'>A partir de</span>
						<span className='card-price'>{cardPrice}</span>
					</div>
				</div>
			</Link>
		</Router>
	);
};
