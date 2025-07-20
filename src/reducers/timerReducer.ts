import { Timer, Timers, TimerId } from '../types/timers';

export const TIMERS_ACTIONS = {
	ADD: 'ADD_TIMER',
	DELETE: 'DELETE_TIMER',
	UPDATE: 'UPDATE_TIMER',
	RESTART: 'RESTART_TIMER',
} as const;

type AddTimer = {
	type: typeof TIMERS_ACTIONS.ADD;
	payload: { timer: Timer };
};

type DeleteTimer = {
	type: typeof TIMERS_ACTIONS.DELETE;
	payload: { id: TimerId };
};

type UpdateTimer = {
	type: typeof TIMERS_ACTIONS.UPDATE;
	payload: { timer: Timer };
};

type RestartTimer = {
	type: typeof TIMERS_ACTIONS.RESTART;
	payload: { timer: Timer };
};

type ActionType = AddTimer | DeleteTimer | UpdateTimer | RestartTimer;

export function getTimerList(): Timers {
	return JSON.parse(window.localStorage.getItem('timers') || '[]');
}

function setTimerList(timerList: Timers) {
	window.localStorage.setItem('timers', JSON.stringify(timerList));
}

function timerReducer(state: Timers, action: ActionType) {
	switch (action.type) {
		case TIMERS_ACTIONS.ADD: {
			const { timer } = action.payload;
			setTimerList([...state, timer]);
			return [...state, timer];
		}

		case TIMERS_ACTIONS.DELETE: {
			const { id } = action.payload;
			const newTimerList = state.filter((timer) => timer.id !== id);
			setTimerList(newTimerList);
			return newTimerList;
		}

		case TIMERS_ACTIONS.UPDATE: {
			const { id } = action.payload.timer;
			const timerIndex = state.findIndex((timer) => timer.id === id);
			const modifiedList = [
				...state.slice(0, timerIndex),
				action.payload.timer,
				...state.slice(timerIndex + 1),
			];
			setTimerList(modifiedList);
			return modifiedList;
		}

		case TIMERS_ACTIONS.RESTART: {
			const { id, timer } = action.payload.timer;
			const timerIndex = state.findIndex((timer) => timer.id === id);
			const modifiedList = [
				...state.slice(0, timerIndex),
				{ ...action.payload.timer, progress: timer, state: 'stand-by' },
				...state.slice(timerIndex + 1),
			] as Timers;
			setTimerList(modifiedList);
			return modifiedList;
		}

		default:
			return state;
	}
}

export { timerReducer };
