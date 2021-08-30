import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import UserInfo from '../components/sign/user-info'
// import UserProduct from '../components/sign/user-product'
import UserTag from '../components/sign/user-tag'

const SignPageWrapper = styled.div`
  padding-bottom: 200px;
`
const Title = styled.div`
  font-size: 26px;
  color: #4d4d4d;
  position: relative;
  top: 6rem;
  left: 20px;
  line-height: 2.5rem;
`
const SubTitle = styled.div`
  font-size: 16px;
  color: #9f9f9f;
  margin: 5px 0;
`

const ContentWrapper = styled.div`
  position: relative;
  top: 7rem;
  margin: 0 20px;
`

export default function Sign() {
  const [status, setStatus] = useState(1)
  const [userData, setUserData] = useState({})

  const { email } = useParams()

  console.log(userData)
  return (
    <SignPageWrapper>
      <Title>
        {status === 1 ? (
          <>
            회원가입
            <br /> 금방 끝나요!
          </>
        ) : (
          <>
            츄잇에게
            <br /> 스타일을 알려주세요!
            <SubTitle>최대 5개까지 선택할 수 있어요</SubTitle>
          </>
          // ) : (
          //   <>
          //     현재 사용하고 있는
          //     <br />
          //     제품을 기록하고,
          //     <br />더 정확한 추천을 받아요!
          //     <SubTitle>꼭 입력하지 않아도 괜찮아요</SubTitle>
          //   </>
        )}
      </Title>
      <ContentWrapper>
        {status === 2 ? (
          <UserInfo
            setStatus={setStatus}
            setUserData={setUserData}
            email={email}
          />
        ) : (
          <>
            <UserTag userData={userData} />
          </>
          // ) : (
          //   <UserProduct setStatus={setStatus} userData={userData} />
        )}
      </ContentWrapper>
    </SignPageWrapper>
  )
}
