import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 393px;
  height: 852px;
  margin: 0 auto;
  background-color: white;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 393px;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky; /* 헤더를 고정 */
  top: 0; /* 스크롤 시 상단에 고정 */
  z-index: 1000; /* 다른 요소 위에 나타나도록 z-index 설정 */

  .back-icon {
    font-size: 20px;
    color: #333;
    cursor: pointer;
  }

  h1 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-left: 135px; /* 뒤로가기 버튼과의 간격 */
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
`;

export const ItemDate = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  color: #777;
`;
