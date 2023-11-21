import { csrfFetch } from './csrf';

const GET_JOBS = 'jobs/getJobs';

const getJobs = (jobs) => ({
  type: GET_JOBS,
  payload: jobs,
});

export const getAllJobs = () => async (dispatch) => {
  const res = await csrfFetch('/api/jobs');

  if (res.ok) {
    const data = await res.json();
    dispatch(getJobs(data.jobs));
    return res;
  }
};

const initialState = { jobs: null };

const sessionReducer = (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case GET_JOBS:
      nextState.jobs = action.payload;
      return nextState;
    default:
      return state;
  }
};

export default sessionReducer;
