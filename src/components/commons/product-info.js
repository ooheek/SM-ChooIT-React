import styled from "styled-components"

const ProductInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #4d4d4d;
    &.hide {
        transform: translateY(-80px);
    }
`;

const ProductImgContainer = styled.div`
    width: 120px;
    height: 120px;
    margin: 0 auto;
    padding: 6px 6px 12px 6px;
`;

const ProductImg = styled.img`
    width: 100%;
`;

const ProductCompany = styled.div`
    font-size: 13px;
    padding: 5px;
`;

const ProductPrice = styled.div`
    font-size: 16px;
    padding: 2px;
`;

export default function ProductInfo({ product }) {
    return(
        <ProductInfoContainer>
        <ProductImgContainer><ProductImg src='/mock-images/ipad.jpg' alt=""/></ProductImgContainer>
        <ProductCompany>Apple</ProductCompany>
        <ProductPrice>가격 1,172,150 원</ProductPrice>
        </ProductInfoContainer>
    )
}