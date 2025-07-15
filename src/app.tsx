import { useState } from 'react';
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
import { getProgress } from './helpers';
import Clock from './components/clock';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	const { timerList, addNewTimer, deleteTimer, updateTimer } = useTimerList();
	const { currentTimer, setCurrentTimer, stop, start } = useTimer({
		callback: (currentTimer) => updateTimer(currentTimer),
	});
	//TIME (Clock)

	//modal
	const [openModal, setOpenModal] = useState(false);

	return (
		<main>
			<aside className='time-list-section'>
				<ul>
					{timerList.map((timer) => {
						return (
							<li
								key={timer.id}
								style={{
									background:
										timer.progress !== timer.timer
											? `linear-gradient(to right, ${
													timer.state === 'on-going' ||
													timer.state === 'finished'
														? 'rgb(42, 161, 50)'
														: 'rgba(189, 107, 35, 1)'
											  } ${getProgress(
													timer.timer,
													timer.progress
											  )}%, #242424 0%)`
											: '',
								}}
								onClick={(e) => {
									{
										e.stopPropagation();
										if (
											timer.state === 'finished' ||
											timer.state === 'on-going'
										)
											return;
										/* select new timer, stop the current timer and start this timer */
										//stop the current timer
										stop();
										// update the current timer
										// set the new current timer
										setCurrentTimer(timer);
									}
								}}
							>
								{/* show the current timer and its status */}
								<div>
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
								</div>
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
						<h1>{currentTimer.progress}</h1>
						<Clock />
					</div>
				</div>
				<div className='controls'>
					{/* start, stop reset*/}
					<span
						onClick={() => {
							if (
								currentTimer.state === 'stand-by' ||
								currentTimer.state === 'stop'
							)
								start(currentTimer.progress);
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
