import { CONNECT_WALLET } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isSigned: false,
    walletAddress: null,
    netType: "",
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        isSigned: !isEmpty(action.payload),
        walletAddress: action.payload,
        netType: action.netType,
      };
    default:
      return state;
  }
}

export default walletReducer;