import React, { useState } from 'react';
import '../Styles/NoteStyle.css';
import '../Styles/ReminderStyles.css';
import ColorChanger from './ColorChanger';
import ReminderPicker from '../Components/ReminderPicker';
import ReminderCountdown from '../Components/ReminderCountdown';

const Note = ({
  notes,
  deleteNote,
  togglePin,
  changeColor,
  setReminder,
  emptyMessage = 'No notes yet. Create your first note!',
}) => {
  const [reminderOpenId, setReminderOpenId] = useState(null);

  return (
    <div className='notes'>
      {notes.length === 0 ? (
        <div className="empty-notes">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        notes.map((note) => (
          <div className={`note ${note.pinned ? 'pinned' : ''}`} 
          key={note.id} 
          style={note.color ? { backgroundColor: note.color } : undefined}
          >
            <span 
              className={`material-icons-outlined pin-icon ${note.pinned ? 'pinned-active' : ''}`}
              onClick={() => togglePin(note.id)}
            >
              push_pin
            </span>

            <span 
              className='material-icons-outlined delete-icon'
              onClick={() => deleteNote(note.id)}
            >
              delete
            </span>

            {note.reminderAt ? (
              <ReminderCountdown
                reminderAt={note.reminderAt}
                onClear={() => setReminder(note.id, null)}
              />
            ) : null}
            
            <div className="title">{note.title}</div>
            <div className="content">{note.content}</div>
            <div className="note-footer" onClick={(e) => e.stopPropagation()}>
              <div
                className="tooltip reminder-anchor"
                data-reminder-anchor={note.id}
              >
                <span
                  className='material-icons-outlined hover small-icon'
                  onClick={() =>
                    setReminderOpenId((id) => (id === note.id ? null : note.id))
                  }
                >
                  add_alert
                </span>
                <span className='tooltip-text'>Remind me</span>
                <ReminderPicker
                  anchorKey={note.id}
                  isOpen={reminderOpenId === note.id}
                  onClose={() => setReminderOpenId(null)}
                  initialMs={note.reminderAt}
                  onSave={(ts) => {
                    setReminder(note.id, ts);
                    setReminderOpenId(null);
                  }}
                />
              </div>

              <div className="tooltip">
                <span className='material-icons-outlined hover small-icon'>person_add</span>
                <span className='tooltip-text'>Collaborator</span>
              </div>

              <ColorChanger 
                onSelectColor={(color) => changeColor(note.id, color)}
                currentColor={note.color || '#ffffff'}
              />

              <div className="tooltip">
                <span className='material-icons-outlined hover small-icon'>image</span>
                <span className='tooltip-text'>Add image</span>
              </div>

              <div className="tooltip">
                <span className='material-icons-outlined hover small-icon'>archive</span>
                <span className='tooltip-text'>Archive</span>
              </div>   

              <div className="tooltip">
                <span className='material-icons-outlined hover small-icon'>more_vert</span>
                <span className='tooltip-text'>More</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Note;
