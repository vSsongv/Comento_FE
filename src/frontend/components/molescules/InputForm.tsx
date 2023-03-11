import React, { useRef, useState } from 'react';
import { FieldValues, UseFormRegister, FieldErrors, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isDuple } from '../../api/authService';
import hidePasswordImg from '../../assets/images/hidePassword.png';
import showPasswordImg from '../../assets/images/ShowPassword.png';

interface InputFormProps {
  purpose: 'email' | 'password' | 'crt_password' | 'password_confirm' | 'nickname' | 'phone';
  label: string;
  placeholder: string;
  option?: string;
  crtVal: FormValue;
  setAvailable?: React.Dispatch<React.SetStateAction<boolean>>;
  reg: UseFormRegister<FormValue>;
  error: FieldErrors<FormValue>;
}

interface FormValue {
  email: string;
  crt_password: string;
  password: string;
  password_confirm: string;
  nickname: string;
  phone: string;
}

interface PwdState {
  state: string;
}

const Container = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-family: 'NanumGothic';
  font-weight: 600;
  color: #858585;
  margin-bottom: 6px;
  text-align: left !important;
`;

const InputStyle = {
  backgroundColor: '#efefef',
  border: 'none',
  padding: '25px',
  fontFamily: 'NanumGothic',
  fontSize: '14px',
  height: '63px',
  borderRadius: '20px',
  width: '493px',
  color: 'black',
};

const CheckNickBtn = styled.button`
  font-family: NanumGothic;
  font-size: 14px;
  width: 57px;
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
  padding-top: 5%;
  margin-right: 5%;
  right: 0;
`;

const ShowPwdBtn = styled.button<PwdState>`
  border: 0;
  background-image: url(${(props) => (props.state === 'password' ? showPasswordImg : hidePasswordImg)});
  width: 21px;
  height: 27px;
  cursor: pointer;
  background-size: contain;
  position: absolute;
  margin-top: 3.5%;
  margin-right: 5%;
  right: 0;
`;

/**
 * @author Ssong
 * @description Input Molescules
 * @param {Props} purpose purpose for input
 * @param {Props} reg register for react hook form
 * @param {Props} error error for react hook forrm
 * @param {Props} label label for input area
 * @param {Props} placeHolder example text for input area
 * @param {Props} option optional btn(optional)
 * @param {Props} crtPassword for password_confirm checked(optional)
 *
 * @example
 * <InputForm reg={register} error={errors} label='E-mail' purpose='email' placeholder='이메일을 입력해주세요.' />
 **/

const InputForm = ({ purpose, reg, error, label, placeholder, option, crtVal, setAvailable }: InputFormProps) => {
  const isPwd = purpose === 'password' || purpose === 'password_confirm' || purpose === 'crt_password';
  const [type, setType] = useState(isPwd ? 'password' : 'text');

  const showPwd = (): void => {
    type === 'password' ? setType('text') : setType('password');
  };

  const checkPwd = (value: string | number): string | boolean => {
    return value === crtVal?.password || '* 비밀번호가 다릅니다.';
  };

  const checkDuple = async (purpose: 'email' | 'password' | 'crt_password' | 'password_confirm' | 'nickname' | 'phone', crtVal: FormValue): Promise<void> => {
    if (error[purpose]) return;
    if (setAvailable && (await isDuple(purpose, crtVal))) setAvailable(true);
  };

  const rule: { [key: string]: FieldValues } = {
    email: {
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: '* 이메일 형식에 맞지 않습니다.',
      },
    },
    password: {
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: '* 영소문자, 숫자, 특수문자 포함 8자 이상으로 조합해주세요.',
      },
    },
    nickname: {
      pattern: {
        value: /^[A-Za-z가-힣]{1,10}$/,
        message: '* 10자 이내 영어,한글로 된 닉네임을 입력해주세요.',
      },
    },
    phone: {
      pattern: {
        value: /^\d{3}\d{3,4}\d{4}$/,
        message: '* 올바르지 않은 형식입니다.',
      },
    },
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Wrapper>
        <input
          type={type}
          style={InputStyle}
          placeholder={placeholder}
          {...reg(purpose, {
            required: isPwd ? `* password값은 필수값입니다.` : `* ${purpose}값은 필수값입니다.`,
            ...rule[purpose],
            validate: purpose === 'password_confirm' ? (value) => checkPwd(value) : undefined,
          })}
        />
        {option === '중복확인' ? (
          <CheckNickBtn type='button' onClick={() => checkDuple(purpose, crtVal)}>
            중복확인
          </CheckNickBtn>
        ) : option === '비밀번호확인' ? (
          <ShowPwdBtn type='button' state={type} onClick={showPwd}></ShowPwdBtn>
        ) : (
          ''
        )}
      </Wrapper>
      {error[purpose] && (
        <small style={{ color: 'red', position: 'absolute', right: '0', marginRight: '5px' }} role='alert'>
          {error[purpose]?.message}
        </small>
      )}
    </Container>
  );
};

export default InputForm;
