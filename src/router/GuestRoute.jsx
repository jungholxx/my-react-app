import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {

  const userInfo = useSelector(
    (state) => state.user.userInfo
  );

  if (userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;