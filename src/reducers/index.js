import { combineReducers } from 'redux';

import MembersReducer from './member-reducer';

const rootReducer = combineReducers({
  members: MembersReducer,
});

export default rootReducer;
