import axios from 'axios';

// const ROOT_URL = 'https://allisonchuang-lab5.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';


// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

function receivePosts(json) {
  return {
    type: ActionTypes.RECEIVE_POSTS,
    posts: json,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/`).then((response) => {
      dispatch(receivePosts(response.data));
    })
    .catch((error) => {
      console.log('Couldn\'t fetch posts!');
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: { post: response.data } });
    })
    .catch((error) => {
      console.log('Couldn\'t fetch post!');
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    if (post !== null) {
      axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        dispatch(fetchPosts());
      });
    }
    history.push('/');
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    if (id !== null) {
      axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        dispatch(fetchPosts());
      });
    }
    history.push('/');
  };
}

export function updatePost(post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch(fetchPost(post.id));
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
    .catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


export function signupUser({ email, password, username, profile }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username, profile }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    })
    .catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function goTo(path, history) {
  return (dispatch) => {
    history.push(path);
  };
}
