import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { FormValue } from '../../api/authService';
import { userInfo, UserInfoType } from '../../recoil/atom';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 0px 0px 50px;
  border-left: 1px solid #a8a8a8;
  align-items: center;
`;

const Title = styled.text`
  position: absolute;
  top: 95px;
  font-family: 'NanumGothic';
  font-size: 20px;
  font-weight: 600;
`;

const PwdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const NickWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyAccount = () => {
  const user = useRecoilValue<UserInfoType>(userInfo);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' });

  const crtVal = watch();

  return (
    <Container>
      <Title>계정 정보</Title>
      <PwdWrapper>
        <InputForm reg={register} error={errors} label='Current Password' purpose='password' placeholder='현재 비밀번호를 입력해주세요.' option='비밀번호확인' crtVal={crtVal} />
        <InputForm reg={register} error={errors} label='New Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.' option='비밀번호확인' crtVal={crtVal} />
        <InputForm reg={register} error={errors} label='New Password Confirm' purpose='password_confirm' placeholder='비밀번호를 다시 입력해주세요.' option='비밀번호확인' crtVal={crtVal} />
        <Button width={230}>비밀번호 변경</Button>
      </PwdWrapper>
      <NickWrapper>
        <InputForm reg={register} error={errors} label='Nickname' purpose='nickname' placeholder={user.name} option='중복확인' crtVal={crtVal} />
        <Button width={230}>닉네임 변경</Button>
      </NickWrapper>
    </Container>
  );
};

export default MyAccount;
