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

export default function FuncStarInput({ review, setReview }) {
  return (
    <>
      {[1, 2, 3].map((idx) => {
        return (
          <FuncStarContainer key={idx}>
            <FuncStarLabel>기능 {idx}</FuncStarLabel>
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
