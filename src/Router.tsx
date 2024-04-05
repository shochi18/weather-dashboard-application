import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ForecastPage from "./pages/ForecastPage";
import ForecastHistoryPage from "./pages/ForecastHistoryPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <></>,
        children: [
            {
                path: '/',
                element: <HomePage />,
                children: [
                  {
                      path: '/forecast',
                      element: <ForecastPage />,
                  },
                  {
                      path: '/history',
                      element: <ForecastHistoryPage />
                  }
                ]
            }
        ]
    }
])

const Router = () => {
  return <RouterProvider router={router}/>
}

export default Router;