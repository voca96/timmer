import { AddIcon, PlayIcon, ResumeIcon, StopIcon } from './components/icons';
import { useClock } from './hooks/useClock';
import { useTimer } from './hooks/useTimer';

import { timerList } from './mock/mockup';
import './app.css';
import TimerModal from './components/timerModal';
import { useState } from 'react';
import { timer } from './types/timers';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	const [timers, setTimers] = useState(timerList);
	// const timer = useTimer({ time: '01:40:10' });
	const { timer, setCurrentTimer, stop, start } = useTimer();
	//TIME (Clock)
	const clock = useClock();

	//modal
	const [openModal, setOpenModal] = useState(false);

	// timer states play, start, resume, stop

	function addNewTimer(timerInfo: timer) {
		alert('hi');
		setTimers([...timers, timerInfo]);
	}

	return (
		<main>
			<aside className='time-list-section'>
				<ul>
					{timers.map(({ id, title, timer }) => {
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
				<span
					className='add'
					onClick={() => setOpenModal(true)}
				>
					<AddIcon />
				</span>
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
			{openModal && (
				<TimerModal
					onClose={() => setOpenModal(false)}
					createTimer={addNewTimer}
				/>
			)}
		</main>
	);
}
