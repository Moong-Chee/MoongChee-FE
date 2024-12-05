import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

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
    margin-bottom: 30px;

    .label {
      font-size: 14px;
      font-weight: bold;
      color: #777;
      margin-bottom: 8px;
    }

    .value {
      font-size: 16px;
      font-weight: normal;
      color: #333;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
    }
  }
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { name, email, phone, birthDate, department, studentId } =
    useContext(UserContext);

  return (
    <Container>
      <Header>
        <div className="back-button" onClick={() => navigate(-1)}>
          ←
        </div>
        <div>프로필 조회</div>
        <div></div>
      </Header>
      <ProfileInfo>
        <div className="info-row">
          <div className="label">이름</div>
          <div className="value">{name || "홍길동"}</div>
        </div>
        <div className="info-row">
          <div className="label">이메일</div>
          <div className="value">{email || "@gachon.ac.kr"}</div>
        </div>
        <div className="info-row">
          <div className="label">핸드폰</div>
          <div className="value">{phone || "010-1234-5678"}</div>
        </div>
        <div className="info-row">
          <div className="label">생년월일</div>
          <div className="value">{birthDate || "생년월일 설정필요"}</div>
        </div>
        <div className="info-row">
          <div className="label">학과</div>
          <div className="value">{department || "컴퓨터공학과"}</div>
        </div>
        <div className="info-row">
          <div className="label">학번</div>
          <div className="value">{studentId || "2022XXXXX"}</div>
        </div>
      </ProfileInfo>
    </Container>
  );
};

export default ProfilePage;
