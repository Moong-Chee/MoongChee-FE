import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 393px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
`;

const InfoCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  .label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    margin-bottom: 4px;
  }

  .value {
    font-size: 16px;
    color: #333;
  }
`;

const ProfileOther = () => {
  const { userId } = useParams(); // URL에서 userId 파라미터 가져오기
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const apiUrl = "http://43.203.202.100:8080/api/v1"; // API 기본 URL
        const response = await axios.get(
          `${apiUrl}/profile/details/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 토큰
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("상대방 프로필 조회 실패:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return (
      <Container>
        <Header>사용자 정보</Header>
        <Content>
          <p>로딩 중...</p>
        </Content>
        <Footer />
      </Container>
    );
  }

  if (error || !profileData) {
    return (
      <Container>
        <Header>사용자 정보</Header>
        <Content>
          <p>프로필 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.</p>
          <button onClick={() => navigate("/")}>홈으로 이동</button>
        </Content>
        <Footer />
      </Container>
    );
  }

  // 학과 Enum 매핑
  const departmentMap = {
    SW: "소프트웨어전공",
    AI: "인공지능전공",
    COMPUTER_SCIENCE: "컴퓨터공학과",
    INDUSTRIAL_ENGINEERING: "산업공학과",
    VISUAL_DESIGN: "시각디자인학과",
    BUSINESS: "경영학과",
    ECONOMICS: "경제학과",
  };

  return (
    <Container>
      <Header>사용자 정보</Header>
      <Content>
        <InfoCard>
          <div className="label">이름</div>
          <div className="value">{profileData.name}</div>
        </InfoCard>
        <InfoCard>
          <div className="label">이메일</div>
          <div className="value">{profileData.email}</div>
        </InfoCard>
        <InfoCard>
          <div className="label">학과</div>
          <div className="value">
            {departmentMap[profileData.department] || "정보 없음"}
          </div>
        </InfoCard>
      </Content>
      <Footer />
    </Container>
  );
};

export default ProfileOther;
