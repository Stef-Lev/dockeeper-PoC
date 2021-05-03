import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BasicPage from "./routes/BasicPage";
import EditPage from "./routes/EditPage";
import DocPage from "./routes/DocPage";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg">
          <Route exact path="/" component={BasicPage} />
          <Route path="/edit/:id?" component={EditPage} />
          <Route path="/document/:id" component={DocPage} />
        </Container>
      </div>
    </Router>
  );
}
// @TODOS
// error handling modal
// delete warning modal
// editor controls
// handle missing title
// Invert hover colors

export default App;
