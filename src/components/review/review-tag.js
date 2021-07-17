import styled from 'styled-components'

const ReviewTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const ReViewTagText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ff4f00;
  margin-right: 10px;
`

export default function ReviewTag({ tags }) {
  return (
    <>
      <ReviewTagContainer>
        {tags && tags.length !== 0
          ? tags.map((tag, idx) => {
              return <ReViewTagText key={idx}>#{tag}</ReViewTagText>
            })
          : ''}
      </ReviewTagContainer>
    </>
  )
}
