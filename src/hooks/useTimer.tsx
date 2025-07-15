import { useState, useCallback, useRef, useEffect } from 'react';
import { Clock, Timer } from '../types/timers';
import { getFutureTime, parseClock } from '../helpers';

export const EMPTY_TIME: Clock = '00:00:00';

const EMPTY_TIMER: Timer = {
	id: crypto.randomUUID(),
	timer: EMPTY_TIME,
	title: 'Elige un temporizador!',
	state: 'stand-by',
	progress: EMPTY_TIME,
};

interface useTimerProps {
	callback?: (currentTimer: Timer) => void;
}

function useTimer({ callback }: useTimerProps) {
	const [currentTimer, setCurrentTimer] = useState<Timer>(EMPTY_TIMER);

	const refTimer = useRef<ReturnType<typeof setInterval>>(null);

	const start = useCallback(
		(time: Clock) => {
			const futureTime = getFutureTime(time);
			console.log(refTimer.current);
			refTimer.current = setInterval(() => {
				// get the difference between the time now and the futureTime
				const distance = futureTime - new Date().getTime();

				if (distance < -1000) {
					finished();
				}

				if (distance < 0) {
					return setCurrentTimer({
						...currentTimer,
						progress: EMPTY_TIME,
						state: 'finished',
					});
				}

				//gets the hours, minutes and seconds remain
				const distanceToClock = parseClock(distance);

				setCurrentTimer({
					...currentTimer,
					// timer: distanceToClock,
					progress: distanceToClock,
					state: 'on-going',
				});
			}, 1000);
		},
		[currentTimer.id]
	);

	function stop(): void {
		if (refTimer.current) {
			setCurrentTimer((prev) => {
				if (callback != undefined) callback({ ...prev, state: 'stop' });
				return { ...prev, state: 'stop' };
			});
			clearInterval(refTimer.current);
			refTimer.current = null;
		}
	}

	function finished(): void {
		if (refTimer.current) {
			setCurrentTimer(EMPTY_TIMER);
			clearInterval(refTimer.current);
			refTimer.current = null;
		}
	}

	useEffect(() => {
		// this portion for do an action eact time that the current timer gets modified
		console.log('hola');
		if (callback != undefined) {
			if (currentTimer.state === 'on-going') callback(currentTimer);

			if (currentTimer.state === 'finished') {
				callback(currentTimer);
				finished();
			}
		}
	}, [currentTimer.progress, currentTimer.state]);

	return { currentTimer, setCurrentTimer, stop, start };
}

export { useTimer };
