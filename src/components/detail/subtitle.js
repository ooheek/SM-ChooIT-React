import styled from 'styled-components'

const SubTitleContainer = styled.div`
  font-size: 16px;
  color: #4d4d4d;
  font-weight: 600;
  margin: 10px 20px 20px 20px;
`

export default function SubTitle({ subtitle }) {
  return <SubTitleContainer>{subtitle}</SubTitleContainer>
}
