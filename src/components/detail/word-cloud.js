import styled from 'styled-components'

const CardWrapper = styled.div`
  width: 300px;
`

const Title = styled.div`
  font-size: 16px;
  color: #4d4d4d;
  margin: 10px 20px;
  padding-left: 5px;
`

const ImageWrapper = styled.div`
  margin: 10px;
`

const CloudImage = styled.img`
  width: 100%;
`

export default function WordCloud({ data }) {
  return (
    <>
      <CardWrapper>
        <Title>{data.type}</Title>
        <ImageWrapper>
          <CloudImage src={data.cloud_image} />
        </ImageWrapper>
      </CardWrapper>
    </>
  )
}
