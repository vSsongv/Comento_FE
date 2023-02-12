import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../UI/atoms/Button';
import ImageAddForm from '../UI/molescules/ImageAddForm';
import SignLogo from '../../assets/images/SignLogo.png';
import SignUpInputs from '../UI/organisms/SignUpInputs';
import InputForm from '../UI/molescules/InputForm';
import { SubmitHandler, useForm } from 'react-hook-form';

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

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

interface FormValue {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const pwdConfirmRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const phoneConfirmRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log('sfd');
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  return (
    <SignUpContainer>
      <img src={SignLogo} />
      <ImageAddForm />
      {/* <SignUpInputs /> */}
      <Container onSubmit={handleSubmit(onSubmit)}>
        <InputForm reg={register} error={errors} label='E-mail' purpose='email' placeholder='comento@mentos.com 형식으로 입력해주세요.' option='중복확인' />
        <InputForm reg={register} error={errors} label='Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요..' option='비밀번호확인' />
        <InputForm reg={register} error={errors} label='Password Confirmation' purpose='password_confirm' placeholder='비밀번호를 다시 입력해주세요.' option='비밀번호확인' />
        {/* <InputForm reg={register} error={errors} label='Nickname' purpose='nickname' placeholder='닉네임을 입력해주세요.' option='중복확인' /> */}
        {/* <InputForm reg={register} error={errors} label='Phone Number' purpose='phone' placeholder='- 제외 휴대폰 번호를 입력해주세요.' option='중복확인' /> */}

        <Button width={230}>동의하고 가입하기</Button>
      </Container>
    </SignUpContainer>
  );
};

export default SignUp;
