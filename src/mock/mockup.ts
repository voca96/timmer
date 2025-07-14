import { timers } from '../types/timers';

const timerList: timers = [
	{
		id: crypto.randomUUID(),
		title: 'Ingles',
		timer: '01:30:00',
		state: 'stand-by',
	},
	{
		id: crypto.randomUUID(),
		title: 'estiramiento',
		timer: '00:15:00',
		state: 'stand-by',
	},
	{
		id: crypto.randomUUID(),
		title: 'programacion I',
		timer: '01:30:00',
		state: 'stand-by',
	},
	{
		id: crypto.randomUUID(),
		title: 'descanso almuerzo',
		timer: '01:00:00',
		state: 'stand-by',
	},
	{
		id: crypto.randomUUID(),
		title: 'descanso almuerzo',
		timer: '00:00:05',
		state: 'stand-by',
	},
	{
		id: crypto.randomUUID(),
		title: 'II',
		timer: '00:00:05',
		state: 'stand-by',
	},
];

export { timerList };
