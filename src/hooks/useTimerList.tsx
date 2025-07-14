import { useReducer } from 'react';
import { timerReducer, TIMERS_ACTIONS } from '../reducers/timerReducer';
import { timer, timerId } from '../types/timers';
import { timerList } from '../mock/mockup';

export function useTimerList() {
	const [state, dispatch] = useReducer(timerReducer, timerList);

	function addNewTimer(timer: timer) {
		dispatch({
			type: TIMERS_ACTIONS.ADD,
			payload: { timer },
		});
	}

	function deleteTimer(id: timerId) {
		dispatch({
			type: TIMERS_ACTIONS.DELETE,
			payload: { id },
		});
	}

	return { timerList: state, addNewTimer, deleteTimer };
}
