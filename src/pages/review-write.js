import { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/commons/header'
import ProductInfo from '../components/commons/product-info'
import FuncStarInput from '../components/review-write/func-star-input'
import ReviewContentWrite from '../components/review-write/review-content-write'
import ThumbnailUpload from '../components/review-write/thumbnail-upload'
import ReviewTag from '../components/review-write/review-tag'
import {
  GetProduct,
  GetReviewDetail,
  GetTagData,
  ReviewUpload,
} from '../services'

const ProductContainer = styled.div`
  padding-top: 55px;
  overflow: scroll;
`

const ReviewInputContainer = styled.div`
  margin: 10px 20px;
`

const ReviewTitleInput = styled.input`
  width: 100%;
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

export default function ReviewWrite() {
  const [reviewInput, setReviewInput] = useState({
    title: false,
    tag: false,
    thumbnail: false,
  })

  const { id, reviewId } = useParams()
  const [review, setReview] = useState({
    func1_rate: 's',
    func2_rate: 's',
    func3_rate: 's',
    review_tags: [],
  })

  const location = useLocation()
  const token = location.state.token

  useEffect(() => {
    if (reviewId) {
      // 리뷰조회
      // setReview()
      ;(async () => {
        const reviewDetailResult = await GetReviewDetail(reviewId)

        setReview(reviewDetailResult)
      })()
    }
  }, [reviewId])

  function checkTitleInput(e) {
    if (e.target.value.length > 2) {
      setReviewInput({ ...reviewInput, title: true })
    } else {
      setReviewInput({ ...reviewInput, title: false })
    }
  }

  const [productData, setProductData] = useState({})
  const history = useHistory()

  function navigateReviewDetailPage(review_no, token) {
    history.push({
      pathname: `/detail/${id}/review/${review_no}/${token}`,
    })
  }

  useEffect(() => {
    // 1. 리뷰 데이터 불러오기
    // 2. useState에 넣기
    ;(async () => {
      const productResult = await GetProduct(id, token)

      setProductData(productResult)
    })() // 상품 번호 가져오기 // 리뷰 번호 가져오기
  }, [id, token])
  console.log(productData)

  async function onSave() {
    const finalReview = {
      ...review,
      prod_no: Number(id),
    }

    const result = await ReviewUpload(finalReview, token)

    if (result.status === 'success') {
      alert('리뷰가 등록되었습니다!')
      // 리뷰 상세보기 페이지로 이동
      navigateReviewDetailPage(result.data.review_no, token)
    } else {
      alert('리뷰 등록에 실패했습니다:(')
    }
  }

  // 태그 데이터 가져오기
  const [tagData, setTagData] = useState([])

  useEffect(() => {
    ;(async () => {
      const tagResult = await GetTagData()
      const tagData = tagResult.data

      const newTagData = tagData.reduce((prev, curr) => {
        curr.name = curr.tag_text
        delete curr.tag_text

        console.log(curr)
        return [...prev, curr]
      }, [])

      setTagData(newTagData)
    })()
  }, [])
  console.log(tagData)

  const images = productData.prod_images

  return (
    <>
      <Header
        title={productData.prod_name}
        extraButton="등록"
        change={
          reviewInput.title && reviewInput.tag && reviewInput.thumbnail
            ? 'activate'
            : ''
        }
        onExtraButtonClick={
          reviewInput.title && reviewInput.tag && reviewInput.thumbnail
            ? () => onSave()
            : null
        }
        webBack={true}
      />
      <ProductContainer>
        <ProductInfo product={productData} images={images} />
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
            value={review.review_title}
          />
          <ReviewWriteInfo>
            각 기능들에 대해 평점을 선택해주세요
          </ReviewWriteInfo>
          <ReviewWriteInfo>👍 : 좋음 ✊ : 보통 👎 : 실망</ReviewWriteInfo>
          <FuncStarInput
            review={review}
            setReview={setReview}
            productCategory={productData?.prod_category}
          />
          <ThumbnailUpload
            setReview={setReview}
            review={review}
            setReviewInput={setReviewInput}
            token={token}
          />
          <ReviewContentWrite
            setReview={setReview}
            review={review}
            token={token}
          />
        </ReviewInputContainer>
        <ReviewTag
          tagData={tagData}
          setReview={setReview}
          setReviewInput={setReviewInput}
        />
      </ProductContainer>
    </>
  )
}
