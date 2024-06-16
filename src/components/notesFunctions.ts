interface Note {
    id: string;
    title: string;
    markdown: string;
    date: string;
  }
  
  export function getNotes(): Note[] | null {
    let notes = localStorage.getItem("notes");
    if (notes) {
      return JSON.parse(notes);
    } else {
      return null;
    }
  }
  
  export function setNote(id: string, title: string, markdown: string, date: string): void {
    let oldNotes = localStorage.getItem("notes");
    if (oldNotes) {
      localStorage.setItem("notes", JSON.stringify([...JSON.parse(oldNotes), { id, title, markdown, date }]));
    } else {
      localStorage.setItem("notes", JSON.stringify([{ id, title, markdown, date }]));
    }
  }
  
  export function getNote(id: string): Note | undefined {
    let oldNotes = localStorage.getItem("notes");
    if (oldNotes) {
      let notes: Note[] = JSON.parse(oldNotes);
      return notes.find(note => note.id === id);
    }
    return undefined;
  }
  
  export function updateNote(updatedNote: Note): void {
    let oldNotes = localStorage.getItem("notes");
    if (oldNotes) {
      let notes: Note[] = JSON.parse(oldNotes);
      const noteIndex = notes.findIndex(note => note.id === updatedNote.id);
      if (noteIndex !== -1) {
        notes[noteIndex] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }
  }
  
  export function deleteNote(id: string): void {
    let oldNotes = localStorage.getItem("notes");
    if (oldNotes) {
      let notes: Note[] = JSON.parse(oldNotes);
      notes = notes.filter(note => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }
  