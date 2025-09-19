import { lazy, Suspense } from "react";
import Loading from "./loading/loading";
import Nav from "../comment/nav";
const Home = lazy(() => import("../pages/home/Index"));
const Commemorative = lazy(() => import("../pages/commemorative/Index.jsx"));
const Album = lazy(() => import("../pages/album/Index"));
const User = lazy(() => import("../pages/mine/Index"));
const Test = lazy(() => import("../pages/test/index"));
const Login = lazy(() => import("../pages/login/login/index"));
const Register = lazy(() => import("../pages/login/register/index"));
const RouteLoading = ({ element }) => {
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

// 布局组件
const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <RouteLoading element={<Home />} />
      </Layout>
    ),
  },
  {
    path: "/commemorative",
    element: (
      <Layout>
        <RouteLoading element={<Commemorative />} />
      </Layout>
    ),
  },
  {
    path: "/album",
    element: (
      <Layout>
        <RouteLoading element={<Album />} />
      </Layout>
    ),
  },
  {
    path: "/user",
    element: (
      <Layout>
        <RouteLoading element={<User />} />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <RouteLoading element={<Login />} />,
  },
  {
    path: "/register",
    element: <RouteLoading element={<Register />} />,
  },
  {
    path: "/test",
    element: <RouteLoading element={<Test />} />,
  },
];

export default routes;
