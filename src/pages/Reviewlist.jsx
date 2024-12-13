import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const Content = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const ReviewCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;

  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }

  .rating {
    font-size: 14px;
    color: #555;
    margin-bottom: 8px;
  }

  .content {
    font-size: 14px;
    color: #666;
  }
`;

const NoReviews = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #888;
`;

const ReviewList = () => {
  const { userInfo } = useContext(UserContext);
  const [reviewsData, setReviewsData] = useState({
    reviewCount: 0,
    averageScore: "0.0",
    reviews: [],
  });

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const apiUrl = "http://43.203.202.100:8080/api/v1";
        const response = await axios.get(`${apiUrl}/reviews/user`, {
          headers: {
            Authorization: `Bearer ${userInfo?.jwtToken?.accessToken}`,
          },
        });

        if (response.status === 200) {
          setReviewsData(response.data.data);
        }
      } catch (error) {
        console.error("리뷰 조회 에러:", error);
        alert("리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchReviewsData();
  }, [userInfo]);

  return (
    <Container>
      <Header title="내 리뷰" />
      <Content>
        {reviewsData.reviews.length > 0 ? (
          reviewsData.reviews.map((review) => (
            <ReviewCard key={review.id}>
              <div className="title">상품 ID: {review.postId}</div>
              <div className="rating">별점: ⭐ {review.reviewScore}</div>
              <div className="content">{review.reviewContent}</div>
            </ReviewCard>
          ))
        ) : (
          <NoReviews>작성된 리뷰가 없습니다.</NoReviews>
        )}
      </Content>
      <Footer />
    </Container>
  );
};

export default ReviewList;
