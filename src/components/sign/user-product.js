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
  min-height: 277px;
  margin-bottom: 20px;
  overflow: scroll;
`

const ProductDiv = styled.div`
  width: (100% - 2px);
  margin: 15px 0;
  padding-left: 1px;
  min-height: 110px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
`

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 10px;
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default function UserProduct({ userData }) {
  const [userProduct, setUserProduct] = useState({
    email: userData.email,
    products: [
      {
        name: '노트북',
        img: '',
        func1_rate: 's',
        func2_rate: 's',
        func3_rate: 's',
      },
      {
        name: '노트북',
        img: '',
        func1_rate: 's',
        func2_rate: 's',
        func3_rate: 's',
      },
    ],
  })
  const handleOnSelect = (item) => {
    // item으로 제품 검색해서 이름이랑 사진 불러오기
    setUserProduct((prev) => [...prev, item])
    console.log(item)
  }

  async function onProductSubmit() {
    const result = await SignInUserProduct(userProduct)
    if (result.status === 'success') {
      // ios 메인 페이지로 이동
      console.log(result.status)
    } else {
      alert('회원가입에 문제가 생겼어요:(')
    }
  }
  const mockProduct = [
    {
      name: '노트북',
      img: '',
    },
    {
      name: '노트북',
      img: '',
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
            <ProductName>{product.name}</ProductName> {product.img}
            <ProductFuncRate review={userProduct}></ProductFuncRate>
          </ProductDiv>
        ))}
      </ProductWrapper>
      <Button text="회원가입 완료" color={'true'} onClick={onProductSubmit} />
      <Button text="건너뛰기" onClick={onProductSubmit} />
    </>
  )
}
