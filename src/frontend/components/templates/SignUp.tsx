import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import ImageAddForm from '../molescules/ImageAddForm';
import SignLogo from '../../assets/images/SignLogo.png';
import InputForm from '../molescules/InputForm';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormValue {
  email: string;
  password: string;
  password_signin: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

const SignUpContainer = styled.div`
  width: 785px;
  height: 1050px;
  background: white;
  box-shadow: 0 0 10px black;
  margin: auto;
  margin-top: 120px;
  padding-top: 50px;
  padding-left: 140px;
  padding-right: 140px;
  text-align: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SignUp = () => {
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log('dsfdsfdf');
    console.log(data.password);
    console.log(data.password_confirm);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const crtPassword = useRef('');
  crtPassword.current = watch('password');

  return (
    <SignUpContainer>
      <img src={SignLogo} />
      <ImageAddForm />
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <InputForm reg={register} error={errors} label='E-mail' purpose='email' placeholder='comento@mentos.com 형식으로 입력해주세요.' option='중복확인' />
        <InputForm reg={register} error={errors} label='Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.' option='비밀번호확인' />
        <InputForm
          crtPassword={crtPassword.current}
          reg={register}
          error={errors}
          label='Password Confirmation'
          purpose='password_confirm'
          placeholder='비밀번호를 다시 입력해주세요.'
          option='비밀번호확인'
        />
        <InputForm reg={register} error={errors} label='Nickname' purpose='nickname' placeholder='닉네임을 입력해주세요.' option='중복확인' />
        <InputForm reg={register} error={errors} label='Phone Number' purpose='phone' placeholder='- 제외 휴대폰 번호를 입력해주세요.' option='중복확인' />

        <Button width={230}>동의하고 가입하기</Button>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
