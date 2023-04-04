import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let captureManga = createAsyncThunk("captureManga", async ({ manga_id }) => {
  try {
    let url = process.env.API_URL.concat("/mangas/"+manga_id);
    let response = await axios.get(url);
    return {
      manga: response.data.manga,
    };
  } catch (error) {
    console.log(error);
    return {
      manga: [],
    };
  }
});
const captureChapter = createAsyncThunk(
  "captureChapter",
  async ({ manga_id, page }) => {
    try {
      let url = process.env.API_URL.concat("/chapters?manga_id=" + manga_id + "&page=" + page);
      let response = await axios.get(url);
      return { chapter: response.data.chapter };
    } catch (error) {
      return { chapter: [] };
    }
  }
);

const actions = { captureChapter, captureManga };

export default actions;
