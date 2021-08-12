import React, { useState, useEffect } from 'react';
import Lightbox from './containers/Lightbox/index';
import { init } from './services/core/index';

const App: React.FC = () => {
	const [coreHasInitialized, setCoreHasInitialized] =
		useState<boolean>(false);
	useEffect(() => {
		const initializeCore = async (): Promise<void> => {
			await init();
			setCoreHasInitialized(true);
		};
		initializeCore();
	}, []);

	return (
		<>
			{coreHasInitialized ? (
				<div className='main-portal'>
					<Lightbox />
				</div>
			) : null}
		</>
	);
};
export default App;
