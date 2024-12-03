import DefaultProfile from "./assets/images/DefaultProfile.png";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const nav = useNavigate();

  return (
    <div>
      여기는 메인페이지
      <img
        src={DefaultProfile}
        alt="Profile icon"
        width="50px"
        style={{ cursor: "pointer" }}
        onClick={() => {
          nav("/mypage");
        }}
      />
    </div>
  );
};

export default Main;
