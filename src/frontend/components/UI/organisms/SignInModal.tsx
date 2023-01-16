import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import * as Login from '../molescules/LoginInputs';
import LoginModal from '../molescules/LoginModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RootContainer = styled.div`
  max-width: 784px;
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top: 105px;
`;

const SignInInputs = styled.div`
  margin-bottom: 20px;
`;

const Opstions = styled.div`
  width: 100%;
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;

const SignUpLink = styled(Link)`
  font-family: NanumGothic;
  text-decoration: none;
  color: black;
  font-size: 14px;
  margin-left: 26px;
`;

const RememberMeContainer = styled.div`
  padding-right: 26px;
  text-align: right;
`;
const RememberMeLabel = styled.span`
  font-family: NanumGothic;
  font-size: 14px;
  margin-left: 12px;
`;

interface SignInResultData {
  success: boolean;
  emailError?: string;
  pwError?: string;
  etcError?: string;
}
interface SignInModalProps {
  onLogin: (email: string, pw: string, rememberUser: boolean) => SignInResultData;
}

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const getEmailError = (s: string) => {
  if (!s) return '이메일을 입력하세요.';
  else return emailRegex.test(s) ? '' : '이메일의 형식이 올바르지 않습니다.';
};

function SignInModal({ onLogin }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  return (
    <RootContainer>
      <LoginModal width={'100%'} height={'495px'}>
        <SignInInputs>
          <Login.default
            title='E-mail'
            value='이메일을 입력해주세요.'
            onChange={(s) => {
              setEmail(s);
              setEmailError(getEmailError(s));
            }}
            errorMessage={emailError}
          />
          <Login.password title='Password' value='비밀번호를 입력해주세요.' onChange={(s) => setPw(s)} errorMessage={pwError} />
        </SignInInputs>
        <div
          onClick={() => {
            if (emailError || !email) return;
            const response = onLogin(email, pw, rememberUser);
            if (response.success) return;
            if ('emailError' in response) setEmailError(String(response.emailError));
            if ('pwError' in response) setPwError(String(response.pwError));
          }}>
          <Button long>로그인</Button>
        </div>
        <Opstions>
          <SignUpLink to='/signUp'>회원가입</SignUpLink>
          <RememberMeContainer>
            <input
              type='checkbox'
              name='rememberUser'
              value='remember'
              onClick={(e) => {
                setRememberUser(e.currentTarget.checked);
              }}
            />
            <RememberMeLabel>로그인 정보를 저장하시겠습니까?</RememberMeLabel>
          </RememberMeContainer>
        </Opstions>
      </LoginModal>
    </RootContainer>
  );
}

export default SignInModal;
