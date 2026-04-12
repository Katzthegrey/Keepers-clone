# Google Keep Clone - My React Notes Application

## About This Project

I built this Google Keep clone as a learning project to understand how React handles state management and component communication. The application lets users create, organize, and manage notes with features like pinning important notes and changing background colors.

I also added a few more features along the way - a search bar that filters through all my notes and a dark mode toggle for late night note taking. My AI coding assistant helped me implement dark mode and reminder features, which turned out to be great additions.

## How I Structured The Application

I decided to keep all note data in a central location - the App component. This component maintains a master array of note objects and passes down functions to child components as props. This approach means data flows in one direction, which makes debugging much easier.

The note objects in my array contain several properties:
- A unique ID generated from the current timestamp
- A title and content text
- A boolean value indicating whether the note is pinned
- A color code for the note's background
- An optional reminder date and time

## Features I Implemented

### Creating Notes
When you click on the form, it expands to show title and content fields. You can type your note and save it by clicking outside the form or pressing the close button. The form sends the title and content up to the App component, which adds your new note to the master array.

### Deleting Notes
Each note displays a delete icon when you hover over it. Clicking this icon tells the App component to filter out that specific note from the array.

### Pinning Notes
The pin icon appears in the top right corner of each note on hover. When clicked, it toggles the note's pinned status between true and false. Pinned notes automatically move to a separate section above the regular notes.

### Changing Note Colors
Clicking the palette icon opens a grid of color options. Selecting a color updates that note's color property, and the note's background changes immediately.

### Search Bar Filter
I implemented the search bar myself to filter notes based on title or content. When you type into the search field, the application filters both pinned and unpinned notes in real time. Only notes matching your search query appear on screen, while still keeping pinned notes above unpinned ones.

### Dark Mode
With help from my AI assistant, I added a dark mode toggle in the navbar. Clicking the moon or sun icon switches the entire application between light and dark themes. All colors adjust - backgrounds, text, borders, and icons - creating a comfortable viewing experience in low light.

### Reminders
My AI assistant also helped me build the reminder feature. Each note has a bell icon that opens a date and time picker. When you set a reminder, the icon changes color to show an active reminder is set. The application tracks these reminders and can alert you when they are due.

## How To Use The Application

### Starting The App
After cloning the repository, run `npm install` to download the dependencies. Then run `npm start` to launch the development server. The application will open in your browser at localhost port 3000.

### Creating Your First Note
Click on the form that says "Take a note". The form expands to show a title field and a larger text area. Type your title and content. Click anywhere outside the form or press the close button - your note saves automatically.

### Managing Your Notes
Hover over any note to reveal the action icons. Click the push pin icon to pin important notes to the top. Click the delete icon to remove a note you no longer need. Click the palette icon to change the note's background color from a selection of twelve options. Click the bell icon to set a reminder with a specific date and time.

### Searching Your Notes
Type any word into the search bar at the top of the page. The display updates instantly to show only notes containing that word in either the title or content. The pinned section stays above the unpinned section even during search.

### Switching To Dark Mode
Look for the moon or sun icon in the navigation bar. Click it once to switch to dark mode. Click again to return to light mode. Your preference stays active until you change it.

### Viewing Organization
Pinned notes appear in a section labeled "PINNED" at the top. Regular notes appear below in a section labeled "OTHERS". The section headers only show up when you have at least one pinned note. The search bar filters both sections together.

## Technical Decisions I Made

I chose not to use useReducer for this project because I wanted to keep the state management straightforward with useState hooks. The App component contains the main functions: addNote, deleteNote, togglePin, changeColor, addReminder, and toggleDarkMode. Each function updates the notes array using immutable patterns like map and filter.

I created a Notes wrapper component that simply passes props through to the individual Note components. This keeps the rendering logic separate from the data manipulation logic.

For the color picker and reminder picker, I built custom components that manage their own open and close state while receiving functions as props from the parent.

The search filter runs on every keystroke. I filter the master notes array first based on the search query, then separate the results into pinned and unpinned groups for display.

Dark mode works through CSS variables. I defined light and dark color palettes and switch them by toggling a data attribute on the root HTML element.

## What I Learned

This project taught me how to lift state up to parent components and pass functions down through multiple levels of components. I learned why keeping a single source of truth makes React applications easier to maintain. I also practiced conditional rendering, dynamic styling with inline styles, handling user events, filtering arrays without mutating original data, and managing multiple UI states simultaneously.

Getting help from my AI assistant on dark mode and reminders showed me how to approach features I was less confident about while still understanding the code being added to my project.

## Future Improvements I Might Add

I want to add local storage persistence so notes survive a browser refresh. I am also considering category tags for better organization and rich text formatting in notes.

## Technologies I Used

- React for the user interface
- CSS for styling with flexbox layouts and CSS variables
- Material Icons for the icon set
- Create React App for the build tooling
