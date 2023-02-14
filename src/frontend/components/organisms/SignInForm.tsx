import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';

interface FormValue {
  email: string;
  password: string;
  password_signin: string;
  password_confirm: string;
  nickname: string;
  phone: number;
}

const SignInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const SignInForm = () => {
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log('dsfdsfdf');
    console.log(data.password);
    console.log(data.password_confirm);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  return (
    <SignInFormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputForm reg={register} error={errors} label='E-mail' purpose='email' placeholder='이메일을 입력해주세요.' />
      <InputForm reg={register} error={errors} label='Password' purpose='password_signin' placeholder='비밀번호를 입력해주세요.' option='비밀번호확인' />
      <Button width={180}>로그인</Button>
    </SignInFormContainer>
  );
};

export default SignInForm;
