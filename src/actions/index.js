import axios from 'axios'; // api call client

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST_DETAILS = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=PAPERCLIP1234';

// action creators

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request,
  };
}

export function createPost(values, callback) { // values coming in from post_new.js file
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());// callback being called after api success
  return {
    type: CREATE_POST,
    payload: request,
  };
}

export function fetchPostDetails(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST_DETAILS,
    payload: request,
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id,
  };
}
