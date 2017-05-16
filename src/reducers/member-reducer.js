import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  filter: false,
  address: '',
};

const MembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_MEMBERS:
      return Object.assign({}, state, {
        all: action.members,
      });
    case ActionTypes.FILTER_MEMBERS:
      return Object.assign({}, state, {
        filter: action.filter,
      });
    default:
      return state;
  }
};

export default MembersReducer;
