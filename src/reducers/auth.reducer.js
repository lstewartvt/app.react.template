const INITIAL_STATE = {
	authenticated: false,
	busy: false,
	errors: undefined,
	field_errors: undefined,
	messages: undefined,
	user: undefined
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {

		case 'app.auth.register':
		case 'app.auth.request':
			return {...state,
				busy: true
			};

		case 'app.auth.success':
			return {...state,
				authenticated: true,
				busy: false,
				errors: undefined,
				messages: undefined,
				user: action.user
			};

		case 'app.auth.revoked':
			return {...state,
				authenticated: false,
				user: undefined
			};

		case 'app.auth.error':
			return {...state,
				busy: false,
				errors: action.errors,
				field_errors: action.field_errors
			};

		case 'app.auth.reset.form':
			return {...state,
				errors: undefined,
				messages: undefined
			};

		default:
			return state;
	};
};