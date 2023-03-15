import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import GlobalStyle from './frontend/styles/GlobalStyle';
import colors from './frontend/styles/colors';
import Home from './frontend/pages/Home';
import SignIn from './frontend/pages/SignIn';
import SignUp from './frontend/pages/SignUp';
import Header from './frontend/components/organisms/Header';
import Question from './frontend/pages/Question';
import Answer from './frontend/pages/Answer';
import Footer from './frontend/components/molescules/Footer';
import { ScrollToTop } from './frontend/utils/ScrollToTop';
import { useCookies } from 'react-cookie';
import { refresh } from './frontend/api/authService';
import { signInState, userInfo, UserInfoType } from './frontend/recoil/atom';
import CheckAuth from './frontend/utils/CheckAuth';
import MyPage from './frontend/pages/MyPage';

function App() {
  const [cookies] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState<UserInfoType>(userInfo);
  const setSignInState = useSetRecoilState<boolean>(signInState);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function Refresh() {
      setLoading(true);
      try {
        if (await refresh(cookies['refresh-token'], cookies, setUserInfo, setSignInState)) {
          setSignInState(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (cookies['refresh-token']) {
      Refresh();
    }
  }, []);

  return (
    <div className='App'>
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          {loading ? (
            <div>loading</div>
          ) : (
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/signIn' element={<SignIn />}></Route>
              <Route path='/signUp' element={<SignUp />}></Route>
              <Route element={<CheckAuth />}>
                <Route path='/question' element={<Question />}></Route>
                <Route path='/answer' element={<Answer />}></Route>
                <Route path='/myPage' element={<MyPage />} />
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
