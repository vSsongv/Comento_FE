import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './frontend/styles/GlobalStyle';
import colors from './frontend/styles/colors';
import Home from './frontend/components/pages/Home';
import SignIn from './frontend/components/pages/SignIn';
import SignUp from './frontend/components/pages/SignUp';
import HeaderContainer from './frontend/components/UI/organisms/HeaderContainer';
import Question from './frontend/components/pages/Question';
import Answer from './frontend/components/pages/Answer';
import Footer from './frontend/components/UI/molescules/Footer';

function App() {
  return (
    <div className='App'>
      <RecoilRoot>
        <ThemeProvider theme={colors}>
          <GlobalStyle />
          <BrowserRouter>
            <HeaderContainer />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/signIn' element={<SignIn />}></Route>
              <Route path='/signUp' element={<SignUp />}></Route>
              <Route path='/question' element={<Question />}></Route>
              <Route path='/answer' element={<Answer />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
