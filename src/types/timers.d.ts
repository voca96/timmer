type clock = `${string}:${string}:${string}`;

type timerId = `${string}-${string}-${string}-${string}-${string}`;

type timer = {
	id: timerId;
	title: string;
	timer: clock;
};

type timers = timer[];

export { clock, timer, timers };
