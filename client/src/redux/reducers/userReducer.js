import * as actionTypes from "../types";

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };

      case actionTypes.AUTO_SIGNIN_SUCCESS:
        return {
          ...state,
          userData : action.payload
        }

    case actionTypes.SIGNIN_FAIL:
      return {
        error: action.payload,
      };

    case actionTypes.SIGNUP_FAIL:
      return {
        error: action.payload,
      };

    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("user");
      return {
        ...state,
        userData: null,
      };

    case actionTypes.LOGOUT_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
