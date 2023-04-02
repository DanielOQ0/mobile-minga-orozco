import { createReducer } from "@reduxjs/toolkit"
import actions from "./actions"

const initialState = {
  render: false,
  modalName: "",
}

const modalReducer = createReducer(initialState, builder => {
  builder
    .addCase(actions.openModal, (state, action) => {
      state.render = action.payload.render
      state.modalName = action.payload.modalName
    })
    .addCase(actions.closeModal, (state, action) => {
      state.render = action.payload.render
      state.modalName = action.payload.modalName
    })
})

export default modalReducer
