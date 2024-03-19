import { RouterProvider, createHashRouter } from "react-router-dom";
import { InvestmentPage } from "../pages/InvestmentCalculator/InvestmentPage";
import { MortgagePage } from "../pages/MortgageCalculator/MortgagePage";

const router = createHashRouter([
  { path: "/", element: <MortgagePage /> },
  { path: "/invest", element: <InvestmentPage /> },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
