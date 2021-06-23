import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/commons/header'
import ProductInfo from '../components/commons/product-info'
import FuncStarInput from '../components/review-write/func-star-input'
import ReviewContentWrite from '../components/review-write/review-content-write'
import ThumbnailUpload from '../components/review-write/thumbnail-upload'
import { ReviewUpload } from '../services'

const ProductContainer = styled.div`
  padding-top: 55px;
  overflow: scroll;
`

const ReviewInputContainer = styled.div`
  margin: 10px 20px;
`

const ReviewTitleInput = styled.input`
  font-size: 18px;
  color: #4d4d4d;
  border: none;
  :focus {
    outline: none;
  }
  margin-bottom: 5px;
`

const ReviewWriteInfo = styled.div`
  font-size: 14px;
  color: #4d4d4d;
  margin-top: 3px;
`

const ReviewTagInputContainer = styled.div`
  margin: 10px 20px;
`

const SearchBar = styled.div`
  width: calc(100% - 20px);
  margin: 0 auto;
  margin-top: 10px;
  height: 26px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  display: flex;
`

const SearchIconWrapper = styled.div`
  width: 22px;
  height: 22px;
`

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`

const SearchText = styled.input`
  width: 90%;
  padding: 1%;
  padding-left: 10px;
  border: none;
  :focus {
    outline: none;
  }
`
const ReviewTagContainer = styled.div`
  margin: 15px;
  width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: normal;
`

const ReviewTagText = styled.span`
  font-size: 14px;
  width: 42px;
  font-weight: 600;
  color: #ff4f00;
  margin-right: 10px;
`

export default function ReviewWrite() {
  const reviewTagArr = [
    '#디자인',
    '#심플',
    '#컬러',
    '#가벼움',
    '#조금비쌈',
    '#케이스추천',
    '#사랑',
  ]
  const [reviewTitleInput, setReviewTitleInput] = useState(false)

  const { id } = useParams()
  const [review, setReview] = useState({
    func1_rate: 'g',
    func2_rate: 'g',
    func3_rate: 'g',
  })

  function checkTitleInput(e) {
    if (e.target.value.length > 2) {
      setReviewTitleInput(true)
      console.log(reviewTitleInput)
    }
  }

  // function checkContentInput(e) {
  //     if(e.target.value.length > 5) {
  //         setReviewContentInput(true)
  //         console.log(reviewContentInput)
  //     }
  // }
  async function onSave() {
    const imgList = window.sessionStorage.getItem('_img_no')
    let reviewImgNo = []

    if (imgList) {
      const imageList = JSON.parse(imgList)
      reviewImgNo = imageList.reduce((prev, curr) => {
        return review.review_text.includes(curr.img_path)
          ? [...prev, curr.img_no]
          : prev
      }, [])
      console.log(reviewImgNo)
    }

    const finalReview = {
      ...review,
      prod_id: id,
      images: {
        review_img_no: reviewImgNo,
        thumbnail: review.images?.thumbnail,
      },
    }

    const result = await ReviewUpload(finalReview)

    if (result) {
      alert('리뷰가 등록되었습니다!')
    }
  }

  return (
    <>
      <Header
        title="APPLE 2020 맥북에어"
        extraButton="등록"
        change={reviewTitleInput ? 'activate' : ''}
        onExtraButtonClick={reviewTitleInput ? () => onSave() : null}
      />
      <ProductContainer>
        <ProductInfo />
        <ReviewInputContainer>
          <ReviewTitleInput
            placeholder="리뷰 제목을 입력해주세요"
            onInput={checkTitleInput}
            onChange={(e) => {
              setReview((prev) => ({
                ...prev,
                review_title: e.target.value,
              }))
            }}
          />
          <ReviewWriteInfo>
            각 기능들에 대해 평점을 선택해주세요
          </ReviewWriteInfo>
          <ReviewWriteInfo>👍 : 좋음 ✊ : 보통 👎 : 실망</ReviewWriteInfo>
          <FuncStarInput review={review} setReview={setReview} />
          <ThumbnailUpload setReview={setReview} />
          <ReviewContentWrite setReview={setReview} />
        </ReviewInputContainer>
        <ReviewTagInputContainer>
          <ReviewWriteInfo style={{ fontWeight: '600' }}>
            제품과 어울리는 태그를 입력해주세요
          </ReviewWriteInfo>
          <ReviewWriteInfo style={{ color: '#9f9f9f', fontSize: '12px' }}>
            이 제품의 태그로
          </ReviewWriteInfo>
          <ReviewWriteInfo style={{ color: '#9f9f9f', fontSize: '12px' }}>
            #디자인 #애플 #스그 #실버 가 많아요
          </ReviewWriteInfo>
          <SearchBar>
            <SearchText />
            <SearchIconWrapper>
              <SearchIcon src="/images/icon/search_icon.png" alt="" />
            </SearchIconWrapper>
          </SearchBar>
          <ReviewTagContainer>
            {reviewTagArr.map((tag, idx) => {
              return <ReviewTagText key={idx}>{tag}</ReviewTagText>
            })}
          </ReviewTagContainer>
        </ReviewTagInputContainer>
      </ProductContainer>
    </>
  )
}
