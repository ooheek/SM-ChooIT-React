import { useEffect, useState } from 'react'
import styled from 'styled-components'

const FuncStarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
`

const FuncStarLabel = styled.div`
  font-size: 16px;
  width: 42px;
  font-weight: 600;
  color: #ff4f00;
  margin-right: 10px;
`

const FuncStarScore = styled.div`
  font-size: 16px;
  line-height: 16px;
  padding-left: 20px;
`

export default function FuncStarInput({ review, setReview, productCategory }) {
  const [funcName, setFuncName] = useState('')

  function checkCategoryFunc(categoryName) {
    if (categoryName === '노트북') {
      setFuncName(['성능', '발열', '무게'])
    } else if (categoryName === '키보드') {
      setFuncName(['키감', '소음', '가격대비'])
    } else if (categoryName === '마우스') {
      setFuncName(['사용감', '소음', '가격대비'])
    }
  }

  useEffect(() => {
    checkCategoryFunc(productCategory)
  }, [productCategory])

  return (
    <>
      {[1, 2, 3].map((idx) => {
        return (
          <FuncStarContainer key={idx}>
            <FuncStarLabel>{funcName[idx - 1]}</FuncStarLabel>
            <FuncStarScore
              onClick={() =>
                setReview((prev) => ({
                  ...prev,
                  [`func${idx}_rate`]: 'g',
                }))
              }
            >
              {review[`func${idx}_rate`] === 'g' ? '👍' : '👍🏻'}
            </FuncStarScore>
            <FuncStarScore
              onClick={() =>
                setReview((prev) => ({
                  ...prev,
                  [`func${idx}_rate`]: 's',
                }))
              }
            >
              {review[`func${idx}_rate`] === 's' ? '✊' : '✊🏻'}
            </FuncStarScore>
            <FuncStarScore
              onClick={() =>
                setReview((prev) => ({
                  ...prev,
                  [`func${idx}_rate`]: 'b',
                }))
              }
            >
              {review[`func${idx}_rate`] === 'b' ? '👎' : '👎🏻'}
            </FuncStarScore>
          </FuncStarContainer>
        )
      })}
    </>
  )
}
