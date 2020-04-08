import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import { StoreProvider } from "./utils/globalState";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;