import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./frontend/styles/GlobalStyle";
import { theme } from "./frontend/styles/theme";
import Home from "./frontend/components/pages/Home";
import Login from "./frontend/components/pages/Login";
import HeaderContainer from "./frontend/components/UI/organisms/HeaderContainer";
import Question from "./frontend/components/pages/Question";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <HeaderContainer />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/question" element={<Question />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
