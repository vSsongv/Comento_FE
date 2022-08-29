import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './frontend/styles/GlobalStyle';
import { theme } from './frontend/styles/theme';
import Home from './frontend/components/pages/Home';
import Login from './frontend/components/pages/Login';
import HeaderContainer from './frontend/components/UI/organisms/HeaderContainer';
import Answer from './frontend/components/pages/Answer';

function App() {
  return (
    <div className='App'>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <HeaderContainer />
            <Routes>
              <Route path='/' element={<Answer />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/answer' element={<Answer />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
