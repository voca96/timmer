import { Timers } from '../types/timers';

const timerList: Timers = [
	{
		id: crypto.randomUUID(),
		title: 'Ingles',
		timer: '01:30:00',
		state: 'stand-by',
		progress: '01:30:00',
	},
	{
		id: crypto.randomUUID(),
		title: 'estiramiento',
		timer: '00:15:00',
		state: 'stand-by',
		progress: '00:15:00',
	},
	{
		id: crypto.randomUUID(),
		title: 'programacion I',
		timer: '01:30:00',
		state: 'stand-by',
		progress: '01:30:00',
	},
	{
		id: crypto.randomUUID(),
		title: 'descanso almuerzo',
		timer: '01:00:00',
		state: 'stand-by',
		progress: '01:00:00',
	},
	{
		id: crypto.randomUUID(),
		title: '5 segundos prueba',
		timer: '00:00:05',
		state: 'stand-by',
		progress: '00:00:05',
	},
	{
		id: crypto.randomUUID(),
		title: 'II',
		timer: '00:00:05',
		state: 'stand-by',
		progress: '00:00:05',
	},
];

export { timerList };
