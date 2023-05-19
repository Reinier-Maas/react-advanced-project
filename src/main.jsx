import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  NewEvent,
  action as createEvent,
  loader as newEventLoader,
} from "./pages/NewEvent";
import {
  EventPage,
  action as addEvent,
  loader as postLoader,
} from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  EditEvent,
  action as editEvent,
  loader as editEventLoader,
} from "./pages/EditEvent";
import { ErrorBoundary } from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/events/:eventId",
        element: <EventPage />,
        loader: postLoader,
        action: addEvent,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/events/new",
        element: <NewEvent />,
        action: createEvent,
        loader: newEventLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/events/:eventId/edit",
        element: <EditEvent />,
        action: editEvent,
        loader: editEventLoader,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
