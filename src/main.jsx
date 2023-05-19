import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  NewEventPage,
  action as createEvent,
  loader as newEventLoader,
} from "./pages/NewEventPage";
import {
  EventPage,
  action as addEvent,
  loader as postLoader,
} from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  EditEventPage,
  action as editEvent,
  loader as editEventLoader,
} from "./pages/EditEventPage";
import { ErrorBoundary } from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
      },
      {
        path: "/events/:eventId",
        element: <EventPage />,
        loader: postLoader,
        action: addEvent,
      },
      {
        path: "/events/new",
        element: <NewEventPage />,
        action: createEvent,
        loader: newEventLoader,
      },
      {
        path: "/events/:eventId/edit",
        element: <EditEventPage />,
        action: editEvent,
        loader: editEventLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
