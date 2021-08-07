import styled from 'styled-components'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState } from 'react'

import Button from './button'
import { SignInUserProduct } from '../../services'
import ProductFuncRate from './productFuncRate'

const SearchBar = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 30px;
`

const ProductWriteInfo = styled.div`
  font-size: 18px;
  color: #4d4d4d;
  margin-top: 3px;
`
const ProductWrapper = styled.div`
  max-height: 400px;
  margin-bottom: 20px;
  overflow: scroll;
`

const ProductDiv = styled.div`
  width: (100% - 2px);
  margin: 15px 0;
  padding-left: 1px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
`

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #4d4d4d;
  margin: 15px 0 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
  object-fit: cover;
`
const ProductInfoWrapper = styled.div`
  display: flex;
`

export default function UserProduct({ userData }) {
  const [userProduct, setUserProduct] = useState({
    email: '',
    product: [
      {
        name: '노트북112938192832190841290842109',
        id: 1,
        img: '',
        func1_rate: 's',
        func2_rate: 's',
        func3_rate: 's',
      },
      {
        name: '노트북2',
        id: 2,
        img: '',
        func1_rate: 's',
        func2_rate: 's',
        func3_rate: 's',
      },
    ],
  })
  console.log(userProduct) // 지금 userProduct는 최종 보내는 거, productRate은 product 리스트만
  const [productRate, setProductRate] = useState([
    {
      name: '노트북112938192832190841290842109',
      id: 1,
      img: '',
      func1_rate: 's',
      func2_rate: 's',
      func3_rate: 's',
    },
    {
      name: '노트북2',
      id: 2,
      img: '',
      func1_rate: 's',
      func2_rate: 's',
      func3_rate: 's',
    },
  ])

  const handleOnSelect = (item) => {
    // item으로 제품 검색해서 이름이랑 사진 불러오기
    setUserProduct((prev) => [...prev, item])
    console.log(item)
  }

  async function onProductSubmit() {
    const finalUserProduct = {
      product: productRate,
      email: userData.email,
    }
    const result = await SignInUserProduct(finalUserProduct)
    if (result.status === 'success') {
      // ios 메인 페이지로 이동
      console.log(result.status)
    } else {
      alert('제품 등록에 문제가 생겼어요:(')
    }
  }
  // 제품 검색 api로 제품 검색해서 정보 받아오기 받아와서 바로 setUserProduct 해주기
  const mockProduct = [
    {
      name: '노트북112938192832190841290842109',
      id: 1,
      img: '',
      func1_rate: 's',
      func2_rate: 's',
      func3_rate: 's',
    },
    {
      name: '노트북2',
      id: 2,
      img: '',
      func1_rate: 's',
      func2_rate: 's',
      func3_rate: 's',
    },
  ]

  return (
    <>
      <ProductWriteInfo>각 기능들에 대해 평점을 선택해주세요</ProductWriteInfo>
      <ProductWriteInfo>👍 : 좋음 ✊ : 보통 👎 : 실망</ProductWriteInfo>
      <SearchBar>
        <ReactSearchAutocomplete
          items={[
            {
              name: 'test1',
              id: 1,
            },
            {
              name: 'test2',
              id: 2,
            },
          ]}
          onSelect={handleOnSelect}
          autofocus
          styling={{
            height: '35px',
            borderRadius: '0',
          }}
        />
      </SearchBar>
      <ProductWrapper>
        {mockProduct.map((product, idx) => (
          <ProductDiv key={idx}>
            <ProductName>
              {product.name.length > 18
                ? product.name.slice(0, 18) + '...'
                : product.name}
            </ProductName>
            <ProductInfoWrapper>
              <ProductImage
                src={
                  product.img.length !== 0
                    ? product.img
                    : '/images/image/no_review_photo.png'
                }
                alt=""
              ></ProductImage>
              <ProductFuncRate
                product={product}
                productRate={productRate}
                setProductRate={setProductRate}
              ></ProductFuncRate>
            </ProductInfoWrapper>
          </ProductDiv>
        ))}
      </ProductWrapper>
      <Button text="회원가입 완료" color={'true'} onClick={onProductSubmit} />
      <Button text="건너뛰기" onClick={alert('ios)메인화면으로')} />
    </>
  )
}
