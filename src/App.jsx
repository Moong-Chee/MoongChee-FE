import "./App.css";
import { useReducer, useRef, createContext, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Notfound from "./pages/Notfound";
import Main from "./pages/Main";
import Button from "./components/Button";
import Header from "./components/Header";
import picture from "./assets/picture.jpg";

const productData = [
  {
    id: 1,
    image: null,
    productName: "상품명",
    category: "카테고리1",
    content: "상품 상세설명",
    possibleDate: new Date().getTime(),
    price: 5000,
  },
  {
    id: 2,
    image: null,
    productName: "상품명2",
    category: "카테고리2",
    content: "상품 상세설명2",
    possibleDate: new Date().getTime(),
    price: 10000,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
  }
}

export const ProductStateContext = createContext();
export const ProductDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, productData);
  const idRef = useRef(3);

  const onCreate = (
    image,
    productName,
    category,
    content,
    possibleDate,
    price
  ) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        image,
        productName,
        category,
        content,
        possibleDate,
        price,
      },
    });
  };

  return (
    <>
      <ProductStateContext.Provider value={data}>
        <ProductDispatchContext.Provider value={{ onCreate }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </ProductDispatchContext.Provider>
      </ProductStateContext.Provider>
    </>
  );
}

export default App;
