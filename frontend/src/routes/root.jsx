import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import noteAPI from "../api/noteAPI";

export async function action() {
  const note = await noteAPI.createNote();
  return redirect(`/notes/add`);
}

export async function loader() {
  const notes = await noteAPI.getAllNotes();
  return { notes };
}

export default function Root() {
  const { notes } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Notes</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Notes"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {notes.length ? (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink
                    to={`notes/${note.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {note.title ? <>{note.title}</> : <i>No Note</i>}{" "}
                    {note.favorite && <span>★</span>}
                  </NavLink>
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
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
