import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
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
  input[type="file"] {
    display: none; /* 숨기기 */
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const Register = () => {
  const { ongoingProducts, setOngoingProducts } = useContext(UserContext);
  const idRef = useRef(
    Math.max(...ongoingProducts.map((product) => product.id), 0) + 1
  ); // 고유 ID 관리
  const [input, setInput] = useState({
    transactionType: null,
    id: idRef.current,
    date: new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    image: null,
    productName: "",
    category: "",
    content: "",
    status: "거래가능",
    possibleDate: new Date().toISOString().split("T")[0],
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput({ ...input, image: reader.result }); // Base64 이미지 저장
        setPreviewImage(reader.result); // 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Base64로 변환
    }
  };

  const handleToggle = (type) => {
    setInput({ ...input, transactionType: type });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setInput({ ...input, category });
  };

  const handleSubmit = () => {
    const newProduct = {
      id: idRef.current++, // 고유 ID 생성
      image: input.image, // Base64 이미지 사용
      productName: input.productName,
      category: input.category,
      content: input.content,
      status: input.status,
      possibleDate: input.possibleDate, // 올바르게 수정
      price: input.price,
      transactionType: input.transactionType,
      date: new Date().toLocaleDateString("ko-KR"), // 한국어 형식 날짜
    };

    const updatedProducts = [newProduct, ...ongoingProducts];
    setOngoingProducts((prev) => [newProduct, ...prev]); // 기존 상품 유지하며 추가
    localStorage.setItem("ongoingProducts", JSON.stringify(updatedProducts));
    navigate("/"); // 메인 페이지로 이동
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container>
      <HeaderWithToggle>
        상품 등록
        <div className="toggle-buttons">
          <button
            className={
              input.transactionType === "판매" ? "selected" : "unselected"
            }
            onClick={() => handleToggle("판매")}
          >
            판매
          </button>
          <button
            className={
              input.transactionType === "대여" ? "selected" : "unselected"
            }
            onClick={() => handleToggle("대여")}
          >
            대여
          </button>
        </div>
      </HeaderWithToggle>
      <UploadSection>
        <div
          className="upload-box"
          onClick={() => fileInputRef.current.click()} // 파일 선택 창 열기
        >
          {previewImage ? (
            <img src={previewImage} alt="미리보기" />
          ) : (
            "사진/동영상 업로드"
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </UploadSection>
      <InputRow>
        <label>상품명</label>
        <input
          type="text"
          name="productName"
          value={input.productName}
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
                className={selectedCategory === category ? "selected" : ""}
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
          value={input.content}
          onChange={onChangeInput}
        />
      </InputRow>
      <InputRow>
        <label>거래 날짜/반납 날짜</label>
        <input
          type="date"
          name="possibleDate"
          value={input.possibleDate}
          onChange={onChangeInput}
        />
      </InputRow>
      <InputRow>
        <label>판매 금액/대여 보증금</label>
        <input
          type="text"
          name="price"
          value={input.price}
          onChange={onChangeInput}
        />
      </InputRow>
      <ButtonContainer>
        <button className="cancel-btn" onClick={handleCancel}>
          취소
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          등록
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default Register;
