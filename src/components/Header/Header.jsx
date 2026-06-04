import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { tabIncrease } from "../../features/counter/counterSlice";
import { logout } from "../../features/user/userSlice";

import "./Header.css";

function Header() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const count = useSelector((state) => state.counter.value);
  const tabClickCount = useSelector((state) => state.counter.tabClickCount);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  const handleMoveLogin = () => {
    navigate("/login", {
      state: {
        from: location.pathname
      }
    });

  };

  return (
    <header className="header">

      <div className="header-container">

        <NavLink
          to="/"
          onClick={() => { if (location.pathname !== "/") dispatch(tabIncrease())}}
          className="logo"
        >
          Jungho's ReactStudy
        </NavLink>

        <nav>
          <ul className="nav-menu">

            <li>
              <NavLink
                to="/"
                onClick={() => { if (location.pathname !== "/") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/board"
                onClick={() => { if (location.pathname !== "/board") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Board
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/gallery"
                onClick={() => { if (location.pathname !== "/gallery") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Gallery
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/grid"
                onClick={() => { if (location.pathname !== "/grid") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Grid
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                onClick={() => { if (location.pathname !== "/contact") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/game"
                onClick={() => { if (location.pathname !== "/game") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Game
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/practice"
                onClick={() => { if (location.pathname !== "/practice") dispatch(tabIncrease())}}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Practice
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-user">

          <span className="header-count">
            Click Count :{" "}

            <Link to="/contact">
              {count}
            </Link>
          </span>

          <span className="header-count">
            Tab Click Count : {tabClickCount}
          </span>

          {
            userInfo ? (
              <>
                <span className="user-name">
                  <Link to="/profile">{userInfo.name}</Link>님
                </span>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  className="login-btn"
                  onClick={handleMoveLogin}
                >
                  로그인
                </button>

                <button
                  className="register-btn"
                  onClick={() => navigate("/register")}
                >
                  회원가입
                </button>
              </>
            )
          }

        </div>

      </div>

    </header>
  );
}

export default Header;