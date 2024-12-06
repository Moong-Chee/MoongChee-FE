import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const Ongoing = () => {
  const { ongoingProducts } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // 수정 페이지로 이동
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
        {ongoingProducts.map((item) => (
          <ItemCard key={item.id}>
            <ItemDate>{item.date}</ItemDate>
            <EditIcon onClick={() => navigate(`/edit/${item.id}`)}>✏️</EditIcon>
            <ItemImage src={item.image} alt={item.productName} />
            <ItemDetails>
              <span>{item.productName}</span>
              <p>{item.price}</p>
            </ItemDetails>
            <TransactionStatus>{item.status}</TransactionStatus>
          </ItemCard>
        ))}
      </ListContainer>
    </Container>
  );
};

export default Ongoing;
