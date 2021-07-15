import { useEffect, useState } from 'react'

export default function Sign() {
  const [userEmail, setUserEmail] = useState('')
  // 앱에서 이메일 정보 받아오기
  // webView.stringByEvaluatingJavaScript(from: "javascript:getEmail(입력한 이메일)")
  function getEmail(email) {
    setUserEmail(email)
  }
  useEffect(() => {
    getEmail('테스트@naver.com')
  }, [])

  return <>{userEmail}</>
}
