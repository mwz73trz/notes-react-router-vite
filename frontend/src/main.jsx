import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Note, {
  loader as noteLoader,
  action as noteAction,
} from "./routes/note";
import EditNote, { action as editAction } from "./routes/edit";
import CreateNote, { action as addAction } from "./routes/add";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "notes/:noteId",
            element: <Note />,
            loader: noteLoader,
            action: noteAction,
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
          {
            path: "notes/:noteId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
