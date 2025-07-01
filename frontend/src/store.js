import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
  organizations: [],
  roles: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORGS':
      return { ...state, organizations: action.payload };
    case 'ADD_ORG':
      return { ...state, organizations: [...state.organizations, action.payload] };
    case 'UPDATE_ORG':
      return {
        ...state,
        organizations: state.organizations.map(o =>
          o.id === action.id ? { ...o, ...action.data } : o
        )
      };
    case 'DELETE_ORG':
      return {
        ...state,
        organizations: state.organizations.filter(o => o.id !== action.id)
      };
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    case 'ADD_ROLE':
      return { ...state, roles: [...state.roles, action.payload] };
    case 'UPDATE_ROLE':
      return {
        ...state,
        roles: state.roles.map(r =>
          r.id === action.id ? { ...r, ...action.data } : r
        )
      };
    case 'DELETE_ROLE':
      return { ...state, roles: state.roles.filter(r => r.id !== action.id) };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
