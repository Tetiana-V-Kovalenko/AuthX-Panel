import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../layouts/ErrorPage";
import Admin from "../layouts/Admin";
import FormAuth from "../layouts/FormAuth";

export const routesConfig = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <Admin /> }],
    },
    {
      path: "login",
      element: <FormAuth page="login" />,
    },
    {
      path: "registration",
      element: <FormAuth page="registration" />,
    },
  ],
  { basename: "/" }
);
