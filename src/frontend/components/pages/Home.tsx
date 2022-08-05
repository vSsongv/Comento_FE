import React from "react";
import Button from "../UI/atoms/Button";

function Home() {
  return (
    <div>
      홈페이지 입니다
      <Button color="white" gradient={true} border={false} long={true}>
        로그인
      </Button>
    </div>
  );
}

export default Home;
