import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllDocsPage from "./routes/AllDocsPage";
import HomePage from "./routes/HomePage";
import Navigation from "./components/Navigation";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        <Container fluid={true}>
          <Route path='/' component={HomePage} />
          <Route path='/documents' component={AllDocsPage} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
