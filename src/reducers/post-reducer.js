import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  post: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_POSTS:
      return Object.assign({}, state, {
        all: action.posts,
      });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, {
        post: action.payload.post,
      });
    default:
      return state;
  }
};

export default PostsReducer;
