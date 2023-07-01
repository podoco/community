import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@styles/core.css';
import Login from './Login/Login';
import Join from './Join/Join';
import { useEffect, useCallback } from 'react';
import { Fdatabase } from '@config/firebaseApp';
import { ref, onValue } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { __NICKNAME_SERVICE_UPDATE__ } from '@dispatchers/config';
import MainFeed from './MainFeed/MainFeed';
import Header from './Header/Header';

function App() {
  const dispatch = useDispatch();
  const isHeaderOpen = useSelector((state) => state.layouts.isHeaderOpen);
  //닉네임을 실시간으로 불러오는 함수 만들기
  const __getNicknames = useCallback(() => {
    const dbRef = ref(Fdatabase, 'statics/nicknames');

    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        // 데이터가 존재할때는 리덕스 상태로 닉네임리스트를 업데이트
        console.log(Object.values(snapshot.val()));

        dispatch({
          type: __NICKNAME_SERVICE_UPDATE__,
          payload: Object.values(snapshot.val())
        });
      } else {
        // 데이터가 없을때는 빈 배열을 업데이트
        dispatch({
          type: __NICKNAME_SERVICE_UPDATE__,
          payload: []
        });
      }
    });

    return dbRef;
  }, [dispatch]);

  useEffect(() => {
    const nicknameRef = __getNicknames();
    return () => {
      nicknameRef.off();
    };
  }, [__getNicknames]);

  //함수 실행시키기

  return (
    <Router>
      {isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
      </Switch>
    </Router>
  );
}

export default App;
