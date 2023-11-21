import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './session';
import jobsReducer from './jobs';

const rootReducer = ({
  session: sessionReducer,
  jobs: jobsReducer,
});

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const logger = require('redux-logger').default;
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
  preloadedState,
});

export default store;
