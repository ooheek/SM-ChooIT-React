import styled from 'styled-components'

const ProductTab = styled.div`
  display: flex;
  font-size: 16px;
  color: #4d4d4d;
  text-align: center;
  margin: 20px;
`

const ProductTabName = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.activate ? '#4d4d4d' : '#9f9f9f')};
  padding: 0 10px 0 10px;
`

const tabs = [
  {
    name: '기능',
    location: 'fLocation',
  },
  {
    name: '상세',
    location: 'dLocation',
  },
  {
    name: '리뷰',
    location: 'rLocation',
  },
]

export default function Tab({ location, moveLocation }) {
  return (
    <ProductTab>
      {/* {tabTitle.map((str, idx) => { return(<ProductTabName key={idx} onClick={() => moveLocation(idx)} className={''}>{str}</ProductTabName>)})} */}
      {tabs.map((tab, idx) => {
        return (
          <ProductTabName
            key={idx}
            activate={location === tab.location}
            onClick={() => moveLocation(tab.location)}
          >
            {tab.name}
          </ProductTabName>
        )
      })}
    </ProductTab>
  )
}
