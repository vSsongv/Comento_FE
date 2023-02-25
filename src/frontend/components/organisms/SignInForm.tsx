import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';
import { FormValue, SignIn } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { signInState, userInfo, UserInfoType } from '../../recoil/atom';

const SignInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

interface SignInFormProps {
  keepSignIn: boolean;
}

const SignInForm = ({ keepSignIn }: SignInFormProps) => {
  const navigate = useNavigate();
  const setSignInState = useSetRecoilState(signInState);
  const setUserInfo = useSetRecoilState<UserInfoType>(userInfo);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const userData = {
      email: data.email,
      password_signin: data.password_signin,
      isKeep: keepSignIn,
      setUserInfo: setUserInfo,
    };
    if (await SignIn(userData)) {
      setSignInState(true);
      navigate(-1);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  return (
    <SignInFormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputForm reg={register} error={errors} label='E-mail' purpose='email' placeholder='이메일을 입력해주세요.' />
      <InputForm
        reg={register}
        error={errors}
        label='Password'
        purpose='password_signin'
        placeholder='비밀번호를 입력해주세요.'
        option='비밀번호확인'
      />
      <Button width={180}>로그인</Button>
    </SignInFormContainer>
  );
};

export default SignInForm;
