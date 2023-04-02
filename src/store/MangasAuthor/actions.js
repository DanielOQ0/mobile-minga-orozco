import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const read_mangas = createAsyncThunk("read_mangas", async ({author_id}) => {
  try {
    let res = await axios.get(
      "https://minga-0gy1.onrender.com/mangas/authors/" + author_id
    );
    return {new: res.data.new, old: res.data.old, count: res.data.count};
  } catch (error) {
    return {new: [], old: [], count: 0};
  }
});

const mangasActions = {read_mangas};
export default mangasActions;
