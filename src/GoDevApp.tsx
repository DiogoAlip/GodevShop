import { AppRouter } from "./app.router.tsx";
import { RouterProvider } from "react-router";

export const GoDevApp = () => {
  return <RouterProvider router={AppRouter} />;
};
