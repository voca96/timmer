import { useEffect, useState } from 'react';
import { useClock } from './hooks/useClock';
import { useTimer } from './hooks/useTimer';
import { useTimerList } from './hooks/useTimerList';
import {
	AddIcon,
	PlayIcon,
	ResumeIcon,
	StopIcon,
	DeleteIcon,
} from './components/icons';
import TimerModal from './components/timerModal';

import './app.css';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	const { timerList, addNewTimer, deleteTimer } = useTimerList();
	// const timer = useTimer({ time: '01:40:10' });
	const { currentTimer, timerFinished, setCurrentTimer, stop, start } =
		useTimer();
	//TIME (Clock)
	const clock = useClock();

	//modal
	const [openModal, setOpenModal] = useState(false);

	// timer states play, start, resume, stop

	useEffect(() => {
		if (timerFinished !== null) {
			const finishedId = timerList.findIndex(
				(timer) => timer.id === timerFinished
			);

			if (finishedId + 1 < timerList.length) {
				const nextTimer = timerList[finishedId + 1];
				setCurrentTimer(nextTimer);
			}
		}
	}, [timerFinished]);

	return (
		<main>
			<aside className='time-list-section'>
				<ul>
					{timerList.map((timer) => {
						return (
							<li
								key={timer.id}
								onClick={(e) => {
									{
										e.stopPropagation();
										/* select new timer, stop the current timer and start this timer */
										setCurrentTimer(timer);
									}
								}}
							>
								{/* show the current timer and its status */}
								{/* once the current timer has finished the next timer on the queue have to start */}
								{timer.title} - {timer.timer}
								<span
									className='delete-icon'
									onClick={(e) => {
										e.stopPropagation();
										deleteTimer(timer.id);
									}}
								>
									<DeleteIcon />
								</span>
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
				<div>
					<h2>{currentTimer.title}</h2>
					<div className='timers-counter'>
						<h1>{currentTimer.timer}</h1>
						<p>{clock}</p>
					</div>
				</div>
				<div className='controls'>
					{/* controls, start, stop */}
					<span
						onClick={() => {
							start(currentTimer.timer);
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
