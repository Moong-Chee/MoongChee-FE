import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  padding: 16px;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const InitialInfo = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    profileImage: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    department: "",
    studentId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUserInfo(form);
    navigate("/profile");
  };

  return (
    <Container>
      <Header>초기 정보 입력</Header>
      <InputGroup>
        <label>프로필 이미지</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </InputGroup>
      <InputGroup>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label>핸드폰</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label>생년월일</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label>학과</label>
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label>학번</label>
        <input
          type="text"
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
        />
      </InputGroup>
      <Button onClick={handleSave}>저장</Button>
    </Container>
  );
};

export default InitialInfo;
