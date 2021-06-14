import styled from "styled-components"

const ReviewContainer = styled.div`
    margin: 20px 10px;
`;

const ReviewInformation = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 20px;
    align-items: center;
    justify-content: center;
`;

const UserProfileContainer = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
    background-color: #c4c4c4;
    margin-right: 10px;
`;

const UserProfile = styled.div`
    flex: 1;
    font-size: 23px;
    line-height: 35px;
`;

const UserNicknameContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const UserNickname = styled.div`
    font-size: 16px;
    color: #4e4e4e;
`;

const UserTag = styled.div`
    font-size: 12px;
    color: #4e4e4e;
`;

const ReviewDate = styled.div`
    flex: none;
    font-size: 12px;
    color: #9f9f9f;
    margin-top:20px;
`;

const ReviewInformationContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;
`;

const ReviewThumbnail =styled.img`
    width: 128px;
    height: 128px;
    object-fit: cover;
`;

const ReviewContentContainer = styled.div`
    margin-left: 15px;
    display: flex;
    flex-direction: column;
`;

const ReviewTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    flex: 1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
`;

const ReviewContent = styled.div`
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    white-space: normal;
    word-break: keep-all;
`;

const ReviewTag = styled.div`
    font-size: 12px;
    flex: 1;
    color: #4e4e4e; 
`;

export default function Review({review}) {
    return (
        <>
        <ReviewContainer>
            <ReviewInformation>
                <UserProfileContainer><UserProfile>{review.userImg}</UserProfile></UserProfileContainer>
                <UserNicknameContainer>
                    <UserNickname>{review.userNickname}</UserNickname>
                    <UserTag>{review.userTag}</UserTag>
                </UserNicknameContainer>
                <ReviewDate>{review.reviewDate}</ReviewDate>
            </ReviewInformation>
            <ReviewInformationContainer>
                <ReviewThumbnail src={review.reviewImgUrl ? review.reviewImgUrl : '/images/image/no_review_photo.png'} alt=''></ReviewThumbnail>
                <ReviewContentContainer>
                    <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                    <ReviewContent>{review.reviewContent}</ReviewContent>
                    <ReviewTag>{review.reviewTag}</ReviewTag>
                </ReviewContentContainer>
            </ReviewInformationContainer>
        </ReviewContainer>
        </>
    )
}