import { useEffect, useState } from 'react';
import { EMPTY_TIME } from './useTimer';
import { useTimerList } from './useTimerList';
import { Clock, Timer } from '../types/timers';

interface UseAutoPlayProps {
	currentTimer: Timer;
	setCurrentTimer: React.Dispatch<React.SetStateAction<Timer>>;
	start: (progress: Clock) => void;
}

export function useAutoPlay({
	currentTimer,
	setCurrentTimer,
	start,
}: UseAutoPlayProps) {
	const { timerList, restartTimer } = useTimerList();
	const [autoPlay, setAutoPlay] = useState(false);

	//This control when the current timer finish, and select the next one, also testart the next one if need it
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
			// set twice the state here is the first time the second time on the other useEfect
			setCurrentTimer(timerList[currentIndex + 1]);
		}
	}, [currentTimer.state]);

	// This start the next  timer when the id change, also check if the timer selected by the user on the list has the finished state
	// in that case the timer wont call the
	useEffect(() => {
		if (autoPlay && currentTimer.progress !== EMPTY_TIME) {
			return start(currentTimer.progress);
		}
		if (currentTimer.state === 'finished') {
			restartTimer(currentTimer);
			setCurrentTimer(currentTimer);
		}
	}, [currentTimer.id]);

	return { autoPlay, setAutoPlay };
}

// MAYBE A SOLUTION CAN BE IF I CLICK ON OTHER ELEMENT LIST DISABLE THE AUTO PLAY
