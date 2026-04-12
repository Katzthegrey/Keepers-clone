// Cursor code: app-level theme state + persistence
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Form from "./Components/Form";
import Notes from "./Notes/Notes";


const maybeRequestNotificationPermission = () => {
  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    Notification.requestPermission();
  }
};

const App = () => {
 const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light'); // Cursor code
 const [notes, setNotes] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [sidebarView, setSidebarView] = useState('notes');
  const reminderFiredRef = useRef(new Set());
  useEffect(() => {
    // Cursor code
    document.body.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // Cursor code
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      const now = Date.now();
      notes.forEach((note) => {
        if (note.reminderAt == null) return;
        const at = note.reminderAt;
        if (reminderFiredRef.current.has(note.id)) return;
        if (now >= Number(at)) {
          reminderFiredRef.current.add(note.id);
          const body =
            note.title && note.title !== 'Untitled'
              ? note.title
              : note.content || 'Reminder';
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            try {
              new Notification('Reminder', { body: String(body).slice(0, 140) });
            } catch {
              /* ignore */
            }
          }
        }
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [notes]);
 
  //Add Note function, passed down to Form component
  const addNote = (title, content, reminderAt = null) => {
    if (title.trim() || content.trim()) {
      const newNote = {
        id: Date.now(),
        title: title.trim() || 'Untitled',
        content: content.trim() || 'No content',
        date: new Date().toLocaleDateString(),
        pinned: false,
        color: '',
        reminderAt:
          reminderAt != null && reminderAt !== ''
            ? Number(reminderAt)
            : null,
      };
      setNotes((prev) => [newNote, ...prev]);
      if (reminderAt) {
        reminderFiredRef.current.delete(newNote.id);
        maybeRequestNotificationPermission();
      }
    }
  };

  const setReminder = (id, reminderAt) => {
    reminderFiredRef.current.delete(id);
    const normalized =
      reminderAt != null && reminderAt !== ''
        ? Number(reminderAt)
        : null;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, reminderAt: normalized } : n
      )
    );
    if (normalized != null) {
      maybeRequestNotificationPermission();
    }
  };

  const reminderCount = useMemo(
    () => notes.filter((n) => n.reminderAt != null).length,
    [notes]
  );

  const notesWithRemindersSorted = useMemo(() => {
    const withReminder = notes.filter((n) => n.reminderAt != null);
    return [...withReminder].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return Number(a.reminderAt) - Number(b.reminderAt);
    });
  }, [notes]);

  //Search functionality - filter notes based on search term
  const matchesSearch = (note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase());
  
  //Pinned notes should be separated and shown at the top, followed by unpinned notes. Both should be filterable by the search term.
  const pinnedNotes = notes.filter((note) => note.pinned);
  const unpinnedNotes = notes.filter((note) => !note.pinned);

  const filteredPinnedNotes = pinnedNotes.filter(matchesSearch);

  const filteredUnpinnedNotes = unpinnedNotes.filter(matchesSearch);

  const filteredReminderNotes = notesWithRemindersSorted.filter(matchesSearch);


  // Function to delete a note
  const deleteNote = (id) => {
    reminderFiredRef.current.delete(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };
    // Pin note
    const togglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

   // Function to change note color
  const changeColor = (id, color) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, color: color } : note
    ));
  };


  return (
    <div>
    <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} theme={theme} onToggleTheme={toggleTheme} />
    <Sidebar
      activeView={sidebarView}
      onViewChange={setSidebarView}
      reminderCount={reminderCount}
    />
    <Form addNote={addNote} />
    {sidebarView === 'notes' ? (
      <>
        {pinnedNotes.length > 0 && (
          <div className="notes-section">
            <h2 className="section-title">PINNED</h2>
            <Notes
              notes={filteredPinnedNotes}
              deleteNote={deleteNote}
              togglePin={togglePin}
              changeColor={changeColor}
              setReminder={setReminder}
            />
          </div>
        )}

        <div className="notes-section">
          {pinnedNotes.length > 0 && <h2 className="section-title">OTHERS</h2>}
          <Notes
            notes={filteredUnpinnedNotes}
            deleteNote={deleteNote}
            togglePin={togglePin}
            changeColor={changeColor}
            setReminder={setReminder}
          />
        </div>
      </>
    ) : (
      <div className="notes-section">
        <h2 className="section-title">REMINDERS</h2>
        <Notes
          notes={filteredReminderNotes}
          deleteNote={deleteNote}
          togglePin={togglePin}
          changeColor={changeColor}
          setReminder={setReminder}
          emptyMessage="No reminders yet. Open a note, tap the bell, and pick a date and time. Notes with reminders appear here."
        />
      </div>
    )}
    </div>
  );
}

export default App;
