import { clock } from '../types/timers';

type timerId = `${string}-${string}-${string}-${string}-${string}`;

type timer = {
	id: timerId;
	title: string;
	timer: clock;
};

type timers = timer[];

const timerList: timers = [
	{
		id: crypto.randomUUID(),
		title: 'Ingles',
		timer: '01:30:00',
	},
	{
		id: crypto.randomUUID(),
		title: 'estiramiento',
		timer: '00:15:00',
	},
	{
		id: crypto.randomUUID(),
		title: 'programacion I',
		timer: '01:30:00',
	},
	{
		id: crypto.randomUUID(),
		title: 'descanso almuerzo',
		timer: '01:00:00',
	},
];

export { timerList };
