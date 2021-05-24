export default function Review({userNickname, userTag, userImgUrl, reviewDate, reviewTitle, reviewImgUrl, reviewContent, reviewTag}) {
    return (
        <div>{userNickname} {userTag} {userImgUrl} {reviewDate} {reviewTitle} {reviewImgUrl} {reviewContent} {reviewTag}</div>
    )
}