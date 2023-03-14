import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { askMentoRole } from '../../api/userService';
import { userInfo, UserInfoType } from '../../recoil/atom';
import Button from '../atoms/Button';

interface ReqProps {
  email: string;
  content: string;
}

const Desc = styled.span`
  color: black;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
`;

const Form = styled.form``;

const Input = styled.input`
  display: block;
  padding: 5px;
  width: 610px;
`;

const TextArea = styled.textarea`
  margin-top: 15px;
  width: 610px;
  height: 120px;
  padding: 10px;
  resize: none;
`;

const Wrapper = styled.div`
  text-align: right;
`;

const MentoAuthReq = () => {
  const user = useRecoilValue<UserInfoType>(userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReqProps>();

  const onSubmit: SubmitHandler<ReqProps> = (data) => {
    askMentoRole(data.email === '' ? user.email : data.email, data.content);
  };

  return (
    <>
      <Desc>
        본인의 깃허브 링크와 함께 개발 관련 경험을 간단히 서술해주세요(200자 이내).
        <br /> 입력하신 이메일로 멘토 권한 승인 결과가 발송되며 최대 3~4일 소요됩니다. <br />
        (이메일을 입력하지 않으시면 가입하신 이메일로 전송됩니다.)
      </Desc>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('email')} placeholder={user.email}></Input>
        <TextArea
          {...register('content', { required: true, maxLength: 200 })}
          maxLength={200}
          placeholder=' 깃허브 링크: https://github.com/github
        개발 관련 경험: 간단한 CRUD 웹사이트를 개발해본 경험이 있습니다. / 백준 gold4 입니다.'
        />
        {errors.content && <small style={{ color: 'red' }}>정보를 입력해주세요.</small>}
        <Wrapper>
          <Button height={30} width={78} fontSize={12}>
            제출하기
          </Button>
        </Wrapper>
      </Form>
    </>
  );
};

export default MentoAuthReq;
