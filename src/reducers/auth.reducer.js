import {
	AUTHENTICATE_ERROR,
	AUTHENTICATED_USER,
	RESET_FORM,
	UNAUTHENTICATED_USER
} from 'actions/auth/types';

const INITIAL_STATE = {
	authenticated: false,
	errors: undefined,
	field_errors: undefined,
	messages: undefined
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case AUTHENTICATED_USER:
			return {...state,
				errors: undefined,
				messages: undefined,
				authenticated: true
			};

		case UNAUTHENTICATED_USER:
			return {...state,
				authenticated: false
			};

		case AUTHENTICATE_ERROR:
			return {...state,
				errors: action.errors,
				field_errors: action.field_errors
			};

		case RESET_FORM:
			return {...state,
				errors: undefined,
				messages: undefined
			};

		default:
			return state;
	};
};