import { RouterProvider, createHashRouter } from "react-router-dom";
import { InvestmentPage } from "../pages/InvestmentCalculator/InvestmentPage";
import { MainSkeleton } from "../pages/MainSkeleton/MainSkeleton";
import { MortgagePage } from "../pages/MortgageCalculator/MortgagePage";

const router = createHashRouter([
  {
    path: "/",
    element: <MainSkeleton />,
    children: [
      { path: "/mortgage", element: <MortgagePage /> },
      { path: "/invest", element: <InvestmentPage /> },
    ],
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
