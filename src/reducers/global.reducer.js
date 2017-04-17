import {
	TOGGLE_NAV
} from 'actions/global/types';

const INITIAL_STATE = {
	nav_open: false
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case TOGGLE_NAV:
			return {...state,
				nav_open: !state.nav_open
};
		default:
		return state;
	};
};