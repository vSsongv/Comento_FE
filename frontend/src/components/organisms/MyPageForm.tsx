import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { FormValue } from '../../api/authService';
import { userInfo, UserInfoType } from '../../recoil/atom';
import InputForm from '../molescules/InputForm';

const MyPageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyPageForm = () => {
  const user = useRecoilValue<UserInfoType>(userInfo);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' });

  const crtVal = watch();

  return (
    <MyPageFormContainer>
      <InputForm
        reg={register}
        error={errors}
        label='Current Password'
        purpose='password'
        placeholder='현재 비밀번호를 입력해주세요.'
        option='비밀번호확인'
        crtVal={crtVal}
      />
      <InputForm
        reg={register}
        error={errors}
        label='New Password'
        purpose='password'
        placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.'
        option='비밀번호확인'
        crtVal={crtVal}
      />
      <InputForm
        reg={register}
        error={errors}
        label='New Password Confirm'
        purpose='password_confirm'
        placeholder='비밀번호를 다시 입력해주세요.'
        option='비밀번호확인'
        crtVal={crtVal}
      />
      <InputForm
        reg={register}
        error={errors}
        label='Nickname'
        purpose='nickname'
        placeholder={user.nickname}
        option='중복확인'
        crtVal={crtVal}
      />
    </MyPageFormContainer>
  );
};

export default MyPageForm;
