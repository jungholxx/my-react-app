import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
    phone: "",
    role: "USER"
  });

  const [errors, setErrors] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: ""
  });

  const [idChecked, setIdChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    if (name === "id") {
        setIdChecked(false);
        setErrors(prev => ({
            ...prev,
            id: ""
        }));
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (!form.id.trim()) {
        newErrors.id = "아이디를 입력하세요.";
    } else if (!idChecked) {
        newErrors.id = "아이디 중복 확인을 해주세요.";
    }

    if (!form.password.trim()) {
        newErrors.password = "비밀번호를 입력하세요.";
    }

    if (!form.passwordConfirm.trim()) {
        newErrors.passwordConfirm = "비밀번호 확인을 입력하세요.";
    } else if (form.password !== form.passwordConfirm) {
        newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    if (!form.name.trim()) {
        newErrors.name = "이름을 입력하세요.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    savedUsers.push(form);

    localStorage.setItem(
        "users",
        JSON.stringify(savedUsers)
    );

    alert("회원가입 완료!");

    navigate("/login");

  };

  return (
    <div className="register-container">

      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <h1 className="register-title">
          회원가입
        </h1>

        <div className="register-group">

            <label className="required-label">
                아이디
            </label>

            <div className="input-with-button">

                <input
                type="text"
                name="id"
                placeholder="아이디를 입력하세요"
                value={form.id}
                onChange={handleChange}
                className={errors.id ? "error-input" : ""}
                />

                <button
                    type="button"
                    className="check-id-btn"
                    onClick={() => {
                        if (!form.id.trim()) {
                            setErrors(prev => ({
                                ...prev,
                                id: "아이디를 입력하세요."
                            }));
                            setIdChecked(false);
                            return;
                        }

                        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

                        const isDuplicate = savedUsers.some(
                            user => user.id === form.id
                        );

                        if (isDuplicate) {
                            setErrors(prev => ({
                                ...prev,
                                id: "이미 사용 중인 아이디입니다."
                            }));
                            setIdChecked(false);
                            return;
                        }

                        setErrors(prev => ({
                            ...prev,
                            id: ""
                        }));

                        setIdChecked(true);

                        alert("사용 가능한 아이디입니다.");
                    }}
                >
                    중복 확인
                </button>

            </div>

            {errors.id && (
                <p className="error-text">
                {errors.id}
                </p>
            )}

        </div>

        <div className="register-group">
            <label className="required-label">
                비밀번호
            </label>

          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
          />

          {errors.password && (
            <p className="error-text">
              {errors.password}
            </p>
          )}

        </div>

        <div className="register-group">

          <label className="required-label">
            비밀번호 확인
          </label>

          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력하세요"
            value={form.passwordConfirm}
            onChange={handleChange}
            className={errors.passwordConfirm ? "error-input" : ""}
          />

          {errors.passwordConfirm && (
            <p className="error-text">
              {errors.passwordConfirm}
            </p>
          )}

        </div>

        <div className="register-group">

          <label className="required-label">
            이름
          </label>

          <input
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />

          {errors.name && (
            <p className="error-text">
              {errors.name}
            </p>
          )}

        </div>

        <div className="register-group">

          <label>이메일</label>

          <input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={handleChange}
          />

        </div>

        <div className="register-group">

          <label>전화번호</label>

          <input
            type="text"
            name="phone"
            placeholder="전화번호를 입력하세요"
            value={form.phone}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="register-submit-btn"
        >
          회원가입
        </button>

      </form>

    </div>
  );
}

export default Register;