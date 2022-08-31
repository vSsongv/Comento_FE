import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import * as Login from '../molescules/LoginInputs';
import LoginModal from '../molescules/LoginModal';
import { useState } from 'react';

const RootContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RememberMeContainer = styled.div`
  width: 784px;
  padding-left: 26px;
`;
const RememberMeLabel = styled.span`
  font-family: NanumGothic;
  font-size: 14px;
  margin-left: 12px;
`;
const Space = styled.div`
  height: 20px;
`;
const BigSpace = styled.div`
  height: 40px;
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

function SignInModal({ onLogin }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  return (
    <RootContainer>
      <LoginModal width={'784px'} height={'495px'}>
        <Space />
        <Login.default title='E-mail' value='이메일을 입력해주세요.' onChange={(s) => setEmail(s)} errorMessage={emailError} />
        <Login.password title='Password' value='비밀번호를 입력해주세요.' onChange={(s) => setPw(s)} errorMessage={pwError} />

        <Space />
        <div
          onClick={() => {
            const response = onLogin(email, pw, rememberUser);
            if (response.success) return;
            if ('emailError' in response) setEmailError(String(response.emailError));
            if ('pwError' in response) setPwError(String(response.pwError));
          }}>
          <Button long>로그인</Button>
        </div>

        <BigSpace />
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
      </LoginModal>
    </RootContainer>
  );
}

export default SignInModal;
