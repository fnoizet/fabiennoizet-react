import './css/App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Menu from './components/Menu';
import Description from './components/Description';
import Experiences from './components/Experiences';
import Articles from './components/Articles';
import ArticleViewer from './components/ArticleViewer';
import Footer from './components/Footer.js';
import Data from './data.js';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Menu />
        <Router>
          <Switch>
            <Route exact path="/">
              <Description description={Data.description} tags={Data.generaltags} />
              <Experiences experiences={Data.experiences} />
              <Articles articles={Data.work} />
            </Route>  
            <Route path="/article/:name" render={(props) => <ArticleViewer {...props} />} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
