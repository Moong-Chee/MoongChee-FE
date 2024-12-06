import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Header,
  HeaderWithToggle,
  InputRow,
  CategorySection,
  CategoryList,
  ButtonContainer,
} from "../components/Common1";

const UploadSection = styled.section`
  display: flex;
  align-items: center;
  margin: 16px 0;
  gap: 10px;
  width: 100%;

  .upload-box {
    width: 100px;
    height: 100px;
    border: 1px dashed #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 12px;
    color: #555;
    cursor: pointer;
  }
`;

const StatusSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;

  label {
    font-size: 16px;
    font-weight: bold;
    color: #555;
    margin-right: 16px;
    min-width: 80px;
  }

  div {
    display: flex;
    gap: 10px;

    button {
      padding: 8px 12px;
      border: none;
      background-color: #d9d9d9;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;

      &.selected {
        background-color: #555;
        color: white;
      }
    }
  }
`;

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 상품 ID 가져오기
  const {
    ongoingProducts,
    setOngoingProducts,
    closedProducts,
    setClosedProducts,
  } = useContext(UserContext);

  const product =
    ongoingProducts.find((item) => item.id === parseInt(id)) || {};

  const [input, setInput] = useState({
    ...product,
    status: product.status || "거래가능",
    transactionType: product.transactionType || null,
  });

  const handleCategoryClick = (category) => {
    setInput({ ...input, category });
  };

  const handleStatusClick = (status) => {
    setInput({ ...input, status });
  };

  const handleCancel = () => {
    navigate("/ongoing-transaction");
  };

  const handleToggle = (type) => {
    setInput({ ...input, transactionType: type });
  };

  const handleSubmit = () => {
    if (input.status === "거래종료") {
      // 거래종료 상태일 경우 진행중인 거래에서 제거하고 종료된 거래로 이동
      const updatedOngoingProducts = ongoingProducts.filter(
        (item) => item.id !== product.id
      );
      setOngoingProducts(updatedOngoingProducts);
      setClosedProducts((prev) => [input, ...prev]);

      // 로컬스토리지 업데이트
      localStorage.setItem(
        "ongoingProducts",
        JSON.stringify(updatedOngoingProducts)
      );
      localStorage.setItem(
        "closedProducts",
        JSON.stringify([input, ...closedProducts])
      );
    } else {
      // 진행중인 거래 상태 업데이트
      const updatedOngoingProducts = ongoingProducts.map((item) =>
        item.id === product.id ? { ...input } : item
      );
      setOngoingProducts(updatedOngoingProducts);

      // 로컬스토리지 업데이트
      localStorage.setItem(
        "ongoingProducts",
        JSON.stringify(updatedOngoingProducts)
      );
    }

    // 상태에 따라 이동
    navigate(
      input.status === "거래종료"
        ? "/closed-transaction"
        : "/ongoing-transaction"
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput({ ...input, image: reader.result }); // Base64 이미지 저장
      };
      reader.readAsDataURL(file); // 파일을 Base64로 변환
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <Container>
      <HeaderWithToggle>
        상품 수정
        <div className="toggle-buttons">
          <button
            onClick={() => handleToggle("판매")}
            className={
              input.transactionType === "판매" ? "selected" : "unselected"
            }
          >
            판매
          </button>
          <button
            onClick={() => handleToggle("대여")}
            className={
              input.transactionType === "대여" ? "selected" : "unselected"
            }
          >
            대여
          </button>
        </div>
      </HeaderWithToggle>

      <UploadSection>
        <div className="upload-box">
          <label>
            {input.image ? (
              <img src={input.image} alt="미리보기" style={{ width: "100%" }} />
            ) : (
              "사진/동영상"
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </UploadSection>
      <InputRow>
        <label>상품명</label>
        <input
          type="text"
          name="productName"
          value={input.productName || ""}
          onChange={onChangeInput}
        />
      </InputRow>
      <CategorySection>
        <h4>카테고리</h4>
        <CategoryList>
          {["서적", "생활용품", "전자제품", "의류", "잡화", "기타"].map(
            (category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={input.category === category ? "selected" : ""}
              >
                {category}
              </button>
            )
          )}
        </CategoryList>
      </CategorySection>
      <InputRow>
        <label>상세설명</label>
        <textarea
          name="content"
          value={input.content || ""}
          onChange={onChangeInput}
        />
      </InputRow>
      <StatusSection>
        <label>상태변경</label>
        <div>
          {["거래가능", "거래중", "거래종료"].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={input.status === status ? "selected" : ""}
            >
              {status}
            </button>
          ))}
        </div>
      </StatusSection>
      <InputRow>
        <label>거래 날짜/반납 날짜</label>
        <input
          type="date"
          name="possibleDate"
          value={input.possibleDate || ""}
          onChange={onChangeInput}
        />
      </InputRow>
      <InputRow>
        <label>판매 금액/대여 보증금</label>
        <input
          type="text"
          name="price"
          value={input.price || ""}
          onChange={onChangeInput}
        />
      </InputRow>
      <ButtonContainer>
        <button
          className="cancel-btn"
          onClick={() => navigate("/ongoing-transaction")}
        >
          취소
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          수정
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default Edit;
