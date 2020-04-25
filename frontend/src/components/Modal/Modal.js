import React from 'react';

import './Modal.css';

const modal = props => (
  <div className="modal" >
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <header className="modal-header" >
      <h1 className="modal-title">{props.title}</h1>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onCancel}>
          <span aria-hidden="true">&times;</span>
        </button>
    </header>
    <section className="modal-body" >{props.children}</section>
    <section className="modal-footer">
      {props.canCancel && (
        <button className="btn btn-secondary" data-dismiss="modal" onClick={props.onCancel}>
          Cancel
        </button>
      )}
      {props.canConfirm && (
        <button type="button" className="btn btn-primary" onClick={()=>props.onConfirm()}>
          Confirm
        </button>
      )}
    </section>
    </div>
    </div>
  </div>
);

export default modal;