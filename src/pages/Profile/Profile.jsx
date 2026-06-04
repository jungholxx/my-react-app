import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "./Profile.css";

function Profile() {

  const userInfo = useSelector((state) => state.user.userInfo);

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <h1>내 프로필</h1>
          <p>회원 정보를 확인할 수 있습니다.</p>
        </div>

        <div className="profile-card">

          <div className="profile-row">
            <label>이름</label>

            <div className="profile-value">
              {userInfo.name}
            </div>
          </div>

          <div className="profile-row">
            <label>이메일</label>

            <div className="profile-value">
              {userInfo.email}
            </div>
          </div>

          <div className="profile-row">
            <label>아이디</label>

            <div className="profile-value">
              {userInfo.id}
            </div>
          </div>

          <div className="profile-row">
            <label>권한</label>

            <div className="profile-value">
              USER
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;