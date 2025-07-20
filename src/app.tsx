import { useState } from 'react';
import { useTimer } from './hooks/useTimer';
import { useTimerList } from './hooks/useTimerList';
import {
	AddIcon,
	AutoPlayIcon,
	NotificationIcon,
	NoNotificationIcon,
} from './components/icons';
import TimerModal from './components/timerModal';

import './app.css';
import Clock from './components/clock';
import { useAutoPlay } from './hooks/useAutoPlay';
import Controls from './components/controls';
import { TimerList, TimerItem } from './components/timerList';

//Search how create the time format for 00:00:00

export default function App() {
	//TIMER
	const { timerList, addNewTimer, deleteTimer, updateTimer, restartTimer } =
		useTimerList();
	// Notification
	const [notification, setNotification] = useState(false);

	const { currentTimer, setCurrentTimer, stop, start, restart } = useTimer({
		callback: (currentTimer) => updateTimer(currentTimer),
		playNotification: notification,
	});
	//modal
	const [openModal, setOpenModal] = useState(false);

	//AutoPlay
	const { autoPlay, setAutoPlay } = useAutoPlay({
		currentTimer,
		setCurrentTimer,
		start,
	});

	return (
		<main>
			<aside className='time-list-section'>
				{/* COMPONENT "TimerList"*/}
				<TimerList
					timerList={timerList}
					renderItem={(timerItem) => (
						<TimerItem
							timer={timerItem}
							notification={notification}
							deleteTimer={deleteTimer}
							setCurrentTimer={setCurrentTimer}
							stopTimer={stop}
							key={timerItem.id}
						/>
					)}
				/>

				{/* COMPONENT "TimerList"*/}
				<footer>
					<span
						className='add action-button'
						onClick={() => setOpenModal(true)}
					>
						<AddIcon />
					</span>

					<span
						className={`auto-play action-button ${autoPlay ? '' : 'disabled'}`}
						onClick={() => setAutoPlay((prev) => !prev)}
					>
						<AutoPlayIcon />
					</span>

					<span
						className={`notification action-button ${
							notification ? '' : 'disabled'
						}`}
						onClick={() => {
							setNotification((prev) => !prev);
						}}
					>
						{notification ? <NotificationIcon /> : <NoNotificationIcon />}
					</span>
				</footer>
			</aside>
			<div className='main-time'>
				<div>
					<h2>{currentTimer.title}</h2>
					<div className='timers-counter'>
						<h1>{currentTimer.progress}</h1>
						<Clock />
					</div>
				</div>

				<Controls
					timerState={currentTimer.state}
					notification={notification}
					restart={() => {
						restartTimer(currentTimer);
						restart();
					}}
					start={() => start(currentTimer.progress)}
					stop={stop}
				/>
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
