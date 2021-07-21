import { useRef } from 'react'
import styled from 'styled-components'

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('/images/icon/dropdown_icon.png') no-repeat 90% 50%/10%;
  height: 38px;
  width: calc((100% / 3) - 10px);
  border-radius: 4px;
  box-shadow: 0px 4px 10px 2px rgb(0, 0, 0, 0.1);
  border: none;
  padding-left: 2.1rem;
  margin-top: 10px;
  margin-bottom: 20px;
`

const max = new Date().getFullYear()
const min = max - 100
const yearRange = () => {
  const year = []
  for (let i = min; i <= max; i++) {
    year.push(i)
  }
  return year
}

export default function BirthInput({ setUserInfo }) {
  const select = document.getElementById('selectElementId')

  const yearRef = useRef(max)
  const selectRef = yearRef.current
  console.log(select, selectRef)

  return (
    <>
      <Select
        ref={yearRef}
        id="selectElementId"
        onChange={() =>
          setUserInfo((prev) => ({ ...prev, birth: +yearRef.current.value }))
        }
      >
        {yearRange()
          .reverse()
          .map((year) => (
            <option key={year}>{year}</option>
          ))}
      </Select>
    </>
  )
}
