import React, { useState, useCallback, useEffect } from 'react';
import './css/index.css';
import { auth } from '@config/firebaseApp';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layouts';
function Login() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const history = useHistory();
  const dispatch = useDispatch();

  const __doLogin = useCallback(
    (e) => {
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          const { user } = credential;
          console.log(user);
          dispatch({
            type: __UPDATE_HEADER_STATE__,
            payload: true
          });
          history.push('/feed');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email, password, history, dispatch]
  );

  const __goJoin = useCallback(() => {
    history.push('/join');
  }, [history]);

  const __logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log('로그아웃 complete');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch({
      type: __UPDATE_HEADER_STATE__,
      payload: false
    });
  }, [dispatch]);

  return (
    <div className="login">
      <div className="wrapper">
        <div className="logo"></div>
        <form className="login-contents" onSubmit={__doLogin}>
          <div className="email-inp custom-inp">
            <div className="title txt-bold">이메일</div>
            <div className="inp">
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                onBlur={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="password-inp custom-inp">
            <div className="title txt-bold">비밀번호</div>
            <div className="inp">
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onBlur={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="login-btn" type="submit">
            로그인 하기
          </button>
        </form>
        <div className="go-join" onClick={__goJoin}>
          <div className="title txt-bold">또는 회원가입하기</div>
          <div className="asset">
            <img src="/assets/welcome/arrow.svg" alt="회원가입하기" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
