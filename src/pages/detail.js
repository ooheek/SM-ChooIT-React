// import { useEffect } from "react";
import React, { useEffect, useRef, useState } from "react";

import { Container, Button, lightColors } from "react-floating-action-button";
import { useHistory, useParams } from "react-router-dom";

import styled from "styled-components";
import Header from "../components/commons/header";
import ProductInfo from "../components/commons/product-info";
import OptionSlider from "../components/detail/option-slider";
import ReactionSlider from "../components/detail/reaction-slider";
import Review from "../components/detail/review";
import ReviewInfo from "../components/commons/review-info";
import SubTitle from "../components/detail/subtitle";
import Tab from "../components/detail/tab";
// import { fetchItem } from "../services";

const ProductContainer = styled.div`
    padding-top: 55px;
    overflow: scroll;
`;

const ProductContent = styled.div`
    position: relative;
`;

const ProductTabArea = styled.div`
    position: relative;
    width: 100%;
    height: 245px;
`;

const ProductTabContainer = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 245px;
    transition: transform 0.5s ease-in-out;
    background-color: #ffffff;
    &.hide {
        transform: translateY(-250px);
    }
`;

const FunctionContainer = styled.div`
    margin: 20px 0;
`;

const DetailContainer = styled.div`
    margin: 15px 40px;
    min-height: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DetailImg = styled.img`
    width: 100%;
`;

const NoDetailImg = styled.img`
    width: 120px;
`;
const NoDetailImgText = styled.div`
    font-size: 16px;
    color: #dedede;
    margin-top: 15px;
`;

const ReviewContainer = styled.div``;

const InformationDivision = styled.div`
    margin-bottom: 35px;
`;

const FloatingButtonImg = styled.img`
    width: 23px;
`;


function throttle(callback, waitTime) {
    let timerId = null;
    return (e) => {
        if(timerId) return;
        timerId = setTimeout(() => {
            callback.call(this, e);
            timerId = null;
        }, waitTime);
    };
};

export default function Detail() {
    const { detailId } = useParams();

    let history = useHistory();
    function navigateReviewWritePage() {
        history.push(`/detail/:${detailId}/review/write`);
      }

    // useEffect(() => {
    //     fetchItem()
    // }, [])
    const [hide, setHide] = useState(false);
    const [pageY, setPageY] = useState(0);
    const documentRef = useRef(document);

    function handleScroll() {
        const { pageYOffset } = window;
        const deltaY = pageYOffset - pageY;
        const hide = pageYOffset !== 0 && deltaY >= 0;
        setHide(hide);
        setPageY(pageYOffset);
    }

    const throttleScroll = throttle(handleScroll, 50);

    useEffect(() => {
        documentRef.current.addEventListener('scroll', throttleScroll);
        return () => documentRef.current.removeEventListener('scroll', throttleScroll);
    }, [pageY])

    const detailImages = ["/mock-images/product-detail-info/image_1.jpg", "/mock-images/product-detail-info/image_2.jpg", "/mock-images/product-detail-info/image_3.jpg", "/mock-images/product-detail-info/image_4.jpg", "/mock-images/product-detail-info/image_5.jpg", "/mock-images/product-detail-info/image_6.jpg", "/mock-images/product-detail-info/image_7.jpg"]
    // const detailImages = []
    // 상세 옵션
    const options = [{
        title: '휴대성',
        score: 5,
        description: '어깨가 끊어질 수도 있어요! 💪'
    }, {
        title: '소음',
        score: 2,
        description: '옆에서 두들겨도 꿈나라 가능! 😴'
    }];

    // 감정 분석
    const reactionOptions = [{
        title: '소음',
        score: 60
    }, {
        title: '가성비',
        score: 20
    }]

    // 리뷰 설명
    const reviewInformationArr = ['🔥 지난 한 달 간 검색 상위 10%', '🔕 무소음 선호하는 제품', '️💻 개발자가 선호하는 제품']

    // 리뷰 데이터
    const reviewArr = [{
        reviewId: 1,
        userNickname: '행복한 식빵', 
        userTag: ['#개발자', '#무소음', '#디자인'], 
        userImg: '🍞', 
        reviewDate: '2021.06.13', 
        reviewTitle: '새로운 눈을 갖게 된 기분!', 
        reviewImgUrl: '/mock-images/review_image.jpeg', 
        reviewContent: '이렇게 좋은 태블릿은 정말 처음 써봐요. 원래 에어를 살지 프로를 살지 고민이 많았는데 영상편집이나 디자인 전문가가 아니다보니까 에어도 충분할 것 같더라구요.', 
        reviewTag: ['#그림', '#짱예쁨', '#애플은실버', '#넷플릭스']
    }, {
        reviewId: 2,
        userNickname: '졸린 사과', 
        userTag: ['#예술가', '#가성비'], 
        userImg: '🍎', 
        reviewDate: '2021.06.12', 
        reviewTitle: '이런 태블릿,, 처음이야,,', 
        reviewImgUrl: null, 
        reviewContent: '이렇게 좋은 태블릿은 정말 처음 써봐요. 원래 에어를 살지 프로를 살지 고민이 많았는데 영상편집이나 디자인 전문가가 아니다보니까 에어도 충분할 것 같더라구요.', 
        reviewTag: ['#필기감', '#가벼움', '#애플', '#심플', '#세상좋음']
    }]

    return (
        <>
        <Header title='APPLE 2020 맥북에어' />
        <ProductContainer>
            <ProductTabArea>
                <ProductTabContainer className={hide && 'hide'}>
                    <ProductInfo />
                    <Tab />
                </ProductTabContainer>
            </ProductTabArea>
            <ProductContent>
                <FunctionContainer id='p-function'>
                    <InformationDivision>
                    <SubTitle subtitle='제품 상세 옵션'/>
                        {options.map((option, idx) => {return(<OptionSlider title={option.title} score={option.score} description={option.description} key={idx}/>)})}
                    </InformationDivision>
                    <InformationDivision>
                    <SubTitle subtitle='이 제품은 이런 반응이 많아요'/>
                        {reactionOptions.map((option, idx) => {return(<ReactionSlider title={option.title} score={option.score} key={idx} />)})}
                    </InformationDivision>
                </FunctionContainer>
                <DetailContainer id='p-detail'>
                    {detailImages.length !== 0 ? detailImages.map((img, idx) => { return(<DetailImg src={img} key={idx}/>) }) : <><NoDetailImg src='/images/image/no_item.png' /><NoDetailImgText>이 제품은 상세이미지가 없어요</NoDetailImgText></>}
                </DetailContainer>
                <ReviewContainer id='p-review'>
                    <SubTitle subtitle='리뷰'/>
                    <InformationDivision>
                    {reviewInformationArr.map((information, idx) => {return(<ReviewInfo text={information} key={idx}/>)})}
                        {reviewArr.map((review, idx) => {return(<Review detailId={detailId} review={review} key={idx}/>)})}
                    </InformationDivision>
                </ReviewContainer>
            </ProductContent>
        </ProductContainer>
        <Container><Button rotate={true} onClick={() => navigateReviewWritePage()}  styles={{backgroundColor: lightColors.white, position: 'absolute', right: '-30px', bottom: '-65px'}}><FloatingButtonImg alt="" src='/images/icon/review_write_icon.png'/></Button></Container>
        </>
        )
}