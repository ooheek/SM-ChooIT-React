import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ProductTab = styled.div`
    display: flex;
    font-size: 16px;
    color: #4d4d4d;
    text-align: center;
    margin: 20px;
`;

const ProductTabName = styled.div`
    flex: 1;
    font-weight: 600;
    font-size: 16px;
    color: #9f9f9f;
    padding: 0 10px 0 10px;
    &.activate {
        color: #4d4d4d
    }
`;

function throttle(callback, waitTime) {
    let timerId = null;
    return (e) => {
        if (timerId) return;
        timerId = setTimeout(() => {
            callback.call(this, e);
            timerId = null;
        }, waitTime);
    };
};

export default function Tab() {
    const [fLocation, setFLocation] = useState(undefined);
    const [dLocation, setDLocation] = useState(undefined);
    const [rLocation, setRLocation] = useState(undefined);

    const [fActivate, setFActivate] = useState(false);
    const [dActivate, setDActivate] = useState(false);
    const [rActivate, setRActivate] = useState(false);
    const [pageY, setPageY] = useState(0);
    const documentRef = useRef(document);

    function handleScroll() {
        const { pageYOffset } = window;
        // const deltaY = pageYOffset - pageY;
        const fActivate = pageYOffset !== 0 && pageYOffset >= 0 && pageYOffset < dLocation;
        const dActivate = pageYOffset !== 0 && pageYOffset >= dLocation && pageYOffset < rLocation;
        const rActivate = pageYOffset !== 0 && pageYOffset >= rLocation;
        setFActivate(fActivate);
        setDActivate(dActivate);
        setRActivate(rActivate);
        setPageY(pageYOffset);
    };

    const throttleScroll = throttle(handleScroll, 50);

// eslint-disable-next-line
    useEffect(() => {
        setFLocation(document.getElementById('p-function').offsetTop)
        setDLocation(document.getElementById('p-detail').offsetTop)
        setRLocation(document.getElementById('p-review').offsetTop)
    });

    useEffect(() => {
        documentRef.current.addEventListener('scroll', throttleScroll);
        return () => documentRef.current.removeEventListener('scroll', throttleScroll)
    }, [pageY])

    // const tabTitle = [
    //     "기능",
    //     "상세",
    //     "리뷰"
    // ];

    const tab = {
        0: fLocation,
        1: dLocation,
        2: rLocation,
    };

    function moveLocation(idx) {
        window.scrollTo({top:tab[idx], behavior:'smooth'})
    }

    return(
        <ProductTab>
            {/* {tabTitle.map((str, idx) => { return(<ProductTabName key={idx} onClick={() => moveLocation(idx)} className={''}>{str}</ProductTabName>)})} */}
            <ProductTabName className = {fActivate && 'activate'} onClick={() => moveLocation(0)}>기능</ProductTabName>
            <ProductTabName className = {dActivate && 'activate'} onClick={() => moveLocation(1)}>상세</ProductTabName>
            <ProductTabName className = {rActivate && 'activate'} onClick={() => moveLocation(2)}>리뷰</ProductTabName>
        </ProductTab>
    )
}