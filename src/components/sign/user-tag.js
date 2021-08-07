import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import styled from 'styled-components'

import { GetTagData, SignInUserTag } from '../../services'
import Button from './button'

const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  row-gap: 5px;
  column-gap: 10px;
  margin-bottom: 20px;
`

const TagButton = styled.div`
  border-radius: 4px;
  box-shadow: 0px 4px 10px 2px rgb(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  color: ${(props) => (props.choose ? '#4D4D4D' : '#9F9F9F')};
  border: ${(props) => (props.choose ? '2px solid #FF4F00' : 'none')};
  height: 38px;
  line-height: 36px;
  margin: 10px 0;
`

export default function UserTag({ userData }) {
  const [tagData, setTagData] = useState([])
  const [userTag, setUserTag] = useState({
    user: '',
    tag: [],
  })

  useEffect(() => {
    ;(async () => {
      const tagResult = await GetTagData()
      const tagData = tagResult.data

      setTagData(tagData)
    })()
  }, [])

  function onTagClick(tag) {
    if (userTag.tag.includes(tag)) {
      const newTagArr = userTag.tag.filter((element) => element !== tag)
      setUserTag({
        user: userData.email,
        tag: newTagArr,
      })
    } else {
      setUserTag((prev) => ({
        user: userData.email,
        tag: [...prev.tag, tag],
      }))
    }
  }

  async function onSubmit() {
    if (userTag.tag.length === 0) {
      alert('태그를 한 개 이상 선택해주세요')
    } else {
      const result = await SignInUserTag(userTag)
      if (result.status === 'success') {
        // 어플 메인화면으로 이동
        alert('회원가입이 완료되었습니다!')
      } else {
        alert('태그 등록에 문제가 생겼어요:(')
      }
    }
  }

  return (
    <>
      <TagWrapper>
        {tagData.map((tag, idx) => (
          <TagButton
            key={idx}
            onClick={() => onTagClick(tag.tag_code)}
            choose={userTag.tag.includes(tag.tag_code)}
          >
            {tag.tag_text}
          </TagButton>
        ))}
      </TagWrapper>
      <Button text="계속하기" color={'true'} onClick={onSubmit} />
    </>
  )
}
