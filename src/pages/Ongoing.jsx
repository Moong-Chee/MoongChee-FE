import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    margin-left: 135px;
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

const EditIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: #777;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const ItemImage = styled.img`
  width: 113px;
  height: 113px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 10px;
`;

const TransactionStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 27px;
  background-color: #d9d9d9;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-left: 10px;
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

const Ongoing = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit"); // 수정 페이지로 이동
  };

  return (
    <Container>
      <Header>
        <div className="back-icon" onClick={() => navigate("/mypage")}>
          ←
        </div>
        <h1>진행중인 거래</h1>
      </Header>

      <ListContainer>
        <ItemCard>
          <ItemDate>24년 9월 16일</ItemDate>
          <EditIcon onClick={handleEdit}>✏️</EditIcon>
          <ItemImage
            src="https://via.placeholder.com/113x113"
            alt="컴퓨터공학과 과잠"
          />
          <ItemDetails>
            <span>컴퓨터공학과 과잠</span>
            <p>20,000원</p>
          </ItemDetails>
          <TransactionStatus>거래중</TransactionStatus>
        </ItemCard>

        <ItemCard>
          <ItemDate>24년 7월 21일</ItemDate>
          <EditIcon onClick={handleEdit}>✏️</EditIcon>
          <ItemImage
            src="https://via.placeholder.com/113x113"
            alt="SQLD 노트"
          />
          <ItemDetails>
            <span>SQLD 노트</span>
            <p>10,000원</p>
          </ItemDetails>
          <TransactionStatus>거래중</TransactionStatus>
        </ItemCard>

        <ItemCard>
          <ItemDate>24년 3월 1일</ItemDate>
          <EditIcon onClick={handleEdit}>✏️</EditIcon>
          <ItemImage src="https://via.placeholder.com/113x113" alt="에코백" />
          <ItemDetails>
            <span>에코백</span>
            <p>5,000원</p>
          </ItemDetails>
          <TransactionStatus>거래중</TransactionStatus>
        </ItemCard>
      </ListContainer>
    </Container>
  );
};

export default Ongoing;
