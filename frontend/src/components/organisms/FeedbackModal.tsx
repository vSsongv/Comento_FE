import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Modal from './Modal';

const QuestionTitle = styled.span`
  display: block;
  color: black;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
`;

const HiddenCheckBox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gray;
  border-radius: 0.35rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #033bff;
  }
`;

const CheckBox = styled.label`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

const CheckFont = styled.span`
  display: flex;
  color: black;
  font-size: 18px;
  margin-bottom: 5px;
  margin-left: 3px;
  margin-top: 3px;
  .first{ margin-right: 60px; }
  .second{ margin-right: 10px; }
  .third{ margin-right: 80px; }
`;

const FeedBackInput = styled.textarea`
  width: 620px;
  height: 150px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 60px;
  resize: none;
  font-size: 18px;
  padding: 0.5rem;
  border: 1px solid gray;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 50px;
  bottom: 25px;
`;

const FirstList = ['만족', '보통', '불만족'];
const SecondList = ['1시간 이하', '1시간 ~ 3시간', '3시간 초과'];
const ThirdList = ['네', '아니오'];

const FeedbackContent = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if(isChecked){ 
      setCheckedList((prev) => [...prev, value]); 
      return;
    }
    if(!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
    console.log(value, e.target.checked);
  };

  return(
    <>
      <QuestionTitle>1. 서비스에 만족하시나요?</QuestionTitle>
      <CheckBoxWrapper>
        {FirstList.map((item, idx) => (
          <div className='checkBox' key={idx}>
            <CheckBox htmlFor={item}>
              <HiddenCheckBox
              type='checkBox'
              id={item}
              checked={checkedList.includes(item)}
              onChange={(e) => checkHandler(e, item)}
              />
              <CheckFont><span className='first'>{item}</span></CheckFont>
            </CheckBox>
          </div>
        ))}
      </CheckBoxWrapper>
      <QuestionTitle>2. 멘토링 시간은 얼마나 소요되었나요?</QuestionTitle>
      <CheckBoxWrapper>
        {SecondList.map((item, idx) => (
          <div className='checkBox' key={idx}>
            <CheckBox htmlFor={item}>
              <HiddenCheckBox
              type='checkBox'
              id={item}
              checked={checkedList.includes(item)}
              onChange={(e) => checkHandler(e, item)}
              />
              <CheckFont><span className='second'>{item}</span></CheckFont>
            </CheckBox>
          </div>
        ))}
      </CheckBoxWrapper>
      <QuestionTitle>3. 다시 사용할 의향이 있으신가요?</QuestionTitle>
      <CheckBoxWrapper>
        {ThirdList.map((item, idx) => (
          <div className='checkBox' key={idx}>
            <CheckBox htmlFor={item}>
              <HiddenCheckBox
              type='checkBox'
              id={item}
              checked={checkedList.includes(item)}
              onChange={(e) => checkHandler(e, item)}
              />
              <CheckFont><span className='third'>{item}</span></CheckFont>
            </CheckBox>
          </div>
        ))}
      </CheckBoxWrapper>
      <QuestionTitle>
        4. 저희 서비스에 추가되었으면 하는 점, 부족하다고 느낀 점을 적어주세요.
           저희 서비스 개선에 큰 도움이 됩니다. 추첨을 통해 가입하신 휴대폰 번호로 
           기프티콘을 증정해드립니다.
      </QuestionTitle>
      <FeedBackInput />
      <ButtonWrapper>
        <Button width={130} height={45} fontSize={20}>제출하기</Button>
      </ButtonWrapper>
    </>
  );
}

const FeedbackModal = () => {
  return(
    <Modal
    title='저희 서비스 어떠셨나요?'
    content={FeedbackContent}
    />
  );
}

export default FeedbackModal;