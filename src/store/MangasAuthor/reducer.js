import {createReducer} from "@reduxjs/toolkit";
import mangasActions from "./actions";
const {read_mangas} = mangasActions;
const initialState = {new: [], old: [], count: 0};

const mangasReducer = createReducer(initialState, (builder) => {
  builder.addCase(read_mangas.fulfilled, (state, action) => {
    let newState = {
      ...state,
      new: action.payload.new,
      old: action.payload.old,
      count: action.payload.count,
    };
    return newState;
  });
});
export default mangasReducer;
