import React, {Component} from 'react';
/* import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop'; */
import axios from 'axios';
import AuthContext from '../context/auth-context'

import {NavLink} from 'react-router-dom'

class CommPage extends Component{
    /* state = {
        creating: false,
        room: []
      };
      constructor(props){
        super(props);
        this.titleEl = React.createRef();
        this.descrEl = React.createRef();
        this.occEl = React.createRef();
      }
      static contextType= AuthContext;
      componentDidMount() {
        this.fetchRooms();
      }
    
      startCreateRoomHandler = () => {
        this.setState({ creating: true });
      };
    
      modalConfirmHandler = () => {
        this.setState({ creating: false });
        const title = this.titleEl.current.value;
        const description = this.descrEl.current.value;
        const max_occ=+this.occEl.current.value;

        if (title.trim().length === 0 || description.trim().length === 0||max_occ<=0 ) {
            return;
          }

          const  requestBody={
              query:`
              mutation{
                createRoom(roomInput:{ title:"${title}" , description:"${description}" , max_occupancy:${max_occ} }){
                      _id
                      title
                      hotel{
                          _id
                          title
                      }
                  }
              }
              `
          }
        
          const token=this.context.token
          
         
          axios.post('http://localhost:5000/graphql',
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
            this.fetchRooms();
          
          })
          .catch(err => {
            console.log(err, err.response);
          });


      };
    
      modalCancelHandler = () => {
        this.setState({ creating: false });
      };

      fetchRooms(){
        const requestBody = {
            query: `
                query {
                  rooms {
                    _id
                    title
                    description
                    hotel {
                      _id
                      email
                      title
                    }
                  }
                }
              `
          };

          const token=this.context.token
          

          axios.post('http://localhost:5000/graphql',
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
            const rooms = response.data.data.rooms;
            
            
            this.setState({ room: rooms });
        
        })
        .catch(err => {
          console.log(err, err.response);
        });
      

      } 

 */
    render(){
       
        /* const roomList = this.state.room.map(room => {
            return (
              <li key={room._id} className="card">
                    {room.title} <NavLink to="/prezzi"><button className="btn btn-primary">Inserisci prezzi</button></NavLink>
              </li>
            );
          });*/

        return(
            <h1>belllaaaa</h1>
            /* 
            <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (<Modal
            title="Add Room"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
            <div className="form-group">
                <input className="form-control" type="text" id="title"  ref={this.titleEl} placeholder="Nome"/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" id="description" ref={this.descrEl}  placeholder="Descrizione" />
            </div>
            <div className="form-group">
                <input className="form-control" type="number" id="massima_occ" ref={this.occEl} placeholder="Massima occupazione"/>
            </div>
            </form>
          </Modal>
        )}
       
       {this.context.token&&(<div className="container">
            <button type="button" className="btn btn-primary" onClick={this.startCreateRoomHandler}>Create room</button>
        </div>)} 
        <div className="accordion" id="accordionExample">
        <ul>
            {roomList}

        </ul>
        </div>
        </React.Fragment>  */)
    }
}
export default CommPage