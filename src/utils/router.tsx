import { RouterProvider, createHashRouter } from "react-router-dom";

const router = createHashRouter([{ path: "/", element: <h1>hola</h1> }]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
