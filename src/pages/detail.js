// import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/commons/header";
// import { fetchItem } from "../services";

export default function Detail() {
    const { id } = useParams();

    // useEffect(() => {
    //     fetchItem()
    // }, [])

    return (
        <>
        <Header title='상세보기' extraButton='등록'/>
        {id}
        </>
        )
}