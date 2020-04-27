import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons'
import Home from "./pages/Home"
import Register from "./pages/Register"
import './App.css';

function App() {
  library.add(faChevronUp, faTimes)
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
