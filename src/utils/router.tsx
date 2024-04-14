import { RouterProvider, createHashRouter } from "react-router-dom";
import { APICheckPage } from "../pages/APICheck/APICheckPage";
import { InvestmentPage } from "../pages/InvestmentCalculator/InvestmentPage";
import { MainSkeleton } from "../pages/MainSkeleton/MainSkeleton";
import { MortgagePage } from "../pages/MortgageCalculator/MortgagePage";

const router = createHashRouter([
  {
    path: "/",
    element: <MainSkeleton />,
    children: [
      { path: "/", element: <MortgagePage /> },
      { path: "/mortgage", element: <MortgagePage /> },
      { path: "/invest", element: <InvestmentPage /> },
      { path: "/check-sanitas", element: <APICheckPage /> },
    ],
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
