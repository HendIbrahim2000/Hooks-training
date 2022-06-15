import React, { useState } from 'react';

import Todo from "./Components/Todo";
import Header from './Components/Header';
import Auth from './Components/Auth';
import AuthContext from './Auth-Context';

const App = props => {

  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const swichPage = (webPage) => {
    setPage(webPage)
  }

  const login = () => {
    setAuthStatus(true)
  }

  return (
    <div>
      <AuthContext.Provider value={{status: authStatus, login: login}}>
        <Header
        onLoadTodos={swichPage.bind(this, 'todos')}
        onLoadAuth={swichPage.bind(this , 'auth')}
        />
        <br />
        {page === 'auth' ? <Auth /> : <Todo />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
