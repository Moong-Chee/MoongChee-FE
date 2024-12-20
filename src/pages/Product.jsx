import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import Footer from "../components/Footer";

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 393px;
  min-height: 100vh;
  margin: 0 auto;
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

const ProductDetails = styled.div`
  flex: 1;
  padding: 16px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;

  .name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
  }

  .type {
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => (props.tradeType === "RENTAL" ? "red" : "blue")};
  }
`;

const CategoryBox = styled.div`
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
  text-align: left;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  .label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    min-width: 100px;
  }

  .value {
    font-size: 14px;
    color: #333;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .user-info {
    flex: 1;

    .name {
      font-size: 16px;
      font-weight: bold;
    }

    .stats {
      font-size: 14px;
      color: #555;
      margin-top: 4px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

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

  .chat-btn {
    background-color: #007bff; /* 파란색 배경 */
    color: white; /* 글씨는 흰색 */
    &:disabled {
      background-color: #f5f5f5; /* 비활성화된 상태에서 배경색 */
      cursor: not-allowed;
      color: #555
    }
  }

  .heart-btn {
    background-color: white;
    border: 1px solid #ddd;
    color: #555;
    display: flex;
    justify-content: center;
    align-items: center;

    .heart {
      font-size: 20px;
      color: red;
    }

    .empty-heart {
      font-size: 20px;
      color: #ccc;
    }
  }
`;


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
`;

const TermsSection = styled.section`
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.active {
    font-weight: bold;
  }

  svg {
    transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(0)")};
    transition: transform 0.3s ease;
  }
`;

const TermsContent = styled.div`
  margin-top: 10px;
  padding-left: 20px;
  color: #555;
  font-size: 14px;
  text-align: left;
`;

const BackButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ongoingProducts, favoriteProducts, setFavoriteProducts, chatData, setChatData, reviews, userInfo, isLoggedIn } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checklist, setChecklist] = useState({
    terms1: false,
    terms2: false,
    termsConfirmed: false,  // 약관 확인 체크 상태
  });

  const [activeTerms, setActiveTerms] = useState({
    term1: false,
    term2: false,
  });

  const toggleTermsContent = (term) => {
    setActiveTerms((prev) => ({
      ...prev,
      [term]: !prev[term],
    }));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "http://43.203.202.100:8080";

        const response = await axios.get(`${apiUrl}/api/v1/profile/my-like-posts`, {
          headers: {
            Authorization: `Bearer ${userInfo?.jwtToken?.accessToken}`,
          },
        });

        const favoriteIds = response.data.data.map((item) => item.postId);
        setIsFavorite(favoriteIds.includes(Number(id)));
      } catch (error) {
        console.error("관심 목록 확인 에러:", error);
      }
    };

    checkIfFavorite();
  }, [id, userInfo]);
  

  useEffect(() => {
    const foundProduct = ongoingProducts.find((item) => item.id === Number(id));
    setProduct(foundProduct || null);
  }, [id, ongoingProducts]);

  const handleFavoriteToggle = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "http://43.203.202.100:8080/api/v1";

      if (isFavorite) {
        await axios.delete(`${apiUrl}/api/v1/posts/${id}/like`, {
          headers: {
            Authorization: `Bearer ${userInfo?.jwtToken?.accessToken}`,
          },
        });
        setIsFavorite(false);
      } else {
        await axios.post(`${apiUrl}/api/v1/posts/${id}/like`, {}, {
          headers: {
            Authorization: `Bearer ${userInfo?.jwtToken?.accessToken}`,
          },
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("관심 목록 토글 에러:", error);
    }
  };
  

  const handleChat = () => {
    setIsModalOpen(true);
  };

  const confirmChat = async () => {
    if (!product) return;
  
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "http://43.203.202.100:8080/api/v1";
  
      // 채팅방 생성 API 호출
      const response = await axios.post(
        `${apiUrl}/chatRooms/${userInfo.id}/${product.userId}`, // user2Id로 product.userId 사용
        null,
        {
          headers: {
            Authorization: `Bearer ${userInfo.jwtToken.accessToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        const roomId = response.data.data.roomId;
        setChatData((prev) => ({
          ...prev,
          [roomId]: { product, messages: [] },
        }));
        setIsModalOpen(false);
        navigate(`/chat/${roomId}`);
      } else {
        alert("채팅방 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("채팅방 생성 에러:", error);
      alert("채팅방 생성 중 오류가 발생했습니다.");
    }
  };
  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setChecklist((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "http://43.203.202.100:8080";
        const token = userInfo?.jwtToken?.accessToken;
  
        const response = await axios.get(`${apiUrl}/api/v1/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          const productData = response.data.data;
          setProduct(productData);
  
          // userId가 있는 경우에만 fetchUserReviews 호출
          if (productData.userId) {
            fetchUserReviews(productData.userId);
          } else {
            console.warn("상품 데이터에 userId가 없습니다.");
          }
        }
      } catch (error) {
        console.error("상품 데이터 로드 에러:", error);
      }
    };
  
    fetchProduct();
  }, [id, userInfo]);
  

  const getTradeTypeLabel = (tradeType) => {
    return tradeType === "RENTAL" ? "대여" : "판매";
  };

  const keywordToCategoryMap = {
    BOOK: "서적",
    NECESSITY: "생활용품",
    ELECTRONICS: "전자제품",
    CLOTH: "의류",
    GOODS: "잡화",
    OTHER: "기타",
  };

  const getCategoryLabel = (keyword) => {
    return keywordToCategoryMap[keyword] || "기타";
  };
  
  const fetchUserReviews = async (userId) => {
    if (!userId) {
      console.error("userId가 존재하지 않습니다.");
      return;
    }
  
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "http://43.203.202.100:8080";
      const token = userInfo?.jwtToken?.accessToken;
  
      const response = await axios.get(`${apiUrl}/api/v1/reviews/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const reviewsData = response.data.data.reviews;
        setUserReviews(reviewsData);
  
        const count = reviewsData.length;
        const average = count > 0
          ? (reviewsData.reduce((sum, review) => sum + scoreToNumber(review.reviewScore), 0) / count).toFixed(1)
          : "0.0";
  
        setReviewCount(count);
        setAverageRating(average);
      }
    } catch (error) {
      console.error("사용자 리뷰 데이터 로드 에러:", error);
    }
  };
  

  // reviewScore를 숫자 별점으로 변환하는 함수
  const scoreToNumber = (score) => {
    const mapping = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
    };
    return mapping[score] || 0;
  };

  // "채팅 시작" 버튼 활성화 조건 - 약관 모두 확인했을 때
  const isChatEnabled = checklist.termsConfirmed;

  const userReviews = reviews.filter((review) => review.targetUserId === product?.userId);
  const reviewCount = userReviews.length;
  const averageRating = reviewCount > 0
    ? (
      userReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
    ).toFixed(1)
    : "0.0";

  if (!product) {
    return (
      <Container>
        <Header>상품 상세 정보</Header>
        <ProductDetails>
          <p>상품을 찾을 수 없습니다.</p>
          <BackButton onClick={() => navigate("/")}>돌아가기</BackButton>
        </ProductDetails>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header>상품 상세 정보</Header>
      <ProductDetails>
      <ProductImage
        src={product.productImageUrls?.[0] || "/default-image.png"}
        alt={product.name}
        onError={(e) => { e.target.src = "/default-image.png"; }}  // 이미지 로드 실패 시 기본 이미지로 대체
      />

        <ProductHeader $tradeType={product.tradeType}>
          <div className="name">{product.name}</div>
          <div className="type">{getTradeTypeLabel(product.tradeType)}</div>
        </ProductHeader>
        <UserSection onClick={() => navigate(`/profileother/${product.userId}`)}>
          <img src={product.profileImageUrl || "/default-profile.png"} alt="프로필" />
          <div className="user-info">
            <div className="name">{product.authorName}</div>
            <div className="stats">리뷰 {reviewCount}개 | 평균 ⭐ {averageRating}</div>
          </div>
        </UserSection>
        <CategoryBox>{getCategoryLabel(product.keyword)}</CategoryBox>
        <InfoRow>
          <div className="label">상세설명</div>
          <div className="value">{product.productContent}</div>
        </InfoRow>
        <InfoRow>
          <div className="label">거래/반납 날짜</div>
          <div className="value">{product.date}</div>
        </InfoRow>
        <InfoRow>
          <div className="label">판매/보증 금액</div>
          <div className="value">{product.price}원</div>
        </InfoRow>
        <ButtonContainer>
          <button className="chat-btn" onClick={handleChat}>
            1:1 채팅
          </button>
          <button className="heart-btn" onClick={handleFavoriteToggle}>
            {isFavorite ? <span className="heart">❤️</span> : <span className="empty-heart">🤍</span>}
          </button>
        </ButtonContainer>

        <BackButton onClick={() => navigate("/")}>목록으로 돌아가기</BackButton>
      </ProductDetails>
      <Footer />

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <h4>1:1 채팅 전 확인 사항</h4>
          <TermsSection>
            <ToggleButton
              $isOpen={activeTerms.term1}
              onClick={() => toggleTermsContent("term1")}
            >
              <span>1. 대여 상품 미반납 시 약관</span>
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M3 0 L7 5 L3 10 Z" />
              </svg>
            </ToggleButton>
            {activeTerms.term1 && (
              <TermsContent>
                - 대여자는 반드시 반납 날짜까지 대여 상품을 반납해야 한다.<br />
                - 반납 날짜까지 반납하지 않을 시 보증금을 돌려받지 못하며 최대 3일 이내 반드시 반납해야 한다.<br />
                - 3일 이후에도 반납하지 않을 시, 대여 상품 원가에 해당하는 금액을 지급해야 하며 최대 5일 이내로 반드시 반납해야 한다.<br />
                - 만약 그 이후에도 반납하지 않을 시 형법 제355조에 의거, 횡령죄로 간주하여 법적인 처벌을 받을 수 있다.
              </TermsContent>
            )}
          </TermsSection>
          <TermsSection>
            <ToggleButton
              $isOpen={activeTerms.term2}
              onClick={() => toggleTermsContent("term2")}
            >
              <span>2. 대여 시 상품 파손에 관한 약관</span>
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M3 0 L7 5 L3 10 Z" />
              </svg>
            </ToggleButton>
            {activeTerms.term2 && (
              <TermsContent>
                상품 소유주는 상품 등록 시 상품의 정확한 사진을 등록하여 반납 시 상태와 확실한 구별이 가능하게 한다.
                만약 소유주의 실수로 대여 전후 상태의 차이 확인이 불가능할 경우 소유주의 책임으로 간주한다.
                대여자는 상품 반납 시, 대여 전과 동일한 상태를 유지해야 한다. 맨눈으로 확인할 수 있는 찍힘, 긁힘, 오염 등의 파손의 경우 대여자는 수리비 전액을 지급해야 한다.
                <br />
                <br />
                서적의 경우 상품의 소유주는 대여자의 추가적인 필기가 가능함에 동의한다. 단, 서적의 원본 글씨를 알아볼 수 없을 정도의 낙서가 생겼을 경우, 해당 경우는 파손으로 간주, 대여자는 소유주에게 전공 서적 원가의 절반에 해당하는 금액을 지불한다.
                상품의 소유주는 서적의 특성상 서적의 약간의 구겨짐, 찢어짐 등 약간의 훼손은 불가피함에 동의한다. 단, 서적을 읽음에 있어 글씨의 정확한 확인이 불가능할 정도의 훼손은 파손으로 간주, 대여자는 소유주에게 전공 서적 원가의 절반에 해당하는 금액을 지불한다.
              </TermsContent>
            )}
          </TermsSection>
          <TermsSection>
            <label>
              <input
                type="checkbox"
                name="termsConfirmed"
                checked={checklist.termsConfirmed}
                onChange={handleCheckboxChange}
              />
              <span>약관을 모두 확인했습니다.</span>
            </label>
          </TermsSection>
          <ButtonContainer>
            <button
              className="cancel-btn"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#555",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
            <button
              className="chat-btn"
              disabled={!checklist.termsConfirmed}
              style={{
                backgroundColor: checklist.termsConfirmed ? "#007bff" : "#f0f0f0",
                color: checklist.termsConfirmed ? "white" : "#888",
              }}
              onClick={confirmChat}
            >
              채팅 시작
            </button>
          </ButtonContainer>

        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Product;
