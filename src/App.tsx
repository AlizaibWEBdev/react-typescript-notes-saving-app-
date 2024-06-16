import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote";
import Notes from "./pages/Notes";
import View from "./pages/View";

const App = () => {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/new" element={<NewNote edit={false} />} />
        <Route path="/:id">
          <Route path="view" element={<View />} />
          <Route path="edit" element={<NewNote edit={true} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
