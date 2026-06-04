import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {

  const userInfo = useSelector(
    (state) => state.user.userInfo
  );

  const location = useLocation();

  if (!userInfo) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );
  }

  return children;
}

export default PrivateRoute;