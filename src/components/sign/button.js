import styled from 'styled-components'

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`

const SignButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 20px;
  width: 100%;
  height: 44px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background-color: ${(props) => (props.color ? '#FF4F00' : '#DEDEDE')};
`

export default function Button({ text, color, onClick }) {
  return (
    <>
      <ButtonWrapper>
        <SignButton color={color} onClick={onClick}>
          {text}
        </SignButton>
      </ButtonWrapper>
    </>
  )
}
