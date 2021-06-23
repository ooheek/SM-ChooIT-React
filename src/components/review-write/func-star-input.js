import { useState } from 'react'
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

export default function FuncStarInput() {
  const [func1ClickedBtn, setFunc1ClickedBtn] = useState(0)
  const [func2ClickedBtn, setFunc2ClickedBtn] = useState(0)
  const [func3ClickedBtn, setFunc3ClickedBtn] = useState(0)

  return (
    <>
      <FuncStarContainer>
        <FuncStarLabel>기능 1</FuncStarLabel>
        <FuncStarScore onClick={() => setFunc1ClickedBtn(0)}>
          {func1ClickedBtn === 0 ? '👍' : '👍🏻'}
        </FuncStarScore>
        <FuncStarScore onClick={() => setFunc1ClickedBtn(1)}>
          {func1ClickedBtn === 1 ? '✊' : '✊🏻'}
        </FuncStarScore>
        <FuncStarScore onClick={() => setFunc1ClickedBtn(2)}>
          {func1ClickedBtn === 2 ? '👎' : '👎🏻'}
        </FuncStarScore>
      </FuncStarContainer>
      <FuncStarContainer>
        <FuncStarLabel>기능 2</FuncStarLabel>
        <FuncStarScore onClick={() => setFunc2ClickedBtn(0)}>
          {func2ClickedBtn === 0 ? '👍' : '👍🏻'}
        </FuncStarScore>
        <FuncStarScore onClick={() => setFunc2ClickedBtn(1)}>
          {func2ClickedBtn === 1 ? '✊' : '✊🏻'}
        </FuncStarScore>
        <FuncStarScore onClick={() => setFunc2ClickedBtn(2)}>
          {func2ClickedBtn === 2 ? '👎' : '👎🏻'}
        </FuncStarScore>
      </FuncStarContainer>
      <FuncStarContainer>
        <FuncStarLabel>기능 3</FuncStarLabel>
        <FuncStarScore onClick={() => setFunc3ClickedBtn(0)}>
          {func3ClickedBtn === 0 ? '👍' : '👍🏻'}
        </FuncStarScore>
        <FuncStarScore onClick={() => setFunc3ClickedBtn(1)}>
          {func3ClickedBtn === 1 ? '✊' : '✊🏻'}
        </FuncStarScore>
        <FuncStarScore onClick={() => setFunc3ClickedBtn(2)}>
          {func3ClickedBtn === 2 ? '👎' : '👎🏻'}
        </FuncStarScore>
      </FuncStarContainer>
    </>
  )
}
