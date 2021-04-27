import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BasicPage from "./routes/BasicPage";
import EditPage from "./routes/EditPage";
import Container from "@material-ui/core/Container";
import NewDocButton from "./components/NewDocButton";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg">
          <Route exact path="/" component={BasicPage} />
          <Route path="/edit/:id?" component={EditPage} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
