import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import DefaultProfile from "./assets/images/DefaultProfile.png";
import axios from "axios";

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
  position: relative;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: white;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin: 20px 16px 10px;

  .profile {
    display: flex;
    align-items: center;

    .profile-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 12px;
      align-items: flex-start;

      .nickname {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
        cursor: pointer;
      }

      .rating {
        font-size: 14px;
        color: #555;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .arrow-icon {
    font-size: 20px;
    color: #888;
  }
`;

const TransactionSection = styled.section`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin: 10px 16px;
  padding: 20px;
  height: 280px;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 15px;
  }

  .transaction-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 35px;
    cursor: pointer;

    span {
      font-size: 14px;
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  max-width: 393px;
  height: 60px;
  background-color: white;
  border-top: 1px solid #ddd;

  .footer-icon {
    font-size: 24px;
    color: #888;
    cursor: pointer;
  }
`;

const Mypage = () => {
  const nav = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    name: userInfo?.name || "홍길동",
    profileImageUrl: userInfo?.profileImageUrl || DefaultProfile,
    reviewCount: 0,
    averageScore: "0.0",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const apiUrl = "http://43.203.202.100:8080/api/v1"; // API URL 선언
        const response = await axios.get(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${userInfo?.jwtToken?.accessToken}`, // 토큰 추가
          },
        });

        if (response.status === 200) {
          setProfileData(response.data.data); // 응답 데이터를 state에 설정
        }
      } catch (error) {
        console.error("마이페이지 조회 에러:", error);
        alert("마이페이지 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchProfileData();
  }, [userInfo]);

  return (
    <Container>
      <Header>마이페이지</Header>
      <ProfileSection>
        <div className="profile">
          <img
            src={profileData.profileImageUrl || DefaultProfile}
            alt="프로필"
            className="profile-image"
            onClick={() => nav("/profile")}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DefaultProfile;
            }}
          />

          <div className="profile-info">
            <span className="nickname" onClick={() => nav("/profile")}>
              {profileData.name}
            </span>
            <span className="rating" onClick={() => nav("/reviewlist")}>
              ⭐ {profileData.averageScore} | 후기 {profileData.reviewCount}
            </span>
          </div>
        </div>
        <div className="arrow-icon" onClick={() => nav("/profile")}>
          ▶
        </div>
      </ProfileSection>
      <TransactionSection>
        <h4>나의 거래</h4>
        <div
          className="transaction-item"
          onClick={() => {
            nav("/wishlist"); // 관심목록 페이지로 이동
          }}
        >
          <span>❤️ 관심목록</span>
          <span>▶</span>
        </div>
        <div
          className="transaction-item"
          onClick={() => {
            nav("/ongoing-transaction"); // 진행 중 거래 페이지로 이동
          }}
        >
          <span>📑 진행중인 거래</span>
          <span>▶</span>
        </div>
        <div
          className="transaction-item"
          onClick={() => {
            nav("/closed-transaction"); // 종료된 거래 페이지로 이동
          }}
        >
          <span>🛍️ 종료된 거래</span>
          <span>▶</span>
        </div>
      </TransactionSection>
      <Footer>
        <div className="footer-icon" onClick={() => nav("/chat")}>
          💬
        </div>
        <div
          className="footer-icon"
          onClick={() => nav("/")} // 홈으로 이동
        >
          🏠
        </div>
        <div className="footer-icon">👤</div>
      </Footer>
    </Container>
  );
};

export default Mypage;
