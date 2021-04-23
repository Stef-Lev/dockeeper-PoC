import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllDocsPage from "./routes/AllDocsPage";
import BasicPage from "./routes/BasicPage";
import Container from "@material-ui/core/Container";
import NewDocButton from "./components/NewDocButton";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg">
          <Route path="/">
            <BasicPage />
          </Route>
          <Route path="/documents">
            <AllDocsPage />
          </Route>
        </Container>
        <NewDocButton />
      </div>
    </Router>
  );
}

export default App;
