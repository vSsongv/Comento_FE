import axios from 'axios';
import styled, { css } from 'styled-components';
import React, { useState } from 'react';

const Button = styled.button`
  width: 50px;
  height: 30px;
`;

const Test = () => {
  const baseURL = 'http://localhost:8080';
  const [InputValue, setInputValue] = useState<string>('');

  const testQuery = async () => {
    try {
      // loading 상태를 true 로 바꿉니다.
      const { data } = await axios.get(`http://localhost:8080/user/signup/nickcheck?userNickname=${InputValue}`);
      console.log(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <input type='text' onChange={(e) => setInputValue(e.target.value)}></input>
      <Button onClick={testQuery}>test</Button>
    </div>
  );
};

export default Test;
