import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "../stores/Store";

import "../css/app.css";
import 'react-toastify/dist/ReactToastify.css';
import EmailApp from "./EmailPage";

function App() {
  return (
    <Router>
      <Provider>
        <EmailApp />
      </Provider>
    </Router>
  );
}

export default App;
