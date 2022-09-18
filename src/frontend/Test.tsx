import axios from 'axios';
import React, { useState } from 'react';
import Button from './components/UI/atoms/Button';

const Test = () => {
  const baseURL = 'http://3.37.84.147:8001';
  const [InputValue, setInputValue] = useState<string>('');

  // const testQuery = async (input: string) => {
  //   try {
  //     const { data } = await axios.get<{ status: number }>(`${baseURL}/user/signup/nickcheck`, {
  //       nickname: input,
  //     });
  //     console.log(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <input type='text' onChange={(e) => setInputValue(e.target.value)}></input>
      {/* <Button onClick={testQuery(InputValue)}>test</Button> */}
    </div>
  );
};

export default Test;
