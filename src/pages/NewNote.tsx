import NoteForm from "../components/NoteForm";
import { useParams } from "react-router-dom";
import { getNote } from "../components/notesFunctions";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  markdown: string;
  date: string;
}

const NewNote = ({ edit = false }: { edit?: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (edit && id) {
      const fetchedNote = getNote(id);
      if (fetchedNote) {
        setNote(fetchedNote);
      }
    }
  }, [edit, id]);

  return (
    <>
      <h1 className="mb-4">{edit ? "Edit Note" : "New Note"}</h1>
      <NoteForm edit={edit} note={note} />
    </>
  );
};

export default NewNote;
