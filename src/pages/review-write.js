import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/commons/header'
import ProductInfo from '../components/commons/product-info'
import FuncStarInput from '../components/review-write/func-star-input'
import ReviewContentWrite from '../components/review-write/review-content-write'
import ThumbnailUpload from '../components/review-write/thumbnail-upload'
import ReviewTag from '../components/review-write/review-tag'
import { GetProduct, GetTagData, ReviewUpload } from '../services'

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

export default function ReviewWrite() {
  const [reviewTitleInput, setReviewTitleInput] = useState(false)

  const { id } = useParams()
  const trueId = id.substr(1, id.length)
  const [review, setReview] = useState({
    func1_rate: 's',
    func2_rate: 's',
    func3_rate: 's',
  })

  function checkTitleInput(e) {
    if (e.target.value.length > 2) {
      setReviewTitleInput(true)
    }
  }

  const [productData, setProductData] = useState({})

  async function getProductData(productNum) {
    const result = await GetProduct(productNum)
    return result
  }

  useEffect(() => {
    // 1. 리뷰 데이터 불러오기
    // 2. useState에 넣기
    ;(async () => {
      const productResult = await getProductData(trueId)

      setProductData(productResult)
    })() // 상품 번호 가져오기 // 리뷰 번호 가져오기
  }, [trueId])
  console.log(productData)

  // function checkContentInput(e) {
  //     if(e.target.value.length > 5) {
  //         setReviewContentInput(true)
  //         console.log(reviewContentInput)
  //     }
  // }
  async function onSave() {
    // images 리스트 보낼 때
    // const imgList = window.sessionStorage.getItem('_img_no')
    // let reviewImgNo = []

    // if (imgList) {
    //   const imageList = JSON.parse(imgList)
    //   reviewImgNo = imageList.reduce((prev, curr) => {
    //     return review.review_text.includes(curr.img_path)
    //       ? [...prev, curr.img_no]
    //       : prev
    //   }, [])
    // }

    const finalReview = {
      ...review,
      prod_no: Number(trueId),
      // review_img_thumbnail: review.images?.thumbnail,
      // images: {
      //   review_img_no: reviewImgNo,
      //   thumbnail: review.images?.thumbnail,
      // },
    }

    const result = await ReviewUpload(finalReview)

    if (result) {
      alert('리뷰가 등록되었습니다!')
    }
  }

  // 태그 데이터 가져오기
  const [tagData, setTagData] = useState([])

  async function getTagData(productNum) {
    const result = await GetTagData(productNum)
    return result
  }

  useEffect(() => {
    // 1. 리뷰 데이터 불러오기
    // 2. useState에 넣기
    ;(async () => {
      const tagResult = await getTagData()
      const tagData = tagResult.data

      const newTagData = tagData.reduce((prev, curr) => {
        curr.id = curr.tag_code
        delete curr.tag_code

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
        change={reviewTitleInput ? 'activate' : ''}
        onExtraButtonClick={reviewTitleInput ? () => onSave() : null}
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
          />
          <ReviewWriteInfo>
            각 기능들에 대해 평점을 선택해주세요
          </ReviewWriteInfo>
          <ReviewWriteInfo>👍 : 좋음 ✊ : 보통 👎 : 실망</ReviewWriteInfo>
          <FuncStarInput review={review} setReview={setReview} />
          <ThumbnailUpload setReview={setReview} />
          <ReviewContentWrite setReview={setReview} />
        </ReviewInputContainer>
        <ReviewTag tagData={tagData} setReview={setReview} />
      </ProductContainer>
    </>
  )
}
