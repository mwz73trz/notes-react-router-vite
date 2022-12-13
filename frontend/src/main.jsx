import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Note, { loader as noteLoader } from "./routes/note";
import EditNote, { action as editAction } from "./routes/edit";
import CreateNote, { action as addAction } from "./routes/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "notes/:noteId",
        element: <Note />,
        loader: noteLoader,
      },
      {
        path: "notes/add",
        element: <CreateNote />,
        loader: noteLoader,
        action: addAction,
      },
      {
        path: "notes/:noteId/edit",
        element: <EditNote />,
        loader: noteLoader,
        action: editAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
