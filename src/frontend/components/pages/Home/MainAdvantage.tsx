import React from 'react';
import styled from 'styled-components';

import MainAdvantage_approval from '../../../assets/images/MainAdvantage_approval.png';
import MainAdvantage_idea from '../../../assets/images/MainAdvantage_idea.png';
import MainAdvantage_rocket from '../../../assets/images/MainAdvantage_rocket.png';

const MainAdLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70rem;
    margin-bottom: 3rem;
`;

const MainAdTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .SmallTitle{
        font-family: BHS;
        font-weight: 100;
        font-size: 30px;
        color: #898787;
        text-align: center;
    }
    .BigTitle{
        font-family: BHS;
        font-weight: 100;
        font-size: 50px;
        background: linear-gradient(to bottom, #033BFF, #00E0FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-align: center;
    }
`;

const AdContainerLayout = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AdContainer = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    margin-Top: 70px;
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 100px;
    padding-top: 4rem;
    align-items: center;
    border: 0;
    background-color: transparent;
    flex-direction: column;
`;

const ContainerImg = styled.div`
    .Approval{
        background-image: url(${MainAdvantage_approval});
        border: none;
        width: 150px;
        height: 150px;
        background-size: contain;
    }
    .Idea{
        background-image: url(${MainAdvantage_idea});
        border: none;
        width: 150px;
        height: 150px;
        background-size: contain;
    }
    .Rocket{
        background-image: url(${MainAdvantage_rocket});
        border: none;
        width: 150px;
        height: 150px;
        background-size: contain;
    }
`;

const ContainerFont = styled.p`
    display: flex;
    text-align: center;
    .title{
        font-family: Nanumgothic;
        font-weight: bold;
        font-size: 40px;
        padding-top: 50px;
    }
    .sub{
        font-family: Nanumgothic;
        font-weight: 100;
        font-size: 25px;
        padding-top: 25px;
    }
`;

function MainAdvantage() {
    return(
        <MainAdLayout>
            <MainAdTitle>
                <span className="SmallTitle">언제 어디서든</span>
                <span className="BigTitle">코멘토와 1 : 1 맞춤 코칭</span>
            </MainAdTitle>
            <AdContainerLayout>
                <AdContainer>
                    <ContainerImg><div className='Approval'/></ContainerImg>
                    <ContainerFont><span className='title'>간편하다&#33;</span></ContainerFont>
                    <ContainerFont><span className='sub'>이런 점이 간편합니다</span></ContainerFont>
                </AdContainer>
                <AdContainer>
                    <ContainerImg><div className='Idea'/></ContainerImg>
                    <ContainerFont><span className='title'>명확하다&#33;</span></ContainerFont>
                    <ContainerFont><span className='sub'>이런 점이 명확합니다</span></ContainerFont>
                </AdContainer>
                <AdContainer>
                    <ContainerImg><div className='Rocket'/></ContainerImg>
                    <ContainerFont><span className='title'>빠르다&#33;</span></ContainerFont>
                    <ContainerFont><span className='sub'>이런 점이 이래서 빠릅니다</span></ContainerFont>
                </AdContainer>
            </AdContainerLayout>
        </MainAdLayout>
    )
}

export default MainAdvantage;