import { useState, useEffect, useRef } from 'react';
import { clock } from '../types/timers';

const EMPTY_TIMER = '00:00:00';

function useTimer() {
	const [timer, setTimer] = useState<clock>(EMPTY_TIMER);
	const [currentTimer, setCurrentTimer] = useState<clock | null>(null);

	const refTimer = useRef<ReturnType<typeof setInterval>>(null);

	function getFutureTime(time: clock): number {
		//lets assume that we have 3 variables h, m, s
		// const timerToHandlde = `${currentTimer}:00`;
		const [h, m, s] = time.split(':'); // esta agarrando el current timer y no comienza desde donde lo dejo

		//lets get the amount of total seconds pon the three variables
		const totalSeg =
			parseInt(s) * 1000 +
			parseInt(m) * 1000 * 60 +
			parseInt(h) * 1000 * 60 * 60;
		// console.log('total miliseg', totalSeg);

		return new Date().getTime() + totalSeg;
		// console.log('time now', date.getTime());
		// console.log('time now with the timer add', timer);
	}

	function start(time: clock): void {
		const futureTime = getFutureTime(time);
		stop(); // revisar
		refTimer.current = setInterval(() => {
			// get the difference between the time now and the futureTime
			const distance = futureTime - new Date().getTime();

			// console.log('difference between time now and time', distance);

			//gets the hours, minutes and seconds remain
			const hR = Math.floor(
				(distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
			);
			console.log((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
			// console.log('amount of hr remain', hR);

			const mR = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
			// console.log('amount of mr remain', mR);

			const sR = Math.ceil((distance % (60 * 1000)) / 1000);
			console.log((distance % (60 * 1000)) / 1000);
			// console.log('amount of seg remain', sR);
			setTimer(
				`${hR.toString().padStart(2, '0')}:${mR
					.toString()
					.padStart(2, '0')}:${sR.toString().padStart(2, '0')}`
			);
		}, 1000);
	}

	function stop(): void {
		if (refTimer.current) clearInterval(refTimer.current);
	}

	//ADD to the state, and stop to 00 and clear the interval
	useEffect(() => {
		if (currentTimer === null || currentTimer === `${EMPTY_TIMER}`) return;

		start(currentTimer);

		return () => {
			stop();
		};
	}, [currentTimer]);

	return { timer, setCurrentTimer, stop, start };
}

export { useTimer };
