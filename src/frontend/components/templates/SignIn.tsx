import React from 'react';
import Button from '../atoms/Button';
import SignLogo from '../../assets/images/SignLogo.png';
import toSignUp from '../../assets/images/signup.png';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputForm from '../molescules/InputForm';
import { Link } from 'react-router-dom';

interface FormValue {
  email: string;
  password_signin: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

const SignInContainer = styled.div`
  width: 785px;
  height: 465px;
  position: relative;
  background: white;
  box-shadow: 0 0 10px black;
  margin: auto;
  margin-top: 120px;
  padding-top: 50px;
  padding-left: 140px;
  padding-right: 140px;
  text-align: center;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const SignUpLink = styled(Link)`
  font-family: 'NanumGothic';
  cursor: pointer;
  text-decoration: none;
  color: black;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 20px;
  margin-left: 50px;
`;

const SignUpImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const onSubmit: SubmitHandler<FormValue> = (data) => {
  console.log('dsfdsfdf');
  console.log(data.password);
  console.log(data.password_confirm);
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  return (
    <SignInContainer>
      <img src={SignLogo} />
      <SignInForm onSubmit={handleSubmit(onSubmit)}>
        <InputForm reg={register} error={errors} label='E-mail' purpose='email' placeholder='이메일을 입력해주세요.' />
        <InputForm reg={register} error={errors} label='Password' purpose='password_signin' placeholder='비밀번호를 입력해주세요.' option='비밀번호확인' />
        <Button width={180}>로그인</Button>
      </SignInForm>
      <SignUpImg src={toSignUp} />
      {/* <img style={{ width: '20px', height: '20px', position: 'absolute' }} src={toSignUp} /> */}
      <SignUpLink to='/signup'>회원가입 하기</SignUpLink>
    </SignInContainer>
  );
};

export default SignIn;
