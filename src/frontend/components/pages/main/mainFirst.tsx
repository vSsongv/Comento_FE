import titleImage from "../../../assets/images/MainFirstTitle.png"
import arrowImage from "../../../assets/images/MainFirstButtonArrow.png"
import React from "react";
import styled from "styled-components";
import Button from "../../UI/atoms/Button";

const Title = styled.div`
    font-family: NanumGothic;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TitleImage = styled.div`
    background: url("${ titleImage }");
    background-size: cover;
    width: 916px;
    height: 467px;
`
const AskButton = styled(Button)`
    padding-top: 10px;
    width: 443px;
    height: 77px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const StartAskLabel = styled.p`
    font-size: 10pt;
`
const AskLabel = styled.p`
    font-size: 20pt;
`
const AskContainer = styled.div`
    padding-top: 8px;
    display: flex;
    flex-directon: row;
    align-items: center;
`
const AskArrowImg = styled.div`
    margin-left: 10px;
    background: url("${ arrowImage }");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 10px;
    height: 17px;
`
const Space = styled.div`
    height: 30px;
`

function MainFirst() {
    return (
        <>
        <Title>
            <TitleImage />
            <Space />
            <AskButton long>
                <StartAskLabel>지금, 질문 시작해보세요!</StartAskLabel>
                <AskContainer>
                    <AskLabel>질문하기</AskLabel>
                    <AskArrowImg />
                </AskContainer>
            </AskButton>
        </Title>
        </>
    )
}
export default MainFirst;


