import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashBoardLayout from "./layouts/DashBoardLayout";
import DashboardProvider from "./context/DashboardContext";

import { Dashbord, Invantory, Users, Management, Login } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DashboardProvider>
          <DashBoardLayout />
        </DashboardProvider>
      ),
      children: [
        { path: "/", element: <Dashbord /> },
        { path: "/inventory", element: <Invantory /> },
        { path: "/management", element: <Management /> },
        { path: "/users", element: <Users /> },
      ],
    },
    {
      path: "/auth",
      element: (
        <DashboardProvider>
          <Login />
        </DashboardProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;