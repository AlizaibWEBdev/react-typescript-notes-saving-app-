import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNote, deleteNote } from "../components/notesFunctions";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  markdown: string;
  date: string;
}

const View = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedNote = getNote(id);
      if (fetchedNote) {
        setNote(fetchedNote);
      }
    }
  }, [id]);

  const handleDelete = () => {
    if (id) {
      deleteNote(id);
      navigate("/");
    }
  };

  if (!note) {
    return <div className="text-center mt-5">Note not found</div>;
  }

  return (
    <div className="container mt-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="display-4">{note.title}</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            <Link to="/">
              <Button variant="secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Text className="fs-5" dangerouslySetInnerHTML={{ __html: note.markdown }} />
        </Card.Body>
        <Card.Footer className="text-muted text-end">{note.date}</Card.Footer>
      </Card>
    </div>
  );
};

export default View;
