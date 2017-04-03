import {
	AUTHENTICATE_ERROR,
	AUTHENTICATED_USER,
	RESET_FORM,
	UNAUTHENTICATED_USER
} from 'actions/types';

const INITIAL_STATE = {
	authenticated: false,
	errors: undefined,
	message: undefined
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case AUTHENTICATED_USER:
			return {...state,
				errors: undefined,
				message: undefined,
				authenticated: true
			};

		case UNAUTHENTICATED_USER:
			return {...state,
				authenticated: false
			};

		case AUTHENTICATE_ERROR:
			return {...state,
				errors: action.payload
			};

		case RESET_FORM:
			return {...state,
				errors: undefined,
				message: undefined
			};
	};

	return state;
};