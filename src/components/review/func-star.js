import styled from "styled-components";

const FuncStarContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 20px;
`;

const FuncStarLabel = styled.div`
    font-size: 16px;
    width: 42px;
    font-weight: 600;
    color: #FF4F00;
    margin-right: 10px;
`;

const FuncStarScore = styled.div`
    font-size: 16px;
    line-height: 16px;
    padding-left: 20px;
`;

export default function FuncStar({ label, score }) {
    return(
        <>
        <FuncStarContainer>
            <FuncStarLabel>{label}</FuncStarLabel>
            <FuncStarScore>{score === 0 ? '👍' : score === 1 ? '✊' : '👎'}</FuncStarScore>
        </FuncStarContainer>
        </>
    )
}