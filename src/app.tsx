import { PlayIcon, ResumeIcon, StopIcon } from './components/icons';
import { useClock } from './hooks/useClock';
import { useTimer } from './hooks/useTimer';

import { timerList } from './mock/mockup';
import './app.css';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	// const timer = useTimer({ time: '01:40:10' });
	const { timer, setCurrentTimer, stop, start } = useTimer();
	//TIME (Clock)
	const clock = useClock();

	// timer states play, start, resume, stop

	return (
		<main>
			<aside className='time-list-section'>
				<ul>
					{timerList.map(({ id, title, timer }) => {
						return (
							<li
								key={id}
								onClick={() => {
									{
										/* select new timer, stop the current timer and start this timer */
										setCurrentTimer(`${timer}`);
									}
								}}
							>
								{/* remove timer */}
								{/* show the current timer and its status */}
								{/* once the current timer has finished the next timer on the queue have to start */}
								{title} - {timer}
							</li>
						);
					})}
				</ul>
			</aside>
			<div className='main-time'>
				<div className='timers-counter'>
					<h1>{timer}</h1>
					<p>{clock}</p>
				</div>
				<div className='controls'>
					{/* controls, start, stop */}
					<span
						onClick={() => {
							start(timer);
						}}
					>
						<PlayIcon />
					</span>
					<span
						onClick={() => {
							stop();
						}}
					>
						<StopIcon />
					</span>
					<span onClick={() => {}}>
						<ResumeIcon />
					</span>
				</div>
			</div>
		</main>
	);
}
