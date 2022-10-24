
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBootstrap from './navbar';

import UserContext from './context';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import AllData from './alldata';


function BadBank() {
  return (
    <HashRouter>
      <NavBootstrap />
      <div className="container">
        <UserContext.Provider value={{
          users:[
            {firstName:'Alexa', lastName:'Baltimore', email:'alexabalt@sirman.com', password:'lonelycow', balance:5000, loggedIn:true},
            {firstName:'Robert', lastName:'Lasky', email:'rlasky@reaganhs.edu', password:'laskyadmin7@', balance:120000, loggedIn:false},
            {firstName:'Leslie', lastName:'Lopez', email:'leslielopez@gmail.com', password:'butterflyll2', balance:1200, loggedIn:false},
          ]
        }}>

          <Routes>
            <Route path='/'         exact element={<Home />} />
            <Route path='/createaccount/' element={<CreateAccount />} />
            <Route path='/login/'         element={<Login />} />
            <Route path='/deposit/'       element={<Deposit />} />
            <Route path='/withdraw/'      element={<Withdraw />} />
            <Route path='/alldata/'       element={<AllData />} />
          </Routes>

        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default BadBank;
