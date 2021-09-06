import * as actionTypes from "../types";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    /* Fetch All Posts */
    case actionTypes.FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };

    case actionTypes.FETCH_ALL_POSTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    /* Create Post */
    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case actionTypes.CREATE_POST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    /* Delete Post */

    case actionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.payload)],
      };

    case actionTypes.DELETE_POST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    /* Update Post */

    case actionTypes.UPDATE_POST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        ],
      };

    case actionTypes.UPDATE_POST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
