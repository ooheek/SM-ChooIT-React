// import { useEffect } from "react";
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/commons/header'
import ReviewUserInfo from '../components/commons/review-user-info'
import FuncStar from '../components/review/func-star'
import ReviewTag from '../components/review/review-tag'
import ReviewTitle from '../components/review/review-title'
import { DeleteReview, GetReviewDetail } from '../services'

const ReviewContainer = styled.div`
  padding-top: 55px;
  overflow: scroll;
`

const ReviewContentContainer = styled.div`
  text-align: center;
`

// const ReviewContentText = styled.div`
//   text-align: left;
//   font-size: 16px;
//   color: #4e4e4e;
//   margin: 10px 30px;
//   word-break: keep-all;
// `

const ReviewContentImg = styled.img`
  width: 184px;
  height: 184px;
  margin: 20px;
  object-fit: cover;
`

const ReviewText = styled.div`
  .fig {
    overflow: hidden;
  }
  .img {
    object-fit: contain;
    width: 100%;
  }
`

export default function Review() {
  const { id, reviewId } = useParams()

  const [review, setReview] = useState({})

  useEffect(() => {
    ;(async () => {
      const reviewDetailResult = await GetReviewDetail(reviewId)
      setReview(reviewDetailResult)
    })()
  }, [reviewId])

  let reviewText = review.review_text

  if (reviewText && reviewText !== 0) {
    if (reviewText.includes('img')) {
      reviewText = reviewText.replace('figure', "figure class='fig'")
      reviewText = reviewText.replace('img', "img class='img'")
    }
  }
  console.log(reviewText)

  const myUserId = review.user_no

  const history = useHistory()

  function navigateAfterDelete() {
    history.push({
      pathname: `/detail/${id}/`,
    })
  }

  async function reviewDelete() {
    const reviewDeleteResult = await DeleteReview(reviewId)
    console.log(reviewDeleteResult)

    // !!!!-리뷰 삭제 성공 이후 페이지 이동
    if (reviewDeleteResult.status !== 'success') {
      alert('리뷰 삭제에 실패했어요:(')
    } else {
      alert('리뷰를 삭제했습니다:)')
      navigateAfterDelete()
    }
  }

  return (
    <>
      <Header
        title="제품 리뷰 상세보기"
        extraButton={review.userId === myUserId ? '삭제' : null}
        change={true}
        onExtraButtonClick={() => reviewDelete()}
        webBack={true}
      />
      <ReviewContainer>
        <ReviewTitle title={review.review_title} />
        <ReviewUserInfo review={review} />
        <ReviewTag tags={review.review_tags} />
        {[review.func1_rate, review.func2_rate, review.func3_rate].map(
          (score, idx) => {
            return (
              <FuncStar label={`기능 ${idx + 1}`} score={score} key={idx} />
            )
          },
        )}
        <ReviewContentContainer>
          {review.thumbnail_detail ? (
            <ReviewContentImg src={review.thumbnail_detail.img_path} />
          ) : (
            ''
          )}

          {/* 3. 데이터 이렇게 넣기 */}
          <ReviewText dangerouslySetInnerHTML={{ __html: reviewText }} />
        </ReviewContentContainer>
      </ReviewContainer>
    </>
  )
}
