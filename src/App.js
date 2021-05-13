import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./routes/MainPage";
import EditDocPage from "./routes/EditDocPage";
import ShowDocPage from "./routes/ShowDocPage";
import Page404 from "./routes/Page404";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/edit/:id?" component={EditDocPage} />
            <Route exact path="/document/:id" component={ShowDocPage} />
            <Route component={Page404} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
// @TODOS
// handle missing title
// Wrong url handling
// Use fuzzy searching fusejs.io
// Date formatting
export default App;
