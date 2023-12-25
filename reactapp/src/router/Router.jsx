import { useEffect, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import RootPage from "../pages/RootPage";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import TrafficFine from "../pages/TrafficFine";
import TrafficSign from "../pages/TrafficSign";
import ExamHistory from "@/pages/ExamHistory";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Verify from "../pages/Verify";
import Landing from "../pages/Landing";
import News from "../pages/News";
import NewsList from "../components/news/NewsList";
import NewsDetails from "../components/news/NewsDetails";
// const Landing = lazy(() => import("../pages/Landing"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      {/* <Route index element={<Home />} /> */}
      <Route path="/" element={<Home />}>
        <Route index element={<Landing />}></Route>
        {/* <Route path="landing" element={<Landing />}></Route> */}
        <Route path="fine/:vehicleType" element={<TrafficFine />}></Route>
        <Route path="sign" element={<TrafficSign />}></Route>
        <Route path="news" element={<News />}>
          <Route index element={<NewsList />} />
          <Route path=":newsId" element={<NewsDetails />} />
        </Route>
        <Route path="history" element={<ExamHistory />}></Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify" element={<Verify />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword" element={<ResetPassword />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
