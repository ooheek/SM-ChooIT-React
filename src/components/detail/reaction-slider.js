import styled from "styled-components";

const Container = styled.div`

`;

const Title = styled.div`
    font-size: 16px;
    color: #4d4d4d;
    margin: 10px 20px;
    padding-left: 5px;
`;

const Progress = styled.div`
    width: 320px;
    margin: 0 auto;
    height: 17px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin-bottom: 30px;
    overflow: visible;
    position: relative;
`;

const ProgressBar = styled.div`
    border-radius: 15px;
    height: 100%;
    box-shadow: none;
    position: relative;
    animation: animate-positive 2s;
    float: left;
    transition: width 0.6s ease;
`;

const ProgressValue = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 28px;
    background: #fff;
    position: absolute;
    top: -10px;
    right: -5px;
    text-align: center;
`;

const ProgressImg = styled.img`
    width: 20px;
`;

export default function ReactionSlider({title, score}) {
    return (
        <>
        <Container>
            <Title>{title}</Title>
            <Progress>
                <ProgressBar style={{width: `${score}%`, background: score >= 50 ? '#0066FF' : '#FF2E00'}}>
                    <ProgressValue style={{border: score >= 50 ? 'solid 4px #0066FF' : 'solid 4px #FF2E00'}}><img src={score >= 50 ? '/images/icon/positive_reaction.png' : '/images/icon/negative_reaction.png'} alt="" style={{width: '20px'}}/></ProgressValue>
                </ProgressBar>
            </Progress>
        </Container>
        </>
    )
}