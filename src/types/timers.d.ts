type clock = `${string}:${string}:${string}`;

type timerId = `${string}-${string}-${string}-${string}-${string}`;

type timer = {
	id: timerId;
	title: string;
	timer: clock;
	state: timerState;
};

const TIMER_STATES = {
	stadBy: 'stand-by', // the timer dont start yet
	resume: 'on-going', // the timer start counting
	stop: 'stop', // the timer stop counting and maintain the current value
	finished: 'finished', // the timer stop counting
} as const;

type timerState = (typeof TIMER_STATES)[keyof typeof TIMER_STATES];

type timers = timer[];

export { clock, timer, timers, timerState, timerId };
