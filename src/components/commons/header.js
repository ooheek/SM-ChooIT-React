import { useHistory } from "react-router-dom"
import styled from "styled-components"

const HeaderContainer = styled.div`
    height: 55px;
    width: 100%;
`

export default function Header({title, extraButton, onExtraButtonClick}) {
    const router = useHistory()
    return (
        <HeaderContainer>
            <button onClick={() => router.goBack()}>뒤로가기</button> {title} {extraButton ? <button onClick={onExtraButtonClick}>{extraButton}</button> : null}
        </HeaderContainer>
        )
}