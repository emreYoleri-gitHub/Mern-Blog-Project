import * as actionTypes from "../types";
import * as API from "../../axios/index";

export const fetchAllPosts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchAllPosts();

    dispatch({
      type: actionTypes.FETCH_ALL_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_ALL_POSTS_FAIL,
      payload: error.message,
    });
  }
};
export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await API.createPost(newPost);

    dispatch({
      type: actionTypes.CREATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_POST_FAIL,
      payload: error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await API.deletePost(id);

    dispatch({
      type: actionTypes.DELETE_POST_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_POST_FAIL,
      payload: error.message,
    });
  }
};

export const updatePost = (id, newPost) => async (dispatch) => {
  try {
    const { data } = await API.updatePost(id, newPost);

    dispatch({
      type: actionTypes.UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_POST_FAIL,
      payload: error.message,
    });
  }
};
