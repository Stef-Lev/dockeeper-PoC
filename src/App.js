import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllDocsPage from "./components/AllDocsPage";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import { Container } from 'react-bootstrap';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Container fluid={true}>
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route path='/documents' component={AllDocsPage} />
            <Route render={function () {
              return <p>Not found</p>
            }} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
