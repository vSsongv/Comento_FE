import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { FormValue } from '../../api/authService';
import { changeNick } from '../../api/userService';
import { userInfo, UserInfoType } from '../../recoil/atom';
import Button from '../atoms/Button';
import InputForm from '../molescules/InputForm';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NickForm = () => {
  const [user, setUser] = useRecoilState<UserInfoType>(userInfo);
  const [availableNick, setAvailableNick] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const crtVal = watch();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    if (!availableNick) {
      alert('닉네임 중복확인 체크를 해주세요.');
    } else {
      const nickname = await changeNick(data.nickname);
      setUser({ ...user, nickname: nickname });
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputForm reg={register} error={errors} label='Nickname' purpose='nickname' placeholder={user.nickname} option='중복확인' crtVal={crtVal} setAvailable={setAvailableNick} />
      <Button width={230}>닉네임 변경</Button>
    </Container>
  );
};

export default NickForm;
