import SigninPage from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "../shared/Layout";
import Navbar from "../shared/Navbar";
import Home from "@/pages/Home";
import AuthGuard from "../auth/AuthGuard";
import MyPage from "@/pages/My";

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
            <Route path="/moments/moment:id" element={<SigninPage />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

export default Router;
