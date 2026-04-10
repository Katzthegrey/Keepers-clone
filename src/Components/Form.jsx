import React, { useState, useRef, useEffect } from 'react';
import '../Styles/FormStyles.css';
import '../Styles/ReminderStyles.css';
import ReminderPicker from './ReminderPicker';
import { formatReminderWhen } from '../utils/reminderUtils';

const Form = ({ addNote }) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pendingReminder, setPendingReminder] = useState(null);
  const [formReminderOpen, setFormReminderOpen] = useState(false);
  const formRef = useRef(null);

  const saveNoteAndClose = () => {
    if (title.trim() || content.trim()) {
      addNote(title, content, pendingReminder);
    }
    setTitle('');
    setContent('');
    setPendingReminder(null);
    setFormReminderOpen(false);
    setIsActive(false);
  };

  const handleInactiveClick = () => {
    setIsActive(true);
  };

  const handleCloseClick = () => {
    saveNoteAndClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNoteAndClose();
  };

  // Handle clicks outside the form
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the form is active and if the click is outside the form container
      if (isActive && formRef.current && !formRef.current.contains(event.target)) {
        // Save the note when clicking outside
        saveNoteAndClose();
      }
    };

    // Add event listener when the form is active
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, title, content, pendingReminder]);

  return (
    <div>
      {/* Inactive Form */}
      {!isActive && (
        <div className="form-container inactive-form" onClick={handleInactiveClick}>
          <form>
            <input 
              className='note-text' 
              type="text" 
              placeholder='Take a note...' 
              value={content}
              readOnly
            />
            <div className="note-actions">
              <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                <span
                  className='material-icons-outlined hover'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsActive(true);
                    setFormReminderOpen(true);
                  }}
                >
                  add_alert
                </span>
                <span className='tooltip-text'>Remind me</span>
              </div>

              <div className="tooltip">
                <span className='material-icons-outlined hover'>brush</span>
                <span className='tooltip-text'>New note with drawing</span>
              </div>

              <div className="tooltip">
                <span className='material-icons-outlined hover'>image</span>
                <span className='tooltip-text'>New note with image</span>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Active Form */}
      {isActive && (
        <div className="form-container active-form">
          <form className='form' id='active-form' ref={formRef} onSubmit={handleSubmit}>
            <input 
              id='note-title' 
              type="text" 
              className="note-title" 
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            
            <textarea 
              id='note-content' 
              className="note-content" 
              placeholder='Take a note...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            {pendingReminder ? (
              <div className="form-reminder-pending">
                <span className="material-icons-outlined" aria-hidden="true">schedule</span>
                <span>Reminder: {formatReminderWhen(pendingReminder)}</span>
                <button
                  type="button"
                  className="form-reminder-pending-clear"
                  onClick={() => setPendingReminder(null)}
                  aria-label="Remove reminder"
                >
                  ×
                </button>
              </div>
            ) : null}

            <div className="form-actions">
              <div className="icons">
                <div
                  className="tooltip form-reminder-anchor reminder-anchor"
                  data-reminder-anchor="compose"
                >
                  <span
                    className='material-icons-outlined hover'
                    onClick={() => setFormReminderOpen((open) => !open)}
                  >
                    add_alert
                  </span>
                  <span className='tooltip-text'>Remind me</span>
                  <ReminderPicker
                    anchorKey="compose"
                    isOpen={formReminderOpen}
                    onClose={() => setFormReminderOpen(false)}
                    initialMs={pendingReminder}
                    onSave={(ts) => {
                      setPendingReminder(ts);
                      setFormReminderOpen(false);
                    }}
                  />
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>person_add</span>
                  <span className='tooltip-text'>Collaborator</span>
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>palette</span>
                  <span className='tooltip-text'>Change color</span>
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>image</span>
                  <span className='tooltip-text'>Add image</span>
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>archive</span>
                  <span className='tooltip-text'>Archive</span>
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>more_vert</span>
                  <span className='tooltip-text'>More</span>
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>undo</span>
                  <span className='tooltip-text'>Undo</span>
                </div>

                <div className="tooltip">
                  <span className='material-icons-outlined hover'>redo</span>
                  <span className='tooltip-text'>Redo</span>
                </div>
              </div>
              
              <button type="button" className='close-btn' onClick={handleCloseClick}>Close</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;