import { Timer, Timers, TimerId } from '../types/timers';

export const TIMERS_ACTIONS = {
	ADD: 'ADD_TIMER',
	DELETE: 'DELETE_TIMER',
	UPDATE: 'UPDATE_TIMER',
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

type action = AddTimer | DeleteTimer | UpdateTimer;

function timerReducer(state: Timers, action: action) {
	switch (action.type) {
		case TIMERS_ACTIONS.ADD: {
			const { timer } = action.payload;
			return [...state, timer];
		}

		case TIMERS_ACTIONS.DELETE: {
			const { id } = action.payload;
			const newTimerList = state.filter((timer) => timer.id !== id);
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
			return modifiedList;
		}

		default:
			return state;
	}
}

export { timerReducer };
