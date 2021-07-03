import styled from 'styled-components'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useState } from 'react'

const ReviewWriteInfo = styled.div`
  font-size: 14px;
  color: #4d4d4d;
  margin-top: 3px;
`

const ReviewTagInputContainer = styled.div`
  margin: 10px 20px;
`

const SearchBar = styled.div`
  width: calc(100% - 10px);
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ReviewTagContainer = styled.div`
  margin: 15px;
  width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: normal;
`

const ReviewTagText = styled.span`
  font-size: 14px;
  width: 42px;
  font-weight: 600;
  color: #ff4f00;
  margin-right: 10px;
`

export default function ReviewTag({ tagData, setReview }) {
  const [reviewTagArr, setReviewTagArr] = useState([])

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    setReviewTagArr([...reviewTagArr, `#${item.name}`])
    setReview((prev) => ({
      ...prev,
      review_tags: prev.review_tags
        ? [...prev.review_tags, item.id]
        : [item.id],
    }))
  }

  return (
    <ReviewTagInputContainer>
      <ReviewWriteInfo style={{ fontWeight: '600' }}>
        제품과 어울리는 태그를 입력해주세요
      </ReviewWriteInfo>
      <ReviewWriteInfo style={{ color: '#9f9f9f', fontSize: '12px' }}>
        이 제품의 태그로
      </ReviewWriteInfo>
      <ReviewWriteInfo style={{ color: '#9f9f9f', fontSize: '12px' }}>
        #디자인 #애플 #스그 #실버 가 많아요
      </ReviewWriteInfo>
      <SearchBar>
        <ReactSearchAutocomplete
          items={tagData}
          onSelect={handleOnSelect}
          autofocus
          styling={{
            height: '35px',
            borderRadius: '0',
          }}
        />
      </SearchBar>
      <ReviewTagContainer>
        {reviewTagArr.map((tag, idx) => {
          return <ReviewTagText key={idx}>{tag}</ReviewTagText>
        })}
      </ReviewTagContainer>
    </ReviewTagInputContainer>
  )
}
