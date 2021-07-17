import styled from 'styled-components'

const ReviewInformation = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
  align-items: center;
  justify-content: center;
`

const UserProfileContainer = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  text-align: center;
  background-color: #c4c4c4;
  margin-right: 10px;
`

const UserProfile = styled.div`
  flex: 1;
  font-size: 23px;
  line-height: 35px;
`

const UserNicknameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const UserNickname = styled.div`
  font-size: 16px;
  color: #4e4e4e;
`

const UserTag = styled.div`
  font-size: 12px;
  color: #4e4e4e;
`
const Tag = styled.span`
  margin-left: 3px;
`

const ReviewDate = styled.div`
  flex: none;
  font-size: 12px;
  color: #9f9f9f;
  margin-top: 20px;
`

export default function ReviewUserInfo({ review }) {
  return (
    <>
      <ReviewInformation>
        <UserProfileContainer>
          <UserProfile>
            {review.user && review.user.length !== 0 ? review.user.emoji : ''}
          </UserProfile>
        </UserProfileContainer>
        <UserNicknameContainer>
          <UserNickname>
            {review.user && review.user.length !== 0
              ? review.user.nickname
              : ''}
          </UserNickname>
          <UserTag>
            {review.user && review.user.length !== 0
              ? review.user.tags.length > 3
                ? review.user.tags
                    .slice(0, 3)
                    ?.map((tag, idx) => <Tag key={idx}>#{tag}</Tag>)
                : review.user.tags?.map((tag, idx) => (
                    <Tag key={idx}>#{tag}</Tag>
                  ))
              : ''}
          </UserTag>
        </UserNicknameContainer>
        <ReviewDate>{review.created_at?.substr(0, 10)}</ReviewDate>
      </ReviewInformation>
    </>
  )
}
