import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { SignInUserInfo } from '../../services'
import BirthInput from './birth-input'
import Button from './button'

const InputWrapper = styled.div`
  margin-top: 10px;
`

const InputLabelWrapper = styled.div`
  display: flex;
`

const InputText = styled.div`
  color: #ff4f00;
  font-weight: 600;
  font-size: 18px;
  flex: 1;
`
const InputBox = styled.input`
  margin: 10px 0;
  padding-left: 10px;
  width: calc(100% - 10px);
  height: 38px;
  border-radius: 4px;
  border: 0;
  outline: 0;
  flex: none;
  box-shadow: 0px 4px 10px 2px rgb(0, 0, 0, 0.1);
  color: #4d4d4d;
  font-size: 16px;
`

const WarningText = styled.div`
  color: #ff4f00;
  font-weight: 400;
  font-size: 14px;
`

const GenderButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const GenderButton = styled.div`
  width: calc((100% / 3) - 10px);
  border-radius: 4px;
  box-shadow: 0px 4px 10px 2px rgb(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  color: ${(props) => (props.choose ? '#4D4D4D' : '#9F9F9F')};
  border: ${(props) => (props.choose ? '2px solid #FF4F00' : 'none')};
  height: 38px;
  line-height: 36px;
`

export default function UserInfo({ setStatus, setUserData }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    birth: 2021,
    gender: 'w',
    type: 'i',
  })
  const [emailWarning, setEmailWarning] = useState(false)
  const [passwordCheckWarning, setPasswordCheckWarning] = useState(false)
  const [noInputWarning, setNoInputWarning] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  })

  const emailInput = useRef('')
  const passwordInput = useRef('')
  const passwordCheckInput = useRef('')

  // 앱에서 이메일 정보 받아오기
  // webView.stringByEvaluatingJavaScript(from: "javascript:getEmail(입력한 이메일)")
  function getEmail(email) {
    setUserInfo((prev) => ({
      ...prev,
      email,
    }))
  }
  useEffect(() => {
    getEmail('test@naver.com')
  }, [])

  function emailCheck(email) {
    const validator = require('email-validator')
    if (!validator.validate(email)) {
      setEmailWarning(true)
    } else {
      setEmailWarning(false)
    }
  }

  async function onSubmit() {
    if (userInfo.email.length === 0) {
      setNoInputWarning((prev) => ({ ...prev, email: true }))
    } else if (userInfo.password.length === 0) {
      setNoInputWarning((prev) => ({ ...prev, password: true }))
    } else if (!passwordCheckInput.current?.value) {
      setNoInputWarning((prev) => ({ ...prev, passwordCheck: true }))
    } else {
      const result = await SignInUserInfo(userInfo)
      if (result.status === 'success') {
        // 리뷰 상세보기 페이지로 이동
        setStatus(2)
        setUserData(result.data)
      } else {
        result.message?.email[0].includes('exists')
          ? alert('이미 츄잇에 가입된 이메일이에요!')
          : alert('입력을 다시 한 번 확인해주세요:(')
      }
    }
  }

  console.log(userInfo)
  return (
    <>
      {/* 이메일 */}
      <InputWrapper>
        <InputLabelWrapper>
          <InputText>이메일</InputText>
          {noInputWarning.email ? (
            <WarningText>필수 입력 사항이에요!</WarningText>
          ) : emailWarning ? (
            <WarningText>이메일 형식을 확인해주세요!</WarningText>
          ) : (
            ''
          )}
        </InputLabelWrapper>
        <InputBox
          value={userInfo.email}
          onChange={() => {
            setNoInputWarning((prev) => ({ ...prev, email: false }))
            setUserInfo((prev) => ({
              ...prev,
              email: emailInput.current.value,
            }))
          }}
          onBlur={() => emailCheck(emailInput.current.value)}
          ref={emailInput}
        />
      </InputWrapper>
      {/* 비밀번호 */}
      <InputWrapper>
        <InputLabelWrapper>
          <InputText>비밀번호</InputText>
          {noInputWarning.password ? (
            <WarningText>필수 입력 사항이에요!</WarningText>
          ) : (
            ''
          )}
        </InputLabelWrapper>
        <InputBox
          onChange={() => {
            setNoInputWarning((prev) => ({ ...prev, password: false }))
            setUserInfo((prev) => ({
              ...prev,
              password: passwordInput.current.value,
            }))
          }}
          ref={passwordInput}
        />
      </InputWrapper>
      {/* 비밀번호 확인 */}
      <InputWrapper>
        <InputLabelWrapper>
          <InputText>비밀번호 확인</InputText>
          {noInputWarning.passwordCheck ? (
            <WarningText>필수 입력 사항이에요!</WarningText>
          ) : passwordCheckWarning ? (
            <WarningText>비밀번호와 달라요!</WarningText>
          ) : (
            ''
          )}
        </InputLabelWrapper>
        <InputBox
          onChange={() =>
            setNoInputWarning((prev) => ({ ...prev, passwordCheck: false }))
          }
          onBlur={(e) => {
            if (e.target.value !== passwordInput.current?.value) {
              setPasswordCheckWarning(true)
            } else {
              setPasswordCheckWarning(false)
            }
          }}
          ref={passwordCheckInput}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabelWrapper>
          <InputText>성별</InputText>
        </InputLabelWrapper>
        <GenderButtonWrapper>
          {['w', 'm', 'n'].map((gender, idx) => (
            <GenderButton
              key={idx}
              onClick={() =>
                setUserInfo((prev) => ({
                  ...prev,
                  gender: gender,
                }))
              }
              choose={userInfo.gender === gender}
            >
              {gender === 'w' ? '여성' : gender === 'm' ? '남성' : '선택안함'}
            </GenderButton>
          ))}
        </GenderButtonWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputLabelWrapper>
          <InputText>나이</InputText>
        </InputLabelWrapper>
        <BirthInput setUserInfo={setUserInfo} />
      </InputWrapper>
      <Button text="회원가입하기" color={'true'} onClick={onSubmit} />
      <Button text="회원가입 안 할래요" onClick={() => window.close()} />
    </>
  )
}
