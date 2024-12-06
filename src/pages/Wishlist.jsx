import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../App";
import {
  Container,
  Header,
  ListContainer,
  ItemDate,
} from "../components/Common2";

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 342px;
  height: 183px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 113px;
  height: 113px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
  margin-top: 20px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-top: 20px;
  flex: 1;

  span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px; /* 상품명과 가격 사이 간격 조정 */
  }

  p {
    font-size: 14px;
    color: #777;
  }
`;

const HeartIcon = styled(FaHeart)`
  position: absolute;
  top: 16px;
  right: 16px;
  color: red;
  cursor: pointer;
`;

const Wishlist = () => {
  const { favoriteProducts, setFavoriteProducts } = useContext(UserContext);

  const removeFavorite = (productId) => {
    setFavoriteProducts(
      favoriteProducts.filter((item) => item.id !== productId)
    );
  };

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  return (
    <Container>
      {/* Header */}
      <Header>
        <div className="back-icon" onClick={() => navigate("/mypage")}>
          ←
        </div>{" "}
        {/* 뒤로가기 버튼 */}
        <h1>관심 목록</h1>
      </Header>
      <ListContainer>
        {favoriteProducts
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
          .map((product) => (
            <ItemCard key={product.id}>
              <ItemDate>{product.date}</ItemDate>
              <ItemImage src={product.image} alt={product.productName} />
              <ItemDetails>
                <span>{product.productName}</span>
                <p>{product.price}원</p>
              </ItemDetails>
              <HeartIcon onClick={() => removeFavorite(product.id)} />
            </ItemCard>
          ))}
      </ListContainer>
    </Container>
  );
};

export default Wishlist;
