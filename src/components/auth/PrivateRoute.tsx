import useUser from "@/hooks/auth/useUser";

import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const user = useUser();

  if (user == null) {
    return <Navigate to="/signin" replace={true} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default PrivateRoute;
