import React, { Component } from 'react';
import {BrowserRouter,Route, Redirect, Switch} from 'react-router-dom';
import LoginPage from './pages/login'
import CommPage from './pages/commercianteP'
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'

import './App.css';

class App extends Component{

  state ={
    token:null,
    commId:null,
    
  }
  login=(token, commId, tokenExpiration)=>{
    this.setState({
      token:token,
      commId:commId,
      tokenExpiration:tokenExpiration
    })


  }
  logout=()=>{
    this.setState({
      token:null,
      commId:null
    })
   

  }
  
 

  render(){
  return (
    <BrowserRouter>
    <React.Fragment>
      <AuthContext.Provider value={{
        token:this.state.token, 
        commId:this.state.commId,
        login:this.login,
        logout:this.logout,
      }}>
      <MainNavigation/>
       <main className="main-content">
        <Switch>
        {!this.state.token&&<Redirect from= "/" to="/login" exact />}
        {!this.state.token&&<Redirect from= "/commerciante" to="/login" exact />}
        {this.state.token&&<Redirect from= "/" to="/commerciante" exact />}
        {this.state.token&&<Redirect from= "/login" to="/commerciante" exact />}
        {!this.state.token&&<Route path="/login" component={LoginPage} />}
        {this.state.token&&<Route path="/commerciante" component={CommPage} />}
        </Switch>
        </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}
}

export default App;
