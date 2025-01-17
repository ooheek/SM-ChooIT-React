import { React, useState } from 'react'
import styled from 'styled-components'
import ImageUploading from 'react-images-uploading'

import { ReviewPhotoUpload } from '../../services'

const ReviewWriteInfo = styled.div`
  font-size: 14px;
  color: #4d4d4d;
  margin-top: 3px;
`

const ThumbnailArea = styled.div`
  width: 120px;
  height: 120px;
  background-color: #ebebeb;
  /* border: 2px solid #4D4D4D; */
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ThumbnailImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const UploadButton = styled.button`
  border: none;
  background-color: transparent;
  color: #4d4d4d;
  font-size: 30px;
`

// const DeleteButtonWrapper = styled.div`
//   position: relative;
// `

// const DeleteButton = styled.button`
//   border: none;
//   background-color: transparent;
//   color: #4d4d4d;
//   position: absolute;
//   font-size: 12px;
//   bottom: 0;
//   min-width: 40px;
// `

const ImageArea = styled.div`
  max-width: 160px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`

export default function ThumbnailUpload({
  setReview,
  review,
  setReviewInput,
  token,
}) {
  const [images, setImages] = useState(() =>
    review.thumbnail_detail
      ? [{ data_url: review.thumbnail_detail.img_path }]
      : [],
  )

  async function onChange(imageList, addUpdateIndex) {
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
    const result = await ReviewPhotoUpload(imageList[0].file, token)
    setReview((prev) => ({
      ...prev,
      review_img_thumbnail: result.data.img_no,
      // images: {
      //   review_img_no: prev.images?.review_img_no,
      //   thumbnail: result.data.img_no,
      // },
    }))
    setReviewInput((prev) => ({ ...prev, thumbnail: true }))
  }

  return (
    <>
      <ReviewWriteInfo>리뷰 대표 썸네일 사진을 선택해주세요</ReviewWriteInfo>
      <ImageUploading
        multiple
        value={images}
        maxNumber="1"
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageUpdate }) => (
          <div className="upload__image-wrapper">
            {imageList.length === 0 ? (
              <ThumbnailArea>
                <UploadButton onClick={onImageUpload}>+</UploadButton>
              </ThumbnailArea>
            ) : (
              imageList.map((image, idx) => {
                return (
                  <>
                    <ImageArea>
                      <ThumbnailArea key={idx} className="image-item">
                        <ThumbnailImage
                          src={image['data_url']}
                          alt=""
                          onClick={() => onImageUpdate(idx)}
                        />
                      </ThumbnailArea>
                      {/* 어차피 썸네일 꼭 있어야 함 */}
                      {/* <DeleteButtonWrapper>
                        <DeleteButton onClick={() => onImageRemove(idx)}>
                          [삭제]
                        </DeleteButton>
                      </DeleteButtonWrapper> */}
                    </ImageArea>
                  </>
                )
              })
            )}
          </div>
        )}
      </ImageUploading>
    </>
  )
}
