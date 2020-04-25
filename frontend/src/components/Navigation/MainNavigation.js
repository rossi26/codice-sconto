import React from 'react';//functional component
import {NavLink} from 'react-router-dom'
import './MainNavigation.css'
import AuthContext from '../../context/auth-context'

const mainNavigation = props => (
<AuthContext.Consumer>
    {(context)=>{
        return(
             <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="main-navigation">
               <div className="navbar-brand"></div>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>
               <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto" >
                    <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                        {context.token&&<li className="nav-item"><NavLink className="nav-link" to="/commerciante">Utente</NavLink></li>}
                
                    </ul>
                    </div>
                    <div className="authentication">
                        {!context.token&&<li className="nav-item"><NavLink to="/login"><button className="btn btn-primary">Login</button></NavLink></li>}
                        {context.token&&<li className="nav-item"><button className="btn btn-primary"  onClick={context.logout}>Logout</button></li>}
                    </div>  
                </nav>
          
        )
    }}

</AuthContext.Consumer>

);



export default mainNavigation