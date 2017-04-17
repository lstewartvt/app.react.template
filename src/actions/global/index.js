import {
	TOGGLE_NAV
} from './types';

export function toggleNav() {
	return function(dispatch) {
		dispatch({
			type: TOGGLE_NAV
		});
	}
};