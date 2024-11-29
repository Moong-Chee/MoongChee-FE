import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { ProductDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { onCreate } = useContext(ProductDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(
      input.image,
      input.productName,
      input.category,
      input.content,
      input.possibleDate.getTime(),
      input.price
    );
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header leftChild={"상품 등록"} />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default Register;
