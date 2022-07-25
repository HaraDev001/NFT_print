import { GET_ERRORS } from "../actions/types";

const initialState = { 
  err: "",
};
function errReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        err: action.payload
      }
    default:
      return state;
  }
}

export default errReducer;