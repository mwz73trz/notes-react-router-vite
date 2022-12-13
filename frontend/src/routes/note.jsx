import { Form, useLoaderData, useFetcher } from "react-router-dom";
import noteAPI from "../api/noteAPI";

export async function action({ request, params }) {
  let formData = await request.formData();
  console.log(formData);
  return noteAPI.updateNote(params.noteId, {
    title: formData.get("title"),
    content: formData.get("content"),
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
  const note = await noteAPI.getSingleNote(params.noteId);
  if (!note) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return note;
}

export default function Note() {
  const note = useLoaderData();

  return (
    <div id="contact">
      <div>
        <h1>
          {note.title ? <>{note.title}</> : <i>No Note</i>}{" "}
          <Favorite note={note} />
        </h1>
        {note.content && <p>{note.content}</p>}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ note }) {
  const fetcher = useFetcher();
  let favorite = note.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="title" defaultValue={note.title} />
      <input type="hidden" name="content" defaultValue={note.content} />
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
