import axios from 'axios';

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  DELETE_POST,
  POST_LOADING
} from './types.js';

// add post

export const addPost = (postData) => (dispatch) => {
  axios.post('/api/posts', postData).then((res) =>
    dispatch({
      type: ADD_POST,
      payload: res.data
    }).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.respond.data
      })
    )
  );
};

// get post

export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios.get('/api/posts').then((res) =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    }).catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
  );
};

export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios.get(`/api/post/${id}`).then((res) =>
    dispatch({
      type: GET_POST,
      payload: res.data
    }).catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    )
  );
};

// delete post

export const deletePost = (id) => (dispatch) => {
  axios.delete(`/api/posts/${id}`).then((res) =>
    dispatch({
      type: DELETE_POST,
      payload: id
    }).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.respond.data
      })
    )
  );
};

// add like post

export const addLike = (id) => (dispatch) => {
  axios.post(`/api/posts/like/${id}`).then((res) =>
    dispatch(getPosts()).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.respond.data
      })
    )
  );
};

// remove like post

export const removeLike = (id) => (dispatch) => {
  axios.post(`/api/posts/unlike/${id}`).then((res) =>
    dispatch(getPosts()).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.respond.data
      })
    )
  );
};

// set state loading

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
