import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위아래 여백 균형 */
  width: 100%;
  max-width: 393px;
  min-height: 100vh; /* 전체 화면 높이를 채움 */
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
`;

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

const InputRow = styled.div`
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

  input,
  textarea {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
    font-size: 14px;
  }

  textarea {
    resize: none;
    height: 100px;
  }
`;

const CategorySection = styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;

  h4 {
    font-size: 16px;
    font-weight: bold;
    color: #555;
    margin-right: 16px;
    min-width: 80px;
  }
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  flex: 1;

  button {
    padding: 8px 12px;
    border: none;
    background-color: #d9d9d9;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    width: 80px; /* 모든 버튼의 너비 고정 */
    height: 30px; /* 모든 버튼의 높이 고정 */

    &.selected {
      background-color: #555;
      color: white;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;

  button {
    flex: 1;
    height: 40px;
    margin: 0 5px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .cancel-btn {
    background-color: #f5f5f5;
    color: #555;
  }

  .submit-btn {
    background-color: #007bff;
    color: white;
  }
`;

const Register = () => {
  const { ongoingProducts, setOngoingProducts } = useContext(UserContext);
  const idRef = useRef(
    Math.max(...ongoingProducts.map((product) => product.id), 0) + 1
  ); // 고유 ID 관리
  const [input, setInput] = useState({
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
      <Header>상품 등록</Header>
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
        <label>대여 가능 날짜</label>
        <input
          type="date"
          name="possibleDate"
          value={input.possibleDate}
          onChange={onChangeInput}
        />
      </InputRow>
      <InputRow>
        <label>가격</label>
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
