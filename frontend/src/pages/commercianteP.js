import React, {Component} from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import axios from 'axios';
import AuthContext from '../context/auth-context'
import './commercianteP.css'
import {NavLink} from 'react-router-dom'

class CommPage extends Component{
     state = {
        creating: false,
        codici: []
      };
      constructor(props){
        super(props);
        this.entitascontoEl = React.createRef();
        this.messaggioEl = React.createRef();
        this.validitaEl = React.createRef();
      }
      static contextType= AuthContext;
      componentDidMount() {
        this.fetchCodici();
      }
    
      startCreateHandler = () => {
        this.setState({ creating: true });
      };
    
      modalConfirmHandler = () => {
        this.setState({ creating: false });
        const entitasconto = this.entitascontoEl.current.value;
        const messaggio = this.messaggioEl.current.value;
        const validita=this.validitaEl.current.value;

        if (entitasconto.trim().length === 0 || messaggio.trim().length === 0||validita.trim().length === 0 ) {
            return;
          }

          const  requestBody={
              query:`
              mutation{
                createCode(codeInput:{ entitasconto:"${entitasconto}" , messaggio:"${messaggio}" , validita:"${validita}" }){
                      _id
                      code
                      validita
                      entitasconto
                      messaggio
                  }
              }
              `
          }
        
          const token=this.context.token
          
         
          axios.post('/graphql',
            requestBody
            ,
            {
               headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer'+token
              }
            }
          )
          .then(response => {
            this.fetchCodici();
          
          })
          .catch(err => {
            console.log(err, err.response);
          });


      };

      onCancelCode=(codeId)=>{
        console.log(codeId)

        const  requestBody={
          query:`
          mutation{
            cancelCode( codeId:"${codeId}"){
                  _id
                 title
                 email
              }
          }
          `
        }

        const token=this.context.token
          
         
          axios.post('/graphql',
            requestBody
            ,
            {
               headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer'+token
              }
            }
          )
          .then(response => {
            this.fetchCodici();
          
          })
          .catch(err => {
            console.log(err, err.response);
          });


      }
    
      modalCancelHandler = () => {
        this.setState({ creating: false });
      };

      fetchCodici(){
        const requestBody = {
            query: `
                query {
                  codici {
                    _id
                    code
                    entitasconto
                    messaggio
                    validita
                    commerciante{
                      email
                      title
                    }
                    
                   
                  }
                }
              `
          };

          const token=this.context.token
          

          axios.post('/graphql',
          requestBody
          ,
          {
             headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+token
            }
          }
        )
        .then(response => {
            const codici = response.data.data.codici;
            
            
            this.setState({ codici: codici });
        
        })
        .catch(err => {
          console.log(err, err.response);
        });
      

      } 

 
    render(){
       
         const codeList = this.state.codici.map(codice => {
          const URLmess=encodeURI(codice.messaggio)
          
          const href="https://wa.me/?text="+URLmess
          
            return (
              <li key={codice._id} className="card">
                
                    {codice.code} <div className="bottoni"> <a href={href}><button className="btn btn-primary">Condividi</button></a>
                    <button className="btn btn-primary" onClick={()=>{this.onCancelCode(codice._id)}}>Brucia Codice</button></div>
              </li>
            );
          });

        return(
            
           
            <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (<Modal
            title="Add codici"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
            <div className="form-group">
                <input className="form-control" type="text" id="entitascontoEl"  ref={this.entitascontoEl} placeholder="entita sconto"/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" id="messaggioEl" ref={this.messaggioEl}  placeholder="Messaggio" />
            </div>
            <div className="form-group">
                <input className="form-control" type="date" id="validita" ref={this.validitaEl} placeholder="Validita"/>
            </div>
            </form>
          </Modal>
        )}
       
       {this.context.token&&(<div className="container">
            <button type="button" className="btn btn-primary" onClick={this.startCreateHandler}>Create codice</button>
        </div>)} 
        <div className="accordion" id="accordionExample">
        <ul>
            {codeList}

        </ul>
        </div>
        </React.Fragment> )
    }
}
export default CommPage