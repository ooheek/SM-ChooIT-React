import styled from 'styled-components'

const FuncStarWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(30%, auto));
  row-gap: 5px;
  margin: 10px;
`

const FuncStarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
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

export default function ProductFuncRate({
  product,
  productRate,
  setProductRate,
}) {
  function clickFuncRate(id, index, score) {
    setProductRate((prev) => {
      const originalScore = prev.find((p) => p.id === id)
      const restScores = prev.filter((p) => p.id !== id)

      if (originalScore) {
        originalScore[`func${index}_rate`] = score
      }
      console.log(restScores)

      return [originalScore, ...restScores]
    })
    console.log(productRate)
  }
  return (
    <>
      <FuncStarWrapper>
        {[1, 2, 3].map((idx) => {
          return (
            <FuncStarContainer key={idx}>
              <FuncStarLabel>기능 {idx}</FuncStarLabel>
              <FuncStarScore
                onClick={() => clickFuncRate(product.id, idx, 'g')}
              >
                {/* !!!!map 도는 product가 productRate이어야 할 듯 */}
                {product[`func${idx}_rate`] === 'g' ? '👍' : '👍🏻'}
              </FuncStarScore>
              <FuncStarScore
                onClick={() => clickFuncRate(product.id, idx, 's')}
              >
                {product[`func${idx}_rate`] === 's' ? '✊' : '✊🏻'}
              </FuncStarScore>
              <FuncStarScore
                onClick={() => clickFuncRate(product.id, idx, 'b')}
              >
                {product[`func${idx}_rate`] === 'b' ? '👎' : '👎🏻'}
              </FuncStarScore>
            </FuncStarContainer>
          )
        })}
      </FuncStarWrapper>
    </>
  )
}
