import { useReducer } from 'react';
import { timerReducer, TIMERS_ACTIONS } from '../reducers/timerReducer';
import { Timer, TimerId } from '../types/timers';
import { timerList } from '../mock/mockup';

export function useTimerList() {
	const [state, dispatch] = useReducer(timerReducer, timerList);

	function addNewTimer(timer: Timer) {
		dispatch({
			type: TIMERS_ACTIONS.ADD,
			payload: { timer },
		});
	}

	function deleteTimer(id: TimerId) {
		dispatch({
			type: TIMERS_ACTIONS.DELETE,
			payload: { id },
		});
	}

	function updateTimer(timer: Timer) {
		dispatch({
			type: TIMERS_ACTIONS.UPDATE,
			payload: { timer },
		});
	}

	function restartTimer(timer: Timer) {
		dispatch({
			type: TIMERS_ACTIONS.RESTART,
			payload: { timer },
		});
	}

	return {
		timerList: state,
		addNewTimer,
		deleteTimer,
		updateTimer,
		restartTimer,
	};
}
