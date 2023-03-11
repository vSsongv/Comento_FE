import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { FormValue } from '../../api/authService';
import { userInfo, UserInfoType } from '../../recoil/atom';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NickForm = () => {
  const user = useRecoilValue<UserInfoType>(userInfo);
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
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputForm reg={register} error={errors} label='Nickname' purpose='nickname' placeholder={user.name} option='중복확인' crtVal={crtVal} />
      <Button width={230}>닉네임 변경</Button>
    </Container>
  );
};

export default NickForm;
