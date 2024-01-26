import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, Login, Signup, NewsPage, Error } from "./Pages/Index";

import "./App.css";
import "./fonts/Neuton Regular.ttf";
import Account from "./Pages/Account";
import { useEffect } from "react";
import { api } from "./Api/agent";
import { updateUser } from "./state/userSlice";
import { useDispatch } from "react-redux";
import Search from "./Pages/Search";
import ProtectedRoute from "./Pages/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <NewsPage />,
      },
      {
        path: "/:id",

        element: <NewsPage />,
      },
      {
        path: "/search",

        element: <Search />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "account",
        element: <Account />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "signup",
    element: <Signup />,
    errorElement: <Error />,
  },
]);

const { useGetCurrentUserQuery } = api;

function App() {
  const { isSuccess, data, isLoading } = useGetCurrentUserQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data));
    }
  }, [data, dispatch, isSuccess]);
  if (!isLoading) {
    return <RouterProvider router={router} />;
  }
}

export default App;
