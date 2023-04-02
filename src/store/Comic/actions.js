import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_events = createAsyncThunk(
  "read_events",
  async ({ inputText, captureChecks, pages }) => {
    try {
      let response = await axios.get(
        "https://minga-0gy1.onrender.com/mangas/view?title=" +
          inputText.trim() +
          "&category=" +
          captureChecks +
          "&page=" +
          pages
      );

      return {
        events: response.data.mangas,
      };
    } catch (error) {
      return {
        events: [],
      };
    }
  }
);

const actions = { read_events };
export default actions;
