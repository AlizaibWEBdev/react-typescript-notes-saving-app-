import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getNotes } from "../components/notesFunctions";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  markdown: string;
  date: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByDate, setSortByDate] = useState<string>("newest"); // 'newest' or 'oldest'

  useEffect(() => {
    const myNotes = getNotes();
    if (myNotes) {
      setNotes(myNotes);
    }
  }, []);

  // Filter notes based on search term and sort by date
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByDate === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime(); // Newest first
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime(); // Oldest first
      }
    });

    return (
      <Container className="mt-4">
        <header className="pb-4 mb-4 border-bottom">
          <Row className="align-items-center">
            <Col>
              <h1 className="display-4 text-primary">Your Notes</h1>
              <p className="lead">Manage your notes with ease</p>
            </Col>
            <Col xs="auto">
              <Link to="/new" className="text-decoration-none">
                <Button variant="primary" className="rounded-pill">
                  Create Note
                </Button>
              </Link>
            </Col>
          </Row>
        </header>
        <Row className="mb-3">
          <Col>
            <Form.Group className="mb-0">
              <Form.Control
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Select
              aria-label="Sort notes by"
              value={sortByDate}
              onChange={(e) => setSortByDate(e.target.value)}
              className="form-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </Form.Select>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredNotes.map((note) => (
            <Col key={note.id}>
              <Card
                as={Link}
                to={`/${note.id}/view`}
                className="text-decoration-none border rounded-3 shadow-sm h-100"
              >
                <Card.Body>
                  <Card.Title className="fw-bold">{note.title}</Card.Title>
                  <Card.Text className="text-muted">{note.date}</Card.Text>
                  <Card.Text className="overflow-hidden text-truncate" style={{ maxHeight: '6rem' }}>
                   
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-0">
                  <Button variant="primary" className="w-100">
                    View Note
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
};

export default Notes;
