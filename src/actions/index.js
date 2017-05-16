import axios from 'axios';

const ROOT_URL = 'http://mappy.dali.dartmouth.edu/members.json';

// keys for actiontypes
export const ActionTypes = {
  FETCH_MEMBERS: 'FETCH_MEMBERS',
  RECEIVE_MEMBERS: 'RECEIVE_MEMBERS',
  FILTER_MEMBERS: 'FILTER_MEMBERS',
};

// send the fetched members to the reducer
function receiveMembers(json) {
  return {
    type: ActionTypes.RECEIVE_MEMBERS,
    members: json,
  };
}

// fetch all the members from the api
export function fetchMembers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}`).then((response) => {
      dispatch(receiveMembers(response.data));
    })
    .catch((error) => {
      console.log('Couldn\'t fetch members!');
    });
  };
}

// change whether the display filter is on or not
export function filterMembers(onFilter) {
  return {
    type: ActionTypes.FILTER_MEMBERS,
    filter: !onFilter,
  };
}
