import styled from "styled-components";

export const ItemCard = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 342px;
  height: 183px;
  background-color: white;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ItemImage = styled.img`
  width: 113px;
  height: 113px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 10px;
`;

export const TransactionStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 27px;
  background-color: #d9d9d9;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 10px;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
  flex: 1;

  span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    white-space: nowrap; /* 줄바꿈 방지 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임 표시 */
  }

  p {
    font-size: 14px;
    color: #777;
    margin-top: 8px;
  }
`;
