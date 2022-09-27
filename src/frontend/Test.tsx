import axios from 'axios';
import React, { useState } from 'react';
import Button from './components/UI/atoms/Button';

const Test = () => {
  const baseURL = 'http://comento.co.kr';
  const [InputValue, setInputValue] = useState<string>('');

  const testQuery = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/user/signup/nickCheck`, {
        params: {
          userNickname: InputValue,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type='text' onChange={(e) => setInputValue(e.target.value)}></input>
      <Button color='white' gradient={true} border={false} onClick={testQuery}>
        test
      </Button>
    </div>
  );
};

export default Test;
