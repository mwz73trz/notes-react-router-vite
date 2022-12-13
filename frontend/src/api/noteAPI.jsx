import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const tryCatchFetch = async (axiosCall) => {
  try {
    const response = await axiosCall();
    return response.data ? response.data : { message: "success" };
  } catch (e) {
    console.error("-- tryCatchFetch ERROR:", e.response ? e.response.data : e);
    return null;
  }
};

const noteAPI = {};

noteAPI.getAllNotes = async () => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}notes/`));
};

noteAPI.getSingleNote = async (noteId) => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}notes/${noteId}/`));
};

noteAPI.createNote = async (noteData) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}notes/`, noteData));
};

noteAPI.updateNote = async (noteId, noteData) => {
  return await tryCatchFetch(() =>
    axios.put(`${BASE_URL}notes/${noteId}/`, noteData)
  );
};

noteAPI.deleteNote = async (noteId) => {
  return await tryCatchFetch(() => axios.delete(`${BASE_URL}notes/${noteId}/`));
};

export default noteAPI;
