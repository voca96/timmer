type Clock = `${string}:${string}:${string}`;

type TimerId = `${string}-${string}-${string}-${string}-${string}`;

type Timer = {
	id: TimerId;
	title: string;
	timer: Clock;
	state: TimerState;
	progress: Clock;
};

const TIMER_STATES = {
	stadBy: 'stand-by', // the timer dont start yet
	resume: 'on-going', // the timer start counting
	stop: 'stop', // the timer stop counting and maintain the current value
	finished: 'finished', // the timer stop counting
} as const;

type TimerState = (typeof TIMER_STATES)[keyof typeof TIMER_STATES];

type Timers = Timer[];

export { Clock, Timer, Timers, TimerState, TimerId };
