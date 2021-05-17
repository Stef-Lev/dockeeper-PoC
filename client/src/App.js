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
            <Route exact path="/edit/:id(\d+)?" component={EditDocPage} />
            <Route exact path="/document/:id(\d+)" component={ShowDocPage} />
            <Route component={Page404} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
// @TODOS
// Use fuzzy searching fusejs.io
// Date formatting
// Responsive design
// Replace docitem icons with action menu
// Make side buttons size fluid
export default App;
