import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BasicPage from "./routes/BasicPage";
import EditPage from "./routes/EditPage";
import DocPage from "./routes/DocPage";
import Page404 from "./routes/Page404";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={BasicPage} />
            <Route path="/edit/:id?" component={EditPage} />
            <Route path="/document/:id" component={DocPage} />
            <Route component={Page404} />
          </Switch>
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
// Group theme colors
// Wrong url handling
// Date formatting
// Refactor editorcontrols
export default App;
