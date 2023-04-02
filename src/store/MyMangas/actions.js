import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_events = createAsyncThunk(
  "read_events",
  async ({ inputText, captureChecks, pages }) => {
    try {
      let token = localStorage.getItem("token");
      let headers = { headers: { Authorization: `Bearer ${token}` } };
      let response = await axios.get(
        "https://minga-0gy1.onrender.com/mangas/me?title=" +
          inputText.trim() +
          "&category=" +
          captureChecks +
          "&page=" +
          pages,
        headers
      );
      return {
        events: response.data,
      };
    } catch (error) {
      console.log(error);
      return {
        events: [],
      };
    }
  }
);

const actions = { read_events };
export default actions;
