import { createReducer } from "@reduxjs/toolkit";
import NavigationActions from './actions'

const { reloadState } = NavigationActions

const initialState = {
    state: false,
}

const reloadNavigationStateReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            reloadState,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default reloadNavigationStateReducer