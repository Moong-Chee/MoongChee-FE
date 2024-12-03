import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 393px;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: white;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  .back-button {
    cursor: pointer;
    padding-left: 16px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  .info-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px; /* 각 행 간격 조정 */

    .label {
      font-size: 14px;
      font-weight: bold;
      color: #777;
      margin-bottom: 8px; /* 라벨과 데이터 사이 간격 */
    }

    .value {
      font-size: 16px;
      font-weight: normal;
      color: #333;
      border-bottom: 1px solid #ddd; /* 밑줄 추가 */
      padding-bottom: 4px;
    }
  }
`;

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <div className="back-button" onClick={() => navigate(-1)}>
          ←
        </div>
        <div>프로필 조회</div>
        <div></div> {/* Right-side empty for layout balance */}
      </Header>
      <ProfileInfo>
        <div className="info-row">
          <div className="label">이름</div>
          <div className="value">홍길동</div>
        </div>
        <div className="info-row">
          <div className="label">이메일</div>
          <div className="value">@gachon.ac.kr</div>
        </div>
        <div className="info-row">
          <div className="label">핸드폰</div>
          <div className="value">010-1234-5678</div>
        </div>
        <div className="info-row">
          <div className="label">생년월일</div>
          <div className="value">2003-12-12</div>
        </div>
        <div className="info-row">
          <div className="label">학과</div>
          <div className="value">컴퓨터공학과</div>
        </div>
        <div className="info-row">
          <div className="label">학번</div>
          <div className="value">2022XXXX</div>
        </div>
      </ProfileInfo>
    </Container>
  );
};

export default ProfilePage;
