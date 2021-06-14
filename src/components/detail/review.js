import { useHistory } from "react-router-dom";
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

const ReviewColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReviewInformationContainer = styled.div`
    margin: 15px;
    flex: 1;
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
    flex: none;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
`;

const ReviewContent = styled.div`
    font-size: 14px;
    flex: 1;
    padding: 2px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    white-space: normal;
    word-break: keep-all;
`;

const ReviewTag = styled.div`
    font-size: 12px;
    width: calc(100% - 40px);
    flex: none;
    color: #4e4e4e; 
    margin-left: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
`;


export default function Review({ detailId, review }) {
    let history = useHistory();
    function navigateReviewDetailPage() {
        history.push({
            pathname:`/detail/:${detailId}/review/:${review.reviewId}`,
            state: {review: review}
        });
      }

    return (
        <>
        <ReviewContainer onClick={() => {navigateReviewDetailPage()}} >
            <ReviewInformation>
                <UserProfileContainer><UserProfile>{review.user.userImg}</UserProfile></UserProfileContainer>
                <UserNicknameContainer>
                    <UserNickname>{review.user.userNickname}</UserNickname>
                    <UserTag>{review.user.userTag}</UserTag>
                </UserNicknameContainer>
                <ReviewDate>{review.reviewDate}</ReviewDate>
            </ReviewInformation>

            <ReviewColumnContainer>
                <ReviewInformationContainer>
                <ReviewThumbnail src={review.reviewThumbnailImgUrl ? review.reviewThumbnailImgUrl : '/images/image/no_review_photo.png'} alt=''></ReviewThumbnail>
                <ReviewContentContainer>
                    <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                    <ReviewContent>{review.reviewContent[0].text}</ReviewContent>
                </ReviewContentContainer>
                </ReviewInformationContainer>
                <ReviewTag>{review.reviewTag}</ReviewTag>
            </ReviewColumnContainer>
        </ReviewContainer>
        </>
    )
}