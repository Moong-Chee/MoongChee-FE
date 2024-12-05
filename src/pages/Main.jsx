import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 393px;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  overflow-y: auto; /* 스크롤 가능 */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center;
  width: 100%;
  max-width: 393px;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 16px; /* 좌우 여백 */

  h1 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .search-icon {
    font-size: 20px;
    color: #333;
    cursor: pointer;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 10px;

  span {
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임 표시 */
  }

  p {
    font-size: 12px;
    color: #555;
  }
`;

const RegisterButton = styled.button`
  position: fixed;
  bottom: 10px;
  width: 80%;
  max-width: 393px;
  height: 50px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const Main = () => {
  const { ongoingProducts } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <h1>가천대학교 대여서비스</h1>
        <FaSearch
          className="search-icon"
          onClick={() => navigate("/search")} // /search로 이동
        />
      </Header>
      <ItemList>
        {ongoingProducts
          .filter((product) => product.status !== "거래종료") // 거래종료 제외
          .map((product) => (
            <ItemCard key={product.id}>
              <ItemImage src={product.image} alt={product.productName} />
              <ItemDetails>
                <span>{product.productName}</span>
                <p>{product.price}</p>
                <p>{product.date}</p>
              </ItemDetails>
            </ItemCard>
          ))}
      </ItemList>
      <RegisterButton onClick={() => navigate("/register")}>
        + 상품 등록
      </RegisterButton>
    </Container>
  );
};

export default Main;
