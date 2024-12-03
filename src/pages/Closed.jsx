import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import { FaHeart } from "react-icons/fa"; // 하트 아이콘

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 393px;
  height: 852px;
  margin: 0 auto;
  background-color: white;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 393px;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  .back-icon {
    font-size: 20px;
    color: #333;
    cursor: pointer;
  }

  h1 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-left: 135px; /* 뒤로가기 버튼과의 간격 */
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 342px;
  height: 183px;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const ItemDate = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  color: #777;
`;

const ItemImage = styled.img`
  width: 113px;
  height: 113px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 10px; /* 이미지 위치를 살짝 아래로 조정 */
`;

const TransactionStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 27px;
  background-color: #d9d9d9; /* 배경 색상 */
  color: white; /* 텍스트 색상 */
  font-size: 12px; /* 텍스트 크기 */
  font-weight: bold;
  border-radius: 8px; /* 코너 반경 */
  margin-top: 10px; /* 도형과 가격 간의 간격 */
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px; /* 텍스트를 이미지와 더 가까이 배치 */
  flex: 1;

  span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #777;
    margin-top: 8px;
  }
`;

const Closed = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  return (
    <Container>
      {/* Header */}
      <Header>
        <div className="back-icon" onClick={() => navigate("/mypage")}>
          ←
        </div>{" "}
        {/* 뒤로가기 버튼 */}
        <h1>종료된 거래</h1>
      </Header>

      {/* List */}
      <ListContainer>
        {/* 첫 번째 상품 */}
        <ItemCard>
          <ItemDate>24년 9월 16일</ItemDate>
          <ItemImage
            src="https://via.placeholder.com/113x113"
            alt="컴퓨터공학과 과잠"
          />
          <ItemDetails>
            <span>컴퓨터공학과 과잠</span>
            <p>20,000원</p>
          </ItemDetails>
          <TransactionStatus>거래종료</TransactionStatus>
        </ItemCard>

        {/* 두 번째 상품 */}
        <ItemCard>
          <ItemDate>24년 7월 21일</ItemDate>
          <ItemImage
            src="https://via.placeholder.com/113x113"
            alt="SQLD 노트"
          />
          <ItemDetails>
            <span>SQLD 노트</span>
            <p>10,000원</p>
          </ItemDetails>
          <TransactionStatus>거래종료</TransactionStatus>
        </ItemCard>

        {/* 세 번째 상품 */}
        <ItemCard>
          <ItemDate>24년 3월 1일</ItemDate>
          <ItemImage src="https://via.placeholder.com/113x113" alt="에코백" />
          <ItemDetails>
            <span>에코백</span>
            <p>5,000원</p>
          </ItemDetails>
          <TransactionStatus>거래종료</TransactionStatus>
        </ItemCard>
      </ListContainer>
    </Container>
  );
};

export default Closed;