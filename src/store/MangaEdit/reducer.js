import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { captureId } = actions;

const initialState = {
  manga: [],
};

const reducer = createReducer(initialState, (builder) =>
  builder.addCase(captureId.fulfilled, (state, action) => {
    const newState = {
      ...state,
      manga: action.payload.manga,
    };
    return newState;
  })
);

export default reducer;
