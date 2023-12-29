import SigninPage from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "../shared/Layout";
import Navbar from "../shared/Navbar";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
