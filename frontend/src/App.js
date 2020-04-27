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

  componentDidMount() {
    /* console.log("App.componentDidMount: refreshing, then authenticating.."); */
    this.refreshToken().then(result => {
      console.log(result)
        if (result) {

          let base64Url = result.split(".")[1];
    
    
    const base64 = base64Url.replace("-", "+").replace("_", "/");
   
    const tokenData = JSON.parse(atob(base64));
           /*  console.log("App.componentDidMount: the user is authenticated"); */
               this.setState({
              token:result,
              commId:tokenData.commId,
              
            }) 
        } else {
            /* console.log("App.componentDidMount: the user is not authenticated"); */
        }
    });
}

refreshToken = () => {
const t=localStorage.getItem("tokens")
console.log(t)
 /*  const tokens = JSON.parse(localStorage.getItem("tokens"));
  console.log(tokens) */
  if (t !== null) {
    

    /*   console.log("App.refreshToken: access token not expired, nothing to do."); */
      return Promise.resolve(t)
   
  }else{
  /* console.log("App.refreshToken: no tokens found in localStorage."); */
  return Promise.resolve(false);}
};

  login=(token, commId, tokenExpiration)=>{
    localStorage.setItem("tokens", token)
    this.setState({
      token:token,
      commId:commId,
      tokenExpiration:tokenExpiration
    })


  }
  logout=()=>{
    localStorage.removeItem("tokens");
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
