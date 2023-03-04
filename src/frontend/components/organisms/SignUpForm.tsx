import React, { useState } from 'react';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';
import styled from 'styled-components';
import ImageAddForm from '../molescules/ImageAddForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValue, signUp } from '../../api/authService';
import { useNavigate } from 'react-router-dom';

const SignUpFormContainer = styled.form`
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
`;

const SignUpForm = () => {
  const formData: FormData = new FormData();
  const navigate = useNavigate();

  const [availableEmail, setAvailableEmail] = useState<boolean>(false);
  const [availableNick, setAvailableNick] = useState<boolean>(false);
  const [availablePhone, setAvailablePhone] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      phone: data.phone,
    };
    formData.append('data', JSON.stringify(userData));

    if (!availableEmail) {
      alert('이메일 중복확인 체크를 해주세요.');
    } else if (!availableNick) {
      alert('닉네임 중복확인 체크를 해주세요.');
    } else if (!availablePhone) {
      alert('번호 중복확인 체크를 해주세요.');
    } else if ((await signUp(formData)) === true) {
      navigate('/signIn');
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' });

  const crtVal = watch();

  return (
    <SignUpFormContainer onSubmit={handleSubmit(onSubmit)}>
      <ImageAddForm formData={formData} />
      <InputForm
        reg={register}
        error={errors}
        label='E-mail'
        purpose='email'
        placeholder='comento@mentos.com 형식으로 입력해주세요.'
        crtVal={crtVal}
        option='중복확인'
        setAvailable={setAvailableEmail}
      />
      <InputForm reg={register} error={errors} label='Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.' option='비밀번호확인' crtVal={crtVal} />
      <InputForm reg={register} error={errors} label='Password Confirmation' purpose='password_confirm' placeholder='비밀번호를 다시 입력해주세요.' option='비밀번호확인' crtVal={crtVal} />
      <InputForm reg={register} error={errors} label='Nickname' purpose='nickname' placeholder='닉네임을 입력해주세요.' option='중복확인' crtVal={crtVal} setAvailable={setAvailableNick} />
      <InputForm
        reg={register}
        error={errors}
        label='Phone Number'
        purpose='phone'
        placeholder='- 제외 휴대폰 번호를 입력해주세요.'
        option='중복확인'
        crtVal={crtVal}
        setAvailable={setAvailablePhone}
      />

      <Button width={230}>동의하고 가입하기</Button>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
