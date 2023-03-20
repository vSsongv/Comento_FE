import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';
import colors from './styles/colors';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/organisms/Header';
import Question from './pages/Question';
import Answer from './pages/Answer';
import Footer from './components/molescules/Footer';
import { ScrollToTop } from './utils/ScrollToTop';
import { useCookies } from 'react-cookie';
import { refresh } from './api/authService';
import { signInState, userInfo, UserInfoType } from './recoil/atom';
import CheckAuth from './utils/CheckAuth';
import MyPage from './pages/MyPage';
import Chatting from './pages/Chatting';

function App() {
  const [cookies] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState<UserInfoType>(userInfo);
  const setSignInState = useSetRecoilState<boolean>(signInState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function Refresh() {
      setLoading(true);
      try {
        if (await refresh(cookies['refresh-token'], cookies, setUserInfo, setSignInState)) {
          setSignInState(true);
        } else {
          sessionStorage.removeItem('token_exp');
        }
      } catch (err) {
        console.log(err);
        sessionStorage.removeItem('token_exp');
      } finally {
        setLoading(false);
      }
    }
    if (cookies['refresh-token']) {
      Refresh();
    } else {
      setLoading(false);
      sessionStorage.removeItem('token_exp');
    }
  }, []);

  return (
    <div className='App'>
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          {loading ? null : (
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/signIn' element={<SignIn />}></Route>
              <Route path='/signUp' element={<SignUp />}></Route>
              <Route element={<CheckAuth />}>
                <Route path='/question' element={<Question />}></Route>
                <Route path='/answer' element={<Answer />}></Route>
                <Route path='/myPage' element={<MyPage />} />
                <Route path='/chatting/:roomid' element={<Chatting />} />
              </Route>
            </Routes>
          )}
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
