import { createAction } from "@reduxjs/toolkit"

const openModal = createAction(
    "OPEN_MODAL", 
    ({ modalName }) => ({
        payload: { 
            render: true, 
            modalName },
    }));

const closeModal = createAction(
    "CLOSE_MODAL",
     () => ({
        payload: { 
            render: false,
             modalName: "" },
    }));

export default {
  openModal,
  closeModal
};