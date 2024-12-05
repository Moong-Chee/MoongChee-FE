import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Container = styled.div`
  /* 스타일 유지 */
`;

const Review = () => {
  const navigate = useNavigate();
  const { reviews, setReviews } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const newReview = {
      targetUserId: "me", // 현재 사용자 ID
      rating,
      comment,
    };
    setReviews([...reviews, newReview]);
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <Container>
      <header>리뷰 작성</header>
      <div>
        <h4>별점</h4>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            style={{
              color: star <= rating ? "yellow" : "gray",
            }}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        placeholder="후기를 입력하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>작성하기</button>
    </Container>
  );
};

export default Review;
