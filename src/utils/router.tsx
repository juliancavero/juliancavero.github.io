import { RouterProvider, createHashRouter } from "react-router-dom";
import { MainSkeleton } from "../pages/MainSkeleton/MainSkeleton";
import { MortgagePage } from "../pages/MortgageCalculator/MortgagePage";

const router = createHashRouter([
  {
    path: "/",
    element: <MainSkeleton />,
    children: [
      { path: "/", element: <MortgagePage /> },
      { path: "*", element: <MortgagePage /> },
    ],
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
