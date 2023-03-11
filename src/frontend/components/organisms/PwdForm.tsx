import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FormValue } from '../../api/authService';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.span`
  position: absolute;
  top: 95px;
  font-family: 'NanumGothic';
  font-size: 20px;
  font-weight: 600;
`;

const PwdForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const crtVal = watch();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Title>계정 정보</Title>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <InputForm reg={register} error={errors} label='Current Password' purpose='crt_password' placeholder='현재 비밀번호를 입력해주세요.' option='비밀번호확인' crtVal={crtVal} />
        <InputForm reg={register} error={errors} label='New Password' purpose='password' placeholder='영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.' option='비밀번호확인' crtVal={crtVal} />
        <InputForm reg={register} error={errors} label='New Password Confirm' purpose='password_confirm' placeholder='비밀번호를 다시 입력해주세요.' option='비밀번호확인' crtVal={crtVal} />
        <Button width={230}>비밀번호 변경</Button>
      </Container>
    </>
  );
};

export default PwdForm;
