import { useState, useEffect, useRef } from 'react';
import { clock } from '../types/timers';

function useTimer({ time }: { time: clock }) {
	const [timer, setTimer] = useState<clock>(time);
	// const [currentTimer, setCurrentTimer] = useState<clock>('01:20:30');

	const refTimer = useRef<ReturnType<typeof setInterval>>(null);

	//ADD to the state, and stop to 00 and clear the interval
	useEffect(() => {
		//lets assume that we have 3 variables h, m, s
		const [h, m, s] = timer.split(':');
		// const h = 2;
		// const m = 0;
		// const s = 5;
		//02:20:40

		//lets get the amount of total seconds pon the three variables

		const totalSeg =
			parseInt(s) * 1000 +
			parseInt(m) * 1000 * 60 +
			parseInt(h) * 1000 * 60 * 60;
		// console.log('total miliseg', totalSeg);

		const futureTime = new Date().getTime() + totalSeg;
		// console.log('time now', date.getTime());
		// console.log('time now with the timer add', timer);

		refTimer.current = setInterval(() => {
			// get the difference between the time now and the futureTime
			const distance = futureTime - new Date().getTime();

			// console.log('difference between time now and time', distance);

			//gets the hours, minutes and seconds remain
			const hR = Math.floor(
				(distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
			);
			// console.log('amount of hr remain', hR);

			const mR = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
			// console.log('amount of mr remain', mR);

			const sR = Math.floor((distance % (60 * 1000)) / 1000);
			// console.log('amount of seg remain', sR);
			setTimer(
				`${hR.toString().padStart(2, '0')}:${mR
					.toString()
					.padStart(2, '0')}:${sR.toString().padStart(2, '0')}`
			);
		}, 1000);

		return () => {
			if (refTimer.current) clearInterval(refTimer.current);
		};
	}, []);

	return timer;
}

export { useTimer };
