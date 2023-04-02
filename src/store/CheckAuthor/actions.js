import {createAction} from "@reduxjs/toolkit";

let capture = createAction("capture", ({checked}) => {
  return {payload: {checked: checked}};
});

const checkActions = {capture};
export default checkActions;
