import { combineReducers } from 'redux';

import PostsReducer from './post-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
});

export default rootReducer;
