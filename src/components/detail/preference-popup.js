import Popup from 'reactjs-popup'
import styled from 'styled-components'

import { PostEstimateRate } from '../../services'

const Modal = styled.div`
  font-size: 12px;
  position: relative;
  margin: auto;
  min-width: 280px;
  width: 80%;
  background-color: white;
  color: #494949;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0px 4px 10px 2px rgb(0, 0, 0, 0.2);
`

const CloseButton = styled.button`
  color: #494949;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
`

const ModalTitle = styled.div`
  width: 100%;
  border-bottom: 1px solid #b9b9b9;
  font-size: 16px;
  text-align: center;
  padding: 5px 0 8px 0;
`

const ModalContent = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px 5px;
  margin: 3px;
  word-break: keep-all;
  line-height: 25px;
`
const ModalButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  margin-bottom: 8px;
`

const ModalButton = styled.button`
  color: #494949;
  margin: 0 5px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  line-height: 22px;
`

export default function PreferencePopup({
  trigger,
  setOpenFloatingButton,
  openFloatingButton,
  id,
  token,
}) {
  async function onButtonClick(status) {
    const result = await PostEstimateRate(id, { estimate_rate: status }, token)
    if (result.status === 'error') {
      alert('이미 평가한 제품이에요!')
    }
  }
  return (
    <Popup
      trigger={trigger}
      modal
      position="center center"
      overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: '9999' }}
      onOpen={() => setOpenFloatingButton(!openFloatingButton)}
    >
      {(close) => (
        <Modal>
          <CloseButton className="close" onClick={close}>
            &times;
          </CloseButton>
          <ModalTitle> 이 제품이 마음에 드시나요? </ModalTitle>
          <ModalContent>
            더욱 정확한 제품 추천을 위한 제품 선호도 조사입니다!
            <div style={{ fontSize: '13px', marginTop: '2px' }}>
              * 한 번 평가하면 수정이 어려우니 신중해주세요
            </div>
          </ModalContent>
          <ModalButtonWrapper>
            <ModalButton
              onClick={() => {
                onButtonClick(5)
                close()
              }}
            >
              좋아요 😉
            </ModalButton>
            <ModalButton
              onClick={() => {
                onButtonClick(3)
                close()
              }}
            >
              보통이에요 😗
            </ModalButton>
            <ModalButton
              onClick={() => {
                onButtonClick(1)
                close()
              }}
            >
              별로예요 😟
            </ModalButton>
          </ModalButtonWrapper>
        </Modal>
      )}
    </Popup>
  )
}
