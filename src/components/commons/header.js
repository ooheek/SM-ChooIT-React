import styled from 'styled-components'

import BackButton from './back-button'

const HeaderContainer = styled.div`
  height: 55px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #ffffff;
  color: #4d4d4d;
  z-index: 10;
`

const TitleWrapper = styled.span`
  font-size: 18px;
  font-weight: 600;
  width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const ExtraButtonWrapper = styled.span`
  position: absolute;
  right: 8px;
`

const ExtraButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: 16px;
  padding-top: 3px;
  color: ${(props) => (props.change ? '#FF4F00' : '#9F9F9F')};
`

export default function Header({
  title,
  extraButton,
  onExtraButtonClick,
  change,
}) {
  // const router = useHistory()
  return (
    <>
      <HeaderContainer>
        <BackButton />
        <TitleWrapper>{title}</TitleWrapper>
        {extraButton ? (
          <ExtraButtonWrapper>
            <ExtraButton onClick={onExtraButtonClick} change={change}>
              {extraButton}
            </ExtraButton>
          </ExtraButtonWrapper>
        ) : null}
      </HeaderContainer>
    </>
  )
}
