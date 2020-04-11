import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import { StoreProvider } from "./utils/globalState";
import Scores from "./pages/scores";


function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/scores" component={Scores} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
