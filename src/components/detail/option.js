import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

const TagWrapper = styled.div`
  width: 300px;
`

const Title = styled.div`
  font-size: 16px;
  color: #4d4d4d;
  margin: 10px 20px;
`

const Description = styled.div`
  font-size: 14px;
  color: #9f9f9f;
  text-align: center;
  margin-bottom: 10px;
`

const TagButton = styled.div`
  border-radius: 4px;
  box-shadow: 0px 4px 10px 2px rgb(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  color: #4d4d4d;
  height: 38px;
  line-height: 36px;
  margin: 10px 20px;
  text-overflow: ellipsis;
`

export default function Option({ tags }) {
  const [tagsData, setTagsData] = useState({})

  useEffect(() => {
    if (tags && tags.length !== 0) {
      const result = tags.reduce((acc, curr) => {
        const currTag = curr.tag
        if (Object.keys(acc).includes(currTag.classification)) {
          return {
            ...acc,
            [currTag.classification]: [
              ...acc[currTag.classification],
              [currTag.tag_text, currTag.description],
            ],
          }
        } else {
          return {
            ...acc,
            [currTag.classification]: [[currTag.tag_text, currTag.description]],
          }
        }
      }, {})
      setTagsData(result)
    }
  }, [tags])

  return (
    <>
      <ScrollMenu>
        {Object.keys(tagsData).map((tag, idx) => {
          return (
            <>
              <TagWrapper key={idx}>
                <Title>{tag}</Title>
                {tagsData[tag].map((option, idx) => {
                  return (
                    <>
                      <TagButton key={idx}>{option[0]}</TagButton>
                      <Description>
                        {option[1] === '-' ? '' : option[1]}
                      </Description>
                    </>
                  )
                })}
              </TagWrapper>
            </>
          )
        })}
      </ScrollMenu>
    </>
  )
}
