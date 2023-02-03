import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import showPassword from '../../../assets/images/ShowPassword.png';

interface InputFormProps {
  purpose: 'email' | 'password' | 'password_confirm' | 'nickname' | 'phone';
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
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>{label}</Label>
      <input
        style={InputStyle}
        placeholder={placeholder}
        {...register(purpose, {
          required: `${purpose}값은 필수값입니다.`,
          minLength: {
            value: 8,
            message: '영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.',
          },
        })}
      />
      {errors[purpose] && <small role='alert'>{errors[purpose]?.message}</small>}
      {option === '중복확인' ? <CheckNickBtn onClick={() => onSubmit}>중복확인</CheckNickBtn> : <ShowPwdBtn />}
    </form>
  );
};

export default InputForm;
