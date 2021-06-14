import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/commons/header";
import ReviewUserInfo from "../components/commons/review-user-info";
import FuncStar from "../components/review/func-star";
import ReviewTag from "../components/review/review-tag";
import ReviewTitle from "../components/review/review-title";

const ReviewContainer = styled.div`
    padding-top: 55px;
    overflow: scroll;
`;

const ReviewContentContainer = styled.div`
    text-align: center;
`;

const ReviewContentText = styled.div`
    text-align: left;
    font-size: 16px;
    color: #4e4e4e;
    margin: 10px 30px;
    word-break: keep-all;
`;

const ReviewContentImg = styled.img`
    width: 184px;
    height: 184px;
    margin: 20px;
    object-fit: cover;
`;

export default function Review() {
    const { id, reviewId } = useParams();
    const location = useLocation();
    const review = location.state.review;

    const myUserId = 2;

    return (
        <>
        <Header title='제품 리뷰 상세보기' extraButton={review.userId === myUserId ? '편집' : null} onExtraButtonClick={() => alert('편집')}/>
        <ReviewContainer>
            <ReviewTitle title={review.reviewTitle}/>
            <ReviewUserInfo review={review}/>
            <ReviewTag tags={review.reviewTag} />
            {review.funcStar && review.funcStar.map((score, idx) => {return(<FuncStar label={`기능 ${idx+1}`} score={score}/>)})}
            <ReviewContentContainer>
                {review.reviewThumbnailImgUrl ? <ReviewContentImg src={review.reviewThumbnailImgUrl}/> : ''}
                {review.reviewContent && review.reviewContent.map((content, idx) => { return( content.type === 'text' ? content.text.split('\n').map(line => {
                    return(<ReviewContentText>{line}<br/></ReviewContentText>)
                }) : <ReviewContentImg src={content.image} /> )})}
            </ReviewContentContainer>
        </ReviewContainer>
        </>
        )
}