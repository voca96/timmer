import React from 'react';
import { useClock } from './hooks/useClock';
import { useTimer } from './hooks/useTimer';

import { timerList } from './mock/mockup';
import './app.css';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	const timer = useTimer({ time: '01:40:10' });
	//TIME (Clock)
	const clock = useClock();

	return (
		<main>
			<aside>
				{timerList.map(({ id, title, timer }) => {
					return (
						<div key={id}>
							{title} - {timer}
						</div>
					);
				})}
			</aside>
			<div className='main-time'>
				<div>
					<h1>{timer}</h1>
					<p>{clock}</p>
				</div>
				<div>{/* controls, start, stop */}</div>
			</div>
		</main>
	);
}
