import { useState, useRef, useEffect } from 'react';
import { clock, timer, timerId } from '../types/timers';

const EMPTY_TIME: clock = '00:00:00';

const EMPTY_TIMER: timer = {
	id: crypto.randomUUID(),
	timer: EMPTY_TIME,
	title: 'Elige un temporizador!',
	state: 'stand-by',
};

function useTimer() {
	// this state isimportant to maintain the time that passed
	// const [timer, setTimer] = useState<clock>(EMPTY_TIMER);
	const [timerFinished, setTimerFinished] = useState<timerId | null>(null);
	const [currentTimer, setCurrentTimer] = useState<timer>(EMPTY_TIMER);

	const refTimer = useRef<ReturnType<typeof setInterval>>(null);

	// Pass the complete timer
	// return the current timer status "play, on-going , stop, resume"

	// NOTE: on-going and resume are the state

	function timeToMili(time: clock) {
		//lets assume that we have 3 variables h, m, s
		// const timerToHandlde = `${currentTimer}:00`;
		const [h, m, s] = time.split(':'); // esta agarrando el current timer y no comienza desde donde lo dejo

		//lets get the amount of total seconds pon the three variables
		const totalMili =
			parseInt(s) * 1000 +
			parseInt(m) * 1000 * 60 +
			parseInt(h) * 1000 * 60 * 60;

		return totalMili;
	}

	function getFutureTime(time: clock): number {
		return new Date().getTime() + timeToMili(time);
	}

	function start(time: clock): void {
		if (currentTimer.timer === EMPTY_TIME || currentTimer.state === 'on-going')
			return;

		const futureTime = getFutureTime(time);
		setCurrentTimer({ ...currentTimer, state: 'on-going' });
		// stop(); // revisar
		refTimer.current = setInterval(() => {
			// get the difference between the time now and the futureTime
			const distance = futureTime - new Date().getTime();

			if (distance < -1000) {
				return finish();
			}
			if (distance < 0) {
				// setTimer(EMPTY_TIMER);
				//for now
				setCurrentTimer({ ...currentTimer, timer: EMPTY_TIME });
				return;
			}

			//gets the hours, minutes and seconds remain
			const hR = Math.floor(
				(distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
			);

			const mR = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));

			const sR = Math.ceil((distance % (60 * 1000)) / 1000);
			// if (currentTimer)
			setCurrentTimer({
				...currentTimer,
				timer: `${hR.toString().padStart(2, '0')}:${mR
					.toString()
					.padStart(2, '0')}:${sR.toString().padStart(2, '0')}`,
			});

			// setTimer(
			// 	`${hR.toString().padStart(2, '0')}:${mR
			// 		.toString()
			// 		.padStart(2, '0')}:${sR.toString().padStart(2, '0')}`
			// );
		}, 1000);
	}

	function stop(): void {
		if (refTimer.current) {
			setCurrentTimer({ ...currentTimer, state: 'stop' });
			clearInterval(refTimer.current);
		}
	}

	//FOR KNOW
	function finish(): void {
		if (refTimer.current) {
			// setCurrentTimer(EMPTY_TIMER);
			// setCurrentTimer({ ...currentTimer, state: 'finished' });
			setTimerFinished(currentTimer.id);
			clearInterval(refTimer.current);
		}
	}

	// useEffect(() => {
	// 	if (currentTimer.state === 'on-going') return;
	// 	start(currentTimer.timer);
	// }, [currentTimer]);

	//MAYBE THERE IS another cleanest way to handle the next timer
	// create a flag that is going to indicate the last

	return { currentTimer, timerFinished, setCurrentTimer, stop, start };
}

export { useTimer };
