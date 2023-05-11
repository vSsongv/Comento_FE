import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';
import colors from './styles/colors';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/organisms/Header';
import Question from './pages/Question';
import Footer from './components/molescules/Footer';
import { ScrollToTop } from './utils/ScrollToTop';
import { useCookies } from 'react-cookie';
import { refresh } from './api/authService';
import { crtRoleAtom, launchingModalVisibleState, signInState, userInfo, UserInfoType } from './recoil/atom';
import CheckAuth from './utils/CheckAuth';
import MyPage from './pages/MyPage';
import Chatting from './pages/Chatting';
import QuestionLists from './pages/QuestionLists';
import LaunchingModal from './components/molescules/LaunchingModal';

function App() {
  const [cookies] = useCookies(['refresh-token']);
  const [userInfoVal, setUserInfo] = useRecoilState<UserInfoType>(userInfo);
  const setSignInState = useSetRecoilState<boolean>(signInState);
  const setCrtRole = useSetRecoilState<string>(crtRoleAtom);
  const [modalVisible] = useRecoilState<boolean>(launchingModalVisibleState);
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

  useEffect(() => {
    if (userInfoVal.role === 'Q') setCrtRole('mentee');
    else setCrtRole('mentor');
  }, [userInfoVal.role]);

  return (
    <div className='App'>
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          {loading ? null : (
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signIn' element={<SignIn />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route element={<CheckAuth />}>
                <Route path='/question' element={<Question />}>
                  <Route path='edit/:questionId' element={<Question />} />
                </Route>
                <Route path='/questionList/:role' element={<QuestionLists />} />
                <Route path='/myPage' element={<MyPage />} />
                <Route path='/chatting/:roomid' element={<Chatting />} />
              </Route>
            </Routes>
          )}
          <Footer />
          {modalVisible ? <LaunchingModal /> : null}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
