import React, { useRef } from 'react';
import styled from 'styled-components';
import showPassword from '../../../assets/images/ShowPassword.png';

interface InputFormProps {
  purpose: string;
  label: string;
  placeholder: string;
  rule: string;
  option?: string;
  message: string;
}

interface FormValue {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

const Label = styled.label`
  font-family: 'NanumGothic';
  font-weight: 600;
  color: #858585;
`;

const InputStyle = {
  backgroundColor: '#efefef',
  border: 'none',
  padding: '25px',
  fontFamily: 'NanumGothic',
  fontSize: '14px',
  height: '63px',
  borderRadius: '20px',
  width: '493px',
  color: 'black',
};

const CheckNickBtn = styled.button`
  font-family: NanumGothic;
  font-size: 14px;
  width: 57px;
  text-decoration: underline;
  cursor: pointer;
`;

const ShowPwdBtn = styled.button`
  border: 0;
  background-image: url(${showPassword});
  width: 21px;
  height: 27px;
  cursor: pointer;
  background-size: contain;
`;

/**
 * @author Ssong
 * @description Input Molescules
 * @param {Props} label label for input area
 * @param {Props} placeHolder example text for input area
 * @param {Props} option optional btn
 *
 * @example

 * <View style={{width: someWidth, height: someHeight}}>
 *   <Button onPress={handleClick}>
 *     <Text>메뉴 추가하기</Text>
 *   </Button>
 * </View>
**/

const InputForm = ({ purpose, label, placeholder, option }: InputFormProps) => {
  return (
    <form>
      <Label>{label}</Label>
      <input style={InputStyle} placeholder={placeholder} />
      {option === '중복확인' ? <CheckNickBtn onClick={() => onSubmit}>중복확인</CheckNickBtn> : <ShowPwdBtn />}
    </form>
  );
};

export default InputForm;
