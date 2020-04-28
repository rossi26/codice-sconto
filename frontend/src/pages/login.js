import React, {Component} from 'react';
import './login.css'
import axios from 'axios';
import AuthContext from '../context/auth-context'


class LoginPage extends Component{
    state={
      isLogin:true
    }
    static contextType= AuthContext;



    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.titleEl = React.createRef();
        
      }
      switchModeHandler =()=>{
        this.setState(prevState =>{
          return{isLogin:!prevState.isLogin}
        })
      }

     


      submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        
        if (email.trim().length === 0 || password.trim().length === 0) {
          return;
        }

      
     let requestBody = {
          query:`
          query{
            login(email:"${email}",password:"${password}"){
              commId
              token
              tokenExpiration
            }
          }`
        }
       
        if(!this.state.isLogin){
         
          const nome=this.titleEl.current.value;
            requestBody={
            query:`
            mutation{
                createComm(commInput:{ title:"${nome}" , email:"${email}" , password:"${password}" }){
                    _id
                    email
                }
            }
            `
        }
    
    }
        
       
        axios.post('/graphql',
          requestBody
          ,
          {
             headers: {
            'Content-Type': 'application/json'
            }
          }
        )
        .then(response => {
          
          if (response.data.data.login.token){
            this.context.login(
              response.data.data.login.token,
              response.data.data.login.commId,
              response.data.data.login.tokenExpiration)
          }
        
        })
        .catch(err => {
          console.log(err, err.response);
        }); 
      
    };

    render(){ 
        return(<React.Fragment>
            <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-group">
              
              <input type="email" className="form-control" id="email" ref={this.emailEl} placeholder="Email"/>
            </div>
            
              <div className="form-group">
                
                <input type="password" className="form-control" id="password" ref={this.passwordEl} placeholder="Password"/>
              </div>
              {this.state.isLogin ? (null):
              (<React.Fragment>
              
             
    
            <div className="form-group">
              
              <input type="text" className="form-control" id="nome" ref={this.titleEl} placeholder="Nome" />
            </div>
            </React.Fragment>
              )
              }
          
            <div className="form-actions">
              <button className="btn btn-primary" type="submit">Submit</button>
             <button className="btn btn-primary" onClick={this.switchModeHandler} >
               Switch to {this.state.isLogin ? 'Signup' : 'Login'} 
              </button>
            </div>
          </form>
          <section>
             <div>
              

             </div>
          </section>
          </React.Fragment>

        )
    }
}
export default LoginPage