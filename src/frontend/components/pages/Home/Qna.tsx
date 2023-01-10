import React from 'react';
import styled from 'styled-components';
import Sample1 from '../../../assets/images/Sample1.png';

const QnaLayout = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-top: 10rem;
    margin-bottom: 3rem;
`;

const QnaTitle = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 25rem;
    .QNA{
        font-family: BHS;
        font-weight: 100;
        font-size: 80px;
        background: linear-gradient(to bottom, #033BFF, #00E0FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .Title{
        font-family: Nanumgothic;
        font-weight: 100;
        font-size: 50px;
        margin-top: 0px;
        margin-bottom: 20px;
    }
    .Sub{
        font-family: Nanumgothic;
        font-weight: 100;
        font-size: 20px;
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;

const ExampleImg = styled.div`
    position: absolute;
    margin-top: 25rem;
    right: 25rem;
    width: 740px;
    height: 410px;
    background-image: url(${Sample1});
    box-shadow: 3px 3px 3px 3px #E9E9E9;
`;

const FadeTitle = styled.div`
    position: absolute;
    left: 25rem;
    margin-top: 45rem;
    margin-bottom: 45rem;
    font-family: BHS;
    font-weight: 100;
    font-size: 150px;
    color: #EFEFEF;
`;

function Qna() {
    return(
        <QnaLayout>
            <QnaTitle>
                <span className='QNA'>Q&#38;A</span>
                <span className='Title'>일단 질문하세요&#33;</span>
                <span className='Sub'>
                    검증된 코딩 멘토들과 함께 답을 찾다보면<br/>
                    어느새 나도 코딩 고수&#33;
                </span>
            </QnaTitle>
            <FadeTitle>COMMENTO</FadeTitle>
            <ExampleImg />
        </QnaLayout>
    )
}

export default Qna;