import styled from 'styled-components'

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #4d4d4d;
  &.hide {
    transform: translateY(-80px);
  }
`

const ProductImgContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  padding: 6px 6px 12px 6px;
`

const ProductImg = styled.img`
  width: 100%;
`

const ProductCompany = styled.div`
  font-size: 13px;
  padding: 5px;
`

const ProductPrice = styled.div`
  font-size: 16px;
  padding: 2px;
`

export default function ProductInfo({ product, images }) {
  return (
    <ProductInfoContainer>
      <ProductImgContainer>
        {images && images.length !== 0 ? (
          images.map((img, idx) => {
            return (
              <ProductImg
                src={img.prod_is_thumbnail ? img.prod_img_path : ''}
                alt=""
                key={idx}
              />
            )
          })
        ) : (
          <ProductImg src="/images/image/no_review_photo.png" alt="" />
        )}
      </ProductImgContainer>
      <ProductCompany>{product.prod_manufacturer}</ProductCompany>
      <ProductPrice>가격 {product.prod_price}</ProductPrice>
    </ProductInfoContainer>
  )
}
