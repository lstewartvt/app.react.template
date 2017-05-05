const INITIAL_STATE = {
  nav_open: false,
  toasters: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'app.toggle.nav':
      return {...state,
        nav_open: !state.nav_open
      };

    case 'app.toggle.toaster':
      return {...state,
        toasters: Array.isArray(action.messages) ? action.messages.concat(state.toasters.slice(0, 2)) : []
      };

    default:
      return state;
  };
};
