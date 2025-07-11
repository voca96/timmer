import { useState, useEffect, useRef } from 'react';
import { clock } from '../types/timers';

function useClock() {
	const [clock, setClock] = useState<clock>('00:00:00');
	const refClock = useRef<ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		refClock.current = setInterval(() => {
			const currentDate = new Date();
			// padStart(2, '0') is then applied to each string. This method checks if the string's length is less than 2.
			// If it is, it prepends '0' until the string reaches a length of 2, ensuring a double-digit format (e.g., '5' becomes '05').
			setClock(
				`${currentDate.getHours().toString().padStart(2, '0')}:${currentDate
					.getMinutes()
					.toString()
					.padStart(2, '0')}:${currentDate
					.getSeconds()
					.toString()
					.padStart(2, '0')}`
			);
		}, 1000);
		return () => {
			if (refClock.current) clearInterval(refClock.current);
		};
	}, []);

	return clock;
}

export { useClock };
