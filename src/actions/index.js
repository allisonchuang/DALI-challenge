import axios from 'axios';

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=a_chuang';


// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  GO_TO_POST: 'GO_TO_POST',
};

function receivePosts(json) {
  return {
    type: ActionTypes.RECEIVE_POSTS,
    posts: json,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${API_KEY}`).then((response) => {
      dispatch(receivePosts(response.data));
    })
    .catch((error) => {
      console.log('Couldn\'t fetch posts!');
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
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
      axios.post(`${ROOT_URL}/posts/${API_KEY}`, post).then((response) => {
        dispatch(fetchPosts());
      });
    }
    history.push('/');
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    if (id !== null) {
      axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
        dispatch(fetchPosts());
      });
    }
    history.push('/');
  };
}

export function updatePost(post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, post).then((response) => {
      dispatch(fetchPost(post.id));
    });
  };
}

export function goToPost(id, history) {
  return (dispatch) => {
    history.push(`/post/${id}`);
  };
}
