import styled, { css } from 'styled-components'

const RangeThumb = css`
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  margin: -8px 0 0;
  border-radius: 50%;
  background: #ff4f00;
  border: 0 !important;
`

const RangeTrack = css`
  width: 100%;
  height: 2px;
  background: #ff4f00;
`

const OptionSliderRange = styled.div`
  position: relative;
  width: 300px;
  height: 5px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 20px;
`

const Slider = styled.input`
  width: 100%;
  position: absolute;
  top: 2px;
  height: 0;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${RangeThumb};
  }
  &::-moz-range-thumb {
    ${RangeThumb};
  }
  &::-ms-thumb {
    ${RangeThumb};
  }
  &::-webkit-slider-runnable-track {
    ${RangeTrack};
  }
  &::-moz-range-track {
    ${RangeTrack};
  }
`

const Title = styled.div`
  font-size: 16px;
  color: #4d4d4d;
  margin: 10px 20px;
  padding-left: 5px;
`

const Description = styled.div`
  font-size: 14px;
  color: #4d4d4d;
  text-align: center;
  margin-bottom: 10px;
`

export default function OptionSlider({ title, score, description }) {
  return (
    <>
      <Title>{title}</Title>
      <OptionSliderRange
        style={{
          background: `linear-gradient(to right, #FF4F00 0%, #FF4F00 ${
            (score - 1) * 19.6
          }%, #fff ${(score - 1) * 19.6}%, #fff 100%)`,
        }}
      >
        <Slider type="range" min="1" max="6" steps="1" value={score} />
      </OptionSliderRange>
      <Description>{description}</Description>
    </>
  )
}
