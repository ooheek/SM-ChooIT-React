import { useEffect, useState } from 'react'
import { Fab, Action } from 'react-tiny-fab'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import PreferencePopup from './preference-popup'
import { DeleteFavorite, PostFavorite } from '../../services'

const FloatingButtonImg = styled.img`
  width: 18px;
`

export default function DetailFloatingButton({
  favoriteProd,
  token,
  prodCategory,
}) {
  const [openFloatingButton, setOpenFloatingButton] = useState(false)
  const [favorite, setFavorite] = useState()
  const { id } = useParams()

  const history = useHistory()
  function navigateReviewWritePage() {
    history.push({
      pathname: `/detail/${id}/review/write`,
      state: { token: token, prodCategory: prodCategory },
    })
  }

  useEffect(() => setFavorite(favoriteProd), [favoriteProd])

  async function onFavoriteClick() {
    // !!!제품이 찜 되어 있는지 안 되어 있는지 판별하는 api 추가
    setFavorite(!favorite)
    if (favorite) {
      await DeleteFavorite({ fav_prod: id }, token)
    } else {
      await PostFavorite({ fav_prod: id }, token)
    }
  }

  return (
    <>
      <Fab
        mainButtonStyles={
          openFloatingButton
            ? { backgroundColor: 'white', transform: 'rotate(225deg)' }
            : { backgroundColor: 'white' }
        }
        alwaysShowTitle={true}
        icon={<FloatingButtonImg src="/images/icon/navigate_up_arrow.png" />}
        style={{ right: '-12px', bottom: '-3px', paddingLeft: '3px' }}
        className={`rtf ${openFloatingButton ? 'open' : 'closed'}`}
        onClick={() => setOpenFloatingButton(!openFloatingButton)}
      >
        {/* 1. 리뷰 쓰기 */}
        <Action
          text="리뷰 쓰기"
          onClick={navigateReviewWritePage}
          style={{ backgroundColor: '#ff4f00' }}
        >
          <FloatingButtonImg src="/images/icon/white_review_write.png" />
        </Action>
        {/* 2. 선호도 평가 */}
        <Action text="제품 평가" style={{ backgroundColor: '#ff4f00' }}>
          <PreferencePopup
            trigger={
              <FloatingButtonImg src="/images/icon/white_favorites.png" />
            }
            setOpenFloatingButton={setOpenFloatingButton}
            openFloatingButton={openFloatingButton}
            id={id}
            token={token}
          ></PreferencePopup>
        </Action>
        {/* 3. 찜하기 */}
        <Action
          text="찜하기"
          onClick={onFavoriteClick}
          style={{ backgroundColor: '#ff4f00' }}
        >
          <FloatingButtonImg
            src={
              favorite
                ? '/images/icon/white_fill_heart.png'
                : '/images/icon/white_heart.png'
            }
          />
        </Action>
      </Fab>
    </>
  )
}
