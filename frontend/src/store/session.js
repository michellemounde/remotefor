import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
};


export const signup = user => async dispatch => {
  const {
    firstName,
    lastName,
    username,
    email,
    password
  } = user;

  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password
    })
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(setUser(data.user));
    return res;
  }
}


export const login = user => async dispatch => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    // headers will be set by csrfFetch
    body: JSON.stringify({
      credential,
      password
    })
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  }
}


export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', { method: 'DELETE' });

  if (res.ok) {
    dispatch(removeUser());
    return res;
  }
}


export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');

  if (res.ok) {
    const data = await res.json();
    if (data.user) dispatch(setUser(data.user));
    return res;
  }
}


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case SET_USER:
      nextState.user = action.payload;;
      return nextState;
    case REMOVE_USER:
      nextState.user = null;
      return nextState;
    default:
      return state;
  }
}

export default sessionReducer;
