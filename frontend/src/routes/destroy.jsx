import { redirect } from "react-router-dom";
import noteAPI from "../api/noteAPI";

export async function action({ params }) {
  throw new Error("oh dang!");
  await noteAPI.deleteNote(params.noteId);
  return redirect("/");
}
