import { lazy, Suspense } from "react";
import Loading from "./loading/loading";
const Home = lazy(() => import("../pages/home/Index"));

const RouteLoading = ({ element }) => {
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

const routes = [
  {
    path: "/",
    element: <RouteLoading element={<Home />} />,
  },
];

export default routes;
