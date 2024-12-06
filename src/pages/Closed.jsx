import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import { UserContext } from "../App";
import {
  Container,
  Header,
  ListContainer,
  ItemDate,
} from "../components/Common2";
import {
  ItemCard,
  ItemImage,
  TransactionStatus,
  ItemDetails,
} from "../components/Common3";

const Closed = () => {
  const { closedProducts } = useContext(UserContext);
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
        {closedProducts
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
          .map((product) => (
            <ItemCard key={product.id}>
              <ItemDate>{product.date}</ItemDate>
              <ItemImage src={product.image} alt={product.productName} />
              <ItemDetails>
                <span>{product.productName}</span>
                <p>{product.price}</p>
              </ItemDetails>
              <TransactionStatus>거래종료</TransactionStatus>
            </ItemCard>
          ))}
      </ListContainer>
    </Container>
  );
};

export default Closed;
