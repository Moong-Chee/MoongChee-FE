import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 393px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

export const Header = styled.header`
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

export const HeaderWithToggle = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .toggle-buttons {
    display: flex;
    gap: 10px;

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;

      &.selected {
        background-color: #007bff;
        color: white;
      }

      &.unselected {
        background-color: #ddd;
        color: #555;
      }
    }
  }
`;

export const InputRow = styled.div`
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

export const CategorySection = styled.section`
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

export const CategoryList = styled.div`
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
    width: 80px;
    height: 30px;

    &.selected {
      background-color: #555;
      color: white;
    }
  }
`;

export const ButtonContainer = styled.div`
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
