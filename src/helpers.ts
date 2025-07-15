import { Clock } from './types/timers';

export function timeToMili(time: Clock) {
	//lets assume that we have 3 variables h, m, s
	const [h, m, s] = time.split(':');

	//gets the total of milliseconds for the current timer
	const totalMili =
		parseInt(s) * 1000 + parseInt(m) * 1000 * 60 + parseInt(h) * 1000 * 60 * 60;

	return totalMili;
}

export function getFutureTime(time: Clock): number {
	return new Date().getTime() + timeToMili(time);
}

export function parseClock(distance: number): Clock {
	const hR = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

	const mR = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));

	const sR = Math.ceil((distance % (60 * 1000)) / 1000);

	return `${hR.toString().padStart(2, '0')}:${mR
		.toString()
		.padStart(2, '0')}:${sR.toString().padStart(2, '0')}`;
}

export function getProgress(timer: Clock, progress?: Clock): number {
	if (!progress) return 0;
	console.log(timeToMili(progress));
	// console.log(timeToMili(timer));
	const diference = timeToMili(timer) - timeToMili(progress);
	return Math.floor((diference * 100) / timeToMili(timer));
}
