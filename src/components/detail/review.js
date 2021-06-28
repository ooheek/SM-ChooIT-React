import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import ReviewUserInfo from '../commons/review-user-info'

const ReviewContainer = styled.div`
  margin: 20px 10px;
`

const ReviewColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewInformationContainer = styled.div`
  margin: 15px;
  flex: 1;
  display: flex;
  flex-direction: row;
`

const ReviewThumbnail = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
`

const ReviewContentContainer = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
`

const ReviewTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  flex: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ReviewContent = styled.div`
  font-size: 14px;
  flex: 1;
  padding: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: normal;
  word-break: keep-all;
`

const ReviewTag = styled.div`
  font-size: 12px;
  width: calc(100% - 40px);
  flex: none;
  color: #4e4e4e;
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default function Review({ productId, review }) {
  const history = useHistory()
  function navigateReviewDetailPage() {
    history.push({
      pathname: `/detail/:${productId}/review/:${review.reviewId}`,
      state: { review: review },
    })
  }

  return (
    <>
      <ReviewContainer
        onClick={() => {
          navigateReviewDetailPage()
        }}
      >
        <ReviewUserInfo review={review} />

        <ReviewColumnContainer>
          <ReviewInformationContainer>
            <ReviewThumbnail
              src={
                review.reviewThumbnailImgUrl
                  ? review.reviewThumbnailImgUrl
                  : '/images/image/no_review_photo.png'
              }
              alt=""
            ></ReviewThumbnail>
            <ReviewContentContainer>
              <ReviewTitle>{review.review_title}</ReviewTitle>
              <ReviewContent>{review.review_text}</ReviewContent>
            </ReviewContentContainer>
          </ReviewInformationContainer>
          <ReviewTag>{review.review_tag}</ReviewTag>
          {/* 리뷰 태그 데이터 추가 */}
        </ReviewColumnContainer>
      </ReviewContainer>
    </>
  )
}
