import { Route, Routes, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "../shared/ScrollToTop";

const PrivateRoute = lazy(() => import("@components/auth/PrivateRoute"));
const LikePage = lazy(() => import("@pages/Like"));
const FollowingPage = lazy(() => import("@pages/Following"));
const NotificationPage = lazy(() => import("@pages/Notification"));
const Edit = lazy(() => import("@pages/Edit"));
const WritePage = lazy(() => import("@pages/Write"));
const SearchPage = lazy(() => import("@pages/Search"));
const MomentPage = lazy(() => import("@pages/Moment"));
const MyPage = lazy(() => import("@pages/My"));
const AuthGuard = lazy(() => import("@components/auth/AuthGuard"));
const Home = lazy(() => import("@pages/Home"));
const Navbar = lazy(() => import("@shared/Navbar"));
const Layout = lazy(() => import("@shared/Layout"));
const SignupPage = lazy(() => import("@pages/Signup"));
const SigninPage = lazy(() => import("@pages/Signin"));

function Router() {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <ScrollToTop />
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/moments/:id" element={<MomentPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/write" element={<WritePage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/moments/edit/:id" element={<Edit />} />
              </Route>
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:id" element={<SearchPage />} />
              <Route path="/like" element={<LikePage />} />
              <Route path="/following" element={<FollowingPage />} />
            </Route>
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
