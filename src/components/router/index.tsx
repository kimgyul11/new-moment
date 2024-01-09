import { Route, Routes, BrowserRouter } from "react-router-dom";

import SigninPage from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import Layout from "@shared/Layout";
import Navbar from "@shared/Navbar";
import Home from "@/pages/Home";
import AuthGuard from "../auth/AuthGuard";
import MyPage from "@/pages/My";
import MomentPage from "@/pages/Moment";
import SearchPage from "@/pages/Search";
import WritePage from "@/pages/Write";
import NotificationPage from "@/pages/Notification";
import Edit from "@/pages/Edit";

function Router() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/moments/:id" element={<MomentPage />} />
            <Route path="/moments/edit/:id" element={<Edit />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:id" element={<SearchPage />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

export default Router;
