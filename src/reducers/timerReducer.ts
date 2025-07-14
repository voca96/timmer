import { timer, timers, timerId } from '../types/timers';

export const TIMERS_ACTIONS = {
	ADD: 'ADD_TIMER',
	DELETE: 'DELETE_TIMER',
} as const;

type AddTimer = {
	type: typeof TIMERS_ACTIONS.ADD;
	payload: { timer: timer };
};

type DeleteTimer = {
	type: typeof TIMERS_ACTIONS.DELETE;
	payload: { id: timerId };
};

type action = AddTimer | DeleteTimer;

function timerReducer(state: timers, action: action) {
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

		default:
			return state;
	}
}

export { timerReducer };
