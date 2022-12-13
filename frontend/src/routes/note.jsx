import { Form, useLoaderData } from "react-router-dom";
import noteAPI from "../api/noteAPI";

export async function loader({ params }) {
  return noteAPI.getSingleNote(params.noteId);
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
  let favorite = note.favorite;

  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
