import { useState, useEffect, useRef, FormEvent } from "react";
import { Col, Form, Stack, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setNote, updateNote } from "./notesFunctions";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

interface Note {
  id: string;
  title: string;
  markdown: string;
  date: string;
}

interface NoteFormProps {
  edit: boolean;
  note: Note | null;
}

const NoteForm = ({ edit, note }: NoteFormProps) => {
  const titleref = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && note) {
      if (titleref.current) titleref.current.value = note.title;
      setMarkdown(note.markdown);
    }
  }, [edit, note]);

  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    if (titleref.current?.value && markdown) {
      if (edit && note) {
        updateNote({
          id: note.id,
          title: titleref.current.value,
          markdown: markdown,
          date: date,
        });
      } else {
        const id = Date.now().toString();
        setNote(id, titleref.current.value, markdown, date);
      }

      titleref.current.value = "";
      setMarkdown("");

      navigate("/");
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label> Title </Form.Label>
              <Form.Control required ref={titleref} />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label> Body </Form.Label>
          <ReactQuill
            value={markdown}
            onChange={setMarkdown}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'video'],
                ['clean']
              ],
            }}
          />
        </Form.Group>
      </Stack>

      <Stack direction="horizontal" gap={4} className="my-4 justify-content-end">
        <Link to={"/"}>
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Link>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Stack>
    </Form>
  );
};

export default NoteForm;
