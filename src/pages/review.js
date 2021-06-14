import { useLocation, useParams } from "react-router-dom";
import Header from "../components/commons/header";

export default function Review() {
    const { id, reviewId } = useParams();
    const location = useLocation();
    const review = location.state.review;
    
    return (
        <>
        <Header title='제품 리뷰 상세보기' extraButton='편집' onExtraButtonClick={() => alert('편집')}/>
        {id} {reviewId}
        </>
        )
}