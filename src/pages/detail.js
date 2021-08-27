// import { useEffect } from "react";
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/commons/header'
import ProductInfo from '../components/commons/product-info'
import DetailFloatingButton from '../components/detail/detail-floating-button'
import OptionSlider from '../components/detail/option-slider'
// import PreferencePopup from '../components/detail/preference-popup'
import ReactionSlider from '../components/detail/reaction-slider'
import Review from '../components/detail/review'
import ReviewInfo from '../components/detail/review-info'
import SubTitle from '../components/detail/subtitle'
import Tab from '../components/detail/tab'
import { GetReview, GetProduct } from '../services'
// import { fetchItem } from "../services";

const ProductContainer = styled.div`
  padding-top: 55px;
  overflow: scroll;
`

const ProductContent = styled.div`
  position: relative;
`

const ProductTabArea = styled.div`
  position: relative;
  width: 100%;
  height: 245px;
`

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
`

const FunctionContainer = styled.div`
  margin: 20px 0;
`

const DetailContainer = styled.div`
  margin: 15px 40px;
  min-height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DetailImg = styled.img`
  width: 100%;
`

const NoDetailImg = styled.img`
  width: 120px;
`
const NoDetailImgText = styled.div`
  font-size: 16px;
  color: #dedede;
  margin-top: 15px;
`

const ReviewContainer = styled.div``

const InformationDivision = styled.div`
  margin-bottom: 35px;
`

const NoReviewImageContainer = styled.div`
  margin: 15px 40px;
  min-height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function throttle(callback, waitTime) {
  let timerId = null
  return (e) => {
    if (timerId) {
      return
    }
    timerId = setTimeout(() => {
      callback.call(this, e)
      timerId = null
    }, waitTime)
  }
}

// const detailImages = [
//   '/mock-images/product-detail-info/image_1.jpg',
//   '/mock-images/product-detail-info/image_2.jpg',
//   '/mock-images/product-detail-info/image_3.jpg',
//   '/mock-images/product-detail-info/image_4.jpg',
//   '/mock-images/product-detail-info/image_5.jpg',
//   '/mock-images/product-detail-info/image_6.jpg',
//   '/mock-images/product-detail-info/image_7.jpg',
// ]
// const detailImages = []
// 상세 옵션
const options = [
  {
    title: '휴대성',
    score: 5,
    description: '어깨가 끊어질 수도 있어요! 💪',
  },
  {
    title: '소음',
    score: 2,
    description: '옆에서 두들겨도 꿈나라 가능! 😴',
  },
]

// 리뷰 설명
const reviewInformationArr = [
  '🔥 지난 한 달 간 검색 상위 10%',
  '🔕 무소음 선호하는 제품',
  '️💻 개발자가 선호하는 제품',
]

export default function Detail() {
  const { id } = useParams()

  // useEffect(() => {
  //     fetchItem()
  // }, [])
  const [hide, setHide] = useState(false)
  const [pageY, setPageY] = useState(0)
  const fLocationRef = useRef()
  const dLocationRef = useRef()
  const rLocationRef = useRef()

  const [location, setLocation] = useState('fLocation')
  // 스크롤 감지 헤더 사라지기 + 탭 색상 변경
  function handleScroll() {
    const { pageYOffset } = window
    const deltaY = pageYOffset - pageY
    const hide = pageYOffset !== 0 && deltaY >= 0
    setHide(hide)
    setPageY(pageYOffset)

    // const deltaY = pageYOffset - pageY;
    if (
      pageYOffset !== 0 &&
      pageYOffset >= 0 &&
      pageYOffset < dLocationRef.current?.offsetTop
    ) {
      setLocation('fLocation')
    } else if (
      pageYOffset !== 0 &&
      pageYOffset >= dLocationRef.current?.offsetTop &&
      pageYOffset < rLocationRef.current?.offsetTop
    ) {
      setLocation('dLocation')
    } else if (
      pageYOffset !== 0 &&
      pageYOffset >= rLocationRef.current?.offsetTop
    ) {
      setLocation('rLocation')
    }
  }

  function moveLocation(clickLocation) {
    let top = 0
    if (clickLocation === 'fLocation') {
      top = fLocationRef.current.offsetTop
    } else if (clickLocation === 'dLocation') {
      top = dLocationRef.current.offsetTop
    } else if (clickLocation === 'rLocation') {
      top = rLocationRef.current.offsetTop
    }
    window.scrollTo({ top: top, behavior: 'smooth' })
  }

  const throttleScroll = throttle(handleScroll, 50)

  useEffect(() => {
    document.addEventListener('scroll', throttleScroll)
    return () => document.removeEventListener('scroll', throttleScroll)
  }, [throttleScroll])

  // 제품 상세 불러오기
  const [productData, setProductData] = useState({})
  // 리뷰 목록 불러오기
  const [reviewData, setReviewData] = useState([])

  useEffect(() => {
    // 1. 리뷰 데이터 불러오기
    // 2. useState에 넣기
    ;(async () => {
      const productResult = await GetProduct(id)
      const reviewResult = await GetReview(id)

      setProductData(productResult)
      setReviewData(reviewResult.data)
    })() // 상품 번호 가져오기 // 리뷰 번호 가져오기
  }, [id])

  const images = productData.prod_images

  setTimeout(function () {
    console.log('10초!')
  }, 10000)

  return (
    <>
      <Header title={productData.prod_name} />
      <ProductContainer>
        <ProductTabArea>
          <ProductTabContainer className={hide && 'hide'}>
            <ProductInfo product={productData} images={images} />
            <Tab location={location} moveLocation={moveLocation} />
          </ProductTabContainer>
        </ProductTabArea>
        <ProductContent>
          <FunctionContainer ref={fLocationRef}>
            <InformationDivision>
              <SubTitle subtitle="제품 상세 옵션" />
              {options.map((option, idx) => (
                <OptionSlider
                  title={option.title}
                  score={option.score}
                  description={option.description}
                  key={idx}
                />
              ))}
            </InformationDivision>
            <InformationDivision>
              <SubTitle
                subtitle={`이 제품은 ${productData.prod_preference}%의 사용자가 만족했어요`}
              />
              <ReactionSlider score={productData.prod_preference} />
            </InformationDivision>
          </FunctionContainer>
          <DetailContainer ref={dLocationRef}>
            {images && images.length !== 0 ? (
              images.map((img, idx) => {
                return (
                  <DetailImg
                    src={!img.prod_is_thumbnail ? img.prod_img_path : ''}
                    key={idx}
                  />
                )
              })
            ) : (
              <>
                <NoDetailImg src="/images/image/no_item.png" />
                <NoDetailImgText>이 제품은 상세이미지가 없어요</NoDetailImgText>
              </>
            )}
          </DetailContainer>
          <ReviewContainer ref={rLocationRef}>
            <SubTitle subtitle="리뷰" />
            <InformationDivision>
              {reviewInformationArr.map((information, idx) => {
                return <ReviewInfo text={information} key={idx} />
              })}
              {reviewData && reviewData.length === 0 ? (
                <NoReviewImageContainer>
                  <NoDetailImg src="/images/image/no_item.png" />
                  <NoDetailImgText>이 제품은 리뷰가 없어요</NoDetailImgText>
                  <NoDetailImgText>리뷰를 적어주세요!</NoDetailImgText>
                </NoReviewImageContainer>
              ) : (
                reviewData.map((review, idx) => (
                  <Review
                    productId={productData.prod_no}
                    review={review}
                    key={idx}
                  />
                ))
              )}
            </InformationDivision>
          </ReviewContainer>
        </ProductContent>
      </ProductContainer>
      <DetailFloatingButton favoriteProd={productData?.is_favorite_prod} />
    </>
  )
}
