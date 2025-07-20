import React, { ReactNode } from 'react';
import { playSound, AudioSelect, getProgress } from '../helpers';
import { Timer, TimerId, Timers } from '../types/timers';
import { DeleteIcon } from './icons';

interface TimerItemsProps {
	timer: Timer;
	notification: boolean;
	setCurrentTimer: React.Dispatch<React.SetStateAction<Timer>>;
	deleteTimer: (id: TimerId) => void;
	stopTimer: () => void;
}

export function TimerItem({
	timer,
	notification,
	setCurrentTimer,
	stopTimer,
	deleteTimer,
}: TimerItemsProps) {
	function onSelect(e: React.MouseEvent<HTMLLIElement>, timer: Timer) {
		{
			e.stopPropagation();
			if (timer.state === 'on-going') return;
			// /* select new timer, stop the current timer and start this timer */
			// //stop the current timer
			stopTimer();
			// // update the current timer
			// // set the new current timer
			setCurrentTimer(timer);
			playSound(AudioSelect, notification);
		}
	}

	function onDelete(e: React.MouseEvent<HTMLSpanElement>, id: TimerId) {
		e.stopPropagation();
		deleteTimer(id);
	}

	return (
		<li
			key={timer.id}
			style={{
				background:
					timer.progress !== timer.timer
						? `linear-gradient(to right, ${
								timer.state === 'on-going' || timer.state === 'finished'
									? 'rgb(42, 161, 50)'
									: 'rgba(189, 107, 35, 1)'
						  } ${getProgress(timer.timer, timer.progress)}%, #242424 0%)`
						: '',
			}}
			onClick={(e) => onSelect(e, timer)}
		>
			{/* show the current timer and its status */}
			<div>
				{timer.title} - {timer.timer}
				<span
					className='delete-icon'
					onClick={(e) => {
						onDelete(e, timer.id);
					}}
				>
					<DeleteIcon />
				</span>
			</div>
		</li>
	);
}

interface TimerListProps {
	timerList: Timers;
	renderItem: (timer: Timer) => ReactNode;
}

export function TimerList({ timerList, renderItem }: TimerListProps) {
	return timerList.length > 0 ? (
		<ul>{timerList.map((timer) => renderItem(timer))}</ul>
	) : (
		<div>
			<h2>No Timers, please create one.</h2>
		</div>
	);
}
