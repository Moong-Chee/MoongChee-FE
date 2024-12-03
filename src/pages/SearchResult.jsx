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
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  .back-button {
    font-size: 20px;
    cursor: pointer;
    color: #333;
  }

  .search-input {
    flex: 1;
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
    font-size: 14px;
    outline: none;
  }
`;

const ProductList = styled.div`
  padding: 16px;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;

  .product-image {
    width: 80px;
    height: 80px;
    background-color: #d9d9d9;
    border-radius: 8px;
    margin-right: 16px;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 */

    .product-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      text-align: left; /* 왼쪽 정렬 */
      width: 100%; /* 텍스트가 부모 컨테이너를 채움 */
    }

    .product-info {
      font-size: 14px;
      color: #555;
      margin-bottom: 4px;
      text-align: left; /* 왼쪽 정렬 */
      width: 100%; /* 텍스트가 부모 컨테이너를 채움 */
    }

    .product-price {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      text-align: left; /* 왼쪽 정렬 */
      width: 100%; /* 텍스트가 부모 컨테이너를 채움 */
    }
  }
`;

const SearchResult = () => {
  const navigate = useNavigate();

  // 임의의 데이터
  const searchQuery = "컴공";
  const products = [
    { title: "컴공 JAVA 책", info: "대여 | 25분전", price: "3,000원" },
    { title: "컴공 24학번 과잠 M", info: "대여 | 25분전", price: "3,000원" },
    { title: "컴공 C언어 책", info: "대여 | 25분전", price: "3,000원" },
    {
      title: "컴공 필수템 노트북 거치대",
      info: "대여 | 25분전",
      price: "3,000원",
    },
    { title: "컴공 19학번 과잠", info: "대여 | 25분전", price: "3,000원" },
  ];

  return (
    <Container>
      <Header>
        <div className="back-button" onClick={() => navigate("/search")}>
          ←
        </div>
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          readOnly
        />
      </Header>
      <ProductList>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <div className="product-image" />
            <div className="product-details">
              <span className="product-title">{product.title}</span>
              <span className="product-info">{product.info}</span>
              <span className="product-price">{product.price}</span>
            </div>
          </ProductCard>
        ))}
      </ProductList>
    </Container>
  );
};

export default SearchResult;
