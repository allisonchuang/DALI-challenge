import { ActionTypes } from '../actions';

const initialState = {
  all: [],
};

const MembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_MEMBERS:
      return Object.assign({}, state, {
        all: action.members,
      });
    default:
      return state;
  }
};

export default MembersReducer;
