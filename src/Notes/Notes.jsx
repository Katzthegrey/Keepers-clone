import React from 'react'
import Note from './Note'

const Notes = ({
  notes,
  deleteNote,
  togglePin,
  changeColor,
  setReminder,
  emptyMessage,
}) => {
  return (
    <div>
      <Note
        notes={notes}
        deleteNote={deleteNote}
        togglePin={togglePin}
        changeColor={changeColor}
        setReminder={setReminder}
        emptyMessage={emptyMessage}
      />
    </div>
  );
};

export default Notes
