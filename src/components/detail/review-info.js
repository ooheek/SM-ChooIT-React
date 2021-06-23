import styled from 'styled-components'

const ReviewInfoText = styled.div`
  font-size: 16px;
  color: #4d4d4d;
  margin: 10px 30px;
`
export default function ReviewInfo({ text }) {
  return (
    <>
      <ReviewInfoText>{text}</ReviewInfoText>
    </>
  )
}
