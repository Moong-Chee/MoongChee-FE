import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const [input, setInput] = useState({
    image: null,
    productName: "",
    category: "",
    content: "",
    possibleDate: new Date().toISOString().split("T")[0],
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setInput({ ...input, category });
  };

  const handleSubmit = () => {
    console.log("등록 완료:", input);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header>상품 등록</Header>
      <UploadSection>
        <div className="upload-box">사진/동영상 업로드</div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setInput({ ...input, image: e.target.files[0] || null })
          }
          style={{ display: "none" }}
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
