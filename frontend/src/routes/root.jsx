import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import noteAPI from "../api/noteAPI";

export async function action() {
  const note = await noteAPI.createNote();
  return { note };
}

export async function loader() {
  const notes = await noteAPI.getAllNotes();
  return { notes };
}

export default function Root() {
  const { notes } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Notes</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Notes"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {notes.length ? (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <Link to={`notes/${note.id}`}>
                    {note.title ? <>{note.title}</> : <i>No Note</i>}{" "}
                    {note.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No notes</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
