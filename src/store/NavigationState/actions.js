import { createAction } from "@reduxjs/toolkit";

let reloadState = createAction(
    'reloadState',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const reloadNavigationStateActions = {reloadState}
export default reloadNavigationStateActions