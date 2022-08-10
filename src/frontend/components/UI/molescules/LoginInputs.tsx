import React, { useState, useRef } from "react";
import styled from "styled-components";
import showPassword from "../../../assets/images/showPassword.png";

const TextBoxLabel = styled.p`
  font-weight: bold;
  font-family: NanumGothic;
  font-size: 14px;
  margin: 0 0 6px 0;
  color: #858585;
`;
const TextBoxDiv = styled.div`
  height: 63px;
  border-radius: 20px;
  background-color: #efefef;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
  color: black;
`;
const RedLine = styled.div`
  height: 3px;
  margin: -3px 20px 0 20px;
`;
const RedText = styled.p`
  text-align: right;
  font-size: 10px;
  font-family: NanumGothic;
  margin: 0 20px 0 0;
  padding-top: 5px;
  color: #ff0000;
`;
const DoubleCheckBtn = styled.p`
  font-family: NanumGothic;
  font-size: 14px;
  width: 57px;
  text-decoration: underline;
  cursor: pointer;
`;
const ShowPasswordBtn = styled.button`
  border: 0;
  background-image: url(${showPassword});
  width: 21px;
  height: 27px;
  cursor: pointer;
  background-size: contain;
`;
const TextBoxInputStyle = {
  backgroundColor: "transparent",
  border: "0",
  outlineWidth: "0",
  color: "#858585",
  fontFamily: "NanumGothic",
  fontSize: "14px",
  flexGrow: "1",
  marginRight: "10px",
};

interface _LoginInputProps {
  title: string;
  value: string;
  password: boolean;
  doubleCheck: boolean;
  onChange: ((value: string) => void) | null;
  onDoubleCheckClick: ((value: string) => void) | null;
  errorMessage: string | null;
}
interface RegularLoginInputProps {
  title: string;
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}
interface DoubleCheckLoginInputProps {
  title: string;
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onDoubleCheckClick?: (value: string) => void;
}

export default function regular(props: RegularLoginInputProps) {
  return (
    <LoginInput
      title={props.title}
      value={props.value ?? ""}
      password={false}
      doubleCheck={false}
      onChange={props.onChange ?? null}
      onDoubleCheckClick={null}
      errorMessage={props.errorMessage ?? null}
    />
  );
}
export function password(props: RegularLoginInputProps) {
  return (
    <LoginInput
      title={props.title}
      value={props.value ?? ""}
      password={true}
      doubleCheck={false}
      onChange={props.onChange ?? null}
      onDoubleCheckClick={null}
      errorMessage={props.errorMessage ?? null}
    />
  );
}
export function doubleCheck(props: DoubleCheckLoginInputProps) {
  return (
    <LoginInput
      title={props.title}
      value={props.value ?? ""}
      password={false}
      doubleCheck={true}
      onChange={props.onChange ?? null}
      onDoubleCheckClick={props.onDoubleCheckClick ?? null}
      errorMessage={props.errorMessage ?? null}
    />
  );
}

function LoginInput(props: _LoginInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(props.value);
  const [showPassword, setShowPassword] = useState(true);
  const [pwEnabled, dcEnabled] = [props.password, props.doubleCheck];

  return (
    <div onClick={() => ref.current?.focus()} style={{ cursor: "text", width: '493px' }}>
      <TextBoxLabel>{props.title}</TextBoxLabel>
      <TextBoxDiv>
        <input
          type={showPassword ? "text" : "password"}
          name={pwEnabled ? "password" : "loginInput"}
          ref={ref}
          style={Object.assign(
            {},
            TextBoxInputStyle,
            clicked ? { color: "black" } : {}
          )}
          value={value}
          onChange={(e) => {
            props.onChange?.(e.target.value);
            setValue(e.target.value);
          }}
          onFocus={() => {
            if (!clicked) {
              pwEnabled && setShowPassword(false);
              setClicked(true);
              setValue("");
            }
          }}
        />
        {!pwEnabled ? (
          <></>
        ) : (
          <ShowPasswordBtn onClick={() => setShowPassword(!showPassword)} />
        )}
        {!dcEnabled ? (
          <></>
        ) : (
          <DoubleCheckBtn
            onClick={() => {
              clicked && props.onDoubleCheckClick?.(String(value));
            }}
          >
            중복 확인
          </DoubleCheckBtn>
        )}
      </TextBoxDiv>

      <RedLine
        style={{ backgroundColor: props.errorMessage ? "#FF0000" : "#EFEFEF" }}
      />
      <div style={{ height: "21px" }}>
        {props.errorMessage && <RedText>* {props.errorMessage}</RedText>}
      </div>
    </div>
  );
}
