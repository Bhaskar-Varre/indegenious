import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import LandingPage from './Landingpage';
import ResearchTab from './Research';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" element={<LandingPage></LandingPage>} />
          <Route path="/research" element={<ResearchTab></ResearchTab>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
