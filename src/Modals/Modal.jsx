import React from 'react';
import '../Styles/ModalStyle.css';

const Modal = () => {
  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <h2 className='modal-title'>Title</h2>
          <div className='tooltip'>
            <span className='material-icons-outlined hover'>close</span>
            <span className='tooltip-text'>Close</span>
          </div>
        </div>

        <div className='modal-content'>
          <input 
            type='text' 
            className='modal-input-title' 
            placeholder='Title'
          />
          <textarea 
            className='modal-input-content' 
            placeholder='Take a note...'
          ></textarea>
        </div>

        <div className='modal-footer'>
          <div className='modal-actions-left'>
            <div className='tooltip'>
              <span className='material-icons-outlined hover'>palette</span>
              <span className='tooltip-text'>Change color</span>
            </div>
            
            <div className='tooltip'>
              <span className='material-icons-outlined hover'>add_alert</span>
              <span className='tooltip-text'>Remind me</span>
            </div>
            
            <div className='tooltip'>
              <span className='material-icons-outlined hover'>person_add</span>
              <span className='tooltip-text'>Collaborator</span>
            </div>
            
            <div className='tooltip'>
              <span className='material-icons-outlined hover'>image</span>
              <span className='tooltip-text'>Add image</span>
            </div>
            
            <div className='tooltip'>
              <span className='material-icons-outlined hover'>archive</span>
              <span className='tooltip-text'>Archive</span>
            </div>
            
            <div className='tooltip'>
              <span className='material-icons-outlined hover'>more_vert</span>
              <span className='tooltip-text'>More</span>
            </div>
          </div>
          
          <div className='modal-actions-right'>
            <button className='modal-btn close-btn'>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;