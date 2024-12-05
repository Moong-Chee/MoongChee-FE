import "./App.css";
import { useReducer, useRef, createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import Initialinfo from "./pages/InitialInfo";
import Review from "./pages/Review";
import Chat from "./pages/Chat";
import Detail from "./pages/Detail";

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
    default:
      return state;
  }
}

// Context 생성
export const ProductStateContext = createContext();
export const ProductDispatchContext = createContext();
export const UserContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, productData);

  const [userInfo, setUserInfo] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("userInfo")) || {
        profileImage: "",
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        department: "",
        studentId: "",
      }
    );
  });

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const [favoriteProducts, setFavoriteProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  });

  const [ongoingProducts, setOngoingProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("ongoingProducts")) || [];
  });

  const [closedProducts, setClosedProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("closedProducts")) || [];
  });

  const idRef = useRef(
    Math.max(
      ...ongoingProducts.map((product) => product.id),
      ...closedProducts.map((product) => product.id),
      0
    ) + 1
  );

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem("ongoingProducts", JSON.stringify(ongoingProducts));
  }, [ongoingProducts]);

  useEffect(() => {
    localStorage.setItem("closedProducts", JSON.stringify(closedProducts));
  }, [closedProducts]);

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
    <UserContext.Provider
      value={{
        ...userInfo,
        setUserInfo,
        reviews,
        setReviews,
        favoriteProducts,
        setFavoriteProducts,
        ongoingProducts,
        setOngoingProducts,
        closedProducts,
        setClosedProducts,
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
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchresult" element={<SearchResult />} />
            <Route path="/initialinfo" element={<Initialinfo />} />
            <Route path="/review" element={<Review />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </ProductDispatchContext.Provider>
      </ProductStateContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
