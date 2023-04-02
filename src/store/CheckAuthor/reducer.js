import {createReducer} from "@reduxjs/toolkit";
import chekActions from "./actions";

const {capture} = chekActions;

const initialState = {
  checked: false,
};

let checkReducer = createReducer(initialState, (builder) =>
  builder.addCase(capture, (state, action) => {
    let newState = {
      ...state,
      checked: action.payload.checked,
    };
    return newState;
  })
);

export default checkReducer;
