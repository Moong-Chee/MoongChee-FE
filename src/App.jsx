import "./App.css";
import { useReducer, useRef, createContext, useState, useEffect } from "react";
import { Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Notfound from "./pages/Notfound";
import Mypage from "./pages/Mypage";
import Main from "./pages/Main";
import Wishlist from "./pages/Wishlist";
import Ongoing from "./pages/Ongoing";
import Closed from "./pages/Closed";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";

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
export const UserContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, productData);
  const [profileImage, setProfileImage] = useState(() => {
    const savedImage = localStorage.getItem("profileImage");
    return savedImage
      ? new Blob([new Uint8Array(JSON.parse(savedImage))])
      : null;
  });
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || "홍길동";
  });
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const idRef = useRef(3);

  useEffect(() => {
    localStorage.removeItem("profileImage");
    localStorage.removeItem("nickname");
    localStorage.removeItem("reviews");

    setProfileImage(null);
    setNickname("홍길동");
    setReviews([]);
  }, []);

  /*
  useEffect(() => {
    if (profileImage) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(profileImage);
      reader.onloadend = () => {
        localStorage.setItem(
          "profileImage",
          JSON.stringify([...new Uint8Array(reader.result)])
        );
      };
    }
  }, [profileImage]);

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
  }, [nickname]);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);
  */

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
      <UserContext.Provider
        value={{
          profileImage,
          setProfileImage,
          nickname,
          setNickname,
          reviews,
          setReviews,
        }}
      >
        <ProductStateContext.Provider value={data}>
          <ProductDispatchContext.Provider value={{ onCreate }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/ongoing-transaction" element={<Ongoing />} />
              <Route path="/closed-transaction" element={<Closed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/search" element={<Search />} />
              <Route path="/searchresult" element={<SearchResult />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </ProductDispatchContext.Provider>
        </ProductStateContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
