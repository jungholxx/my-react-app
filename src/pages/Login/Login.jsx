import { useState } from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { login } from "../../features/user/userSlice";

import { users } from "../../data/userData";

function Login() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const validateInput = () => {

    if (id.trim() === "" || password.trim() === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleLogin = () => {

    if (!validateInput()) {
      return;
    }

    // localStorage 사용자 목록 조회
    const localUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    // 기본 사용자 + localStorage 사용자 합치기
    const allUsers = [
      ...users,
      ...localUsers
    ];

    // 로그인 검증
    const foundUser = allUsers.find(
      (user) =>
        user.id === id &&
        user.password === password
    );

    if (!foundUser) {

      alert("아이디 또는 비밀번호가 올바르지 않습니다.");

      return;

    }

    // Redux 저장
    dispatch(login({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role
    }));

    navigate(from, {
      replace: true
    });

  };
  
  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={
            (e) => {
                if (e.key === "Enter") {
                    handleLogin();
                }
            }
        }
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={
            (e) => {
                if (e.key === "Enter") {
                    handleLogin();
                }
            }
        }
      />

      <button onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default Login;