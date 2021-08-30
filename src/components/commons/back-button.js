import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const BackIconButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  outline: 0;
  background-color: transparent;
  position: absolute;
  left: 10px;
  padding-top: 3px;
`

const BackIconImg = styled.img`
  height: 14px;
`
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) != null
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) != null
  },
  any: function () {
    return isMobile.Android() || isMobile.iOS()
  },
}

export default function BackButton({ webBack }) {
  const history = useHistory()

  // Back Button 클릭 Bridge 함수
  function back() {
    if (isMobile.any()) {
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.back.postMessage(true)
      }
    }
  }
  return (
    <>
      <BackIconButton onClick={webBack ? () => history.goBack() : () => back()}>
        <BackIconImg src="/images/icon/back_icon.png" />
      </BackIconButton>
    </>
  )
}
