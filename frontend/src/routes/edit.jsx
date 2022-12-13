import { Form, useLoaderData, redirect } from "react-router-dom";
import noteAPI from "../api/noteAPI";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await noteAPI.updateNote(params.noteId, updates);
  return redirect(`/notes/${params.noteId}`);
}

export default function EditNote() {
  const note = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={note.title}
        />
      </p>
      <label>
        <span>Content</span>
        <textarea name="content" defaultValue={note.content} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
