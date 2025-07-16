import { useEffect, useState } from 'react';
import { EMPTY_TIME, useTimer } from './hooks/useTimer';
import { useTimerList } from './hooks/useTimerList';
import {
	AddIcon,
	PlayIcon,
	ResumeIcon,
	StopIcon,
	DeleteIcon,
	AutoPlayIcon,
} from './components/icons';
import TimerModal from './components/timerModal';

import './app.css';
import { getProgress, playSound, AudioSelect } from './helpers';
import Clock from './components/clock';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	const { timerList, addNewTimer, deleteTimer, updateTimer, restartTimer } =
		useTimerList();
	const { currentTimer, setCurrentTimer, stop, start, restart } = useTimer({
		callback: (currentTimer) => updateTimer(currentTimer),
	});
	//modal
	const [openModal, setOpenModal] = useState(false);

	// custom hook "useAutoPlay"
	const [autoPlay, setAutoPlay] = useState(false);

	useEffect(() => {
		if (autoPlay && currentTimer.state === 'finished') {
			const { id } = currentTimer;
			const currentIndex = timerList.findIndex((timer) => timer.id === id);
			if (currentIndex + 1 >= timerList.length) return;
			//check the state of the next timer, if the state is not "stand-by" restart the state
			if (timerList[currentIndex + 1].state !== 'stand-by') {
				restartTimer(timerList[currentIndex + 1]);

				const nextTimer = timerList.filter(
					(timer) => timerList[currentIndex + 1].id === timer.id
				)[0];

				setCurrentTimer({
					...nextTimer,
					state: 'stand-by',
					progress: nextTimer.timer,
				});
				return;
			}
			setCurrentTimer(timerList[currentIndex + 1]);
		}
	}, [currentTimer.state]);

	useEffect(() => {
		if (autoPlay && currentTimer.progress !== EMPTY_TIME) {
			start(currentTimer.progress);
		}
	}, [currentTimer.id]);

	// until here 'useAutoPlay'

	return (
		<main>
			<aside className='time-list-section'>
				{/* COMPONENT "TimerList"*/}
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
										playSound(AudioSelect);
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
				{/* COMPONENT "TimerList"*/}
				<span
					className='add'
					onClick={() => setOpenModal(true)}
				>
					<AddIcon />
				</span>

				<span
					className={`auto-play ${autoPlay ? '' : 'disabled'}`}
					onClick={() => setAutoPlay((prev) => !prev)}
				>
					<AutoPlayIcon />
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

				{/* COMPONENT Controls*/}
				<div className='controls'>
					{/* start, stop reset*/}
					{currentTimer.timer !== EMPTY_TIME && (
						<>
							{(currentTimer.state === 'stand-by' ||
								currentTimer.state === 'stop') && (
								<span
									onClick={() => {
										playSound(AudioSelect);
										start(currentTimer.progress);
									}}
								>
									<PlayIcon />
								</span>
							)}

							{currentTimer.state === 'on-going' && (
								<span
									onClick={() => {
										playSound(AudioSelect);
										stop();
									}}
								>
									<StopIcon />
								</span>
							)}
							{currentTimer.state === 'stop' && (
								<span
									onClick={() => {
										playSound(AudioSelect);
										restartTimer(currentTimer);
										restart();
									}}
								>
									<ResumeIcon />
								</span>
							)}
						</>
					)}
				</div>
				{/* COMPONENT Controls*/}
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
